$(document).on('click','#addAnnouncement',function(){
	var announcement = document.getElementById('announcement').value;
	$.ajax({
                url: '/admin/addAnnouncement',
                method: 'POST',
                data: JSON.stringify({
                    Text:announcement
                }),
                contentType: "application/json",
                dataType: "json",
                success: function(data, status) {
                    alert(data.msg);      
                    $('#announcement').val('');
                    $('#announcementTable').append('<tr>' +'<td>'+data.id+'</td>'+'<td>'+ announcement + '</td>'+'<td><span class="delAnnouncement fa fa-close" style="color:red;cursor:pointer;" id="'+'a'+data.id+'"></span></td>'+'</tr>');
                   
                }

});
	
});

$(document).on('click','#addEvent',function(){
	var event = document.getElementById('event').value;
    var startTime = document.getElementById('startTime').value;
    var endTime   = document.getElementById('endTime').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var startDateFormatted= startDate.slice(8,10)+'-'+startDate.slice(5,8)+startDate.slice(0,4);
    var endDateFormatted=endDate.slice(8,10)+'-'+endDate.slice(5,8)+endDate.slice(0,4);
    var start= startTime+' , '+ startDateFormatted;
    var end = endTime+' , '+endDateFormatted; 
    


	$.ajax({
                url: '/admin/addEvent',
                method: 'POST',
                data: JSON.stringify({
                    eventDetails:event,
                    startDate:startDate,
                    startTime:startTime,
                    endDate:endDate,
                    endTime:endTime,
                    startDateFormatted:startDateFormatted,
                    endDateFormatted:endDateFormatted
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

$(document).on('click','.delAnnouncement',function(){
    var announcement = this.id;
    $.ajax({
        url: '/admin/delAnnouncement',
        method: 'POST',
        data: JSON.stringify({
            id:announcement
        }),
        contentType: "application/json",
        dataType: "json",
        success: function(data, status) {
            alert(data.msg);
            $('#' + announcement).parent().parent().remove();
            
        }
    })
   
})