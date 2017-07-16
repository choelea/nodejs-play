let router = require('express').Router();


router.get('/', (req, res) => {
    let sess = req.session;
    console.log(JSON.stringify(sess));
    res.json(sess);
});


module.exports = router;
