$(document).ready(function() {
    $(document).on('submit', '#annualReportForm', function (event) {
        event.preventDefault();

        var name = document.getElementById('annualReportForm').elements.namedItem('fileName');
        var year = document.getElementById('annualReportForm').elements.namedItem('reportYear');
        var file = $('#reportFile').get(0).files[0];
        var msgBody = document.getElementById('fileSubmissionMsg');
        
        if (!file) {
            msgBody.innerHTML = 'File Field is empty';
            name.value = '';
            year.value = '';
            $('#reportFile').val('');
            hideMsg(msgBody);
            return;
        } 
        else if ( name.value == '' || year.value == '') {
            msgBody.innerHTML = 'Enter All Fields';
            hideMsg(msgBody);
            return;
        }
        else if (parseInt(year.value) <= 0){
            msgBody.innerHTML = 'Enter a valid year';
            hideMsg(msgBody);
            return;   
        }
        else if ( file.type != 'application/pdf'){
            msgBody.innerHTML = 'Enter a pdf file';
            $('#reportFile').val('');
            hideMsg(msgBody);
            return;
        }
        else if ( file.size > 1024 * 1024 * 10){
            msgBody.innerHTML = 'File too big';
            $('#reportFile').val('');
            hideMsg(msgBody);
            return;
        }
        else {
            var form = $('#annualReportForm')[0];
            var data = new FormData(form);

            $.ajax({
                url: '/admin/uploadAnnualReport',
                method: 'POST',
                data: data,
                enctype: 'multipart/form-data',

                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                dataType: "json",

                success: function(data, status) {
                    alert(data.msg);
                    var msgBody = document.getElementById('fileSubmissionMsg');
                    msgBody.innerHTML = data.msg;
                    name.value = '';
                    year.value = '';
                    $('#resourceImage').val('');
                    hideMsg(msgBody);
                },

                error: function (err) {
                    var msgBody = document.getElementById('fileSubmissionMsg');
                    msgBody.innerHTML = err.msg;
                    hideMsg(msgBody);
                }
            });
        }
    });
});