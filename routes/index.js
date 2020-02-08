
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
var Events = models.Events;
var Announcements = models.Announcements;
var Testimonials = models.Testimonials;

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
router.get('/:type/images',function(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	fs.readdir("./public/images/tools/" + req.params["type"],function(err, files) {
		console.log(files);
		//console.log(JSON.stringify({filenames: files}));
		if(!err)
			res.status(200).send(JSON.stringify({filenames: files}));
		else 
			res.sendStatus(404);
		
	});
});

router.get('/annual_reports',function(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	fs.readdir("./public/annual_reports/", function(err, files) {
		console.log(files);
		if(!err)
        	res.status(200).send(JSON.stringify({filenames: files}));
        else 
			res.sendStatus(404);
	});
});

router.get('/projects-images', function(req,res,next) {
	AdminProjects.findAll().then(function(projects) {
		res.status(200).send(JSON.stringify({projects: projects}));
	}).catch(function(err) {
		res.sendStatus(500);
	});
});

router.get('/gallery-images', function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    fs.readdir("./public/images/gallery", function(err, files) {
        console.log(files);
        if(!err)
        	res.status(200).send(JSON.stringify({filenames: files}));
        else 
			res.sendStatus(404);
    });
}); 

//sends events list
router.get('/events',function(req, res, next) {
	Events.findAll().then(function(events) {
		console.log(events);
        res.status(200).send(JSON.stringify({events: events}));
	}).catch(function(err){
		res.sendStatus(500);
	}); 
});


//sends announcements list
router.get('/announcements',function(req, res, next) {
	Announcements.findAll().then(function(announcements) {
		console.log(announcements);
        res.status(200).send(JSON.stringify({announcements: announcements}));
	}).catch(function(err){
		res.sendStatus(500);
	});
});

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
		if(req.headers['user-agent'].indexOf('Mobile') != -1) {
			if(! err)
				res.status(200).send(JSON.stringify({msg: "Message sent"}));
			else 
				res.sendStatus(500);
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
		if(!err)
		{	
			console.log('Sent');
			
		}
		if(req.headers['user-agent'].indexOf('Mobile') != -1) {
			if(! err)
				res.status(200).send(JSON.stringify({msg: "Project idea sent", statusCode: 200}));
			else 
				res.sendStatus(500);
		}
		
	});
	res.render('index');
});

router.post('/submitTestimonial', function(req,res,next) {

	Testimonials.create({
		name: req.body.name,
		testimonial: req.body.review
	}).then(function() {
		console.log("Name: " , req.body.name);
		console.log("Review: " , req.body.review);
		console.log('Testimonial sent! Thank you for filling it.')
		// res.end(JSON.stringify({msg: 'Testimonial sent! Thank you for filling it.'}))
		res.redirect('/#!/Testimonials')
	}).catch(function(err) {
		console.log(err);
		res.end(JSON.stringify({msg: `Error: ${err}`}));
	})
})

router.post('/removeTestimonial', function(req, res, next) {
	Testimonials.destroy({where: {id: req.body.testimonialId}})
	.then(function(data) {
		console.log("Deleted")
		res.send(JSON.stringify({msg: 'You have deleted the request corresponding to id ' + req.body.testimonialId}));
	});
});

module.exports = router;
