'use strict';

var network;
$(document).ready(function ()
{

    var promise = new Promise((resolve, reject) =>
    {

        $.getJSON("./nerual_network/network.json", function (json)
        {
            resolve(json);
        });


    });

    promise
        .then(
            responseNetwork =>
            {
                network = responseNetwork;
                var carFormModel = new CarFormModel();
                var carFormView = new CarFormView({model: carFormModel});

                return  getResultNetwork({time:7, weight:1000}, network);
            }
        )
        .then(
            resultNetwork =>
            {
                console.log(resultNetwork);
                return resultNetwork;
            }
        )


});