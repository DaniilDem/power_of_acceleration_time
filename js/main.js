'use strict';

function brain(network)
{
    var net = new brain.NeuralNetwork().fromJSON(network);
    net.fromJSON(network);
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
                let network = JSON.parse(response);
                return network;
            }
        )
        .then(brain);




});