/**
 * Created by Daniil on 05.09.2016.
 */
var Human = function (name) {
    this.name = name;
};

var Monkey = function ()
{
    this.bipedalism = false;
}

var monkey = new Monkey();

Human.prototype = monkey;

var vasya = new Human('Вася');

console.log(vasya);
console.log(vasya.bipedalism);