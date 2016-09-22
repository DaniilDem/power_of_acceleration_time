"use strict";

var xlsx = require('node-xlsx');
var cheerio = require('cheerio');
var brain = require('brain');
var fs = require('fs');

var net = new brain.NeuralNetwork();
var objAuto = xlsx.parse('testdb.csv.xlsx'); // parses a file

var dataAuto = [];
var maxValueObj={};
const lengthData = 10;

for (var i=1; i<=lengthData; i++)
{
    let engine = objAuto[0].data[i][7];
    let timeAndOther = objAuto[0].data[i][10];

    processingData(engine, timeAndOther);

    if (i==lengthData)
    {
        normalize(dataAuto, 'input', 'time');
        normalize(dataAuto, 'output', 'hp');
       console.log(dataAuto);
        brainTrainingAndSave(dataAuto);
    }

}

function processingData(engine, timeAndOther)
{
    var $ = cheerio.load(engine);
    let textHP = $('table > tr:nth-last-child(3) > td:nth-child(2)').text();//magic selector
    let intHP = parseInt(textHP);
    //-----
    $ = cheerio.load(timeAndOther);
    let textTime = $('table > tr:nth-last-child(3) > td:nth-child(2)').text();//magic selector
    let floatTime = parseFloat(textTime);
    //-----
    if (floatTime<20 && floatTime>0 &&  intHP<1000)//filter
    {
        dataAuto.push(
            {
                input:{time:floatTime}, output:{hp:intHP}
            }
        );

    }
}

function normalize(arr, io, fieldName)
{
    let max = 0;
    arr.forEach(function (item)
    {
        if (item[io][fieldName]>max)
        {
            max = item[io][fieldName];
        }

    });

    maxValueObj[fieldName] = max;

    arr.map(function (item)
    {
        item[io][fieldName] /= max;
    });

    return arr;

}

function brainTrainingAndSave(data)
{
    net.train(data);

    var output = JSON.stringify(net.toJSON());
    fs.writeFile("network.json", output, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}