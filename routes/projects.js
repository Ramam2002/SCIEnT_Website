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
var RemarksByLevelOne = models.RemarksByLevelOne;
var RemarksByLevelTwo = models.RemarksByLevelTwo;

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
					RemarksByLevelOne.findAll({ where: {ProjectId: req.body.projectId}})
					.then(function (remarksByLevelOne) {
						RemarksByLevelTwo.findAll({ where: {ProjectId: req.body.projectId}})
						.then(function (remarksByLevelTwo) {
							// console.log(remarksByLevelOne[0].remark);
							data = {};
							data.project = projectsRecord;
							if (teamMembers.length > 0)
								data.teamMembers = teamMembers;
							if (services.length > 0)
								data.services = services;
							if (materials.length > 0)
								data.materials = materials;
							if (remarksByLevelOne.length > 0)
								data.remarksByLevelOne = remarksByLevelOne;
							if (remarksByLevelTwo.length > 0)
								data.remarksByLevelTwo = remarksByLevelTwo; 
							res.send(JSON.stringify(data));
						});
					});
				});
			});
		});
	}).catch(function(err) {
		console.log(err);
	});
});

router.post('/approveForProjectsByL1', function(req, res, next) {
	Projects.update({
        status: 'Approved by L1' 
    }, {
        where: {id: req.body.projectId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have approved the project request corresponding to id '
    		+ req.body.projectId}));
    });
});

router.post('/approveForProjectsByL2', function(req, res, next) {
	Projects.update({
       status: 'Approved by L2' 
    }, {
        where: {id: req.body.projectId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have approved the project request corresponding to id '
    		+ req.body.projectId}));
    });
});

router.post('/rejectForProjectsByL1', function(req, res, next) {
	Projects.update({
        status: 'Rejected by L1' 
    }, {
        where: {id: req.body.projectId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have rejected the project request corresponding to id '
    		+ req.body.projectId}));
    });
});

router.post('/rejectForProjectsByL2', function(req, res, next) {
	Projects.update({
        status: 'Rejected by L2' 
    }, {
        where: {id: req.body.projectId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have rejected the project request corresponding to id '
    		+ req.body.projectId}));
    });
});

router.post('/enterRemarksForProjects', function(req, res, next) {
	console.log("hi there remarks");
	var remarkRecord = {
		remark: req.body.remark,
		ProjectId: req.body.projectId
	}
	if (req.session.access == 'levelOneAdmin') {
		RemarksByLevelOne.create(remarkRecord).then( function() {
			console.log('Remark by L1 entered successfully');
		}).catch(function(err) {
			console.log(err);
		});

	} else if(req.session.access == 'levelTwoAdmin') {
		RemarksByLevelTwo.create(remarkRecord).then( function() {
			console.log('Remark by L2 entered successfully');
		}).catch(function(err) {
			console.log(err);
		});
	}

});


router.post('/mailForProjects', function(req, res, next) {
	console.log('request received');
	var flag = 0;
	Projects.findAll({where: {status: 'Ongoing', mailSent: 'No'}})
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
	if( flag == 0 ) {
		res.send(JSON.stringify({msg:'Mail sent successfully to all applicants'}));
	}
	else res.send(JSON.stringify({msg: 'All mails were not sent. Send again :('}));
});


router.post('/markAsComplete', function(req, res, next) {
	var projectId = req.body.projectId;
	Projects.update({
		status: 'Completed'
	}, {
		where: {id: projectId}
	}).then( function () {
		res.send(JSON.stringify({msg: 'You have successfuly marked the project as completed'}));
	}).catch( function (err) {
		console.log(err);
	});
});

router.post('/beginProject', function(req, res, next) {
	var projectId = req.body.projectId;
	Projects.update({
		status: 'Ongoing'	
	}, {
		where: {id: projectId}
	}). then( function () {
		Projects.findOne({where: {id: projectId}})
		.then (function (project) {
			console.log('Email id is:' + project.emailID);
			res.send(JSON.stringify({msg: 'Project is ongoing now'}));
		});
	});
});


module.exports = router;