function showModal() {
    document.getElementById('infoModal').style.display='block';   
}


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
                    data.department + '</li><li>Contact Number: ' + data.contactNumber + '</li><li>Email Id: ' + data.emailID + '</li><li>Duration :' +
                    data.duration + '</li><li>Purpose: ' + data.purpose + '</li>');
                showModal();
            }
        });
    });

    $(document).on('click', '#approveForFacilities', function() {
        $(this).prop('disabled',true);
        var applicantId = $(this).closest("tr").find(".applicantId").text();
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
    });

    $(document).on('click', '#removeForFacilities', function() {
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


    $(document).on('click', '#addAdmin', function() {
        var adminName = document.getElementById('userName').value;
        var adminPassword = document.getElementById('adminPassword').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var adminLevel = document.getElementById('adminLevel').value;
        var msgBody = document.getElementById('addAdminMsg');
        if (adminPassword != confirmPassword) {
            msgBody.innerHTML = 'Passwords do not match';
            $('#adminPassword').val('');
            $('#confirmPassword').val('');
            hideMsg(msgBody);
            return;
        } else if (adminName == '' || adminPassword == '' || confirmPassword == '') {
            msgBody.innerHTML = 'Enter All Fields';
            hideMsg(msgBody);
            return;
        }
        else {
            $.ajax( {
                url: '/admin/addAdmin',
                method: 'POST',
                data: JSON.stringify({
                    adminName: adminName,
                    password: adminPassword,
                    adminLevel: adminLevel
                }),
                contentType: "application/json",
                dataType: "json",
                success: function(data, status) {
                    alert(data.msg);
                    var msgBody = document.getElementById('addAdminMsg');
                    msgBody.innerHTML = data.msg;
                    $('#userName').val('');
                    $('#adminPassword').val('');
                    $('#confirmPassword').val('');
                    $('#adminLevel').val('');
                    hideMsg(msgBody);
                }
            });
        }
    });

});
function hideMsg(msgBody) {
    setTimeout(function() {
        msgBody.innerHTML = '';
    },5000);
}