const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Setup options for JWT Strategy

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const localOptions = {
    usernameField: 'email'
}

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({'email': email}, function(err, user) {
        if(err) 
            return done(err);
        if(!user)
            return done(null, false);
        
        //Compare password with user.password use Bcrypt decoding
        user.comparePasswords(password, function(err, isMatch) {
            if(err)
                return done(err);
            if(!isMatch)
                return done(null, false);
            else
                return done(null, user);
        })
    })
})


//Create a strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub, function(err, user) {
        if(err) 
            return done(err, false);
        if(user) 
            return done(null, user);
        else 
            return done(null, false);
    })
})


//Tell passport to use jwtStrategy
passport.use(jwtLogin);
passport.use(localLogin);