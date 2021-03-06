function validateForm () {
	var name = document.getElementById("name").value;
	var roll = document.getElementById("rollNo").value;
	var dept = document.getElementById("dept").value;
	var title = document.getElementById("title").value;
	var contact = document.getElementById("contact").value;
	var email = document.getElementById("email").value;
	var budget = document.getElementById("budget").value;
	var teamMemberNames = document.getElementsByClassName("mem-name");
	var teamMemberRoll = document.getElementsByClassName("mem-roll");
	var materialQuantity = document.getElementsByClassName("material-quantity");
	var materialPrice = document.getElementsByClassName("material-price");
	var servicePrice = document.getElementsByClassName("service-price");
	var checkbox = document.getElementById("termsCheckbox");
	var errMsgBody = document.getElementById("projectsFormMsg");

	if ((name.match(/([^a-zA-Z. ])+/)) != null) {
		// alert("No special characters in name");
		errMsgBody.innerHTML = "No special characters in name";
		hideMsg(errMsgBody);
		return false;
	}
	if (roll.length != 9) {
		// alert("Enter a valid Roll no");
		errMsgBody.innerHTML = "Enter a valid Roll no";
		hideMsg(errMsgBody);
		return false;
	}
	if (contact.length != 10) {
		// alert("Enter a valid Contact number");
		errMsgBody.innerHTML = "Enter a valid Contact number";
		hideMsg(errMsgBody);
		return false;
	}
	if ((contact.match(/([^0-9])+/)) != null) {
		// alert("Enter a 10 digit number");
		errMsgBody.innerHTML = "Enter a 10 digit number";
		hideMsg(errMsgBody);
		return false;
	}
	var emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);
	if (!emailTest) {
		// alert("Enter valid email");
		errMsgBody.innerHTML = "Enter valid email";
		hideMsg(errMsgBody);
		return false;
	}
	var budgetTest = /^[0-9]+$/.test(budget)
	if (!budgetTest) {
		// alert("Enter a valid budget");
		errMsgBody.innerHTML = "Enter a valid budget";
		hideMsg(errMsgBody);
		return false;
	}
	for (i = 0; i < teamMemberNames.length; i++) {
		memName = teamMemberNames[i].value
		if ((memName.match(/([^a-zA-Z. ])+/)) != null) {
			// alert("No special characters in name");
			errMsgBody.innerHTML = "No special characters in name";
			hideMsg(errMsgBody);
			return false;
		}
	}
	for (i = 0; i < teamMemberRoll.length; i++) {
		memRoll = teamMemberRoll[i].value;
		if (memRoll.length != 9) {
			// alert("Enter a valid Roll no");
			errMsgBody.innerHTML = "Enter a valid Roll no";
			hideMsg(errMsgBody);
			return false;
		}
	}
	for (i = 0; i < materialQuantity.length; i++) {
		quantity = materialQuantity[i].value;
		var quantityTest = /^[0-9]+$/.test(quantity);
		if (!quantityTest) {
			// alert("Enter a valid quantity");
			errMsgBody.innerHTML = "Enter a valid quantity";
			hideMsg(errMsgBody);
			return false;
		}
	}
	for (i = 0; i < materialPrice.length; i++) {
		price = materialPrice[i].value;
		priceTest = /^[0-9]+$/.test(price);
		if (!priceTest) {
			// alert("Enter a valid price");
			errMsgBody.innerHTML = "Enter a valid price";
			hideMsg(errMsgBody);
			return false;
		}
	}
	for (i = 0; i < servicePrice.length; i++) {
		price = servicePrice[i].value;
		priceTest = /^[0-9]+$/.test(price);
		if (!priceTest) {
			// alert("Enter a valid price");
			errMsgBody.innerHTML = "Enter a valid price";
			hideMsg(errMsgBody);
			return false;
		}
	}
	if (checkbox.checked === false) {
		errMsgBody.innerHTML = "Accept the terms and conditions";
		hideMsg(errMsgBody);
		return false;
	}
	return true;
}
function hideMsg(errMsgBody) {
	setTimeout(function() {
        errMsgBody.innerHTML = '';
    },5000);
}