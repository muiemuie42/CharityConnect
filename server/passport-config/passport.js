//require passport
const passport = require('passport');

//require passport-twitter 
const TwitterStrategy =  require('passport-twitter');

//passport strategy
passport.use(new TwitterStrategy({
    consumerKey: 'kVTtmFqEDQSLqXIXiS7hfjyiW',
    consumerSecret: '0l2ENJL3nN3ILRNktG19V8FeBtwMA41SaR4gGjnAlvlVPYKs7P',
    callbackURL: "http://localhost:3000/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
      return cb(null, profile);
  })
);

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  

//export passport
module.exports = passport;