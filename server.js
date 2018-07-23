const request = require('request');

request('http://example.org', function (error, response, html) {
  if (error) {
    throw Error(error);
  }

  console.log(html);
});