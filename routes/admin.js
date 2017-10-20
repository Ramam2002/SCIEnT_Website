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
		var schemeOneRows, schemeTwoRows;
			Facilities.findAll().then(function(facilities) {
				schemeTwoRows = facilities;
				Projects.findAll().then(function(projects) {
					schemeOneRows = projects;
					res.render('adminPanelOne',{ schemeOneRows: schemeOneRows, schemeTwoRows: schemeTwoRows});
				});
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
			// req.session.user = 'admin';
			// Render admin operations page
			req.session.access = 'levelOneAdmin';
			var schemeOneRows, schemeTwoRows;
			Facilities.findAll().then(function(facilities) {
				schemeTwoRows = facilities;
				Projects.findAll().then(function(projects) {
					schemeOneRows = projects;
					res.render('adminPanelOne',{ schemeOneRows: schemeOneRows, schemeTwoRows: schemeTwoRows});
				});
			});

		} else {
			// Render login page 
			res.render('adminLogin', { msg: 'Wrong Password' });
		}
	}).catch(function (err) {
		console.log(err);
		res.render('adminLogin', { msg: 'Username not found' });
	});
});


router.post('/getFacilitiesDetails', function(req, res, next) {
	Facilities.findOne({where: {id: req.body.applicantId}})
	.then(function(facilitiesRecord) {
		console.log(JSON.stringify(facilitiesRecord));
		res.send(JSON.stringify(facilitiesRecord));
	}).catch(function(err) {
		console.log(err);
	});
});


router.post('/approveForFacilities', function(req, res, next) {
	Facilities.update({
        approved: 'true' 
    },{
        where: {id: req.body.applicantId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have approved the facilties request corresponding to id '+ req.body.applicantId}));
    });

});

router.post('/removeForFacilities', function(req, res, next) {
	Facilities.destroy({where: {id: req.body.applicantId}})
	.then(function(data) {
		res.send(JSON.stringify({msg: 'You have deleted the request corresponding to id ' + req.body.applicantId}));
	});
});

router.post('/logout', function(req, res, next) {
	req.session.access = null;
	res.render('adminLogin', {msg:''});
});
module.exports = router;

