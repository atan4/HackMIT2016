var express = require("express");
const request = require("request");
const url = require('url');


var app= express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var path = require('path');

var port = process.env.PORT || 8080;








app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/test.html'));
});


app.post('/search', function(req, res) {
    console.log("we got in here");
    var origin = req.body.origin;
    // var token = req.body.token;
    // var geo = req.body.geo;


    var stringUrl = "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=5YWwBosqHNjidlDUp7NCvpkQPGublTB3&origin=BOS&departure_date=2016-09-30--2016-12-31&one-way=false&duration=1--15&direct=false&max_price=4000&aggregation_mode=COUNTRY";
    var options = {
      uri : stringUrl,
      json : true
    }

    console.log(options)

    request.get(options, function(error, response, body){
    if(error){
       console.log(error);
     }
    
    else {
      console.log(body);
      res.send(JSON.stringify(body));
    }
  });


    
});


app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});


//http.request(options, function(res)


// {
//     console.log('STATUS: ' + res.statusCode);
//     console.log('HEADERS: ' + JSON.stringify(res.headers));
//     res.setEncoding('utf8');

//     //
//     // On each chunk
//     //
//     res.on('data', function (chunk)
//     {
//         req.write(chunk);
//         console.log('\n\n===========CHUNK===============')
//         console.log(chunk);
//     });

//     //
//     // On End
//     //
//     res.on('end', function(res)
//     {
//         console.log('\n\n=========RESPONSE END===============');
//     });
// });

// //
// // On Error

// req.on('error', function(e)
// {
//     console.log('\n\n==========ERROR==============')
//     console.log('problem with request: ' + e.message);
// });

// // write data to request body
// console.log('\n\n=========REQUEST END===============');
// req.end();
