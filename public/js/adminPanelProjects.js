$(document).ready (function () {
	$(document).on ('click', '.projectId', function() {
		$.ajax({
			url: '/admin/getProjectsDetails',
	        method: 'POST',
	        data: JSON.stringify({
	        	projectId : this.innerHTML
	        }),
	        contentType: 'application/json',
            dataType: 'json',
	        success: function (data, status) {
                $('#infoList').append('<li>Project id: ' + data.project.id 
                	+ '</li><li>Applicant Name: ' + data.project.name 
                	+ '</li><li>Roll No: ' + data.project.rollNo
                	+ '</li><li>Department: ' + data.project.department 
                	+ '</li><li>Title: ' + data.project.projectTitle 
                	+ '</li><li>Contact Number: ' + data.project.contactNumber 
                	+ '</li><li>Email Id: ' + data.project.emailID 
                	+ '</li><li>Open / Closed: ' + data.project.visibility
                	+ '</li><li>Abstract: ' + data.project.abstract
                	+ '</li><li>Budget: ' + data.project.budget
                	+ '</li><li>Timeline: ' + data.project.timeline + '</li>');
                if (data.teamMembers) {
                    teamMembers = data.teamMembers;
                    $('#infoList').append('<li>Team Members <ul id="teamMembersList"></ul></li>');
                    for (i = 0; i < teamMembers.length; i++) { 
                        $('#teamMembersList').append('<li>Team Member <ul>' 
                            + '<li> Name : ' + teamMembers[i].name + '</li>'
                            + '<li> Roll No : ' + teamMembers[i].rollNo + '</li>'
                            + '</ul></li>')
                    }
                }
                if (data.materials) {
                    materials = data.materials;
                    $('#infoList').append('<li>Materials <ul id="materialsList"></ul></li>');
                    for (i = 0; i < materials.length; i++) { 
                        $('#materialsList').append('<li>Material <ul>'
                            + '<li> Name : ' + materials[i].materialName + '</li>'
                            + '<li> Specification : ' + materials[i].specification + '</li>'
                            + '<li> Quantity : ' + materials[i].quantity + '</li>'
                            + '<li> Price : ' + materials[i].price + '</li>'
                            + '<li> Purpose : ' + materials[i].purpose + '</li>'
                            + '<li> Vendor : ' + materials[i].vendor + '</li>'
                            + '</ul></li>')
                    }
                }
                if (data.services) {
                    services = data.services;
                    $('#infoList').append('<li>Services <ul id="servicesList"></ul></li>');
                    for (i = 0; i < services.length; i++) { 
                        $('#servicesList').append('<li>Service <ul>'
                            + '<li> Name : ' + services[i].serviceName + '</li>'
                            + '<li> Specification : ' + services[i].specification + '</li>'
                            + '<li> Price : ' + services[i].price + '</li>'
                            + '</ul></li>')
                    }
                }
                if (data.remarksByLevelOne) {
                    remarksByLevelOne = data.remarksByLevelOne;
                    $("#infoList").append('<li>Remarks by L1 <ul id="remarksByL1"></ul></li>');
                    for (i = 0; i < remarksByLevelOne.length; i++) {
                        $("#remarksByL1").append('<li>' + remarksByLevelOne[i].remark + ' - ' + remarksByLevelOne[i].remarker + '</li>');
                    }
                }
                if (data.remarksByLevelTwo) {
                    remarksByLevelTwo = data.remarksByLevelTwo;
                    $("#infoList").append('<li>Remarks by L2 <ul id="remarksByL2"></ul></li>');
                    for (i = 0; i < remarksByLevelTwo.length; i++) {
                        $("#remarksByL2").append('<li>' + remarksByLevelTwo[i].remark + ' - ' + remarksByLevelTwo[i].remarker + '</li>');
                    }
                }

                showModal();
            }
        });
    });

    $(document).on('click', '.approveForProjectsByL1', function() {
        var projectId = $(this).closest("tr").find(".projectId").text();
        var rejectButton = $(this).closest("tr").find(".rejectForProjectsByL1");
        var status = $(this).closest("tr").find("#status");
        var confirmation = confirm('Are you sure you want to approve project request corresponding to id ' 
            + projectId + '?');
        if(confirmation == true) {
            $(this).prop('disabled', true);
            $(rejectButton).prop('disabled', false);
            $(status).html('Approved by L1');
            $.ajax({
                url: '/admin/approveForProjectsByL1',
                method: 'POST',
                data: JSON.stringify({
                    projectId: projectId
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);
                }
            });
            showRemarksModal(projectId);
        }
        
    });
    $(document).on('click', '.enterRemarksByL1',  function() {
        var projectId = $(this).closest("tr").find(".projectId").text();
        showRemarksModal(projectId);
    });
    $(document).on('click', '.enterRemarksByL2',  function() {
        var projectId = $(this).closest("tr").find(".projectId").text();
        showRemarksModal(projectId);
    });

    $(document).on('click', '.approveForProjectsByL2', function() {
        var projectId = $(this).closest("tr").find(".projectId").text();
        var projectName = $(this).closest('tr').find('.projectName').text();
        var confirmation = confirm('Are you sure you want to approve project request corresponding to id ' 
            + projectId + '?');
        var status = $(this).closest("tr").find("#status");
        if(confirmation == true) {
            var flag = 0;
            $(this).prop('disabled', true);
            $(status).html('Approved by L2');
            $.ajax({
                url: '/admin/approveForProjectsByL2',
                method: 'POST',
                data: JSON.stringify({
                    projectId: projectId
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);
                }
            });
            showRemarksModal(projectId);
        }
    });

    $(document).on('click', '.rejectForProjectsByL1', function() {
        var projectId = $(this).closest("tr").find(".projectId").text();
        var approveButton = $(this).closest("tr").find(".approveForProjectsByL1");
        var confirmation = confirm('Are you sure you want to reject project request corresponding to id ' + projectId + '?');
        var status = $(this).closest("tr").find("#status");
        if(confirmation == true) {
            $(this).prop('disabled', true);
            $(approveButton).prop('disabled', false);
            $(status).html('Rejected by L1');
            $.ajax({
                url: '/admin/rejectForProjectsByL1',
                method: 'POST',
                data: JSON.stringify({
                    projectId: projectId
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);
                }
            });
            showRemarksModal(projectId);
        }
    });
    $(document).on('click', '.rejectForProjectsByL2', function() {
        var projectId = $(this).closest("tr").find(".projectId").text();
        var approveButton = $(this).closest("tr").find(".approveForProjectsByL2");
        var confirmation = confirm('Are you sure you want to reject project request corresponding to id ' + projectId + '?');
        var status = $(this).closest("tr").find("#status");
        if(confirmation == true) {
            $(this).prop('disabled', true);
            $(approveButton).prop('disabled', false);
            $(status).html('Rejected by L2');
            $.ajax({
                url: '/admin/rejectForProjectsByL2',
                method: 'POST',
                data: JSON.stringify({
                    projectId: projectId
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);
                }
            });
            showRemarksModal(projectId);
        }
    });

    $(document).on('click', '#submitRemarks', function() {
        var remark = document.getElementById('remarksByAdmin').value;
        var projectId = document.getElementById('projectIdForRemark').innerHTML;
        $.ajax({
            url: '/admin/enterRemarksForProjects',
            method: 'POST',
            data: JSON.stringify({
                remark: remark,
                projectId: projectId
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                
            }
        });
        var remarksModal = document.getElementById('remarksModal');
        $("#remarksByAdmin").val('');
        $('#projectIdForRemark').html('');
        remarksModal.style.display='none';
    });

    // $(document).on('click', '#mailForProjects', function() {
    //     $.ajax({
    //         url: '/admin/mailForProjects',
    //         method: 'POST',
    //         data: JSON.stringify({
    //             msg: 'SendMailForProjects'
    //         }),
    //         contentType: 'application/json',
    //         dataType: 'json',
    //         success: function (data, status) {
    //             alert(data.msg);
    //         }
    //     });
    // });

    $(document).on('click', '.markAsComplete', function () {
        var projectId = $(this).closest('tr').find('.projectId').text();
        var status = $(this).closest('tr').find('#status');
        var confirmation = confirm('Are ypu sure you want to mark the project with id ' + projectId + ' as Completed?');
        if(confirmation == true) {
            $(this).prop('disabled', true);
            $(status).html('Completed');
            $.ajax({
                url: '/admin/markAsComplete',
                method: 'POST',
                data: JSON.stringify({
                    projectId: projectId
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);
                }
            });
        }
    });

    $(document).on('click', '.beginProject', function () {
        var projectId = $(this).closest('tr').find('.projectId').text();
        var projectName = $(this).closest('tr').find('.projectName').text();
        var status = $(this).closest('tr').find('#status');
        var selectedRow = $(this).parent().parent();
        var confirmation = confirm('Are you sure you want to mark the project ' + projectId + ' as Ongoing and send a mail?');
        if(confirmation == true) {
            //$(this).prop('disabled', true);
            // $(status).html('Completed');
            $.ajax({
                url: '/admin/beginProject',
                method: 'POST',
                data: JSON.stringify({
                    projectId: projectId
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data, status) {
                    alert(data.msg);
                    if( data.msg != 'Error') {
                        selectedRow.remove();
                        $('#completedOrOngoingProjects tbody').append('<tr><td><a href="#"><span class="projectId">' + projectId +
                        '</span></a></td><td><span class="projectName">' + projectName + '</span></td><td><button type="button" class="markAsComplete btn btn-success">MARK</button></td><td><span id="status">Ongoing</span></td><td><span id="lastUpdater">' + data.updater + '</span></td>');
                    }
                }
            });
        }       
    });
});    