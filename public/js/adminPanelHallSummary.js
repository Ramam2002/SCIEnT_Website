var approvedRequestButton;
$(document).ready(function() {
  $(document).on("click", "#choice", function() {
    var month = document.getElementById("months").value;
    var year = document.getElementById("years").value;
    console.log(month + year);
    $.ajax({
      url: "/admin/getHallSummary",
      method: "POST",
      data: JSON.stringify({
        month: month,
        year: year,
        name: "Anjaneya Tripathi"
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
          console.log(
            "Month:month" + m + ":" + month + "/" + "Year:year" + y + ":" + year
          );
          if (month == "0" && year == "0") {
            console.log(item.name);
            $("#infoList").append(
              '<div><a href="#"><span class="bookingId">' +
                item.id +
                '</span></a><p ><span class="applicantRoll">' +
                item.roll +
                " " +
                '</span><span class="applicantName">' +
                item.name +
                '</span></p><p ><span class="applicantDate">' +
                d +
                "/" +
                (m + 1) +
                "/" +
                y +
                " " +
                '</span><span class="applicantRequestedStartTime">' +
                item.startTime +
                '</span></p><p ><span class="applicantDate">' +
                D +
                "/" +
                (M + 1) +
                "/" +
                Y +
                " " +
                '</span><span class="applicantRequestedEndTime">' +
                item.endTime +
                '</span></p><P ><span class="applicantRequestedEndTime">' +
                item.hallnumber +
                "</span></p></div>"
            );
            showModal();
          } else if (month == "0") {
            if (y == year) {
              console.log(item.name);
              $("#infoList").append(
                '<div><a href="#"><span class="bookingId">' +
                  item.id +
                  '</span></a><p ><span class="applicantRoll">' +
                  item.roll +
                  " " +
                  '</span><span class="applicantName">' +
                  item.name +
                  '</span></p><p ><span class="applicantDate">' +
                  d +
                  "/" +
                  (m + 1) +
                  "/" +
                  y +
                  " " +
                  '</span><span class="applicantRequestedStartTime">' +
                  item.startTime +
                  '</span></p><p ><span class="applicantDate">' +
                  D +
                  "/" +
                  (M + 1) +
                  "/" +
                  Y +
                  " " +
                  '</span><span class="applicantRequestedEndTime">' +
                  item.endTime +
                  '</span></p><P ><span class="applicantRequestedEndTime">' +
                  item.hallnumber +
                  "</span></p></div>"
              );
              showModal();
            } else {
              x++;
            }
          } else if (year == "0") {
            if (m === month - 1) {
              console.log(item.name);
              $("#infoList").append(
                '<div><a href="#"><span class="bookingId">' +
                  item.id +
                  '</span></a><p ><span class="applicantRoll">' +
                  item.roll +
                  " " +
                  '</span><span class="applicantName">' +
                  item.name +
                  '</span></p><p ><span class="applicantDate">' +
                  d +
                  "/" +
                  (m + 1) +
                  "/" +
                  y +
                  " " +
                  '</span><span class="applicantRequestedStartTime">' +
                  item.startTime +
                  '</span></p><p ><span class="applicantDate">' +
                  D +
                  "/" +
                  (M + 1) +
                  "/" +
                  Y +
                  " " +
                  '</span><span class="applicantRequestedEndTime">' +
                  item.endTime +
                  '</span></p><P ><span class="applicantRequestedEndTime">' +
                  item.hallnumber +
                  "</span></p></div>"
              );
              showModal();
            } else {
              x++;
            }
          } else if (year == y && m == month - 1) {
            console.log("MATCH" + item.name);
            $("#hallBookingSummary").append(
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
                "</tr>"
            );
            //showModal();
          } else {
            x++;
            console.log("Babaji ka Thullu!" + x);
          }
          console.log(x + "//" + z);
          if (x === z) {
            console.log("POPAT");
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
