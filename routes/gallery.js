const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const sequelize = require('sequelize');
const fs = require('fs-extra');
const mime = require('mime');


const models  = require(path.join(__dirname, '/../' ,'models'));
const Gallery = models.Gallery;


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let path = `./public/images/gallery`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: function(req, file, cb){
        cb(null, req.body.name + '.' + mime.extension(file.mimetype));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //accept a file
        cb(null, true);
    }else{
        //reject a file
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});


router.post('/uploadGallery', upload.single('galleryImage'), function(req, res, next){
    let record = {
        title: req.body.name,
        image: req.file.path
    };
    Gallery.create(record).then(function(){
        res.end(JSON.stringify({msg: 'Gallery Form submitted successfully!' }));
    }).catch(function(err){
        res.end(JSON.stringify({msg: `Error : ${err['errors'][0]['message']}`}));
    });
});

module.exports = router;