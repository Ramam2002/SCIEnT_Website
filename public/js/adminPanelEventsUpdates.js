$(document).on('click','#addUpdate',function(){
	var update = document.getElementById('update').value;
	$.ajax({
                url: '/admin/addUpdate',
                method: 'POST',
                data: JSON.stringify({
                    updateDetails:update
                }),
                contentType: "application/json",
                dataType: "json",
                success: function(data, status) {
                    alert(data.msg);      
                    $('#update').val('');
                    $('#updateTable').append('<tr>' +'<td>'+data.id+'</td>'+'<td>'+ update + '</td>'+'<td><span class="delUpdate fa fa-close" style="color:red;cursor:pointer;" id="'+data.id+'"></span></td>'+'</tr>');
                   
                }

});
	
});

$(document).on('click','#addEvent',function(){
	var event = document.getElementById('event').value;
	$.ajax({
                url: '/admin/addEvent',
                method: 'POST',
                data: JSON.stringify({
                    eventDetails:event
                }),
                contentType: "application/json",
                dataType: "json",
                success: function(data, status) {
                    alert(data.msg);      
                    $('#event').val('');
                    $('#eventTable').append('<tr>' +'<td>'+data.id+'</td>'+'<td>'+ event + '</td>'+'<td><span class="delEvent fa fa-close" style="color:red;cursor:pointer;" id="'+data.id+'"></span></td>'+'</tr>');
                   
                }

});

});
$(document).on('click','.delUpdate',function(){
	var update = this.id;
	 $.ajax({
        url: '/admin/delUpdate',
        method: 'POST',
        data: JSON.stringify({
            id:update
        }),
        contentType: "application/json",
        dataType: "json",
        success: function(data, status) {
            alert(data.msg);
            $('#' + update).parent().parent().remove();
            
        }
    })
   
})

$(document).on('click','.delEvent',function(){
	var event = this.id;
	 $.ajax({
        url: '/admin/delEvent',
        method: 'POST',
        data: JSON.stringify({
            id:event
        }),
        contentType: "application/json",
        dataType: "json",
        success: function(data, status) {
            alert(data.msg);
            $('#' + event).parent().parent().remove();
            
        }
    })
   
})

