/* code to handle requests for accessing scient lab facilities (only levelOne admins
handle it)*/
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var email = require("emailjs");
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

/* to display all the details of a particular request by clicking on the id */
router.post('/getFacilitiesDetails', function(req, res, next) {
	Facilities.findOne({where: {id: req.body.applicantId}})
	.then(function(facilitiesRecord) {
		console.log(JSON.stringify(facilitiesRecord));
		res.send(JSON.stringify(facilitiesRecord));
	}).catch(function(err) {
		console.log(err);
	});
});

/* to approve for a particular facilities request */
router.post('/approveForFacilities', function(req, res, next) {
	console.log("Update status");
	Facilities.update({
        approved: 'Yes' 
    },{
        where: {id: req.body.applicantId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have approved the facilties request corresponding to id '+ req.body.applicantId}));
    });

});

/* to delete  a particular request from db as well as webpage */
router.post('/removeForFacilities', function(req, res, next) {
	Facilities.destroy({where: {id: req.body.applicantId}})
	.then(function(data) {
		res.send(JSON.stringify({msg: 'You have deleted the request corresponding to id ' + req.body.applicantId}));
	});
});

/* to send mails to all unnotified applicants whose facilities requests has been granted 
by clicking on a single button */
router.post('/mailForFacilities', function(req, res, next) {
	var flag = 0;
	Facilities.findAll({where: {
        approved: 'Yes',
        status: ['Access not given', 'Mail sent once']
    }})
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
            var txt = "Mail delivered to applicantId: " + item.id;
            console.log(txt);
			
            server.send(message, function (err, message) {
                
				console.log(err);
				if (err!=null) {
					flag = 1;
				} 
				else {
                    Facilities.update({
                        status: 'Mail sent twice' 
                    },{
                        where: {id: item.id, status: 'Mail sent once'}
                    }).then(function() {
                    // res.send(JSON.stringify({msg: 'You have approved the facilties request corresponding to id '+ req.body.applicantId}));
                    }).catch(function(err) {
                        console.log(err);
                    });

                    Facilities.update({
                        status: 'Mail sent once' 
    				},{
    					where: {id: item.id, status: 'Access not given'}
					}).then(function() {
    				// res.send(JSON.stringify({msg: 'You have approved the facilties request corresponding to id '+ req.body.applicantId}));
					}).catch(function(err) {
						console.log(err);
					});
				}

			});

		});	
		if( flag == 0 ) {
			res.send(JSON.stringify({msg:'Mail sent successfully to all applicants'}));
		}
		else res.send(JSON.stringify({msg: 'All mails were not sent. Send again :('}));
	});
	
});



router.post('/editAccess', function(req, res, next) {
    Facilities.findOne({where: {id: req.body.applicantId}})
    .then( function(FacilitiesRecord) {
        res.send(JSON.stringify(FacilitiesRecord));
    }).catch(function(err) {
        console.log(err);
    });
});


router.post('/changeAccessDetails', function(req, res, next) {
  Facilities.update({
    status: req.body.status,
    approved: req.body.approved
  },{
    where: {id: req.body.applicantId }
  }).then(function() {
    res.send(JSON.stringify({msg: 'The access details have been updated successfully.'}));
  });
});

module.exports = router;