//express
var express = require('express');
var app = express();
var request = require('request');
//body-parser
var bodyParser = require('body-parser');

var cors = require('cors');
var path = require('path');

//mongoose data base
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//set port
var port = process.env.PORT || 3000;

//to cleat screen
var clear = require('clear');

//set up an empty chart sturcture
var dataToSendObject = {
  data: {
    template: {},
    options: {
      title: {
        text: ""
      },
      series: [{}]
    }
  }
};
var chartID; //Chart id returned from Highchart cloud
var teamID = 10000264; //HCCloud team id
var APIKey = 'f297d76ee7a6451cb4c72b6f1f5ee75f'; //HCCloud API key
var DBlogin = 'mustapha',
  DBpwd = 'letMeIn2018'; // Mongodb's username and password
var DBLink = '@ds247077.mlab.com:47077/hcclouddb'; //Mongodb database link
var msgCodeOk = 200;

//           *** Start ***
clear(); //clear screen
console.log(' ***** Start session *** ');
console.log(' *****               *** ');

app.use(cors());

//to read data from the request
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.json({
  type: 'application/json'
}))
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

app.use('/', express.static(path.join(__dirname, 'public')));

//read from the dataBase
mongoose.connect('mongodb://' + DBlogin + ':' + DBpwd + DBLink);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});


var Schema = mongoose.Schema;
var chartSchema = new Schema({
  entity_id: String,
  title: Object,
  data: Array
});

var Chart = mongoose.model('Chart', chartSchema);



// **************************************************************************
//********* Communication App <=> myServer <=> HCCloud server ***************


//Read data from the data base

app.get('/readDataFromDB', function(reqUp, resUp) {
  Chart.find({}, function(err, data) { //res represents the data fetched from the db
    if (err) {
      return resUp.send({
        status: err
      });
    }
    console.log("Read from db: success");
    //Copy the title
    dataToSendObject.data.options.title.text = data[0].title;
    //Copy the data series
    dataToSendObject.data.options.series[0].data = data[0].data;

    //send status
    resUp.send({
      status: "Ok"
    });
  });

});


//create a chart on HCCloud
app.get('/sendToHCCloud', function(reqUp, resUp) {

  //Set up char
  var setChart = {

    url: 'https://cloud-api.highcharts.com/team/' + teamID + '/chart/',
    method: 'POST',
    headers: {
      'x-api-key': APIKey
    },
    json: true,
    body: dataToSendObject,
  };

  request(setChart, function(err, res, body) {

    if (!err && res.statusCode == msgCodeOk) {
      console.log("Create chart on Highcharts cloud:success");
      //save the chart id
      console.log("chart_id: " + body.chart_id);
      chartID = body.chart_id;
      resUp.send({
        status: res.statusMessage
      });

    } else {
      resUp.send({
        status: res.statusMessage
      });
    }
  });
});


//Duplicate chart
app.get('/dublicateChart', function(reqUp, resUp) {

  var setChart = {

    url: 'https://cloud-api.highcharts.com/team/' + teamID + '/chart/' + chartID + '/duplicate',
    method: 'POST',
    headers: {
      'x-api-key': APIKey
    },
    json: true,
  };

  request(setChart, function(err, res, body) {

    if (!err && res.statusCode == msgCodeOk) {
      console.log("Duplicate chart on Highcharts cloud:success");
      resUp.send({
        status: res.statusMessage
      });
    } else {
      console.log("error: " + err);
      console.log("res.statusCode: " + res.statusCode);
      resUp.send({
        status: res.statusMessage
      });
    }
  });
});


//Delete chart
app.get('/deleteChart', function(reqUp, resUp) {

  var setChart = {

    url: 'https://cloud-api.highcharts.com/team/' + teamID + '/chart/' + chartID,
    method: 'delete',
    headers: {
      'x-api-key': APIKey
    },
    json: true,
  };

  request(setChart, function(err, res, body) {

    if (!err && res.statusCode == msgCodeOk) {
      console.log("Delete chart on Highcharts cloud:success");
      resUp.send({
        status: res.statusMessage
      });
    } else {
      cresUp.send({
        status: res.statusMessage
      });
    }
  });

});

app.listen(port);
