const fs = require("fs");
var input = fs.readFileSync("input.txt");
var instruction = [];
var pos = 0;
var depth = 0;
var lines = input.toString().split('\n');
lines.forEach(element => {
    instruction.push(element.split(' '))
});
instruction.forEach(element => {
    switch(element[0]){
        case("forward"):
            pos += parseInt(element[1]);
            break;

        case("down"):
            depth += parseInt(element[1]);
            break;
        
        case("up"):
            depth -= parseInt(element[1]);
            break;

        default:
            break;
    }
});
console.log(pos * depth);