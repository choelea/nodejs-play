

function create(app) {
    app.use('/',         require('./routes/default'));
    app.use('/images',    require('./routes/images'));
    app.use('/session-demo',    require('./routes/session-demo'));

    app.use((req, res, next) => {
        res.status(404);
        res.render('404', { title: '404', message: 'This page does not exist.' });
    });
}


module.exports = {
    create: create
};
