const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs-extra');
const mime = require('mime');


var models  = require(path.join(__dirname, '/../' ,'models'));
var AnnualReports = models.AnnualReports

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let path = `./public/annual_reports/`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: function(req, file, cb){
        cb(null, req.body.fileName + '.' + mime.extension(file.mimetype));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
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
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter
});

router.post('/uploadAnnualReport', upload.single('reportFile'), (req, res, next) => {
    let record = {
        fileName: req.body.fileName,
        year: req.body.reportYear,
        fileLocation: req.file.path
    };
    console.log(req.file);
    AnnualReports.create(record).then(function(){
        res.send(JSON.stringify({msg: "Annual Reports Form submitted succesfully"}));
    }).catch(function(err){
        res.send(JSON.stringify({msg: 'Some error has occurred'}));
    });
});

module.exports = router;