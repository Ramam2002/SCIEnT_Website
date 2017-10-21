function showModal () {
    document.getElementById('infoModal').style.display='block';   
}

$(document).ready (function () {
    $("#closeModal").click(function () {
        var infoModal = document.getElementById('infoModal');
        $("#infoList").empty();
        infoModal.style.display='none';
    });

    $(document).on('click', '#addAdmin', function () {
        var adminName = document.getElementById('userName').value;
        var adminPassword = document.getElementById('adminPassword').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var adminLevel = document.getElementById('adminLevel').value;
        var msgBody = document.getElementById('addAdminMsg');
        if (adminPassword != confirmPassword) {
            msgBody.innerHTML = 'Passwords do not match';
            $('#adminPassword').val('');
            $('#confirmPassword').val('');
            hideMsg(msgBody);
            return;
        } else if (adminName == '' || adminPassword == '' || confirmPassword == '') {
            msgBody.innerHTML = 'Enter All Fields';
            hideMsg(msgBody);
            return;
        }
        else {
            $.ajax( {
                url: '/admin/addAdmin',
                method: 'POST',
                data: JSON.stringify({
                    adminName: adminName,
                    password: adminPassword,
                    adminLevel: adminLevel
                }),
                contentType: "application/json",
                dataType: "json",
                success: function(data, status) {
                    alert(data.msg);
                    var msgBody = document.getElementById('addAdminMsg');
                    msgBody.innerHTML = data.msg;
                    $('#userName').val('');
                    $('#adminPassword').val('');
                    $('#confirmPassword').val('');
                    hideMsg(msgBody);
                }
            });
        }
    });

});

function hideMsg(msgBody) {
    setTimeout(function() {
        msgBody.innerHTML = '';
    },5000);
}