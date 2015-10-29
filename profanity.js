var request = require("request");
var chalk = require('chalk');
var sanitizeHtml = require('sanitize-html');
var thesaurus = require("thesaurus");
var util = require('util');
var async = require('async');
var stdin = process.openStdin();

var wasThereList = [];
var thesaurusList = [];
var words = [];
var percent = 0;

printWelcome();


stdin.addListener("data", function(d) {
	switch (d.toString().trim()) {
		case "1":
			tests();
			break;
		case "2":
			makeCall("http://sexetc.org/");
            print();
			break;
		case "3":
			setThesaures("sex");
            print();
			break;
		case "4":
			compareStatus();
			break;
		case "5":
			process.exit();
		default:
			printWelcome();
	}
});

function tests() {
	async.parallel({
		one: function(callback) {
			setTimeout(function() {
				callback(null, "ss");
			}, 1000);
		},
		two: function(callback) {
			setTimeout(function() {
				callback(null, "ss");
				makeCall("http://xhamster.com/");
			}, 2000);
		},
		three: function(callback) {
			setTimeout(function() {
				callback(null, "ss");
				setThesaures("sex");
			}, 3000);
		},
		four: function(callback) {
			setTimeout(function() {
				callback(null, "ss");
				compareStatus();
			}, 4000);
		}
	}, function(err, results) {
		setTimeout(function() {
			print();
		}, 5000);
	});
}

function compareStatus() {
	for (var i = 0; i < words.length; i++) {
		badWord(words[i]);
	}
}

function printWelcome() {
	console.log(chalk.blue.bold("Welcome to Robin text \n") +
		'1: Run Bench Test  \n2: Get html content \n3: thesaures \n4: Compare \n5: close' + chalk.red(
			'!'));
}

function setThesaures(word) {
	thesaurusList = thesaurus.find(word);
}

function print() {
    console.log(chalk.underline.red("Words on Website") + "\n");
    console.log(words + "\n \n");
    
    console.log(chalk.underline.green("Thesaurus Words") + "\n");
    console.log(thesaurusList + "\n \n");
    
    console.log(chalk.underline.green("Banned Words") + "\n");
    console.log(wasThereList + "\n \n");
    
    console.log(chalk.underline.green("Amount of Words : ") + chalk.red(words.length) + "\n");
    console.log(chalk.underline.green("Thesaurus Count : ") + chalk.red(thesaurusList.length) + "\n");
    console.log(chalk.underline.green("Banned Count : ") + chalk.red(wasThereList.length) + "\n");
    percent = (100 / words.length) *  wasThereList.length;
    console.log(percent);
    
}

function badWord(word) {
	request({
		uri: "http://www.wdyl.com/profanity?q=" + encodeURI(word),
		async: false,
	}, function(error, response, body) {
		obj = JSON.parse(body);
		if (obj.response === "true") {
			wasThereList.push(word.toLowerCase());
		}
	});

}

function makeCall(urls) {
	request({
		uri: urls,
	}, function(error, response, body) {
		var removeJavascript = sanitizeHtml(body);
		var test = removeJavascript.replace(/<(?:.|\n)*?>/gm, '');
		var removespacing = test.replace(/\s\s+/g, ' ');
		words = removespacing.split(" ");
	});
}

