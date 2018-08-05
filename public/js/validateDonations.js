function validateDonationsForm () {
    var name = document.getElementById("name").value;
    var contact = document.getElementById("contact").value;
    var email = document.getElementById("email").value;
    var amount = document.getElementById("amount").value;
    var errorMsg = document.getElementById("donationsFormMsg");
   
    if ((name.match(/([^a-zA-Z. ])+/)) != null) {
        // alert("No special characters in name");
        errorMsg.innerHTML = "No special characters in name";
        hideDonationsErrorMsg(errorMsg);
        return false;
    }
    if (contact.length != 10) {
        // alert("Enter a valid Contact number");
        errorMsg.innerHTML = "Enter a valid Contact number";
        hideDonationsErrorMsg(errorMsg);
        return false;
    }
    if ((contact.match(/([^0-9])+/)) != null) {
        // alert("Enter a 10 digit number");
        errorMsg.innerHTML = "Enter a 10 digit number";
        hideDonationsErrorMsg(errorMsg);
        return false;
    }

    var amount_regex  = /^\d+(?:\.\d{0,2})$/;
    if (!amount_regex.test(amount)) {
        // alert("Number is invalid");
        errorMsg.innerHTML = "Amount is invalid";
        hideDonationsErrorMsg(errorMsg);
        return false;
    }

    var emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!emailTest) {
        // alert("Enter valid email");
        errorMsg.innerHTML = "Enter valid email";
        hideDonationsErrorMsg(errorMsg);
        return false;
    }
    return true;
}
function hideDonationsErrorMsg(errorMsg) {
    setTimeout(function() {
        errMsgBody.innerHTML = '';
    },5000);
}