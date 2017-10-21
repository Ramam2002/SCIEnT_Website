var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

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

router.post('/removeForProjects', function(req, res, next) {
	Projects.destroy({where: {id: req.body.projectId}})
	.then(function(data) {
		res.send(JSON.stringify({msg: 'You have deleted the request corresponding to id ' + req.body.projectId}));
	});
});

module.exports = router;