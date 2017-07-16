'use strict';

const router = require('express').Router();
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const im = require('imagemagick');
const zipFolder = require('zip-folder');
const upload = multer({ dest: 'uploads/tmp', limits: { fields: 10, fileSize: '20MB', files: 20 } })

router.get('/', (req, res) => {
    res.render('images/uploader', {
        title: 'Compress Images',
        myCSSs: ['images.css'],
        myJSs: ['images-uploader.js']
    });
});

router.get('/zip/:uuid', (req, res) => {
    let images = [];
    const uuid = req.params.uuid;
    const dir = 'uploads/' + uuid;
    let returnJson = {};
    zipFolder(dir, 'uploads/' + uuid + ".zip", function (err) {
        if (err) {
           throw err
        } 
    });
    res.json({ 'success': true,'url':'/uploads/'+uuid+".zip" });
});

router.get('/:uuid', (req, res) => {
    var images = [];
    const uuid = req.params.uuid;
    const dir = 'uploads/' + uuid;
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(err);
            throw error;
        }
        files.forEach(file => {
            images.push('/uploads/' + uuid + '/' + file);
        });
    });
    res.render('images/compressed-result', {
        title: 'Compressed Images',
        uuid: uuid,
        images: images
    });
});

/** upload images: 1, upload to uploads/tmp */
router.post('/upload', upload.array('images'), function (req, res, next) {
    let uuid = uuidv1();
    let targetFolder = 'uploads/' + uuid;
    fs.mkdir(targetFolder, (error) => { if (error) throw error });
    req.files.forEach(function (file) {
        fs.rename(file.path, targetFolder + "/" + file.originalname, (error) => { if (error) throw error });
        // im.convert([file.path, '-quality', 0.8, 'uploads/'+uuid+"/"+file.originalname],
        //     function (err, stdout) {
        //         if (err) throw err;
        //     });
    }, this);
    res.json({ 'relativePath': uuid });
})
module.exports = router;
