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
const Resources = models.Resources;


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let type = req.body.type;
        type = type.toLowerCase();
        let path = `./public/images/tools/${type}`;
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


router.post('/uploadResource', upload.single('resourceImage'), function(req, res, next){
    let record = {
        resourceName: req.body.name,
        resourceType: req.body.type,
        resourceImage: req.file.path
    };
    Resources.create(record).then(function(){
        res.end(JSON.stringify({msg: 'Resource Form submitted successfully!' }));
    }).catch(function(err){
        res.end(JSON.stringify({msg: `Error : ${err}`}));
    });
});

module.exports = router;