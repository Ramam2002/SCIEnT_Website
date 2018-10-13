/*$(document).on('click','#addUpdate',function(){
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
	
});*/

$(document).on('click','#addEvent',function(){
	var event = document.getElementById('event').value;
    var startTime = document.getElementById('startTime').value;
    var endTime   = document.getElementById('endTime').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var startDate= startDate.slice(8,10)+'-'+startDate.slice(5,8)+startDate.slice(0,4);
    var endDate=endDate.slice(8,10)+'-'+endDate.slice(5,8)+endDate.slice(0,4);
    var start= startTime+' , '+ startDate;
    var end = endTime+' , '+endDate; 
    


	$.ajax({
                url: '/admin/addEvent',
                method: 'POST',
                data: JSON.stringify({
                    eventDetails:event,
                    startDate:startDate,
                    startTime:startTime,
                    endDate:endDate,
                    endTime:endTime
                }),
                contentType: "application/json",
                dataType: "json",
                success: function(data, status) {
                    alert(data.msg);      
                    $('#event').val('');
                    $('#eventTable').append('<tr>' +'<td>'+data.id+'</td>'+'<td>'+ event + '</td>'+'<td>'+start+'</td><td>'+end+'</td>'+'<td><span class="delEvent fa fa-close" style="color:red;cursor:pointer;" id="'+data.id+'"></span></td>'+'</tr>');

                   
                }

});

});
/*
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
   
})*/

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

/*var today = new Date();
console.log('===================');
console.log(today.getMonth());*/