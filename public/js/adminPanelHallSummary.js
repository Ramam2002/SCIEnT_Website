$(document).ready(function() {
  $(document).on("click", "#choice", function() {
    var month = document.getElementById("months").value;
    var year = document.getElementById("years").value;
    console.log(month + year);
    $("#hallBookingSummary")
      .find("tr:gt(1)")
      .remove();
    $.ajax({
      url: "/admin/getHallSummary",
      method: "POST",
      data: JSON.stringify({
        month: month,
        year: year
      }),
      contentType: "application/json",
      dataType: "json",
      success: function(data, status) {
        var x = 0;
        var z = data.length;
        console.log("LENGTH" + z);
        data.forEach(item => {
          var date = new Date(item.startDate);
          var d = date.getDate();
          var m = date.getMonth();
          var y = date.getUTCFullYear();
          var DATE = new Date(item.startDate);
          var D = DATE.getDate();
          var M = DATE.getMonth();
          var Y = DATE.getUTCFullYear();
          var rowCount = $("#hS tr").length;
          console.log(rowCount);
          //console.log(
          //  "Month:month" + m + ":" + month + "/" + "Year:year" + y + ":" + year
          //);
          if (month == "0" && year == "0") {
            //console.log(item.name);
            $("#hS").append(
              "<tr>" +
                "<td >" +
                '<a href="#">' +
                '<span class="bookingId">' +
                item.id +
                "</span>" +
                "</a>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRoll">' +
                item.roll +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantName">' +
                item.name +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantDate">' +
                d +
                "/" +
                (m + 1) +
                "/" +
                y +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedStartTime">' +
                item.startTime +
                "</span></td>" +
                "<td >" +
                '<span class="applicantDate">' +
                D +
                "/" +
                (M + 1) +
                "/" +
                Y +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedEndTime">' +
                item.endTime +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedEndTime">' +
                item.hallnumber +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedEndTime">' +
                item.purpose +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedEndTime">' +
                item.attendeesNumber +
                "</span>" +
                "</td>" +
                "</tr>"
            );
          } else if (month == "0") {
            if (y == year) {
              //console.log(item.name);
              $("#hS").append(
                "<tr>" +
                  "<td >" +
                  '<a href="#">' +
                  '<span class="bookingId">' +
                  item.id +
                  "</span>" +
                  "</a>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRoll">' +
                  item.roll +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantName">' +
                  item.name +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantDate">' +
                  d +
                  "/" +
                  (m + 1) +
                  "/" +
                  y +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedStartTime">' +
                  item.startTime +
                  "</span></td>" +
                  "<td >" +
                  '<span class="applicantDate">' +
                  D +
                  "/" +
                  (M + 1) +
                  "/" +
                  Y +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedEndTime">' +
                  item.endTime +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedEndTime">' +
                  item.hallnumber +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedEndTime">' +
                  item.purpose +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedEndTime">' +
                  item.attendeesNumber +
                  "</span>" +
                  "</td>" +
                  "</tr>"
              );
            } else {
              x++;
            }
          } else if (year == "0") {
            if (m === month - 1) {
              //console.log(item.name);
              $("#hS").append(
                "<tr>" +
                  "<td >" +
                  '<a href="#">' +
                  '<span class="bookingId">' +
                  item.id +
                  "</span>" +
                  "</a>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRoll">' +
                  item.roll +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantName">' +
                  item.name +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantDate">' +
                  d +
                  "/" +
                  (m + 1) +
                  "/" +
                  y +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedStartTime">' +
                  item.startTime +
                  "</span></td>" +
                  "<td >" +
                  '<span class="applicantDate">' +
                  D +
                  "/" +
                  (M + 1) +
                  "/" +
                  Y +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedEndTime">' +
                  item.endTime +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedEndTime">' +
                  item.hallnumber +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedEndTime">' +
                  item.purpose +
                  "</span>" +
                  "</td>" +
                  "<td >" +
                  '<span class="applicantRequestedEndTime">' +
                  item.attendeesNumber +
                  "</span>" +
                  "</td>" +
                  "</tr>"
              );
            } else {
              x++;
            }
          } else if (year == y && m == month - 1) {
            //console.log("MATCH" + item.name);
            $("#hS").append(
              "<tr>" +
                "<td >" +
                '<a href="#">' +
                '<span class="bookingId">' +
                item.id +
                "</span>" +
                "</a>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRoll">' +
                item.roll +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantName">' +
                item.name +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantDate">' +
                d +
                "/" +
                (m + 1) +
                "/" +
                y +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedStartTime">' +
                item.startTime +
                "</span></td>" +
                "<td >" +
                '<span class="applicantDate">' +
                D +
                "/" +
                (M + 1) +
                "/" +
                Y +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedEndTime">' +
                item.endTime +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedEndTime">' +
                item.hallnumber +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedEndTime">' +
                item.purpose +
                "</span>" +
                "</td>" +
                "<td >" +
                '<span class="applicantRequestedEndTime">' +
                item.attendeesNumber +
                "</span>" +
                "</td>" +
                "</tr>"
            );
          } else {
            x++;
          }
          console.log(x + "//" + z);
          if (x === z) {
            $("#infoList").append(
              "<h2>NO ROOM BOOKED FOR THE SELECTED TIME DURATION</h2>"
            );
            showModal();
          }
        });
      }
    });
  });
});
