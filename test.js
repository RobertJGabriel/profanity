var request = require("request");
var chalk = require('chalk');
var sanitizeHtml = require('sanitize-html');
var thesaurus = require("thesaurus");
var stdin = process.openStdin();

printWelcome();

stdin.addListener("data", function(d) {
	switch (d.toString().trim()) {
		case "1":
			test();
			break;
		case "2":
			makeCall();
			break;
		case "3":
			thesaures();
			break;
		default:
			printWelcome();
	}
});

function test() {
	if (['a', 'b', 'c'].indexOf(str) >= 0) {
		//do something
	}
}

function printWelcome() {
	console.log(chalk.blue.bold("Welcome to Robin text \n") +
		'1: Run Bench Test  \n2: Get html content \n3: thesaures' + chalk.red('!'));
}

function thesaures() {
	var stdin = process.openStdin();
	console.log(chalk.blue.bold("Please Enter a word : "));
	stdin.addListener("data", function(d) {
        
		var thesaurusList = thesaurus.find(d.toString().trim());
		console.log("Amount of Words : " + chalk.green(thesaurusList.length));
	
    });
}

function makeCall() {
	request({
		uri: "http://reddit.com",
	}, function(error, response, body) {
		var removeJavascript = sanitizeHtml(body);
		var test = removeJavascript.replace(/<(?:.|\n)*?>/gm, '');
		var removespacing = test.replace(/\s\s+/g, ' ');
		var words = removespacing.split(" ");
		console.log(chalk.green("Words"));
		console.log(words);
		console.log("Amount of Words : " + chalk.green(words.length));
	});
}