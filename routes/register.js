/*
 require packages
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var models  = require(path.join(__dirname, '/../' ,'models'));
var Facilities = models.Facilities;

router.post('/applyForFacilities', function(req,res,next) {
	var record = {
		name: req.body.name,
		roll: req.body.roll,
		department: req.body.department,
		contactNumber: req.body.contactNumber,
		emailID: req.body.emailID,
		purpose: req.body.purpose,
		duration: req.body.duration,
		heavyMachinery: req.body.heavyMachinery,
		approved: "No",
		mailSent: "No"
	};
	Facilities.sync({ force: false }).then(function() {
        return Facilities.create(record);
        console.log('Record inserted succesfully into Facilities table');
    }).catch(function(err) {
    	console.log(err);
    });
});

router.post('/applyForProjects', function(req, res, next) {
	var record = {
		name: req.body.name,
		rollNo: req.body.rollNo,
		department: req.body.dept,
		contactNumber: req.body.contact,
		emailID: req.body.email,
		abstract: req.body.abstract,
		budget: req.body.budget,
		timeline: req.body.timeline
	};
	console.log(record);
});


module.exports = router;