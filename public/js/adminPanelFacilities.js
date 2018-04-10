$(document).ready (function () {
	$(document).on ('click', '.applicantId', function() {
		$.ajax({
			url: '/admin/getFacilitiesDetails',
            method: 'POST',
            data: JSON.stringify({
            	applicantId : this.innerHTML
            }),
            contentType: 'application/json',
            dataType: 'json',
	        success: function (data, status) {
                $('#infoList').append('<li>Applicant id: ' + data.id + '</li><li>Applicant Name: ' + data.name + '</li><li>Department: ' + 
                    data.department + '</li><li>Contact Number: ' + data.contactNumber + '</li><li>Email Id: ' + data.emailID + '</li><li>Status :' +
                    data.status + '</li><li>Purpose: ' + data.purpose + '</li>');
                showModal();
            }
        });
    });

    $(document).on('click', '.approveForFacilities', function() {
        var applicantId = $(this).closest("tr").find(".applicantId").text();
        var confirmation = confirm('Are you sure you want to approve request corresponding to id ' + applicantId + '?');
        if(confirmation == true) {
            $(this).prop('disabled',true);
            $.ajax({
                url: '/admin/approveForFacilities',
                method: 'POST',
                data: JSON.stringify({
                    applicantId: applicantId
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);
                }

            });
        }
    });

    $(document).on('click', '.removeForFacilities', function() {
        var applicantId = $(this).closest("tr").find(".applicantId").text();
        var confirmation = confirm('Are you sure you want to delete request corresponding to id ' + applicantId + '?');
        if(confirmation == true) {
            $.ajax({
                url: '/admin/removeForFacilities',
                method: 'POST',
                data: JSON.stringify({
                    applicantId: applicantId
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

    $(document).on('click', '#mailForFacilities', function() {
        $.ajax({
            url: '/admin/mailForFacilities',
            method: 'POST',
            data: JSON.stringify({
                msg: 'SendMailForFacilities'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                alert(data.msg);
            }
        });
    });


    $(document).on('click', '.editAccess', function () {
        var applicantId = $(this).closest("tr").find(".applicantId").text();
        $.ajax({
            url: '/admin/editAccess',
            method: 'POST',
            data: JSON.stringify({
                applicantId: applicantId
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                $('#editAccessStatus').val(data.status);
                $('#editAccessApproved').val(data.approved);
                $('#editAccessApplicantId').val(data.id);
                showEditAccessModal();
            }
        });
    });


    $(document).on('click', '#submitChangedAccess', function () {
        var status = document.getElementById('editAccessStatus').value;
        var approved = document.getElementById('editAccessApproved').value;
        var applicantId = document.getElementById('editAccessApplicantId').value;
        if (applicantId == '') {
            alert("applicantId missing!")
        }
        else {
            $.ajax( {
                url: '/admin/changeAccessDetails',
                method: 'POST',
                data: JSON.stringify({
                    applicantId: applicantId,
                    status: status,
                    approved: approved
                }),
                contentType: "application/json",
                dataType: "json",
                error: function(data) {
                    alert("Error submitting the form!");
                },
                success: function(data, status) {
                    alert(data.msg);
                    $('#editAccessApplicantId').val('');
                }
            });
        }
    });
});