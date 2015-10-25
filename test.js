var request = require("request");
const chalk = require('chalk');
var stdin = process.openStdin();
printWelcome();
stdin.addListener("data", function(d) {
	switch (d.toString().trim()) {
		case "1":
			day = "Sunday";
			break;
		case "2":
			makeCall();
			break;
		case "3":
			day = "Tuesday";
			break;
		default:
			printWelcome();
	}
});

function printWelcome() {
	console.log(chalk.blue("Welcome to Robin text \n") + '1: Run Bench Test  \n2: Get html content' + chalk
		.red('!'));
}

function makeCall() {
	request({
		uri: "http://www.projectbird.com",
	}, function(error, response, body) {
		//console.log(chalk.blue(body) + 'World' + chalk.red('!'));
		var removeCss = body.replace(/<style>.*?<\/style>/g, '');
		var removeLine = removeCss.replace(/::?[^ ,:.]+/g, '');
		var removeJavascript = removeCss.replace(/<script>.*?<\/script>/g, '');
		var test = removeJavascript.replace(/<(?:.|\n)*?>/gm, '');
		console.log(test);
	});
}