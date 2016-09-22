'use strict';

function runNetwork(network)
{
    var net = new brain.NeuralNetwork().fromJSON(network);
    net.fromJSON(network);

    console.log(net.run({time:5}));
}

$(document).ready(function()
{

    let promise = new Promise((resolve, reject) =>
    {

        $.getJSON("./nerual_network/network.json", function (json)
        {
            resolve(json);
        });


    });

    promise
        .then(
            response =>
            {
                console.log(response);
                return response;
            }
        )
        .then(runNetwork);




});