

Profanity rates and reviews text, to see if its suitable. Enter a word and it will simply return a value of true or false, depending on whether or not the word is classed as profanity. Based off googles profanity check.


## Install

```
$ npm install --save profanity
```

## Usage

```js
var profanity = require("./profanity.js");
var chalk = require('chalk');

    profanity("sex", function (response) {
        if (response === "false") {
            console.log(chalk.blue(response));
        } else {
            console.log(chalk.red(response));
        }
    });

```

## Team

[![Robert Gabriel](https://avatars2.githubusercontent.com/u/6218780?v=3&s=460)](http://www.projectbird.com) | 
---|---
[Robert Gabriel](http://www.projectbird.com)  |


## License

MIT © [Robert Gabriel](http://www.projectbird.com) 
