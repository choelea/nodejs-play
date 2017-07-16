'use strict';

/*!
 * Module dependencies.
 */

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
/**
 * Expose
 */

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => user);

// use these strategies
passport.use('local',new LocalStrategy(
    function (username, password, done) {
        console.log(`Trying to verify user, username:${username} password:${password}`)
        if (username != 'joe' || password != 'password') {
            console.log(`Failed to verify user, username:${username} password:${password}`)
            return done(null, false, { message: 'Invalid username or password' });
        }
        return done(null, { "username": username, "password": password },{message:'Successfully authenticated!'});
    }
));
module.exports = passport;
