var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var rewardRoutes = require('./routes/reward');

mongoose.Promise = global.Promise;
var app = express();
var port =8080;
var connection  = mongoose.connect('mongodb://localhost:27017/app-2',  {useMongoClient: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



app.use('', rewardRoutes);

 app.listen(port, function() {
    console.log('hello server started at ' + port);
});

