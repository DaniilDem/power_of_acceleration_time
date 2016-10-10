'use strict';


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
            response =>
            {
                console.log(response);
                return response;
            }
        )
        .then(
            responseNetwork =>
            {
                return  getResultNetwork({time:7, weight:1000}, responseNetwork);
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