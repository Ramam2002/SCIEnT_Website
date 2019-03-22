const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const ejs = require('ejs');
const sequelize = require('sequelize');
const mime = require('mime');
const fs = require('fs-extra')



const models = require(path.join(__dirname, '/../', 'models'));
const AdminProjects = models.AdminProjects;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = `./public/images/adminProjects/`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //accept a file
        cb(null, true);
    } else {
        //reject a file
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    },
    fileFilter: fileFilter
});

router.post('/addAdminProjects', upload.single('projectImage'), function (req, res, next) {
    console.log(req.body);
    var filePath = req.file.path.split('/');
    var fileName = filePath.pop();
    var finalPath = '/images/adminProjects/' + fileName;
    AdminProjects.create({
        projectTitle: req.body.projectTitle,
        projectDesc: req.body.projectDesc,
        projectImage: finalPath
    }).then(function () {
        console.log(req.body);
        console.log('Details saved and image added to gallery');
        res.end(JSON.stringify({msg: 'Admin Projects Form submitted successfully!' }));
    }).catch(function(err){
        console.log(err);
        res.end(JSON.stringify({msg: 'Some error has occurred'}));
    })

});

//delete projects
router.post('/delProject',function(req,res,next){
    var id=req.body.id.slice(1);
    res.send(JSON.stringify({msg:"Successfully deleted the Project! "}));
    return AdminProjects.destroy({
        where:{
            id:id
        }
    });

});

module.exports = router;