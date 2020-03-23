/* code to handle requests for accessing scient lab conference hall (only levelOne admins
handle it)*/
var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");

var email = require("emailjs");
var emailDetails = require("../env.js");
var yourEmail = emailDetails.email;
var yourPwd = emailDetails.pwd;
var yourSmtp = emailDetails.smtp;
var server = email.server.connect({
  user: yourEmail,
  password: yourPwd,
  host: yourSmtp,
  ssl: true
});

var models = require(path.join(__dirname, "/../", "models"));
var Facilities = models.Facilities;
var HallBooking = models.HallBooking;

router.use(session({ secret: "ssshhhhh" }));
router.use(bodyParser.urlencoded({ extended: false }));

/* to display all the details of a particular request by clicking on the id */
// NOT USED, FOR REFERENCE ONLY
router.post("/getHallBookingDetails", function(req, res, next) {
  HallBooking.findOne({ where: { id: req.body.bookingId } })
    .then(function(hallBookingRecord) {
      res.send(JSON.stringify(hallBookingRecord));
    })
    .catch(function(err) {
      console.log(err);
    });
});

//testing if the get request works
router.get("/getHallSummary", function(req, res, next) {
  console.log(req.body.month);
  var lol = "LOL";
  res.send(lol);
});

module.exports = router;
