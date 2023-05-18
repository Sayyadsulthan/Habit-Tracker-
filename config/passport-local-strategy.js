const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use( new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true

},  function(req, email, password, done){
    User.findOne({email: email})
    .then((user)=>{
        if(user && user.password == password){
        // req.flash('success', 'user logged in successfull..');
            return done(null, user);
        }
            req.flash('error','invalid email/ password');
            return done(null, false);
    })

    .catch((err)=>{
        req.flash("**err ", err);
        return done(err);
     })
}
));


passport.serializeUser(function(user, done){
    // console.log("serializeUser", user)
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    // console.log("serializeUser", id)
    User.findById(id)
    .then((user)=>{
        done(null, user)
    })
    .catch((err)=>console.log("**err in deserialize: ", err))
})

passport.checkAuthentication = function(req, res, next){
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