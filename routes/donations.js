/* to handle form submissions for applying for projects/facilities/hallbooking */
/*
 require packages
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var request= require('request');
var url = require('url');
var csrf = require('csurf');

var models  = require(path.join(__dirname, '/../' ,'models'));
var Donations = models.Donations;

var Insta = require('instamojo-nodejs');
var instamojoDetails = require('../env.js');

var API_KEY = instamojoDetails.API_KEY;
var AUTH_KEY = instamojoDetails.AUTH_KEY;

// Setup route middleware
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false })

router.get('/getDonationsForm', csrfProtection, function(req, res, next) {
    res.render('donations', { csrfToken: req.csrfToken() });
});

/* to handle form submission for facilities */
router.post('/applyForDonations', function(req, res, next) {

    var purpose = 'trial_donation';
        if(req.body.remarks != ''){
          purpose = req.body.remarks;
        }
    var record = {
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        emailID: req.body.emailID,
        amount: req.body.amount,
        remarks: purpose,
        pan: req.body.pan,
        address: req.body.address
    };

    Donations.sync({ force: false }).then(function() {

        var headers = {
          'X-Api-Key': API_KEY, 
          'X-Auth-Token': AUTH_KEY
        };

        
        var hostname = req.protocol + '://' + req.get('host');

        var payload = {
          'purpose': record.remarks,
          'amount': record.amount,
          'phone': record.contactNumber,
          'buyer_name': record.name,
          'redirect_url': hostname + '/donationSuccess',
          'send_email': true,
          'webhook': '',
          'send_sms': true,
          'email': record.emailID,
          'allow_repeated_payments': false
        };


        console.log(payload);

        // development link is test.instamojo.com
        // deployment link is www.instamojo.com

        var options = {
          url: 'https://www.instamojo.com/api/1.1/payment-requests/', 
          method: 'POST',
          headers: headers, 
          form: payload
        };

        request(options, function(error, response, body){

          if(!error && response.statusCode == 201) {
            console.log(body);
            
            jbody = JSON.parse(body);

            payment_request_id = jbody["payment_request"]["id"];
            record['payment_request_id'] = payment_request_id;
            
            console.log(record);

            Donations.create(record);
            
            console.log('\nRecord inserted successfully into Donations table');
        
            
            console.log(jbody["payment_request"]["longurl"]);
            var redirect_payment_url = jbody["payment_request"]["longurl"];
            res.redirect(redirect_payment_url);
          }
          else {
            // console.log(response);
            // console.log(body);
            console.log("error in submitting instamojo details");
            res.render('formSubmission');
          }
        });

        // res.send("Form Successfully submitted :)");
    }).catch(function(err) {
        console.log(err);
    });
});

router.get('/donationSuccess', function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    var txt ="Payment request id: " + q.payment_request_id + "<br> Payment Id: " + q.payment_id + "<br> Thank you for contributing!";
    Donations.update({
        paid: 'Yes',
        payment_id: q.payment_id 
    }, {
        where: {payment_request_id: q.payment_request_id }
    }).then(function() {
      res.end(txt);
    });
});


router.post('/admin/getDonationsDetails', function(req, res, next) {
  Donations.findOne({where: {id: req.body.donationId}})
  .then( function(donationRecord) {
    console.log(donationRecord);
    res.send(JSON.stringify(donationRecord));
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;