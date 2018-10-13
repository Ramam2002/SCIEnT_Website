
/*
 require packages
*/
var express = require('express');
var router = express.Router();
var email   = require("emailjs");
var emailDetails = require('../env.js');
var fs = require('fs');
var path = require('path');

/*
 Set SMTP object
*/
var yourEmail = emailDetails.email;
var yourPwd = emailDetails.pwd;
var yourSmtp = emailDetails.smtp;
var server  = email.server.connect({
   user:    yourEmail, 
   password: yourPwd, 
   host:    yourSmtp, 
   ssl:     true,
});

var models  = require(path.join(__dirname, '/../' ,'models'));
var AdminProjects = models.AdminProjects;
/* 
 GET home page 
*/
router.get('/', function(req, res, next) {
 	res.render('index');
});

/*
  API route for images under the public/images/tools directory
  @params type [for type of the tools]
*/ 
router.get('/:type/images',function(req, res, next){
	res.setHeader("Content-Type", "application/json");
	fs.readdir("./public/images/tools/" + req.params["type"],function(err, files) {
		console.log(files);
		res.send(files);
	});
});

router.get('/projects/images', function(req,res,next) {
	// var project;
	res.setHeader("Content-Type", "application/json");
	AdminProjects.findAll().then(function(projects) { 
		// project = projects;
		console.log(projects);
		res.send(projects);
	})
})
/* module for sending message/queries on contacts page to scient */
router.post('/sendMessage', function(req, res, next) {
	console.log(req.body.name);
	console.log(req.body.phone);
	console.log(req.body.email);
	console.log(req.body.msg);
	var message = {
			text : req.body.msg + ' from Name: ' + req.body.name + ' Email: ' + req.body.email + ' and Phone : '+req.body.phone,
			from : req.body.email,
			to : yourEmail,
			subject : "hello",
			attachment:
			[
				
			]
		};
		server.send(message, function(err, message){
			console.log(err||message);
			if(!err)
			{	
				console.log('Sent');
				
			}
		});
	res.render('index');
});
router.post('/sendProjectIdea', function(req,res,next) {
	console.log(req.body.name);
	console.log(req.body.phNumber);
	console.log(req.body.email);
	console.log(req.body.projectTitle);
	console.log(req.body.projectIdea);
	var message = {
		text: ' Project Title: ' + req.body.projectTitle + ' and Project Details: ' + req.body.projectIdea 
		  + ' from Name: ' + req.body.name + ' Email: ' + req.body.email + ' and Phone Number: ' + req.body.phNumber,
		from : req.body.email,
		to :  yourEmail, 
		subject: "New Project Idea",
		attachment: 
		[

		]
	};
	server.send(message, function (err,message) {
		console.log(err||message);
		if(!err){
			console.log("Sent");
		}
	});
	res.render('index');
});

module.exports = router;
