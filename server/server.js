// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

/*
require('./models/Contributor');
require('./models/Contribution');
require('./models/Purchase');
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
 
  next();
};

app.use(allowCrossDomain);

var routes = require('./routes/routes');

app.use('/teste/',routes);

var port = process.env.PORT || 3000;        // set our port



// START THE SERVER
// =============================================================================
app.listen(port);

module.exports = app;
console.log('Magic happens on port ' + port);