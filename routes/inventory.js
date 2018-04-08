var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var email   = require("emailjs");
var emailDetails = require('../env.js');
var yourEmail = emailDetails.email;
var yourPwd = emailDetails.pwd;
var yourSmtp = emailDetails.smtp;
var server  = email.server.connect({
   user:    yourEmail, 
   password: yourPwd, 
   host:    yourSmtp, 
   ssl:     true
});

var models  = require(path.join(__dirname, '/../' ,'models'));
var inventory = models.inventory;
var Vendors = models.Vendors;

router.use(session({secret: 'ssshhhhh'}));
router.use(bodyParser.urlencoded({extended: false }));

router.post('/removeForInventoryProducts', function(req, res, next) {
    inventory.destroy({where: {productCode: req.body.productCode}})
    .then(function(data) {
        res.send(JSON.stringify({msg: 'You have deleted the request corresponding to productCode ' + req.body.productCode}));
    });
});

router.post('/getInventoryDetails', function(req, res, next) {
    inventory.findOne({where: {id: req.body.inventoryId}})
    .then( function(inventoryRecord) {
        res.send(JSON.stringify(inventoryRecord));
    }).catch(function(err) {
        console.log(err);
    });
});

router.post('/getVendorDetails', function(req, res, next) {
    Vendors.findOne({where: {vendorName: req.body.vendorName}})
    .then( function(vendorRecord) {
        res.send(JSON.stringify(vendorRecord));
    }).catch(function(err) {
        console.log(err);
    });
});

router.post('/getBillDetails', function(req, res, next) {
    inventory.findOne({where: {billNumber: req.body.billNumber}})
    .then( function(billRecord) {
        res.send(JSON.stringify(billRecord));
    }).catch(function(err) {
        console.log(err);
    });
});


router.post('/addNewProduct', function(req, res, next) {
  var inventoryRecord = {
    productCode: req.body.productCode,
    descriptionInventory: req.body.descriptionInventory,
    unit: req.body.unit,
    quantity: req.body.quantity,
    price: req.body.price,
    vendorName: req.body.vendorName,
    billNumber: req.body.billNumber,
    billDate: req.body.billDate,
    billDescription: req.body.billDescription,
    billUnit: req.body.billUnit,
    billQuantity: req.body.billQuantity,
    billAmount: req.body.billAmount,
    remarks: req.body.remarks
  };
  inventory.create(inventoryRecord)
  .then(function() {
    res.send(JSON.stringify({msg: 'You have successfully added a new product to the inventory.'}));
  }).catch(function(err) {
        console.log(err);
});
});

router.post('/addNewVendor', function(req, res, next) {
  var vendorRecord = {

    vendorName: req.body.vendorName,
    vendorEmail: req.body.vendorEmail,
    vendorAddress: req.body.vendorAddress,
    vendorPhone: req.body.vendorPhone
  };
  Vendors.create(vendorRecord)
  .then(function() {
    res.send(JSON.stringify({msg: 'You have successfully added a new vendor.'}));
  });
});



/*router.post('/editForInventoryProducts', function(req, res, next) {
    inventory.findOne({where: {productCode: req.body.productCode}})
    .then( function(inventoriesRecord) {
        res.send(JSON.stringify(inventoriesRecord));
    }).catch(function(err) {
        console.log(err);
    });
});*/

router.post('/editForInventoryProducts', function (req, res, next) {
  inventory.findOne({where: {productCode: req.body.productCode}})
  .then(function (inventoriesRecord) {
    Vendors.findOne({where: {vendorName: inventoriesRecord.vendorName}})
    .then(function (vendor) {
      data = {};
      data.inventory = inventoriesRecord;
      data.vendor = vendor;
        res.send(JSON.stringify(data));
      }).catch(function(err) {
    console.log(err);
    });
  });
});


router.post('/changeInventoryProductDetails', function(req, res, next) {
  inventory.update({
                    productCode: req.body.productCode,
                    descriptionInventory: req.body.descriptionInventory,
                    unit: req.body.unit,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    billNumber: req.body.billNumber,
                    billDate: req.body.billDate,
                    billDescription: req.body.billDescription,
                    billUnit: req.body.billUnit,
                    billQuantity: req.body.billQuantity,
                    billAmount: req.body.billAmount,

                    remarks: req.body.remarks
  },{
    where: {productCode: req.body.productCode }
  }).then(function() {
      Vendors.update({
                    vendorName: req.body.vendorName,
                    vendorEmail: req.body.vendorEmail,
                      vendorAddress: req.body.vendorAddress,
                      vendorPhone: req.body.vendorPhone
  },{
    where: {vendorName: req.body.vendorName}
  });}).then(function(){
    res.send(JSON.stringify({msg: 'The product details have been updated successfully.'}));
  }).catch(function(err) {
        console.log(err);
    });
});
  module.exports = router;