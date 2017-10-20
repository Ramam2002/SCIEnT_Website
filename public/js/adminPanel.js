function showModal() {
    document.getElementById('infoModal').style.display='block';   
}


$(document).ready (function () {
	$(document).on ('click', '.applicantId', function() {
        alert(this.innerHTML);
		$.ajax({
			url: '/admin/getFacilitiesDetails',
            method: 'POST',
            data: JSON.stringify({
            	applicantId : this.innerHTML
            }),
            contentType: 'application/json',
            dataType: 'json',
	        success: function (data, status) {
                alert(data.id);
                $('#infoList').append('<li>Applicant id: ' + data.id + '</li><li>Applicant Name: ' + data.name + '</li><li>Department: ' + 
                    data.department + '</li><li>Contact Number: ' + data.contactNumber + '</li><li>Email Id: ' + data.emailID + '</li><li>Duration :' +
                    data.duration + '</li><li>Purpose: ' + data.purpose + '</li>');
                showModal();
            }
        });
    });
});
