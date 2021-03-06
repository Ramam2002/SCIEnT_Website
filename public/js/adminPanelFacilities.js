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

    const download = function(data) {
        const blob = new Blob([data], { type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `Access_List-${Date.now()}.csv`);
        document.body.append(a);
        a.click();
        document.body.removeChild(a);
    };

    $(document).on('click', '#exportFacilitiesCSV', function() {
        $.ajax({
            url: '/admin/access/all',
            method: 'GET',
            dataType: 'json',
            success: function (data, status) {
                // convert to csv text
                const items = data;
                const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
                const header = Object.keys(items[0])
                let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
                csv.unshift(header.join(','));
                csv = csv.join('\r\n');
                // download as a csv file
                download(csv);
            },
            err: function(err, status) {
                console.log(err);
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