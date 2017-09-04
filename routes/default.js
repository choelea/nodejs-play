'use strict';

const router = require('express').Router();
const recaptcha = require('express-recaptcha');

router.get('/', (req, res) => {
    res.render('home');
});

router.post('/demo/form', recaptcha.middleware.verify, function(req, res){
    console.log(req.recaptcha);
});

module.exports = router;
