var greetings = require("./profanity.js");
/*
 * TypeError: object Bonjour has no 
 * method 'sayHelloInEnglish'
 */



greetings("sex", function (response) {
    // Here you have access to your variable
    console.log(response);
})