/*
 require packages
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var models  = require(path.join(__dirname, '/../' ,'models'));
var Facilities = models.Facilities;
var Projects = models.Projects;
var Teams = models.Teams;
var Materials = models.Materials;
var Services = models.Services;

router.post('/applyForFacilities', function(req, res, next) {
	var record = {
		name: req.body.name,
		roll: req.body.roll,
		department: req.body.department,
		contactNumber: req.body.contactNumber,
		emailID: req.body.emailID,
		purpose: req.body.purpose,
		duration: req.body.duration,
		heavyMachinery: req.body.heavyMachinery,
		approved: 'false',
		mailSent: 'false'
	};
	Facilities.sync({ force: false }).then(function() {
        return Facilities.create(record);
        console.log('Record inserted successfully into Facilities table');
    }).catch(function(err) {
    	console.log(err);
    });
});

router.post('/applyForProjects', function(req, res, next) {
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
		approvedByL1: 'No',
		approvedByL2: 'No',
		mailSent: 'No'
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
		res.send("Hello World");
	}).catch(function(err) {
		console.log(err);
	});
});


module.exports = router;