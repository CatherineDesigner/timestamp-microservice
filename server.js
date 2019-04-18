// server.js
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:dateVal',function(req,res,next){
  var dateVal = req.params.dateVal;

    //formatter for date
  var dateFormattingOption={
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  var unixDate = null;
  var naturalDate = null;

  if(isNaN(dateVal)){
    naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString("en-us",dateFormattingOption);
   unixDate = new Date(dateVal).getTime()/1000;
  }else{
     unixDate = Number(dateVal);
     naturalDate = new Date(dateVal*1000);
    naturalDate = naturalDate.toLocaleDateString("en-us",dateFormattingOption);
  }

  if(naturalDate==="Invalid Date"){//detect bad natural date
  naturalDate = null;
  }

  res.json({unix: unixDate, natural: naturalDate});
})


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
