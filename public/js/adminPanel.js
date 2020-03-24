function showModal() {
  document.getElementById("infoModal").style.display = "block";
}

function showRemarksModal(projectId) {
  document.getElementById("projectIdForRemark").innerHTML = projectId;
  document.getElementById("remarksModal").style.display = "block";
}

function showHallBookingModal(bookingId, requestedStartTime, requestedEndTime) {
  document.getElementById("bookingIdForApproval").innerHTML = bookingId;
  document.getElementById("approvedStartTime").value = requestedStartTime;
  console.log(requestedStartTime);
  document.getElementById("approvedEndTime").value = requestedEndTime;
  console.log(requestedEndTime);
  document.getElementById("hallBookingModal").style.display = "block";
}

function showAddProductModal() {
  document.getElementById("addProductModal").style.display = "block";
}

function showEditProductModal() {
  document.getElementById("editProductModal").style.display = "block";
}

function showAddNewVendorModal() {
  document.getElementById("addNewVendorModal").style.display = "block";
}

function showEditAccessModal() {
  document.getElementById("editAccessModal").style.display = "block";
}

function vendorDetailsModal(
  vendorName,
  vendorEmail,
  vendorAddress,
  vendorPhone
) {
  document.getElementById("vendorNameForInfo").innerHTML = vendorName;
  document.getElementById("vendorEmailForInfo").innerHTML = vendorEmail;
  document.getElementById("vendorAddressForInfo").innerHTML = vendorAddress;
  document.getElementById("vendorPhoneForInfo").innerHTML = vendorPhone;
  document.getElementById("vendorModal").style.display = "block";
}
var delAdminName;

function closeDelModal() {
  document.getElementById("delAdminModal").style.display = "none";
  delAdminName = undefined;
}

function showDelModal() {
  document.getElementById("delAdminModal").style.display = "none";

  $.ajax({
    url: "/admin/delAdmin",
    method: "POST",
    data: JSON.stringify({
      adminName: delAdminName
    }),
    contentType: "application/json",
    dataType: "json",
    success: function(data, status) {
      alert(data.msg);
      var msgBody = document.getElementById("addAdminMsg");
      msgBody.innerHTML = data.msg;
      hideMsg(msgBody);
    }
  });
  $("#" + delAdminName)
    .parent()
    .parent()
    .remove();
}

$(document).ready(function() {
  $("#closeModal").click(function() {
    var infoModal = document.getElementById("infoModal");
    $("#infoList").empty();
    infoModal.style.display = "none";
  });
  $("#closeRemarksModal").click(function() {
    var remarksModal = document.getElementById("remarksModal");
    $("#remarksByAdmin").val("");
    $("#projectIdForRemark").html("");
    remarksModal.style.display = "none";
  });
  $("#closeEditAccessModal").click(function() {
    var editAccessModal = document.getElementById("editAccessModal");
    $("#editAccessApplicantId").val("");
    editAccessModal.style.display = "none";
  });

  $("#closeHallBookingModal").click(function() {
    var hallBookingModal = document.getElementById("hallBookingModal");
    $("#approvedStartTime").val("");
    $("#approvedEndTime").val("");
    $("#bookingIdForApproval").html("");
    hallBookingModal.style.display = "none";
  });
  $("#closeHallBookingModal").click(function() {
    var hallBookingModal = document.getElementById("hallBookingModal");
    $("#approvedStartTime").val("");
    $("#approvedEndTime").val("");
    $("#bookingIdForApproval").html("");
    hallBookingModal.style.display = "none";
  });

  $("#closeAddProductModal").click(function() {
    var addProductModal = document.getElementById("addProductModal");
    $("#productCode").val("");
    $("#descriptionInventory").val("");
    $("#unit").val("");
    $("#quantity").val("");
    $("#price").val("");
    $("#vendorName").val("");
    $("#BillNumber").val("");
    $("#BillDate").val("");
    $("#BillDescription").val("");
    $("#BillUnit").val("");
    $("#BillQuantity").val("");
    $("#BillAmount").val("");
    $("#newProductRemarks").val("");
    addProductModal.style.display = "none";
  });
  $("#closeAddNewVendorModal").click(function() {
    var addNewVendorModal = document.getElementById("addNewVendorModal");
    $("#vendorName").val("");
    $("#vendorEmail").val("");
    $("#vendorAddress").val("");
    $("#vendorPhone").val("");
    addNewVendorModal.style.display = "none";
  });
  $("#closeEditProductModal").click(function() {
    var editProductModal = document.getElementById("editProductModal");
    $("#editProductCode").val("");
    $("#editDescriptionInventory").val("");
    $("#editUnit").val("");
    $("#editQuantity").val("");
    $("#editPrice").val("");
    $("#editVendorName").val("");
    $("#editVendorEmail").val("");
    $("#editVendorAddress").val("");
    $("#editVendorPhone").val("");
    $("#editBillNumber").val("");
    $("#editBillDate").val("");
    $("#editBillDescription").val("");
    $("#editBillUnit").val("");
    $("#editBillQuantity").val("");
    $("#editBillAmount").val("");
    $("#editProductRemarks").val("");
    editProductModal.style.display = "none";
  });

  $(document).on("click", ".delAdmin", function() {
    document.getElementById("delAdminModal").style.display = "block";

    delAdminName = this.id;
    console.log(delAdminName);
  });

  $(document).on("click", "#addAdmin", function() {
    var adminName = document.getElementById("userName").value;
    var adminPassword = document.getElementById("adminPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var adminLevel = document.getElementById("adminLevel").value;
    var msgBody = document.getElementById("addAdminMsg");
    if (adminPassword != confirmPassword) {
      msgBody.innerHTML = "Passwords do not match";
      $("#adminPassword").val("");
      $("#confirmPassword").val("");
      hideMsg(msgBody);
      return;
    } else if (
      adminName == "" ||
      adminPassword == "" ||
      confirmPassword == ""
    ) {
      msgBody.innerHTML = "Enter All Fields";
      hideMsg(msgBody);
      return;
    } else {
      $.ajax({
        url: "/admin/addAdmin",
        method: "POST",
        data: JSON.stringify({
          adminName: adminName,
          password: adminPassword,
          adminLevel: adminLevel
        }),
        contentType: "application/json",
        dataType: "json",
        success: function(data, status) {
          alert(data.msg);
          var msgBody = document.getElementById("addAdminMsg");
          msgBody.innerHTML = data.msg;
          $("#userName").val("");
          $("#adminPassword").val("");
          $("#confirmPassword").val("");
          hideMsg(msgBody);
        }
      });
      if (adminLevel == "Two") {
        $("#levelTwoAdminsList").append("<li>" + adminName + "</li>");
      } else if (adminLevel == "One") {
        $("#levelOneAdminsList").append("<li>" + adminName + "</li>");
      }
    }
  });
});
$(document).on("click", "#changePassword", function() {
  var currentPassword = document.getElementById("currentPassword").value;
  var newPassword = document.getElementById("newPassword").value;
  var confirmPassword1 = document.getElementById("confirmPassword1").value;
  var msgBody = document.getElementById("passwordChangeMsg");
  if (newPassword != confirmPassword1) {
    msgBody.innerHTML = "Passwords do not match";
    $("#currentPassword").val("");
    $("#confirmPassword1").val("");
    $("#newPassword").val("");
    hideMsg(msgBody);
    return;
  } else if (
    currentPassword == "" ||
    confirmPassword1 == "" ||
    newPassword == ""
  ) {
    msgBody.innerHTML = "Enter All Fields";
    hideMsg(msgBody);
    return;
  } else {
    $.ajax({
      url: "/admin/changePassword",
      method: "POST",
      data: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword
      }),
      contentType: "application/json",
      dataType: "json",
      success: function(data, status) {
        alert(data.msg);
        var msgBody = document.getElementById("passwordChangeMsg");
        msgBody.innerHTML = data.msg;
        $("#userName1").val("");
        $("#currentPassword").val("");
        $("#newPassword").val("");
        $("#confirmPassword1").val("");
        hideMsg(msgBody);
      }
    });
  }
});

function hideMsg(msgBody) {
  setTimeout(function() {
    msgBody.innerHTML = "";
  }, 5000);
}
