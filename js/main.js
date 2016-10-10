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
            response =>
            {
                return runNetwork(response);
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