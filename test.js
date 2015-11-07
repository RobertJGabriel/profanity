var profanity = require("./profanity.js");
var chalk = require('chalk');

/*
 * TypeError: object Bonjour has no 
 * method 'sayHelloInEnglish'
 */

var words = ["batman"]


// Fill it with numbers using a for-loop
for (var i = 0; i < words.length; i++) {

    runTest(words[i]);
};


function runTest(word) {

    profanity(word, function (response) {
        if (response === "false") {
            console.log(chalk.blue(response));
        } else {
            console.log(chalk.red(response));
        }
    });

}