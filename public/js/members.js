var members = {};

$(document).ready(function() {
    $.ajax(
        {
            url: "/data/members.json",
            success: function(result) {
                // load2018Alumni(result[2018]);
                load2019Alumni(result[2019]);
                // load2020Alumni(result[2023]);
                loadFourthYears(result[2020]);
                loadThirdYears(result[2021]);
                loadSecondYears(result[2022]);
                $('#allMembersContainer').html(members['fourthYears']+members['thirdYears']
                +members['secondYears']
                );
            }
        }
    );
});

function getHTMLString(person) {

    var classID = Math.floor(Math.random()*3);
    var className = ['green','red','blue'];
    var returnString = `<div class="member-container">
                            <div class="basic-details">
                                <img src="${person.img}" class="member-image">
                                <h3 class="member-name">${person.name}</h3>
                            </div>
                            <div class="inner-details ${className[classID]}">
                                <div class="social-info">`;

    // if (person.github_url!="") {
    //     returnString+=`<span><a href="${person.github_url}"><i id="githubLogo" class="fa fa-github textLogo"></i></a></span>`;
    // }

    if (person.linkedin_url!="") {
        returnString+=`<span class="space"><a href="${ person.linkedin_url }" style="i:hover{color: blue; cursor: pointer;}"><i id="linkedinLogo" class="fa fa-linkedin textLogo"></i></a></span>`;
    }

    returnString+=`</div></div></div>`;
    
    return returnString;
}

function loadFourthYears(fourthYears) {
    // Populate Fourth Years
    members['fourthYears'] = fourthYears.map(fourthYear => getHTMLString(fourthYear)).join('');
}

function loadThirdYears(thirdYears) {
    // Populate Third Years
    members['thirdYears'] = thirdYears.map(thirdYear => getHTMLString(thirdYear)).join('');
}

function loadSecondYears(secondYears) {
    members['secondYears'] = secondYears.map(secondYear => getHTMLString(secondYear)).join('');
}

// function load2018Alumni(alumnis2018) {
//     members['alumnis2018'] = alumnis2018.map(alumni2018 => getHTMLString(alumni2018)).join('');
// }

function load2019Alumni(alumnis2019) {
    //  Populate 2019 alumnis
    members['alumnis2019'] = alumnis2019.map(alumni2019 => getHTMLString(alumni2019)).join('');
}

// function load2020Alumni(alumnis2020) {
//     members['alumnis2020'] = alumnis2020.map(alumni2020 => getHTMLString(alumni2020)).join('');
// }

// function to highlight selected tab on batchButton
$("#batchButtons button").on("click", function() {
    var buttons = $('#batchButtons').children();
    for (button of buttons) {
        $(button).removeClass("active-batch");
    }
    $(this).addClass("active-batch");
});

// function to highlight selected tab on "allMembersButtons" Bar
$("#allMembersButtons button").on("click", function() {
    var buttons = $('#allMembersButtons').children();
    for (button of buttons) {
        $(button).removeClass("active-batch");
    }
    $(this).addClass("active-batch");
   
    // if "presentMembers" tab selected, make "all" as selected Tab on "batchButtons"
    if (this == buttons[0])
    {
        let allbuttons = $('#batchButtons').children();
        for (allbutton of allbuttons) {
            $(allbutton).removeClass("active-batch");
        }
        $(allbuttons[0]).addClass("active-batch");
    }

    //if "Alumni" tab selected, make "all" as selected Tab on "alumniButtons"
    else if (this == buttons[1])
    {
        let allbuttons = $('#alumniButtons').children();
        for (allbutton of allbuttons) {
            $(allbutton).removeClass("active-batch");
        }
        $(allbuttons[0]).addClass("active-batch");
    }
});

// function to highlight selected tab on alumniButtons Bar
$("#alumniButtons button").on("click", function() {
   var buttons = $("#alumniButtons").children();
   for (button of buttons) {
       $(button).removeClass("active-batch");
   }
   $(this).addClass("active-batch");
});

function clickHeads(){
    $("#batchButtons").css("display", "none");
    $('#allMembersContainer').html('<div class="headMembers"style="background-color:#f1f1f1;""> <div class="container"> <div class="row"> <div class="col-md-6"> <div class="profile-card-2"> <img src="./images/heads/Dr. A. K. Bakthavatsalam.jpeg" alt="" class="img img-responsive"> </div> <div style="text-align: center;"> <div class="profile-name">Dr. A. K. Bakthavatsalam.jpeg</div> <div class="profile-username"> Faculty Advisor, SCIEnT</div> <!-- <div class="profile-icons"><a href="#"><i class="fa fa-linkedin-square fa-2x"></i></a></div> --> </div> </div> <div class="col-md-6"> <div class="profile-card-2"> <img src="./images/heads/GaneshBabu.jpeg" alt="" class="img img-responsive"> </div> <div style="text-align: center;"> <div class="profile-name">S.GANESH BABU</div> <div class="profile-username"> Manager, SCIEnT </div> </div> </div> </div> </div> </div>"');
}
// Event Listeners
function clickAllPresentMembers() {
    $('#allMembersContainer').html(members['fourthYears']+members['thirdYears']
    +members['secondYears']
    );
    //hide alumniButton Bar
    $("#alumniButtons").css("display", "none");
    //display present members batchButton
    $("#batchButtons").css("display", "inline-block");
}

function clickFourthYears() {
    $('#allMembersContainer').html(members['fourthYears']);
}

function clickThirdYears() {
    $('#allMembersContainer').html(members['thirdYears']);
}

function clickSecondYears() {
    $('#allMembersContainer').html(members['secondYears']);
}

function clickAllAlumni() {
    $('#allMembersContainer').html(
        // members['alumnis2020']+
        members['alumnis2019']
        // +members['alumnis2018']
        );

    $("#batchButtons").css("display", "none");
    $("#alumniButtons").css("display", "inline-block");
}

// function click2018Alumni() {
//     $('#allMembersContainer').html(members['alumnis2018']);
// }

// function click2019Alumni() {
//     $('#allMembersContainer').html(members['alumnis2019']);
// }
// function click2020Alumni() {
//     $('#allMembersContainer').html(members['alumnis2020']);
// }
