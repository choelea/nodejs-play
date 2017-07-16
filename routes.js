const passport = require('passport')

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
            successRedirect: '/session-demo',
            failureRedirect: '/login',
            failureFlash: true
        }));
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/session-demo');
    });
    app.get('/me', (req, res) => {
        console.log(`current user is ${req.user}`)
        res.json({'user':req.user});
    });

    app.use((req, res, next) => {
        res.status(404);
        res.render('404', { title: '404', message: 'This page does not exist.' });
    });
}


module.exports = {
    create: create
};
