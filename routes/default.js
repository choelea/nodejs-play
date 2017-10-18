let router  = require('express').Router();


router.get('/', (req, res) => {
    res.render('default', {
        title: 'LEAN'
    });
});

router.get('/websocket', (req, res) => {
    res.render('websocket', {
        title: 'LEAN'
    });
});

module.exports = router;
