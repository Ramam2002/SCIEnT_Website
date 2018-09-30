$(document).ready (function () {
	$(document).on ('click', '.bookingId', function() {
		$.ajax({
			url: '/admin/getHallBookingDetails',
            method: 'POST',
            data: JSON.stringify({
            	bookingId : this.innerHTML
            }),
            contentType: 'application/json',
            dataType: 'json',
	        success: function (data, status) {
                $('#infoList').append('<li>HallBooking id: ' + data.id + 
                    '</li><li>Meeting Organiser Roll: ' + data.roll + 
                    '</li><li>Meeting Organiser Name: ' +  data.name + '</li><li>Department: ' 
                    + data.department + '</li><li>Contact Number: ' + data.contactNumber + 
                    '</li><li>Email Id: ' + data.emailID + '</li><li>Number of attendees :' +
                    data.attendeesNumber + '</li><li>Purpose of booking: ' + data.purpose + '</li><li>Meeting date: ' + data.date + 
                    '</li><li>Request start time: ' + data.startTime + '</li><li>Request end time: ' + 
                    data.endTime + '</li><li>Approved start time: ' + data.approvedStartTime + '</li><li>Approved end time: ' 
                    + data.approvedEndTime + '</li>');
                showModal();
            }
        });
    });

    $(document).on('click', '.approveForHallBooking', function() {
        var bookingId = $(this).closest("tr").find(".bookingId").text();
        var requestedStartTime = $(this).closest("tr").find(".applicantRequestedStartTime").text();
        console.log(requestedStartTime);
        var requestedEndTime = $(this).closest("tr").find(".applicantRequestedEndTime").text();
        showHallBookingModal(bookingId,requestedStartTime,requestedEndTime);
    });

    $(document).on('click', '.removeForHallBooking', function() {
        var bookingId = $(this).closest("tr").find(".bookingId").text();
        var confirmation = confirm('Are you sure you want to delete request corresponding to id ' + bookingId + '?');
        if(confirmation == true) {
            $.ajax({
                url: '/admin/removeForHallBooking',
                method: 'POST',
                data: JSON.stringify({
                    bookingId: bookingId
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

    $(document).on('click', '.mailForHallBooking', function() {
        $.ajax({
            url: '/admin/mailForHallBooking',
            method: 'POST',
            data: JSON.stringify({
                msg: 'SendMailForHallBooking'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                alert(data.msg);
            }
        });
    });

    $(document).on('click', '.submitApprovalForHallBooking', function() {
        var bookingId = document.getElementById('bookingIdForApproval').innerHTML;
        var approvedStartTime = document.getElementById('approvedStartTime').value;
        var approvedEndTime = document.getElementById('approvedEndTime').value;
        var confirmation = confirm('Are you sure you want to approve this hall booking request?');
        if (confirmation == true) {
            $.ajax({
                url: '/admin/submitApprovalForHallBooking',
                method: 'POST',
                data: JSON.stringify({
                    approvedStartTime: approvedStartTime,
                    approvedEndTime: approvedEndTime,
                    bookingId: bookingId
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);   
                }
            });
            var hallBookingModal = document.getElementById('hallBookingModal');
            $("#approvedStartTime").val('');
            $("#approvedEndTime").val('');
            $('#bookingIdforApproval').html('');
            hallBookingModal.style.display='none';
        }
    });
});