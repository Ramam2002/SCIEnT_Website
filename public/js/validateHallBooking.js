function validateForm () {
	var name = document.getElementById("name").value;
	var roll = document.getElementById("rollNo").value;
	var contact = document.getElementById("contact").value;
	var email = document.getElementById("email").value;
	var errMsgBody = document.getElementById("hallBookingErrorMsg");
	if ((name.match(/([^a-zA-Z. ])+/)) != null) {
		// alert("No special characters in name");
		errMsgBody.innerHTML = "No special characters in name";
		hideFaciltiesFormErrorMsg(errMsgBody);
		return false;
	}
	if (roll.length != 9) {
		// alert("");
		errMsgBody.innerHTML = "Enter a valid Roll no";
		hideFaciltiesFormErrorMsg(errMsgBody);
		return false;
	}
	if (contact.length != 10) {
		// alert("");
		errMsgBody.innerHTML = "Enter a valid Contact number";
		hideFaciltiesFormErrorMsg(errMsgBody);
		return false;
	}
	if ((contact.match(/([^0-9])+/)) != null) {
		// alert("Enter a 10 digit number");
		errMsgBody.innerHTML = "Enter a 10 digit number";
		hideFaciltiesFormErrorMsg(errMsgBody);
		return false;
	}
	var emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);
	if (!emailTest) {
		alert("Enter valid email");
		errMsgBody.innerHTML = "Enter valid email";
		hideHallBookingFormErrorMsg(errMsgBody);
		return false;
	}

	return true;
}
function hideHallBookingFormErrorMsg(errMsgBody) {
	 setTimeout(function() {
        errMsgBody.innerHTML = '';
    },5000);
}