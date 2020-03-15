function validateForm () {
	var name = document.getElementById("name").value;
	var roll = document.getElementById("rollNo").value;
	var contact = document.getElementById("contact").value;
	var email = document.getElementById("email").value;
	var checkbox = document.getElementById("termsCheckbox");
	var errMsgBody = document.getElementById("hallBookingErrorMsg");
	var hallnumber = document.getElementById("hallnumber").value;
	var startDate = document.getElementById("startDate").value;
	var startTime = document.getElementById("startTime").value;
	var endDate = document.getElementById("endDate").value;
	var endTime = document.getElementById("endTime").value;
	var start = startDate + " " + startTime + ":00";
	var end = endDate + " " + endTime + ":00";
	start = start.split(/[- :]/);
	end = end.split(/[- :]/);
	var start_date = new Date(Date.UTC(start[0], start[1]-1, start[2], start[3], start[4], start[5]));
	var end_date = new Date(Date.UTC(end[0], end[1]-1, end[2], end[3], end[4], end[5]));
	var start_time = start_date.getTime();
	var end_time = end_date.getTime();
	var now = new Date().getTime();

	var emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);

	if(start_time < now || end_time < now) {
		//alert(start_date);
		errMsgBody.innerHTML = "Enter a date and time in future";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	} else if(end_time - start_time > 10800000) {
		//alert("Time duration has to be less than or equal to 3 hours");
		errMsgBody.innerHTML = "Duration cannot be more than 3 hours";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	} else if ((name.match(/([^a-zA-Z. ])+/)) != null) {
		// alert("No special characters in name");
		errMsgBody.innerHTML = "No special characters in name";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	} else if (roll.length != 9) {
		// alert("");
		errMsgBody.innerHTML = "Enter a valid Roll no";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	} else if (contact.length != 10) {
		// alert("");
		errMsgBody.innerHTML = "Enter a valid Contact number";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	} else if ((contact.match(/([^0-9])+/)) != null) {
		// alert("Enter a 10 digit number");
		errMsgBody.innerHTML = "Enter a 10 digit number";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	} else if (!emailTest) {
		errMsgBody.innerHTML = "Enter valid email";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	} else if (checkbox.checked === false) {
		errMsgBody.innerHTML = "Accept the terms and conditions";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	} else {
		var result;
			$.ajax({
				url: '/availabilityOfConferenceHall',
				method: 'POST',
				data: JSON.stringify({
					hallnumber: hallnumber,
					startDate: startDate,
					startTime: startTime,
					endDate: endDate,
					endTime: endTime
				}),
				contentType: "application/json",
				dataType: "json",
				async: false,
				success: function(response) {
					if(response === false){
						errMsgBody.innerHTML = "Already Booked";
						hideHallBookingFormErrorMsg(errMsgBody);
					}
					result = response;
				}
			}).responseText;
			console.log(result);
			return result;
	}
	return true;
}
function hideHallBookingFormErrorMsg(errMsgBody) {
	 setTimeout(function() {
        errMsgBody.innerHTML = '';
    },5000);
}