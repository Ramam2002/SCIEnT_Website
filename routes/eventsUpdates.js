/* code to handle requests for updating events and updates of scient lab (only levelOne admins
handle it)*/
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var models  = require(path.join(__dirname, '/../' ,'models'));
var events = models.Events;
var announcements = models.Announcements;
router.use(bodyParser.urlencoded({extended: false }));


//add events
router.post('/addEvent',function(req,res,next){
	var eventRecord={
		EventsDetails:req.body.eventDetails,
		startDate:req.body.startDate,
		startTime:req.body.startTime,
		endDate:req.body.endDate,
		endTime:req.body.endTime,
		startDateFormatted:req.body.startDateFormatted,
		endDateFormatted:req.body.endDateFormatted
	}
	events.create(eventRecord).then(function(event){
		console.log('-----------');
        res.send(JSON.stringify({msg: 'Event added successfully!',id:event.dataValues.id }));
	});

});

//delete events
router.post('/delEvent',function(req,res,next){
	var event=req.body.id;
	res.send(JSON.stringify({msg:"Successfully deleted the Event "}));
	return events.destroy({
		where:{
			id:event
		}
	});

});

//add announcements
router.post('/addAnnouncement',function(req,res,next){
	var record={
		Text:req.body.Text
	}
	announcements.create(record).then(function(announcement){
		console.log('-----------');
        res.send(JSON.stringify({msg: 'Announcement added successfully!',id:announcement.dataValues.id }));
	});

});

//delete announcements
router.post('/delAnnouncement',function(req,res,next){
	var announcement=req.body.id.slice(1);
	res.send(JSON.stringify({msg:"Successfully deleted the Announcement "}));
	return announcements.destroy({
		where:{
			id:announcement
		}
	});

});

module.exports=router;