var request = require("request");
var chalk = require('chalk');
var sanitizeHtml = require('sanitize-html');
var thesaurus = require("thesaurus");



var stdin = process.openStdin();
var wasThereList = [];
var thesaurusList = [];
var words = [];
var thesaurusCount = 0;
var wordsCount = 0;

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
			thesaures2();
			break;
		case "4":
			print();
			break;
		case "5":
			process.exit();
		default:
			printWelcome();
	}
});

function test() {
	makeCall();
	thesaures2();
	compareStatus();
}

function compareStatus() {
	for (var i = 0; i < thesaurusList.length; i++) {
		if (words.indexOf(thesaurusList[i]) > -1) {
			wasThereList.push(thesaurusList[i]);
		}
	}
	console.log('Is there');
	console.log(wasThereList);
	printWelcome();
}

function printWelcome() {
	console.log(chalk.blue.bold("Welcome to Robin text \n") +
		'1: Run Bench Test  \n2: Get html content \n3: thesaures \n4: print status \n5: close' + chalk.red(
			'!'));
}

function thesaures2() {
	var stdin = process.openStdin();
	console.log(chalk.blue.bold("Please Enter a word : "));
	stdin.addListener("data", function(d) {
		thesaurusList = thesaurus.find(d.toString().trim());
		thesaurusCount = thesaurusList.length;
	});
	printWelcome();
}

function print() {
	console.log(" Words on Website:\n" + words + "\nThesaurus Words:" + thesaurusList +
		"\n Amount of Words:" + wordsCount + "\nThesaurus count:" + thesaurusCount);
	printWelcome();
}

function makeCall() {
	request({
		uri: "http://www.reddit.com",
	}, function(error, response, body) {
		var removeJavascript = sanitizeHtml(body);
		var test = removeJavascript.replace(/<(?:.|\n)*?>/gm, '');
		var removespacing = test.replace(/\s\s+/g, ' ');
		words = removespacing.split(" ");
		wordsCount = words.length;
	});
	printWelcome();
}