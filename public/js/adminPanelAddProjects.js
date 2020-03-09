
$(document).ready( function (){
    $(document).on('click','#addProject', function(){
        var projectTitle = $("#projectName").val();
        var projectDesc = $("#projectDesc").val();
        var projectImage = $("#projectImage").val();
        var year = $('#year').val();
       
        console.log(year, projectDesc, projectTitle);
    
        var file = $("#projectImage").get(0).files[0];
        var msgBody = document.getElementById('addProjectFormMsg');


        if (!file) {
            msgBody.innerHTML = 'Image Field is empty';
            hideMsg(msgBody);
            return;
        } 
        else if ( projectTitle == '' || projectDesc == '' || year == '') {
            msgBody.innerHTML = 'Enter All Fields';
            hideMsg(msgBody);
            return;
        }

        else if ( file.type != 'image/jpeg' && file.type != 'image/png'){
            msgBody.innerHTML = 'Enter an image file';
            $('#projectImage').val('');
            hideMsg(msgBody);
            return;
        }
        else if ( file.size > 1024 * 1024 * 5){
            msgBody.innerHTML = 'File too big';
            $('#projectImage').val('');
            hideMsg(msgBody);
            return;
        }
        else {
            
            var fd = new FormData();
            fd.append('projectImage', $("#projectImage").get(0).files[0]);
            fd.append('projectTitle',projectTitle);
            fd.append('projectDesc',projectDesc);
            fd.append('year', year);

            console.log(fd);
            console.log(projectTitle,projectDesc);
            
            var confirmation = confirm("Are sure you want to add this?");
            
            if(confirmation == true){
                console.log(projectDesc,projectImage);
               
                $.ajax({
                    url: "/admin/addAdminProjects",
                    method: 'POST',
                    data: fd,
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    timeout: 600000,
                    processData: false,
                    contentType: false,
                    success: function(data, status) {
                        console.log('success');
                        alert(data.msg);
                        var msgBody = document.getElementById('addProjectFormMsg');
                        msgBody.innerHTML = data.msg+' Refresh the page to see the newly added projects!';
                        $("#projectName").val('');
                        $('#projectImage').val('');
                        $("#projectDesc").val('');
                        $("#year").val('');
                        hideMsg(msgBody);
                    },
                    error: function (err) {
                        var msgBody = document.getElementById('addProjectFormMsg');
                        msgBody.innerHTML = "AJAX error" + err.msg;
                        hideMsg(msgBody);
                    }
                });
            } else{
                console.log("sry");
            }
        }

    });

    $(document).on('click','.delProject',function(){
    var id = this.id;
    
    $.ajax({
        url: '/admin/delProject',
        method: 'POST',
        data: JSON.stringify({
            id:id
        }),
        contentType: "application/json",
        dataType: "json",
        success: function(data, status) {
            alert(data.msg);
            $('#' + id).parent().parent().remove();
            
        }
    })
})


});

    