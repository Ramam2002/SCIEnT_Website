function validateForm () {
    var name = document.getElementById("name").value;
    var contact = document.getElementById("contact").value;
    var email = document.getElementById("email").value;
    var amount = document.getElementById("amount").value;

    if ((name.match(/([^a-zA-Z. ])+/)) != null) {
        alert("No special characters in name");
        return false;
    }
    if (contact.length != 10) {
        alert("Enter a valid Contact number");
        return false;
    }
    if ((contact.match(/([^0-9])+/)) != null) {
        alert("Enter a 10 digit number");
        return false;
    }

    var amount_regex  = /^\d+(?:\.\d{0,2})$/;
    if (!amount_regex.test(amount)) {
        alert("Number is invalid");
        return false;
    }

    var emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!emailTest) {
        alert("Enter valid email");
        return false;
    }
    return true;
}