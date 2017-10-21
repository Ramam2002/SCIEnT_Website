var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var models  = require(path.join(__dirname, '/../' ,'models'));
var Facilities = models.Facilities;

router.use(session({secret: 'ssshhhhh'}));
router.use(bodyParser.urlencoded({extended: false }));

router.post('/getFacilitiesDetails', function(req, res, next) {
	Facilities.findOne({where: {id: req.body.applicantId}})
	.then(function(facilitiesRecord) {
		console.log(JSON.stringify(facilitiesRecord));
		res.send(JSON.stringify(facilitiesRecord));
	}).catch(function(err) {
		console.log(err);
	});
});


router.post('/approveForFacilities', function(req, res, next) {
	Facilities.update({
        approved: 'true' 
    },{
        where: {id: req.body.applicantId }
    }).then(function() {
    	res.send(JSON.stringify({msg: 'You have approved the facilties request corresponding to id '+ req.body.applicantId}));
    });

});

router.post('/removeForFacilities', function(req, res, next) {
	Facilities.destroy({where: {id: req.body.applicantId}})
	.then(function(data) {
		res.send(JSON.stringify({msg: 'You have deleted the request corresponding to id ' + req.body.applicantId}));
	});
});

module.exports = router;