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
var Facilities = models.Facilities;

router.use(session({secret: 'ssshhhhh'}));
router.use(bodyParser.urlencoded({extended: false }));

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
        approved: 'Yes' 
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

router.post('/mailForFacilities', function(req, res, next) {
	console.log('request received');
	var flag = 0;
	Facilities.findAll({where: {approved: 'Yes', mailSent: 'No'}})
	.then(function (rows) {
		rows.forEach(function (item) {
			var mailBody = 'Your request for accessing scient lab tools and facilities has been granted';
			// Email to be sent by admin
			var message = {
				text: mailBody,
				from: yourEmail,
				to: item.emailID,
				subject: "Granting request for scient lab facilities",
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
					Facilities.update({
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