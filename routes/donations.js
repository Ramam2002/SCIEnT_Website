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

var models  = require(path.join(__dirname, '/../' ,'models'));
var Donations = models.Donations;

var Insta = require('instamojo-nodejs');
var instamojoDetails = require('../env.js');

// var API_KEY = instamojoDetails.API_KEY;
// var AUTH_KEY = instamojoDetails.AUTH_KEY;

var API_KEY = "test_4275c7966eb92dad9efd0256465";
var AUTH_KEY = "test_31d9a44a553fef27e164d1bf4a5";

// Insta.setKeys(API_KEY, AUTH_KEY);

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
    };

    Donations.sync({ force: false }).then(function() {

        var headers = { 
          'X-Api-Key': API_KEY, 
          'X-Auth-Token': AUTH_KEY
        };

        var payload = {
          'purpose': record.remarks,
          'amount': record.amount,
          'phone': record.contactNumber,
          'buyer_name': record.name,
          'redirect_url': 'http://127.0.0.1:3000/donationSuccess',
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
          url: 'https://test.instamojo.com/api/1.1/payment-requests/', 
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
            res.send("Form submission not successful. \n Note: Minimum amount allowed : Rs 10");
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

module.exports = router;




/*


        var headers = { 'X-Api-Key': API_KEY, 'X-Auth-Token': AUTH_KEY};
        var payload = {
          purpose: 'trial_donation',
          amount: record.amount,
          phone: record.contactNumber,
          buyer_name: record.name,
          redirect_url: 'http://www.example.com/redirect/',
          send_email: true,
          webhook: 'http://www.example.com/webhook/',
          send_sms: true,
          email: record.emailID,
          allow_repeated_payments: false};

        // development link is test.instamojo.com
        // deployment link is www.instamojo.com

        request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
          if(!error && response.statusCode == 201){
            console.log(body);
          }
        });


*/