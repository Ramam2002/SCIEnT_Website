/* code to handle requests for updating events and updates of scient lab (only levelOne admins
handle it)*/
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var models  = require(path.join(__dirname, '/../' ,'models'));
var events = models.events;
var updates = models.updates;
router.use(bodyParser.urlencoded({extended: false }));

//add updates
router.post('/addUpdate',function(req,res,next){
	var updateRecord={
		updateDetails:req.body.updateDetails
	}
	res.send(JSON.stringify({msg: 'Update added successfully!' }));
	return updates.create(updateRecord);

});

//delete updates
router.post('/delUpdate',function(req,res,next){
	var update=req.body.updateDetails;
	res.send(JSON.stringify({msg:"Successfully deleted the update : "+update}));
	return updates.destroy({
		where:{
			updateDetails:update
		}
	});

});

//add events
router.post('/addEvent',function(req,res,next){
	var eventRecord={
		eventDetails:req.body.eventDetails
	}
	res.send(JSON.stringify({msg: 'Event added successfully!' }));
	return events.create(eventRecord);

});

//delete events
router.post('/delEvent',function(req,res,next){
	var event=req.body.eventDetails;
	res.send(JSON.stringify({msg:"Successfully deleted the event : "+event}));
	return events.destroy({
		where:{
			eventDetails:event
		}
	});

});

module.exports=router;