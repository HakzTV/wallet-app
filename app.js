require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require("express-session") 
const {User } = require('./model')

// Invoking middleware
app.use(bodyParser.urlencoded({
    extended: true
}))

//   passport initialisation for aunth
app.use(passport.initialize())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
  }))
// Session initialization for session management
app.use(passport.session());

const routes = require('./api_routes/routes');
routes(app);
const port = process.env.PORT || 3000;

// Db url and options
const url = "mongodb://localhost:27017/walletDB";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
// DB connection

mongoose.connect(url, options).then(console.log("mongoose connection succesfull"))
// Create the strategy
passport.use(User.createStrategy());
// passport.use(new localStorage(
//     function(username, password, done){
//         if(err){return done(err)}
//         if(!user){return }
//     }
// ))
// Serializing the user
passport.serializeUser(function(user, done){
  done(null, user.id);
});

// deserializing the user
passport.deserializeUser(function(id, done){
  User.findByid(id, function(err, user){
      done(err, user)
  })
})

app.listen(port, ()=>{
    console.log(`Listening to port :${port}`)
})
