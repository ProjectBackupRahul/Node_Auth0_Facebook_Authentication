var express = require('express');
var passport = require ('passport');
var Strategy = require ('passport-facebook').Strategy;
 // @ passport Strategy
passport.use(new Strategy({
      clientID: "643942239430033",
      clientSecret: "15a868ca7f80f5281bb6a78dfd05610a",
      callbackURL : "http://localhost:3000/login/facebook/return"
},
  function (accessotken, refeshToken, profile, cb){
      return cb (null, profile);
  }
));

passport.serializeUser(function name(user, cb){
  cb (null,user);
})

passport.deserializeUser(function name(user, cb){
     cb (null,user);
})

//  Create express app 
var app = express();

//  Set view dir 

app.set ('views', __dirname + '/views');
//  Set up the app view engine
app.set("view engine", "ejs");

app.use (require('morgan')('combined')); //  Middleware for morgan

app .use (require('cookie-parser')());//  mIddleware for cookie parser

app.use(require('body-parser').urlencoded({extended: true})); //  Middleware for body parser
app.use(require('express-session')({secret: 'lco app', resave: true, saveUninitialized: true}));

// @Route ---- GET / 
// @desc ----  A route to home apge
// @Access ----- PUBLIC

 app.get("/",(req,res) =>{
        res.render("home", {user: req.user});
 });

// @Route ---- GET / Login
// @desc  ----  A route to login
// @Access ----- PUBLIC

app.get("/login",(req,res) =>{
    res.render("login");
});

// @Route ---- GET / Login/ Facebook
// @desc  ----  A route to facebook auth
// @Access ----- PUBLIC

app.get('/login/facebook',
  passport.authenticate('facebook'));

// @Route ---- GET / Login/ Facebook/callback
// @desc  ----  A route to facebook auth
// @Access ----- PUBLIC

  app.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// @Route ---- GET / profile
// @desc  ----  A route to profile of user
// @Access ----- PRIVATE 

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
 res.render("profile", {
        user: req.user});
})

 app.listen(3000, () => {
      console.log("Server is running at 3000")
 })
 
 