$(document).ready(function () {
    $(document).on('click', '.removeForInventoryProducts', function() {
        var productCode = $(this).closest("tr").find(".productCode").text();
        var confirmation = confirm('Are you sure you want to delete request corresponding to id ' + productCode + '?');
        if(confirmation == true) {
            $.ajax({
                url: '/admin/removeForInventoryProducts',
                method: 'POST',
                data: JSON.stringify({
                    productCode: productCode
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);

                }

            });
            $(this).parent().parent().remove();
        }
    });

    $(document).on('click', '#addNewProduct', function () {
        showAddProductModal();
    });
     $(document).on('click', '#addNewVendor', function () {
        showAddNewVendorModal();
    });


    $(document).on('click', '.inventoryId', function(){

        $.ajax({
            url: '/admin/getInventoryDetails',
            method: 'POST',
            data: JSON.stringify({
                inventoryId: this.innerHTML
            }),

            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                $('#infoList').append(
                    '<li>Id' + data.id
                    + '</li><li>Product Code: ' + data.productCode 
                    + '</li><li>Description: ' + data.descriptionInventory 
                    + '</li><li>Unit: ' + data.unit 
                    + '</li><li>Quantity: ' + data.quantity 
                    + '</li><li>Price: ' + data.price 
                    + '</li><li>Vendor Name: ' + data.vendorName 
                    + '</li><li>Bill Number: ' + data.billNumber 
                    + '</li><li>Remarks: ' + data.remarks 
                    + '</li>');
                showModal();
            }
        });
    });


    $(document).on('click', '.vendorName', function(){

        $.ajax({
            url: '/admin/getVendorDetails',
            method: 'POST',
            data: JSON.stringify({
                vendorName: this.innerHTML
            }),

            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                $('#infoList').append(
                    
                    '<li>Name: ' + data.vendorName
                    + '</li><li>Email: ' + data.vendorEmail
                    + '</li><li>Address: ' + data.vendorAddress
                    + '</li><li>Phone Number: ' + data.vendorPhone
                    + '</li>');
                showModal();
            }
        });
    });

      $(document).on('click', '.billNumber', function(){

        $.ajax({
            url: '/admin/getBillDetails',
            method: 'POST',
            data: JSON.stringify({
                billNumber: this.innerHTML
            }),

            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                $('#infoList').append(
                    
                    '<li>Bill Number: ' + data.billNumber
                    + '</li><li>Bill Date: ' + data.billDate
                    + '</li><li>Bill Description: ' + data.billDescription
                    + '</li><li>Bill Unit: ' + data.billUnit
                    + '</li><li>Bill Quantity: ' + data.billQuantity
                    + '</li><li>Bill Amount: ' + data.billAmount
                    + '</li>');
                showModal();
            }
        });
    });

    $(document).on('click', '#submitRegistrationForNewProduct', function () {
        var productCode = document.getElementById('productCode').value;
        var descriptionInventory = document.getElementById('descriptionInventory').value;
        var unit = document.getElementById('unit').value;
        var quantity = document.getElementById('quantity').value;

        var price = document.getElementById('price').value;

        var vendorName = document.getElementById('vendorName').value;
        var billNumber = document.getElementById('billNumber').value;
        var billDate = document.getElementById('billDate').value;
        var billDescription = document.getElementById('billDescription').value;
        var billUnit = document.getElementById('billUnit').value;
        var billQuantity = document.getElementById('billQuantity').value;
        var billAmount = document.getElementById('billAmount').value;
        var remarks = document.getElementById('newProductRemarks').value;
        price = parseInt(price);
        quantity = parseInt(quantity);
        if (productCode == ''||unit == ''||quantity == ''||descriptionInventory == ''||price == ''||vendorName == ''||billAmount == ''||billDate == ''||billNumber == ''||billDescription == ''||billUnit == ''||billQuantity == '') {
            alert('Enter the required fields!');
            return;
        }
        else if(quantity < 0 || price < 0){
            alert("Numerical values cannot be negative.")
        }

        else {
            $.ajax( {
                url: '/admin/addNewProduct',
                method: 'POST',
                data: JSON.stringify({
                    productCode: productCode,
                    descriptionInventory: descriptionInventory,
                    unit: unit,
                    quantity: quantity,
                    price: price,
                    vendorName: vendorName,
                    billNumber: billNumber,
                    billDate: billDate,
                    billDescription: billDescription,
                    billUnit: billUnit,
                    billAmount: billAmount,
                    billQuantity: billQuantity,
                    remarks: remarks
                }),
                contentType: "application/json",
                dataType: "json",
                error: function(data) {
                    alert("Error submitting the form! The Product Code must be a unique value.");
                },
                success: function(data, status) {
                    alert(data.msg);
                    $('#productCode').val('');
                    $('#descriptionInventory').val('');
                    $('#unit').val('');
                    $('#quantity').val('');
                    $('#price').val('');
                    $('#vendorName').val('');
                    $('#billNumber').val('');
                    $('#billDate').val('');
                    $('#billDescription').val('');
                    $('#billAmount').val('');
                    $('#billQuantity').val('');
                    $('#billUnit').val('');
                    $('#remarks').val('');
                }
            });
        }
    });
});

  $(document).on('click', '#submitRegistrationForNewVendor', function () {

        var vendorName = document.getElementById('newVendorName').value;
        var vendorEmail = document.getElementById('newVendorEmail').value;
        var vendorAddress = document.getElementById('newVendorAddress').value;
        var vendorPhone = document.getElementById('newVendorPhone').value;
        if (vendorName == ''||vendorEmail == ''||vendorPhone == ''||vendorAddress == '') {
            alert('Enter the required fields!');
            return;
        }

        else {
            $.ajax( {
                url: '/admin/addNewVendor',
                method: 'POST',
                data: JSON.stringify({
                   
                    vendorName: vendorName,
                    vendorEmail: vendorEmail,
                    vendorAddress: vendorAddress,
                    vendorPhone: vendorPhone
                }),
                contentType: "application/json",
                dataType: "json",
                error: function(data) {
                    alert("Error submitting the form! The Vendor Name must be a unique value.");
                },
                success: function(data, status) {
                    alert(data.msg);
                  
                    $('#newVendorName').val('');
                    $('#newVendorEmail').val('');
                    $('#newVendorAddress').val('');
                    $('#newVendorPhone').val('');
                    
                }
            });
        }
    });
$(document).on('click', '.editForInventoryProducts', function () {
    
        var productCode = $(this).closest("tr").find(".productCode").text();
        

        console.log(productCode);
        $.ajax({
            url: '/admin/editForInventoryProducts',
            method: 'POST',
            data: JSON.stringify({
                productCode: productCode
               


            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                $('#editProductCode').val(data.inventory.productCode);
                $('#editDescriptionInventory').val(data.inventory.descriptionInventory);
                $('#editUnit').val(data.inventory.unit);
                $('#editQuantity').val(data.inventory.quantity);
                $('#editPrice').val(data.inventory.price);
                $('#editVendorName').val(data.inventory.vendorName);
                $('#editVendorEmail').val(data.vendor.vendorEmail);
                $('#editVendorAddress').val(data.vendor.vendorAddress);
                $('#editVendorPhone').val(data.vendor.vendorPhone);
                $('#editBillNumber').val(data.inventory.billNumber);
                $('#editBillDescription').val(data.inventory.billDescription);
                $('#editBillDate').val(data.inventory.billDate);
                $('#editBillUnit').val(data.inventory.billUnit);
                $('#editBillQuantity').val(data.inventory.billQuantity);
                $('#editBillAmount').val(data.inventory.billAmount);
                $('#editProductRemarks').val(data.inventory.remarks);
               
                showEditProductModal();
            }
        });
    });

$(document).on('click', '#submitChangedProduct', function () {
        var productCode = document.getElementById('editProductCode').value;
        var descriptionInventory = document.getElementById('editDescriptionInventory').value;
        var unit = document.getElementById('editUnit').value;
        var quantity = document.getElementById('editQuantity').value;
        var price = document.getElementById('editPrice').value;
        var vendorName = document.getElementById('editVendorName').value;
        var vendorEmail = document.getElementById('editVendorEmail').value;
        var vendorPhone = document.getElementById('editVendorPhone').value;
        var vendorAddress = document.getElementById('editVendorAddress').value;
        var billNumber = document.getElementById('editBillNumber').value;
        var billDate = document.getElementById('editBillDate').value;
        var billDescription = document.getElementById('editBillDescription').value;
        var billUnit = document.getElementById('editBillUnit').value;
        var billQuantity = document.getElementById('editBillQuantity').value;
        var billAmount = document.getElementById('editBillAmount').value;
        var remarks = document.getElementById('editProductRemarks').value;
        price = parseInt(price);
        quantity = parseInt(quantity);
        if (productCode == ''||unit == ''||quantity == ''||descriptionInventory == ''||price == ''||vendorName == ''||billAmount ==''||billQuantity == ''||billDescription == ''||billDate == ''||billNumber == '') {
            alert('Enter the required fields!');
            return;
        }
        else if(quantity < 0 || price < 0){
            alert("Numerical values cannot be negative.")
        }

        else {
            $.ajax( {
                url: '/admin/changeInventoryProductDetails',
                method: 'POST',
                data: JSON.stringify({
                    productCode: productCode,
                    descriptionInventory: descriptionInventory,
                    unit: unit,
                    quantity: quantity,
                    price: price,
                    vendorName: vendorName,
                    billNumber: billNumber,
                    billDate: billDate,
                    billDescription: billDescription,
                    billUnit: billUnit,
                    billAmount: billAmount,
                    billQuantity: billQuantity,
                    remarks: remarks
                }),
                contentType: "application/json",
                dataType: "json",
                error: function(data) {
                    alert("Error submitting the form!");
                },
                success: function(data, status) {
                    alert(data.msg);
                    $('#editProductCode').val('');
                    $('#editDescriptionInventory').val('');
                    $('#editUnit').val('');
                    $('#editQuantity').val('');
                    $('#editPrice').val('');
                    $('#editVendorName').val('');
                    $('#editVendorEmail').val('');
                    $('#editVendorAddress').val('');
                    $('#editVendorPhone').val('');
                    $('#editBillNumber').val('');
                    $('#editBillDate').val('');
                    $('#editBillDescription').val('');
                    $('#editBillUnit').val('');
                    $('#editBillQuantity').val('');
                    $('#editBillAmount').val('');
                    $('#editProductRemarks').val('');
                }
            });
        }
    });

   