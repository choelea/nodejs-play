const passport = require('passport')
const auth = require('./config/auth')

function create(app) {
    app.use('/', require('./routes/default'));
    app.use('/images', require('./routes/images'));
    app.use('/session-demo', require('./routes/session-demo'));

    app.get('/login', (req, res) => {
        let errors = req.flash('error');
        res.render('login', { 'errors': errors })
    });

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }), (req, res) => {
            const redirectTo = req.session.returnTo? req.session.returnTo: '/session-demo';
            delete req.session.returnTo;
            res.redirect(redirectTo);
        });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/session-demo');
    });
    app.get('/me', auth.requiresLogin, (req, res) => {
        console.log(`current user is ${req.user}`)
        res.json({ 'user': req.user });
    });

    app.use((req, res, next) => {
        res.status(404);
        res.render('404', { title: '404', message: 'This page does not exist.' });
    });
}


module.exports = {
    create: create
};
