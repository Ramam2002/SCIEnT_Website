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
var HallBooking = models.HallBooking;
var Admins = models.Admins;

router.use(session({secret: 'ssshhhhh'}));
router.use(bodyParser.urlencoded({extended: false }));

router.get('/', function(req, res, next) {
	
	if(req.session.access == 'levelOneAdmin') {
		var projectsRows, facilitiesRows, hallBookingRows, adminsRows;
		Facilities.findAll().then( function(facilities) {
			facilitiesRows = facilities;
			Projects.findAll().then( function(projects) {
				projectsRows = projects;
				HallBooking.findAll().then( function(bookings) {
					hallBookingRows = bookings;
					Admins.findAll().then( function(admins) {
						adminsRows = admins;
						res.render('adminPanelOne',{ projectsRows: projectsRows, facilitiesRows: facilitiesRows, hallBookingRows: hallBookingRows, adminsRows: adminsRows});
					});
				});
			});
		});
	} 
	else if(req.session.access == 'levelTwoAdmin') {
		var projectsRows;
		Projects.findAll()
		.then(function(projects) {
			projectsRows = projects;
			res.render('adminPanelTwo',{projectsRows: projectsRows});
		});
	} 
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
			req.session.adminid = admin.adminName;
			var projectsRows, facilitiesRows, hallBookingRows, adminsRows;
			Facilities.findAll().then(function(facilities) {
				facilitiesRows = facilities;
				Projects.findAll().then(function(projects) {
					projectsRows = projects;
					HallBooking.findAll().then( function(bookings) {
						hallBookingRows = bookings;
						Admins.findAll().then(function(admins) {
							adminsRows = admins;
							res.render('adminPanelOne',{ projectsRows: projectsRows, facilitiesRows: facilitiesRows, hallBookingRows: hallBookingRows, adminsRows: adminsRows});
						});
					});
				});
			});
		} 
		else if(bcrypt.compareSync(req.body.adminPassword, admin.password) && admin.adminLevel == 'Two') {
			req.session.access = 'levelTwoAdmin';
			req.session.adminid = admin.adminName;
			var projectsRows;
			Projects.findAll()
			.then(function(projects) {
				projectsRows = projects;
				console.log(projectsRows);
				res.render('adminPanelTwo', {projectsRows: projectsRows});
			});
		} 
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
router.post('/changePassword', function(req, res, next) {
	Admins.findOne({ where: { adminName: req.session.adminid} })
	.then(function (admin) {
		// Compare password
		if (bcrypt.compareSync(req.body.currentPassword, admin.password)) {
			// Render admin operations page
			var salt=bcrypt.genSaltSync(1);
			var hash=bcrypt.hashSync(req.body.newPassword,salt);
		    Admins.update({
		    	password: hash
		    }, {
		    		where: {
		    			adminName: req.session.adminid 
		    		}
				}
			).then(function() {
    			res.send(JSON.stringify({msg: 'You have successfully changed your password'}));
    			
    		});	
		}
    	else{
    		res.send(JSON.stringify({msg: 'You have entered wrong current password'}));	
    	}   
	
	}).catch(function(err) {
		console.log(err);
		if (req.session.access== 'levelOneAdmin')
			res.render('adminPanelOne', { msg: 'Username not found' });
		else if (req.session.access== 'levelTwoAdmin')
			res.render('adminPanelTwo', { msg: 'Username not found' });
	});
});


router.post('/logout', function(req, res, next) {
	req.session.access = null;
	req.session.adminid = null;
	res.render('adminLogin', {msg:''});
});
module.exports = router;

