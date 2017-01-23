var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');


var secret = require('./config/secret');
var User = require('./models/user');

var app = express();
//using a remoote mongoose database hosted by mlab, 'secret' is the remote mogoose connection path which is stored in a seperate file
mongoose.connect(secret.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to the database"); //if successful the terminal message will display
  }
});

//requring all the middlewear the express app will be using
app.use(express.static( __dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({ url: secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
})

app.engine('ejs', engine); //requring the view engine 'Embedded Javascript'
app.set('view engine', 'ejs'); //setting the view engine

//requring the main routes for the app from the routes folder
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
//using the routes files
app.use(mainRoutes);
app.use(userRoutes);

//setting the port to the port number specified in the secret.js file
app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log("Server is Running on Port " + secret.port);
});
