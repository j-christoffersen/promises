/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var readline = require('readline');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  var stream = fs.createReadStream(filePath);
  
  stream.on('error', err => {
    callback(err);
  });
  
  var rl = readline.createInterface({
    input: stream,
    crlfDelay: 100
  });
  
  var theLine;
  rl.on('error', err => {
    callback(err);
  }).on('line', (line) => {
    theLine = line;
    rl.pause();
    rl.close();
  }).on('close', () => {
    callback(null, theLine);
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (error, response, body) => {
    var statusCode;
    if (response) {
      statusCode = response.statusCode;
    }
    callback(error, statusCode);
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
