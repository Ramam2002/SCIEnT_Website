var approvedRequestButton;
$(document).ready(function() {
  $(document).on("click", "#choice", function() {
    var month = document.getElementById("months").value;
    var year = document.getElementById("years").value;
    console.log(month + year);
    $.ajax({
      url: "/admin/getHallSummary",
      method: "get",
      data: JSON.stringify({
        month: month,
        year: year
      }),
      contentType: "application/json",
      dataType: "json",
      success: function(data, status) {
        alert(data);
        console.log(data);
        showModal();
      }
    });
  });
});
