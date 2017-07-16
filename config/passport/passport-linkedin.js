'use strict';

/**
 * Module dependencies.
 */

const LinkedinStrategy = require('passport-linkedin').Strategy;

/**
 * Expose
 */

module.exports = new LinkedinStrategy({
  consumerKey: '77famehzl620nk',
  consumerSecret: 'VA1CLw19tTfImIgc',
  callbackURL: 'http://localhost:3000/auth/linkedin/callback',
  profileFields: ['id', 'first-name', 'last-name', 'email-address']
},
  function (accessToken, refreshToken, profile, done) {
    const options = {
      criteria: { 'linkedin.id': profile.id }
    };
    console.log('Linked in profile is: '+JSON.stringify(profile));
    let user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      username: profile.emails[0].value,
      provider: 'linkedin',
      linkedin: profile._json
    };
    // logic to update/save third user
    return done(null, user);
  }
);
