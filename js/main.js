'use strict';

var network;
$(document).ready(function() {

    var promise = new Promise((resolve, reject) => {

        $.getJSON("./nerual_network/network.json", function(json) {
            resolve(json);
        });


    });

    promise
        .then(
            responseNetwork => {
                network = responseNetwork;
                var carFormModel = new CarFormModel();
                var carFormView = new CarFormView({
                    model: carFormModel
                });

                return getResultNetwork({
                    time: 7,
                    weight: 1000
                }, network);
            }
        ).catch(function(error) {
            // регистрация прошла неудачно
            console.log('Generation network error:  ' + error);
        });


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/notConcate/serviceWorker.js').then(function(reg) {
            // регистрация сработала
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function(error) {
            // регистрация прошла неудачно
            console.log('Registration failed with ' + error);
        });
    };

});
