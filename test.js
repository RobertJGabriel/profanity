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

printWelcome();


stdin.addListener("data", function(d) {
	switch (d.toString().trim()) {
        case "1":
			tests();
			break;
		case "2":
			makeCall("http://sexetc.org/");
			break;
		case "3":
			thesaures2("sex");
			break;
		case "4":
			compareStatus();
			break;
		case "5":
			process.exit();
		case "6":
			badWord("sex");
		default:
			printWelcome();
	}
});


function tests(){

// an example using an object instead of an array
async.parallel({
    one: function(callback){
        setTimeout(function(){
            callback(null, "ss");
      
        }, 200);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null, "ss");
             	makeCall("http://sexetc.org/");
        }, 3600);
    }
    ,
   three: function(callback){
        setTimeout(function(){
            callback(null, "ss");
          thesaures2("sex");
        }, 4500);
    },
    
       four: function(callback){
        setTimeout(function(){
            callback(null, "ss");
          compareStatus();
        }, 6600);
    }
    
},
function(err, results) {
 setTimeout(function(){
        print();
        }, 7600);
});
}

function compareStatus() {
	for (var i = 0; i < words.length; i++) {
		console.log(chalk.green.bold(words[i]) + "\n" );
            badWord(words[i]);
    }
	print();


}

function printWelcome() {
	console.log(chalk.blue.bold("Welcome to Robin text \n") +
		'1: Run Bench Test  \n2: Get html content \n3: thesaures \n4: Compare \n5: close' + chalk.red(
			'!'));
}

function thesaures2(word) {
	console.log("thesaures \n");
	thesaurusList = thesaurus.find(word);
}

function print() {
	console.log(" Words on Website:\n" + words + "\nThesaurus Words:" + thesaurusList +
		"\n Amount of Words:" + words.length + "\nThesaurus count:" + thesaurusList.length + "\nBad word : \n " +
		wasThereList);
}

function badWord(word) {
	request({
		uri: "http://www.wdyl.com/profanity?q=" + encodeURI(word),
          async:   false,
	}, function(error, response, body) {
		obj = JSON.parse(body);

		if (obj.response === "true") {

            wasThereList.push(word);
	       console.log(chalk.red(word));
		
		}
	});
}

function makeCall(urls) {
	console.log("Made call \n");
	request({
		uri: urls,
	}, function(error, response, body) {
		var removeJavascript = sanitizeHtml(body);
		var test = removeJavascript.replace(/<(?:.|\n)*?>/gm, '');
		var removespacing = test.replace(/\s\s+/g, ' ');
		    words = removespacing.split(" ");
		  
		console.log(words);

	});
}