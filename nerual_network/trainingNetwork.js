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

var carTxtDescription = {};

for (var i=1; i<=lengthData; i++)
{
    carTxtDescription.engine = objAuto[0].data[i][7];//magic rows and cols
    carTxtDescription.timeAndOther = objAuto[0].data[i][10];
    carTxtDescription.weightAndOther = objAuto[0].data[i][6];

    processingData(dataAuto, carTxtDescription);

    if (i==lengthData)//after all data processing
    {
        normalize(dataAuto, 'input', 'time');
        normalize(dataAuto, 'input', 'weight');
        normalize(dataAuto, 'output', 'hp');
        console.log(dataAuto);
        brainTrainingAndSave(dataAuto);
    }

}

function processingData(dataAuto, carTxtDescription)
{
    var $ = cheerio.load(carTxtDescription.engine);
    let textHP = $('table > tr:nth-last-child(3) > td:nth-child(2)').text();//magic selector
    let intHP = parseInt(textHP);
    //-----
    $ = cheerio.load(carTxtDescription.timeAndOther);
    let textTime = $('table > tr:nth-last-child(3) > td:nth-child(2)').text();//magic selector
    let floatTime = parseFloat(textTime);
    //-----
    $ = cheerio.load(carTxtDescription.weightAndOther);
    let textWeight = $('table > tr:nth-last-child(3) > td:nth-child(2)').text();//magic selector
    let floatWeight = parseFloat(textWeight);
    //-----
    if (floatTime<20 && floatTime>0 &&  intHP<1000 && floatWeight>0 && floatWeight<10000)//filter //TODO: edit this bullshit code
    {
        collectData(
            {
                input:{time:floatTime, weight: floatWeight}, output:{hp:intHP}
            }
        );

    }
}

function collectData(dat)
{
    dataAuto.push( dat );
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

    var writingData = net.toJSON();
        writingData.maxValueObj = maxValueObj;

    var output = JSON.stringify(writingData);
    fs.writeFile("network.json", output, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}