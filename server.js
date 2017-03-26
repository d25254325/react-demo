var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

//file include CONST variable
var config = require('./config');

// define routes
var routes = require('./app/routes/api');

var port = process.env.PORT || 3000;
mongoose.connect(config.database);

// trigger app express js
var app = express();

//set global variable
app.set('superSecret',config.secret);

// middleware bodyparser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// route app 
routes(app);

app.listen(port);
console.log('enjoy at http://localhost:' + port);
