var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var email   = require("emailjs");
var emailDetails = require('../env.js');
var yourEmail = emailDetails.email;
var yourPwd = emailDetails.pwd;
var yourSmtp = emailDetails.smtp;
var server  = email.server.connect({
   user:    yourEmail, 
   password: yourPwd, 
   host:    yourSmtp, 
   ssl:     true
});

var models  = require(path.join(__dirname, '/../' ,'models'));
var Projects = models.Projects;
var Teams = models.Teams;
var Materials = models.Materials;
var Services = models.Services;

router.use(session({secret: 'ssshhhhh'}));
router.use(bodyParser.urlencoded({extended: false }));

router.post('/getProjectsDetails', function (req, res, next) {
	Projects.findOne({where: {id: req.body.projectId}})
	.then(function (projectsRecord) {
		Teams.findAll({where: {ProjectId: req.body.projectId}})
		.then(function (teamMembers) {
			Services.findAll({where: {ProjectId: req.body.projectId}})
			.then(function (services) {
				Materials.findAll({where: {ProjectId: req.body.projectId}})
				.then(function (materials) {
					data = {};
					data.project = projectsRecord;
					if (teamMembers.length > 0)
						data.teamMembers = teamMembers;
					if (services.length > 0)
						data.services = services;
					if (materials.length > 0)
						data.materials = materials; 
					res.send(JSON.stringify(data));
				});
			});
		});
	}).catch(function(err) {
		console.log(err);
	});
});

router.post('/approveForProjectsByL1', function(req, res, next) {
	Projects.update({
        approvedByL1: 'Yes' 
    }, {
        where: {id: req.body.projectId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have approved the project request corresponding to id '
    		+ req.body.projectId}));
    });
});

router.post('/approveForProjectsByL2', function(req, res, next) {
	Projects.update({
        approvedByL2: 'Yes' 
    }, {
        where: {id: req.body.projectId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have approved the project request corresponding to id '
    		+ req.body.projectId}));
    });
});

router.post('/removeForProjects', function(req, res, next) {
	Projects.destroy({where: {id: req.body.projectId}})
	.then(function(data) {
		res.send(JSON.stringify({msg: 'You have deleted the request corresponding to id ' + req.body.projectId}));
	});
});

router.post('/mailForProjects', function(req, res, next) {
	console.log('request received');
	var flag = 0;
	Projects.findAll({where: {approvedByL1: 'Yes', approvedByL2: 'Yes', mailSent: 'No'}})
	.then(function (rows) {
		rows.forEach(function (item) {
			var mailBody = 'Your request for your project' + item.projectTitle+ 'has been granted';
			// Email to be sent by admin
			var message = {
				text: mailBody,
				from: yourEmail,
				to: item.emailID,
				subject: "Granting request for scient lab projects",
				attachment:
					[
						
					]
			};


			server.send(message, function (err, message) {
				console.log(err);
				if (err!=null) {
					flag = 1;
				} 
				else {
					Projects.update({
        				mailSent: 'Yes' 
    				},{
    					where: {id: item.id}
					}).then(function() {
    				// res.send(JSON.stringify({msg: 'You have approved the facilties request corresponding to id '+ req.body.applicantId}));
					}).catch(function(err) {
						console.log(err);
					});
				}

			});

		});	
	});
	console.log("hello");
	if( flag == 0 ) {
		res.send(JSON.stringify({msg:'Mail sent successfully to all applicants'}));
	}
	else res.send(JSON.stringify({msg: 'All mails were not sent. Send again :('}));
});

module.exports = router;