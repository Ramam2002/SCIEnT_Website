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
   user: yourEmail, 
   password: yourPwd, 
   host: yourSmtp, 
   ssl: true
});

var models  = require(path.join(__dirname, '/../' ,'models'));
var Facilities = models.Facilities;
var HallBooking = models.HallBooking;

router.use(session({secret: 'ssshhhhh'}));
router.use(bodyParser.urlencoded({extended: false }));

router.post('/getHallBookingDetails', function(req, res, next) {
	HallBooking.findOne({where: {id: req.body.bookingId}})
	.then( function(hallBookingRecord) {
		res.send(JSON.stringify(hallBookingRecord));
	}).catch(function(err) {
		console.log(err);
	});
});


router.post('/submitApprovalForHallBooking', function(req, res, next) {
	HallBooking.update({
        approved: 'Yes',
        approvedStartTime: req.body.approvedStartTime,
        approvedEndTime: req.body.approvedEndTime 
    },{
        where: {id: req.body.bookingId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have approved the conference hall booking request corresponding to id '+ req.body.bookingId}));
    });

});

router.post('/removeForHallBooking', function(req, res, next) {
	HallBooking.destroy({where: {id: req.body.bookingId}})
	.then(function(data) {
		res.send(JSON.stringify({msg: 'You have deleted the request corresponding to id ' + req.body.bookingId}));
	});
});

router.post('/mailForHallBooking', function(req, res, next) {
	console.log('request received');
	var flag = 0;
	HallBooking.findAll({where: {approved: 'Yes', mailSent: 'No'}})
	.then(function (rows) {
		rows.forEach(function (item) {
			var mailBody = 'Your request for accessing scient lab conference hall has been granted from '+ item.approvedStartTime + 'to ' 
			+ item.approvedEndTime;
			// Email to be sent by admin
			var message = {
				text: mailBody,
				from: yourEmail,
				to: item.emailID,
				subject: "Granting request for conference hall booking",
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
					HallBooking.update({
        				mailSent: 'Yes' 
    				},{
    					where: {id: item.id}
					}).then(function() {
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