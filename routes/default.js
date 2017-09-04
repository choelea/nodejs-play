'use strict';

let router = require('express').Router();


router.get('/', (req, res) => {
    res.render('home');
});

app.post('/demo/form', recaptcha.middleware.verify, function(req, res){
    console.log(req.recaptcha);
});

module.exports = router;
