//fetcher.js added

/*
It should take two command line arguments:
    a URL
    a local file path
    It should download the resource at the URL to the local path on your machine.
    Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.
 */

const request = require('request');
const fs = require('fs');

const args = process.argv;
const inputUrl = args[2];
const saveLocation = args[3];  //takes in our two values from cmd and stores them

const fetcher = function(url, localPath) {
  console.log(`We recieved`, url,`and saving it to`, localPath);

  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the body

    //takes our body and writes it to a new file asynchronously
     fs.writeFile('./testFile.txt', body, err => {
      if (err) {
        console.error(`issue writing content`, err);
      } else {
       console.log(`file written successfully`);
      }
    });

  });



  
};

/* node fetcher.js https://www.example.edu ./localFolder/siteContent.txt */
fetcher(inputUrl, saveLocation);