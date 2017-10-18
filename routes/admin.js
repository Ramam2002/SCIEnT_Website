var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');

var models  = require(path.join(__dirname, '/../' ,'models'));
var Admins = models.Admins;


router.get('/', function(req, res, next) {
	res.render('adminLogin', {msg: ''});
});

router.post('/adminLogin', function(req, res, next) {
	Admins.findOne( { where: { adminName: req.body.adminName } } )
	.then(function (admin) {
		// Compare password
		if (bcrypt.compareSync(req.body.adminPassword, admin.password) && admin.adminLevel == 'One') {
			// req.session.user = 'admin';
			// Render admin operations page
			res.render('adminPanelOne');
		} else {
			// Render login page 
			res.render('adminLogin', { msg: 'Wrong Username or Password' });
		}
	}).catch(function (err) {
		console.log(err);
		res.render('adminLogin', { msg: 'Username not found' });
	});
});

module.exports = router;

