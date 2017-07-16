'use strict';

const router = require('express').Router();
const passport = require('passport');
const auth = require('./../config/auth')
const fail = {
  failureRedirect: '/login'
};

router.get('/login', (req, res) => {
    let errors = req.flash('error');
    res.render('login', { 'errors': errors })
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), signin);
router.get('/auth/linkedin',
    passport.authenticate('linkedin', {
        failureRedirect: '/login',
        scope: [
            'r_emailaddress'
        ]
    }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', fail), signin);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/session-demo');
});
router.get('/me', auth.requiresLogin, (req, res) => {
    res.json({ 'user': req.user });
});

function signin(req, res) {
    const redirectTo = req.session.returnTo ? req.session.returnTo : '/session-demo';
    delete req.session.returnTo;
    res.redirect(redirectTo);
}
module.exports = router;
