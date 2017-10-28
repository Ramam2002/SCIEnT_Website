var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var session = require('express-session');

var models  = require(path.join(__dirname, '/../' ,'models'));
var Admins = models.Admins;
var Facilities = models.Facilities;
var Projects = models.Projects;

router.use(session({secret: 'ssshhhhh'}));
router.use(bodyParser.urlencoded({extended: false }));

router.get('/', function(req, res, next) {
	
	if(req.session.access == 'levelOneAdmin') {
		var projectsRows, facilitiesRows;
			Facilities.findAll().then(function(facilities) {
				facilitiesRows = facilities;
				Projects.findAll().then(function(projects) {
					projectsRows = projects;
					res.render('adminPanelOne',{ projectsRows: projectsRows, facilitiesRows: facilitiesRows});
				});
		});
	} 
	// else if(req.session.access == 'levelTwoAdmin') {
	// 	var projectsApprovedByL1;
	// 	Projects.findAll({where: {approvedByL1: 'Yes'}})
	// 	.then(function(projects) {
	// 		projectsApprovedByL1 = projects;
	// 		res.render('adminPanelTwo',{projectsApprovedByL1: projectsApprovedByL1});
	// 	});
	// } 
	else {
		res.render('adminLogin', {msg: ''});
	}
});

router.post('/adminLogin', function(req, res, next) {
	Admins.findOne( { where: { adminName: req.body.adminName } } )
	.then(function (admin) {
		// Compare password
		if (bcrypt.compareSync(req.body.adminPassword, admin.password) && admin.adminLevel == 'One') {
			// Render admin operations page
			req.session.access = 'levelOneAdmin';
			var projectsRows, facilitiesRows;
			Facilities.findAll().then(function(facilities) {
				facilitiesRows = facilities;
				Projects.findAll().then(function(projects) {
					projectsRows = projects;
					res.render('adminPanelOne', {projectsRows: projectsRows, facilitiesRows: facilitiesRows});
				});
			});

		} 
		// else if(bcrypt.compareSync(req.body.adminPassword, admin.password) && admin.adminLevel == 'Two') {
		// 	req.session.access = 'levelTwoAdmin';
		// 	var projectsApprovedByL1;
		// 	Projects.findAll({where: {approvedByL1: 'Yes'}})
		// 	.then(function(projects) {
		// 		projectsApprovedByL1 = projects;
		// 		console.log(projectsApprovedByL1);
		// 		res.render('adminPanelTwo', {projectsApprovedByL1: projectsApprovedByL1});
		// 	});
		// } 
		else {
			// Render login page 
			res.render('adminLogin', { msg: 'Wrong Password' });
		}
	}).catch(function (err) {
		console.log(err);
		res.render('adminLogin', { msg: 'Username not found' });
	});
});

router.post('/addAdmin', function(req, res, next) {
	var salt=bcrypt.genSaltSync(1);
	var hash=bcrypt.hashSync(req.body.password,salt);
	var adminRecord = {
		adminName: req.body.adminName,
		password: hash,
		adminLevel: req.body.adminLevel
	};
	res.send(JSON.stringify({msg: 'You have added an admin of level ' + req.body.adminLevel + ' successfully!' }));
	return Admins.create(adminRecord);
});


router.post('/logout', function(req, res, next) {
	req.session.access = null;
	res.render('adminLogin', {msg:''});
});
module.exports = router;

