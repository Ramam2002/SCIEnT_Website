/* code to handle requests for updating events and updates of scient lab (only levelOne admins
handle it)*/
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var models  = require(path.join(__dirname, '/../' ,'models'));
var events = models.OngoingEvents;
var updates = models.UpcomingEvents;
router.use(bodyParser.urlencoded({extended: false }));
/*
//add updates
router.post('/addUpdate',function(req,res,next){
	
	var updateRecord={
		UpcomingEventsDetails:req.body.updateDetails
	};
	 
	
	updates.create(updateRecord).then(function(update){
		res.send(JSON.stringify({msg: 'Upcoming Event added successfully!' ,id:update.dataValues.id}));
		
	});

});

//delete updates
router.post('/delUpdate',function(req,res,next){
	var update=req.body.id;
	res.send(JSON.stringify({msg:"Successfully deleted the Upcoming Event "}));
	return updates.destroy({
		where:{
			id:update
		}
	});

});
*/

//add events
router.post('/addEvent',function(req,res,next){
	var eventRecord={
		OngoingEventsDetails:req.body.eventDetails,
		startDate:req.body.startDate,
		startTime:req.body.startTime,
		endDate:req.body.endDate,
		endTime:req.body.endTime
	}
	events.create(eventRecord).then(function(event){
		console.log('-----------');
        res.send(JSON.stringify({msg: 'Ongoing Event added successfully!',id:event.dataValues.id }));
	});

});

//delete events
router.post('/delEvent',function(req,res,next){
	var event=req.body.id;
	res.send(JSON.stringify({msg:"Successfully deleted the Ongoing Event "}));
	return events.destroy({
		where:{
			id:event
		}
	});

});

module.exports=router;