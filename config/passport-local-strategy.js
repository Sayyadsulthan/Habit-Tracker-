const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use( new LocalStrategy({
    usernameField: 'email',

}, function(email, password, done){
    User.findOne({email: email})
    .then((user)=>{
        if(user.password == password){

            console.log("user found: ", user)
            
           return done(null, user);
        }
        return done(null, false);
    })

    .catch((err)=>{
        console.log("**err in passport local: ", err);
        return done(err);
     })
}
));


passport.serializeUser(function(user, done){
    console.log("serializeUser", user)
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    console.log("serializeUser", id)
    User.findById(id)
    .then((user)=>{
        done(null, user)
    })
    .catch((err)=>console.log("**err in deserialize: ", err))
})

passport.chekAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
       return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }

    next();
}

module.exports = passport;