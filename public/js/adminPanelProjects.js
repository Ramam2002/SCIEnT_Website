// function showModal() {
//     document.getElementById('infoModal').style.display='block';   
// }

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
                showModal();
            }
        });
    });

    $(document).on('click', '#approveForProjectsByL1', function() {
        $(this).prop('disabled',true);
        var projectId = $(this).closest("tr").find(".projectId").text();
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
    });

    $(document).on('click', '#removeForProjects', function() {
        var projectId = $(this).closest("tr").find(".projectId").text();
        var confirmation = 
        confirm('Are you sure you want to delete project request corresponding to id ' 
            + projectId + '?');
        if(confirmation == true) {
            $.ajax({
                url: '/admin/removeForProjects',
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
            $(this).parent().parent().remove();
        }
    });

});    