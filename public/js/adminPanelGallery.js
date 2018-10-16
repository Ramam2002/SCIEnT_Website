$(document).ready(function() {
    $(document).on('submit', '#galleryImageForm', function (event) {
        event.preventDefault();

        var name = document.getElementById('galleryImageForm').elements.namedItem('name');
        var image = $('#galleryImage').get(0).files[0];
        var msgBody = document.getElementById('galleryMsg');
        
        if (!image) {
            msgBody.innerHTML = 'Image Field is empty';
            name.value = '';
            $('#galleryImage').val('');
            hideMsg(msgBody);
            return;
        } 
        else if ( name.value == '') {
            msgBody.innerHTML = 'Enter All Fields';
            hideMsg(msgBody);
            return;
        }
        else if ( image.type != 'image/jpeg' && image.type != 'image/png'){
            msgBody.innerHTML = 'Enter an image file';
            $('#galleryImage').val('');
            hideMsg(msgBody);
            return;
        }
        else if ( image.size > 1024 * 1024 * 5){
            msgBody.innerHTML = 'Image file too big';
            $('#galleryImage').val('');
            hideMsg(msgBody);
            return;
        }
        else {
            var form = $('#galleryImageForm')[0];
            var data = new FormData(form);

            $.ajax({
                url: '/admin/uploadGallery',
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
                    var msgBody = document.getElementById('galleryMsg');
                    msgBody.innerHTML = data.msg;
                    name.value = '';
                    $('#galleryImage').val('');
                    hideMsg(msgBody);
                },

                error: function (err) {
                    var msgBody = document.getElementById('galleryMsg');
                    msgBody.innerHTML = err.msg;
                    hideMsg(msgBody);
                }
            });
        }
    });
});