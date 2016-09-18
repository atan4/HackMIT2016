var express = require("express");
var http = require('http');


var app= express();
var bodyParser = require('body-parser')
var path = require('path');

var port = process.env.PORT || 8080;



var url = "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=5YWwBosqHNjidlDUp7NCvpkQPGublTB3&origin=BOS&departure_date=2016-09-30--2016-12-31&one-way=false&duration=1--15&direct=false&max_price=4000&aggregation_mode=COUNTRY";

var req = http.request(url, function(res)
{
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');

    //
    // On each chunk
    //
    res.on('result', function (chunk)
    {
        req.write(chunk);
        console.log('\n\n===========CHUNK===============')
        console.log(chunk);
    });

    //
    // On End
    //
    res.on('end', function(res)
    {
        console.log('\n\n=========RESPONSE END===============');
    });
});

//
// On Error

req.on('error', function(e)
{
    console.log('\n\n==========ERROR==============')
    console.log('problem with request: ' + e.message);
});

// write data to request body
console.log('\n\n=========REQUEST END===============');
req.end();

// var req = http.get(url, (res) => {
//   console.log(`Got response: ${res.statusCode}` + " " + res.result);
//   // consume response body
//   res.resume();
// }).on('error', (e) => {
//   console.log(`Got error: ${e.message}`);
// });


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

// app.get('/', function(req, res) {
//   res.render("index.html");

// });

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});