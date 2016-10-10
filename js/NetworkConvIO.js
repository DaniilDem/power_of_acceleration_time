/**
 * Created by Daniil on 10.10.2016.
 */
function runNetwork(network)
{
    var maxValueObj = network.maxValueObj;
    var net = new brain.NeuralNetwork().fromJSON(network);
    net.fromJSON(network);


    return getResultNetwork({time:7}, maxValueObj, net);

}

function getResultNetwork(input, maxValueObj, net)
{
    //BEGIN normalize input
    for (var key in input) {
        input[key] /= maxValueObj[key];
    }
    //END normalize input
    var resultNetwork = net.run(input);
    //BEGIN normalize output
    for (key in resultNetwork) {
        resultNetwork[key] *= maxValueObj[key];
    }
    //END normalize output
    return resultNetwork;

}