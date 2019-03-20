// $(document).ready(function() {
//     $('#submitTestimonial').on('click', () => {
//         let name = $('#userName').val();
//         let review = $('#useReview').val();
        
//         if(name == '' || review == '') {
//             alert('Enter the required fields!')
//             return;
//         } else if(!isNaN(name)) {
//             alert('Enter a proper name!');
//             return;
//         } else {
//             $.ajax( {
//                 url: '/sendTestimonial',
//                 method: 'POST',
//                 data: JSON.stringify({
//                     name: name,
//                     review: review
//                 }),
//                 contentType: "application/json",
//                 dataType: "json",
//                 error : function(err) {
//                     alert('Error submitting the form!');
//                     console.log(err);
//                 },
//                 success: function(data,status) {
//                     alert('Status: ', status);
//                     $('#userName').val('');
//                     $('#userReview').val('');
//                     $('#userName').text('');
//                     $('#userReview').text('');
//                 }
//             });
//         }
//     });
// }) 

$(document).on('click', '.removeTestimonial', function() {
    var testimonialId = $(this).closest("tr").find(".testimonialId").text();
    var confirmation = confirm('Are you sure you want to delete request corresponding to id ' + testimonialId + '?');
    if(confirmation == true) {
        $.ajax({
            url: '/removeTestimonial',
            method: 'POST',
            data: JSON.stringify({
                testimonialId: testimonialId
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data, status) {
                alert(data.msg);

            }

        });
        $(this).parent().parent().remove();
    }
});