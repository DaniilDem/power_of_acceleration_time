"use strict";

var xlsx = require('node-xlsx');
var cheerio = require('cheerio')

var objAuto = xlsx.parse('testdb.csv.xlsx'); // parses a file

function processingData(engine, timeAndOther)
{
    var $ = cheerio.load(engine);
    let textHP = $('table > tr:nth-last-child(3) > td').text();

    textHP = textHP.split(')',2)[1];

    console.log(textHP);
}

for (var i=1; i<10; i++)
{
    let engine = objAuto[0].data[i][7];
    let timeAndOther = objAuto[0].data[i][10];

    processingData(engine, timeAndOther)

}
// var obj = xlsx.parse(fs.readFileSync(__dirname + '/myFile.xlsx')); // parses a buffer