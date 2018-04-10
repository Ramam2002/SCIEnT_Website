$(document).ready (function () {
    $(document).on ('click', '.donationId', function() {
        console.log('click working');
        $.ajax({
            url: '/admin/getDonationsDetails',
            method: 'POST',
            data: JSON.stringify({
                donationId : this.innerHTML
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                $('#infoList').append( 
                    '</li><li>Name: ' + data.name + 
                    '</li><li>Contact Number: ' +  data.contactNumber + '</li><li>Email: ' 
                    + data.emailID + '</li><li>Permanent Address: ' + data.address + 
                    '</li><li>PAN: ' + data.pan + '</li><li>Amount:' +
                    data.amount + '</li><li>Purpose/Remarks: ' + data.remarks + 
                    '</li><li>Payment Request Id: ' + data.payment_request_id + '</li><li>Paid: ' + 
                    data.paid + '</li><li>Payment Id: ' + 
                    data.payment_id + '</li>');
                showModal();
            }
        });
    });
});