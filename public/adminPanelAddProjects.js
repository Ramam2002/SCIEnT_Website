
$(document).ready( function (){
    $(document).on('click','#addProject', function(){
        var projectTitle = $("#projectName").val();
        var projectDesc = $("#projectDesc").val();
        var projectImage = $("#projectImage").val();
        var fd = new FormData();
        fd.append('projectImage', $("#projectImage").get(0).files[0]);
        fd.append('projectTitle',projectTitle);
        fd.append('projectDesc',projectDesc);

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
                processData: false,
                contentType: false,
                error: function(data){
                    console.log("not sent")
                }
            });
        } else{
            console.log("sry");
        }
    })
});

    