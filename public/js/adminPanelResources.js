$(document).ready(function() {
    $(document).on('submit', '#resourceForm', function (event) {
        event.preventDefault();

        var name = document.getElementById('resourceForm').elements.namedItem('name');
        var type = document.getElementById('resourceForm').elements.namedItem('type');
        var image = $('#resourceImage').get(0).files[0];
        var msgBody = document.getElementById('resourceMsg');
        
        if (!image) {
            msgBody.innerHTML = 'Image Field is empty';
            name.value = '';
            type.value = '';
            $('#resourceImage').val('');
            hideMsg(msgBody);
            return;
        } 
        else if ( name.value == '' || type.value == '') {
            msgBody.innerHTML = 'Enter All Fields';
            hideMsg(msgBody);
            return;
        }
        else if ( image.type != 'image/jpeg' && image.type != 'image/png'){
            msgBody.innerHTML = 'Enter an image file';
            $('#resourceImage').val('');
            hideMsg(msgBody);
            return;
        }
        else if ( image.size > 1024 * 1024 * 5){
            msgBody.innerHTML = 'Image file too big';
            $('#resourceImage').val('');
            hideMsg(msgBody);
            return;
        }
        else {
            var form = $('#resourceForm')[0];
            var data = new FormData(form);

            $.ajax({
                url: '/admin/uploadResource',
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
                    var msgBody = document.getElementById('resourceMsg');
                    msgBody.innerHTML = data.msg;
                    name.value = '';
                    type.value = '';
                    $('#resourceImage').val('');
                    hideMsg(msgBody);
                },

                error: function (err) {
                    var msgBody = document.getElementById('resourceMsg');
                    msgBody.innerHTML = err.msg;
                    hideMsg(msgBody);
                }
            });
        }
    });
});