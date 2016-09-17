var express = require("express");
var http = require('http');


var app= express();
var router = express.Router();
var path = __dirname + '/static/';

var port = process.env.PORT || 8080;

//app.set('port', (process.env.PORT || 8080));


/* http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=BOS&departure_date=2015-09-06--2015-09-26&duration=7--9&max_price=500&apikey=<your API key> */




var url = "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=5YWwBosqHNjidlDUp7NCvpkQPGublTB3&origin=BOS&departure_date=2016-09-30--2016-12-31&one-way=false&duration=1--15&direct=false&max_price=4000&aggregation_mode=COUNTRY HTTP/1.1";


var req = http.get(url, (res) => {
  console.log(`Got response: ${res.statusCode}`);
  // consume response body
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});


app.get('/', function(req, res) {
  res.render('index');

});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});