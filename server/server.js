const express = require('express');
const path =  require('path');
const app = express();
const port = 3000;


const passport = require('../server/passport-config/passport');
  // console.log('This is our node env ', process.env.NODE_ENV);
  

if (process.env.NODE_ENV === "production") {
    // statically serve everything in the build folder on the route '/build'
    app.use("/build", express.static(path.join(__dirname, "../build")));
    // serve index.html on the route '/'
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../index.html"));
    });
  }

  app.use(passport.initialize()); // initialize user session
  app.use(passport.session()); // store user's info in a session



  app.get('/login/twitter', passport.authenticate('twitter')); // send request to twitter
  app.get('/login', (req, res)=>{
    console.log('loging in without oauth')
  })
  app.get('/logout', (req, res)=>{
    console.log('logout')
  })

  app.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), // get a response and direct to failure if it's a failure
  function(req, res) { res.redirect('/');  }); // otherwise the homepage

  
app.listen(3000);