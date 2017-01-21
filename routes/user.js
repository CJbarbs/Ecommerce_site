var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');

//User routes for loggin in
router.get('/login', function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('accounts/login', { message: req.flash('loginMessage')});
});
//passing in the login information with passport autenticate to login the user
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile', function(req, res) {
  res.json(req.user);
});

//signup redirection
router.get('/signup', function(req, res, next) {
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});
//taking the user input for signing up a new user
router.post('/signup', function(req, res, next) {
  var user = new User(); //creating  a new variable for a user

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  //checking if user already exists before signing up, checking the email of the new user against the database
  User.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', 'Account with that email address already eists');
        //redirect to signup page if new user email already exists
        return res.redirect('/signup');
      } else { //saving the new user
        user.save(function(err, user) {
          if (err) return next(err);
          //if user save is successful redirect to the home route path
          return res.redirect('/');

        });
      }
  });
});

  module.exports = router;
