//MODULES
var express 	= require('express');
var app 		= express();
var morgan		= require('morgan');
var bodyParser 	= require('body-parser');
var mongoose   	= require('mongoose');
var passport 	= require('passport');

var port 		= process.env.PORT || 8080;

var User = require('./models/userModel');
var Event = require('./models/eventModel');

var routeUsers = require('./routes/userRoute.js');
var routeEvents = require('./routes/eventRoute.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize())

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Rest_user:restapi25@ds159737.mlab.com:59737/restapi');

var router = express.Router();
router.use(function(req,res,next){
	console.log('Req');
	next();
});

app.use('/', express.static(__dirname));
app.get('/', function(req, res) {
  res.send("Witam na stronie Mariana i Kamila");
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/apirest', routeEvents);
app.use('/apirest', routeUsers);

app.listen(port);
console.log("server running on port " + port);