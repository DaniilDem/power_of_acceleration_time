

function getResultNetwork(input, networkJSON)
{
    //BEGIN preparation

    var maxValueObj = networkJSON.maxValueObj;
    var net = new brain.NeuralNetwork().fromJSON(networkJSON);
    net.fromJSON(networkJSON);

    //END preparation

    //BEGIN normalize input
    for (var key in input) {
        if (input.hasOwnProperty(key))
        {
            input[key] /= maxValueObj[key];
        }
    }
    //END normalize input
    var resultNetwork = net.run(input);
    //BEGIN normalize output
    for (key in resultNetwork) {
        if (resultNetwork.hasOwnProperty(key))
        {
            resultNetwork[key] *= maxValueObj[key];
        }
    }
    //END normalize output
    return resultNetwork;

}