const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const path = process.argv[3];

if (process.argv.length !== 4) {
  console.error('Please input a URL and a path (local file path) to use this module. Example: node fetcher.js <URL> <path>')
}

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  fs.writeFile(path, body, (err) => {
    if (err) {
      console.error(`Error: ${err}`);
      process.exit(1);
    }

    const size = Buffer.byteLength(body, 'utf8');
    console.log(`Downloaded and saved ${size} bytes to ${path}.`)
  })
});