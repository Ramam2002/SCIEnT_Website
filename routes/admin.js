/* handling of get and post requests to admin panel done here*/
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
var Donations = models.Donations;
var Inventory=models.inventory;
var Vendors=models.Vendors;
var events=models.events;
var updates=models.updates;


router.use(session({secret: 'ssshhhhh'}));
router.use(bodyParser.urlencoded({extended: false }));
/* code to handle get request to admin route*/
router.get('/', function(req, res, next) {
	/* to check whether the person is already logged in as levelOne or leveltwo admin*/
	if(req.session.access == 'levelOneAdmin') {
		var projectsRows, facilitiesRows, hallBookingRows, adminsRows, donationRows, inventoryRows,vendorRows;
		Facilities.findAll().then( function(facilities) {
			facilitiesRows = facilities;
			Projects.findAll().then( function(projects) {
				projectsRows = projects;
				HallBooking.findAll().then( function(bookings) {
					hallBookingRows = bookings;
					Inventory.findAll().then(function(inventories){
						inventoryRows = inventories;
						Vendors.findAll().then(function(vendors){
							vendorRows = vendors;					
							Admins.findAll().then( function(admins) {
								adminsRows = admins;
								Donations.findAll().then( function(donations) {
									donationRows = donations;
									events.findAll().then(function(events){
										eventRows = events;
										updates.findAll().then(function(updates){
											updatesRows = updates;
											res.render('adminPanelOne',{ projectsRows: projectsRows, facilitiesRows: facilitiesRows, hallBookingRows: hallBookingRows,inventoryRows:inventoryRows,vendorRows:vendorRows, adminsRows: adminsRows, donationRows: donationRows,eventRows:eventRows,updatesRows:updatesRows});

										});
									});									
								});
							});
						});
					});
				});
			});
		});
	} 
	else if(req.session.access == 'levelTwoAdmin') {
		var projectsRows,inventoryRows;
		Projects.findAll()
		.then(function(projects) {
			projectsRows = projects;
			Inventory.findAll().then(function(inventories){
			inventoryRows = inventories;
			res.render('adminPanelTwo',{projectsRows: projectsRows,inventoryRows:inventoryRows});
		});
		});
	} 
	/* if the person is not logged in as any level admin redirect to adminlogin page */
	else {
		res.render('adminLogin', {msg: ''});
	}
});
/* code to handle post request on submitting form on admin login page */
router.post('/adminLogin', function(req, res, next) {
	Admins.findOne( { where: { adminName: req.body.adminName } } )
	.then(function (admin) {
		// Compare password and see if itt is levelOne admin
		if (bcrypt.compareSync(req.body.adminPassword, admin.password) && admin.adminLevel == 'One') {
			// Render admin panel for level one admin
			req.session.access = 'levelOneAdmin';
			req.session.adminid = admin.adminName;
			var projectsRows, facilitiesRows, hallBookingRows, adminsRows,inventoryRows,vendorRows;
			Facilities.findAll().then(function(facilities) {
				facilitiesRows = facilities;
				Projects.findAll().then(function(projects) {
					projectsRows = projects;
					HallBooking.findAll().then( function(bookings) {
						hallBookingRows = bookings;
						Inventory.findAll().then(function(inventories){
							inventoryRows = inventories;	
							Vendors.findAll().then(function(vendors){
								vendorRows = vendors;
								Admins.findAll().then(function(admins) {
									adminsRows = admins;
									Donations.findAll().then( function(donations) {
										donationRows = donations;
										events.findAll().then(function(events){
										eventRows = events;
										updates.findAll().then(function(updates){
											updatesRows = updates;
											res.render('adminPanelOne',{ projectsRows: projectsRows, facilitiesRows: facilitiesRows, hallBookingRows: hallBookingRows,inventoryRows:inventoryRows,vendorRows:vendorRows, adminsRows: adminsRows, donationRows: donationRows,eventRows:eventRows,updatesRows:updatesRows});

										});
									});					
									});
								});
							});
						});
					});
				});
			});
		} 
		// check if the person logging in leveltwo admin and display the level two admin panel
		else if(bcrypt.compareSync(req.body.adminPassword, admin.password) && admin.adminLevel == 'Two') {
			req.session.access = 'levelTwoAdmin';
			req.session.adminid = admin.adminName;
			var projectsRows,inventoryRows;
			Projects.findAll()
			.then(function(projects) {
				projectsRows = projects;
				Inventory.findAll().then(function(inventories){
							inventoryRows = inventories;
				//console.log(projectsRows);
				res.render('adminPanelTwo', {projectsRows: projectsRows,inventoryRows:inventoryRows});
			});
		});
		} 
		// if login credentials are incorrect
		else {
			// Render login page 
			res.render('adminLogin', { msg: 'Wrong Password' });
		}
	}).catch(function (err) {
		// console.log(err);
		res.render('adminLogin', { msg: 'Username not found' });
	});
});
/* code to handle adding of admin accounts on levelone admin page 
by an already registered admin */ 
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

//delete admin
router.post('/delAdmin',function(req,res,next){

	var adminName=req.body.adminName;
	res.send(JSON.stringify({msg:"Successfully deleted "+adminName}));
	console.log('deleting '+adminName);
	return Admins.destroy({
		where:{
			adminName:adminName
		}
	});

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

/* code to handle logout */
router.post('/logout', function(req, res, next) {
	req.session.access = null;
	req.session.adminid = null;
	res.render('adminLogin', {msg:''});
});
module.exports = router;

