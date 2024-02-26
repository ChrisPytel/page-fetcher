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
  console.log(`\nOur working URL is:`, url,`and we're saving it locally to:`, localPath);

  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    if (response.statusCode === 404){ 
      console.log(`page was not found`);
    }

    if (response.statusCode === 200){ 
      console.log(`All good, no errors present from server to client`);

      //takes our body and writes it to a new file asynchronously
      fs.writeFile(localPath, body, err => {
        if (err) console.error(`issue writing content`, err);
        else {
        console.log(`file written successfully and saved to ${localPath}.`);
        }
        //checks the size
        fs.stat(localPath, (err,stats)=>{
          if (err) console.log(`error occurred in checking file stats`, err);        
          else{
            // console.log(`heres our super cool file stats`, stats);
            console.log(`Our file has been sucessfully saved and takes up ${stats.size}bytes of memory.`);
          }  
        })
      });     
    }

  });



  
};

//run the following command
/* node fetcher.js https://www.example.edu ./testFile.txt */
fetcher(inputUrl, saveLocation);