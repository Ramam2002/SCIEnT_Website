/* to handle form submissions for applying for projects/facilities/hallbooking */
/*
 require packages
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var csrf = require('csurf');

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
var Projects = models.Projects;
var Teams = models.Teams;
var Materials = models.Materials;
var Services = models.Services;
var HallBooking = models.HallBooking;

// Setup route middleware
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false })

/* Get Register for Projects form */
router.get('/registerForProjects', csrfProtection, function(req, res, next) {
	if(req.headers['user-agent'].indexOf('Mobile') != -1)
		res.status(200).send(JSON.stringify({_csrf: req.csrfToken() }));
	else 
		res.render('registerForProjects', { csrfToken: req.csrfToken() });
});

/* Get Register for Facilities form */
router.get('/registerForFacilities', csrfProtection, function(req, res, next) {
	if(req.headers['user-agent'].indexOf('Mobile') != -1)
		res.status(200).send(JSON.stringify({_csrf: req.csrfToken() }));
	else
		res.render('registerForFacilities', { csrfToken: req.csrfToken() });
});

/* Get Hall booking form */
router.get('/applyForHallBooking', csrfProtection, function(req, res, next) {
	if(req.headers['user-agent'].indexOf('Mobile') != -1)
		res.status(200).send(JSON.stringify({_csrf: req.csrfToken() }));
	else
		res.render('hallBooking', { csrfToken: req.csrfToken() });
});



/* to handle form submission for facilities */
router.post('/applyForFacilities', parseForm, csrfProtection, function(req, res, next) {
	var record = {
		name: req.body.name,
		roll: req.body.roll,
		department: req.body.department,
		contactNumber: req.body.contactNumber,
		emailID: req.body.emailID,
		purpose: req.body.purpose,
		duration: req.body.duration,
		heavyMachinery: req.body.heavyMachinery,
		approved: 'No',
		mailSent: 'No'
	};
	Facilities.sync({ force: false }).then(function() {
        Facilities.create(record);
        console.log('Record inserted successfully into Facilities table');
        // res.send("Form Successfully submitted :)");

        var mailBody = record.name 
        	+ ' ( ' 
        	+ record.roll 
        	+ ' )' 
        	+ ' wants access to scient lab';
		// Email to be sent by admin
		var message = {
			text: mailBody,
			from: yourEmail,
			to: yourEmail,
			subject: "Access Requistion",
			attachment:
				[
					
				]
		};
		server.send(message, function (err, message) {
			if (err != null) {
				console.log(err);
			} else {
				console.log("Mail to alert scient ppl sent");
			}
		});
		console.log(req.headers['user-agent']);
		if(req.headers['user-agent'].indexOf('Mobile') != -1)
			res.status(200).send(JSON.stringify({msg: "Facilities request recorded"}));
		else
        	res.render('formSubmission');
    }).catch(function(err) {
    	if(req.headers['user-agent'].indexOf('Mobile') != -1)
			res.sendStatus(500);
    	console.log(err);
    });
});
/* to handle form submission for projects*/
router.post('/applyForProjects', parseForm, csrfProtection, function(req, res, next) {
	var record = {
		name: req.body.name,
		rollNo: req.body.rollNo,
		department: req.body.dept,
		projectTitle: req.body.title,
		contactNumber: req.body.contact,
		emailID: req.body.email,
		visibility: req.body.optradio,
		abstract: req.body.abstract,
		budget: req.body.budget,
		timeline: req.body.timeline,
		status: 'Not yet approved by L1',
		mailSent: 'No',
		latestUpdater: 'NA'
	};
	Projects.sync({ force: false }).then(function() {
		Projects.create(record).then(user => {
			
			if(req.body.teamMembersNames) {
				var teamMemberNames = req.body.teamMembersNames;
				var teamMemberRoll = req.body.teamMembersRoll;
				var teamMember = {};
				if(Array.isArray(teamMemberNames)) {
					for(t_index = 0; t_index < teamMemberNames.length; t_index = t_index + 1) {
						teamMember = {
							name: teamMemberNames[t_index],
							rollNo: teamMemberRoll[t_index],
							ProjectId: user.id
						};
						Teams.create(teamMember).then(function () {
							console.log("Team Member added successfully");
						}).catch(function (err) {
							console.log(err);
						});
					}
				} else {
					teamMember = {
						name: teamMemberNames,
						rollNo: teamMemberRoll,
						ProjectId: user.id
					};

					Teams.create(teamMember).then(function () {
						console.log("Team Member added successfully");
					}).catch(function (err) {
						console.log(err);
					});
				}
			}

			if(req.body.materialNames) {
				var materialNames = req.body.materialNames;
				var materialSpecs = req.body.materialSpecs;
				var materialQuantity = req.body.materialQuantity;
				var materialPrice = req.body.materialPrice;
				var purposes = req.body.purpose;
				var vendors = req.body.vendors;
				var material = {}
				
				if(Array.isArray(materialNames)) {

					for(m_index = 0; m_index < materialNames.length; m_index = m_index + 1) {
						material = {
							materialName: materialNames[m_index],
							specification: materialSpecs[m_index],
							quantity: materialQuantity[m_index],
							price: materialPrice[m_index],
							purpose: purposes[m_index],
							vendor: vendors[m_index],
							ProjectId: user.id
						};

						Materials.create(material).then(function () { 
							console.log("Material added successfully");
						}).catch(function (err) {
							console.log(err);
						});
					}
				} else {
					material = {
						materialName: materialNames,
						specification: materialSpecs,
						quantity: materialQuantity,
						price: materialPrice,
						purpose: purposes,
						vendor: vendors,
						ProjectId: user.id
					};

					Materials.create(material).then(function () {
						console.log("Material added successfully");
					}).catch(function (err) {
						console.log(err);
					});
				}
			}

			if(req.body.serviceNames) {
				var serviceNames = req.body.serviceNames;
				var serviceSpecs = req.body.serviceSpecs;
				var servicePrice = req.body.servicePrice;
				var service = {};
				if(Array.isArray(serviceNames)) {
					for(s_index = 0; s_index < serviceNames.length; s_index = s_index + 1) {
						service = {
							serviceName: serviceNames[s_index],
							specification: serviceSpecs[s_index],
							price: servicePrice[s_index],
							ProjectId: user.id
						};

						Services.create(service).then(function () {
							console.log("Service added successfully");
						}).catch(function (err) {
							console.log(err);
						});
					}
				} else {
					service = {
						serviceName: serviceNames,
						specification: serviceSpecs,
						price: servicePrice,
						ProjectId: user.id
					};
					
					Services.create(service).then(function () {
						console.log("Service added successfully");
					}).catch(function (err) {
						console.log(err);
					});
				}
			}
		});
		console.log('Record inserted succesfully into Projects table');
		// res.send("Form Successfully submitted :)");
		var mailBody = record.name 
        	+ ' ( ' 
        	+ record.rollNo
        	+ ' )' 
        	+ ' has registered for project';
		// Email to be sent by admin
		var message = {
			text: mailBody,
			from: yourEmail,
			to: yourEmail,
			subject: "Project Registration",
			attachment:
				[
					
				]
		};
		server.send(message, function (err, message) {
			if (err != null) {
				console.log(err);
			} else {
				console.log("Mail to alert scient ppl sent");
			}
		});
		if(req.headers['user-agent'].indexOf('Mobile') != -1)
			res.status(200).send(JSON.stringify({msg: "Projects request recorded"}));
		else
			res.render('formSubmission');
	}).catch(function(err) {
		if(req.headers['user-agent'].indexOf('Mobile') != -1)
			res.sendStatus(500);
		console.log(err);
	});
});

/* to handle form submission for hall booking */
router.post('/applyForHallBooking', parseForm, csrfProtection, function(req, res, next) {
	console.log(req.body.startDate, req.body.startTime, req.body.endDate, req.body.endTime);
	var startDate = req.body.startDate + " " + req.body.startTime + ":00";
	startDate = startDate.split(/[- :]/);
	var start_timestamp = new Date(Date.UTC(startDate[0], startDate[1]-1, startDate[2], startDate[3], startDate[4], startDate[5])).getTime();
	var endDate = req.body.endDate + " " + req.body.endTime + ":00";
	endDate = endDate.split(/[- :]/);
	var end_timestamp = new Date(Date.UTC(endDate[0], endDate[1]-1, endDate[2], endDate[3], endDate[4], endDate[5])).getTime();
	var record = {
		name: req.body.name,
		roll: req.body.roll,
		department: req.body.department,
		contactNumber: req.body.contactNumber,
		emailID: req.body.emailID,
		hallnumber: 'CH1',
		attendeesNumber: req.body.attendeesNumber,
		purpose: req.body.purposeOfBooking,
		startDate: req.body.startDate,
		startTime: req.body.startTime,
		endDate: req.body.endDate,
		endTime: req.body.endTime,
		startTimestamp: start_timestamp,
		endTimestamp: end_timestamp,
		approvedStartTime: '',
		approvedEndTime: '',
		approved: 'No',
		mailSent: 'No'
	};
	return HallBooking.create(record)
	.then(function () {
		console.log('HallBooking record entered successfully');
		var mailBody = record.name 
        	+ ' ( ' 
        	+ record.roll 
        	+ ' )' 
        	+ ' has requested for a hall';
		// Email to be sent by admin
		var message = {
			text: mailBody,
			from: yourEmail,
			to: yourEmail,
			subject: "Hallbooking Request",
			attachment:
				[
					
				]
		};
		server.send(message, function (err, message) {
			if (err != null) {
				console.log(err);
			} else {
				console.log("Mail to alert scient ppl sent");
			}
		});
		if(req.headers['user-agent'].indexOf('Mobile') != -1)
			res.status(200).send(JSON.stringify({msg: "Hall Booking request recorded"}));
		else 
			res.render('formSubmission');
	}).catch(function (err) {
		if(req.headers['user-agent'].indexOf('Mobile') != -1)
			res.sendStatus(500);
		console.log(err);
	});
});

// /* Route for making ajax request to check if the conference hall is available */

router.post('/availabilityOfConferenceHall', function(req, res, next) {
	var is_available = true;
	var startDate = req.body.startDate;
	var startTime = req.body.startTime;
	var endDate = req.body.endDate;
	var endTime = req.body.endTime;
	var hallnumber = req.body.hallnumber;
	var start = startDate + " " + startTime + ":00";
	var end = endDate + " " + endTime + ":00";
	start = start.split(/[- :]/);
	end = end.split(/[- :]/);
	var start_date = new Date(Date.UTC(start[0], start[1]-1, start[2], start[3], start[4], start[5]));
	var end_date = new Date(Date.UTC(end[0], end[1]-1, end[2], end[3], end[4], end[5]));
	var start_time = start_date.getTime();
	var end_time = end_date.getTime();
	HallBooking.findAll().then((records) => {
		records.forEach((record) => {
			var start_timestamp = record["startTimestamp"].getTime();
			var end_timestamp = record["endTimestamp"].getTime();
			var hall_number = record["hallnumber"];
			console.log(start_timestamp, end_timestamp, start_time, end_time)
			if(((start_time >= start_timestamp && start_time <= end_timestamp) || (end_time >= start_timestamp && end_time <= end_timestamp)) && (hallnumber === hall_number)) {
				is_available = false;
			}
		})
	}).then(() => {
		res.send(is_available);
	});;
})

module.exports = router;