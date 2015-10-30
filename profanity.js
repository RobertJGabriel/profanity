var request = require("request"); var chalk = require('chalk');
module.exports = function(word, callback) {
  request({
      uri: "http://www.wdyl.com/profanity?q=" + encodeURI(word),
      async: true,
  }, function(error, response, body) {
      if(error){
          callback(error);
          return;
      }
        if (typeof(callback) === 'function') {
  callback(null,obj.response);
          return;
}else{
    
    return "batman";
}
  });
}