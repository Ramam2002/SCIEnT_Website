$(document).on('click', '#submitRegistrationForNewProduct', function () {
        var productCode = document.getElementById('productCode').value;
        var unit = document.getElementById('unit').value;
        var quantity = document.getElementById('quantity').value;
        var price = document.getElementById('price').value;
        var vendorName = document.getElementById('vendorName').value;
        var vendorEmail = document.getElementById('vendorName').value;
        var vendorAddress = document.getElementById('vendorAddress').value;
        var vendorPhone = document.getElementById('vendorPhone').value;
        var billingInventory = document.getElementById('billingInventory').value;
        var remarks = document.getElementById('newProductRemarks').value;
        price = parseInt(price);
        quantity = parseInt(quantity);

        if (productCode == ''||unit == ''||quantity == ''||price == ''||vendorName == ''||vendorEmail == ''||vendorPhone == ''||vendorAddress == ''||billingInventory =='') {
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
                    unit: unit,
                    quantity: quantity,
                    price: price,
                    vendorName: vendorName,
                    vendorEmail: vendorEmail,
                    vendorAddress: vendorAddress,
                    vendorPhone: vendorPhone,
                    billingInventory: billingInventory,
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
                    $('#unit').val('');
                    $('#quantity').val('');
                    $('#price').val('');
                    $('#vendorName').val('');
                    $('#vendorEmail').val('');
                    $('#vendorAddress').val('');
                    $('#vendorPhone').val('');
                    $('#billingInventory').val('');
                    $('#remarks').val('');
                }
            });
        }
    });