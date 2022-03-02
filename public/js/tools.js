var tools = {};

$(document).ready(function() {
    $.ajax(
        {
            url: "/data/tools.json",
            success: function(result) {
                loadElectronics(result[1]);
                loadMechanical(result[2]);
                $('.card-container').html(tools['electronics']+tools['mechanical']);
            }
        }
    );
});

function getHTMLString(tool) {

    var classID = Math.floor(Math.random()*3);
    var className = ['green','red','blue'];
    var returnString = `
    <div class = "card">
        <div class = "imgBx">
            <img class="member-image" src = "${tool.image}">
        </div>
        <div class = "content">
            <h2>${tool.name} </h2>
            <p>${tool.description}</p>
            <a href="${tool.link}" target="_blank"><button class="card-btn">Read More</button></a>
        </div>
    </div>`;
    
    return returnString;
}

function loadElectronics(electronics) {
    // Populate Fourth Years
    tools['electronics'] = electronics.map(electronic => getHTMLString(electronic)).join('');
}

function loadMechanical(mechanical) {
    // Populate Third Years
    tools['mechanical'] = mechanical.map(mech => getHTMLString(mech)).join('');
}





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

});



function clickAllTools() {
    $('.card-container').html(tools['electronics']+tools['mechanical']);
    $("#alumniButtons").css("display", "none");
    $("#batchButtons").css("display", "inline-block");
}

function clickElectronics() {
    $('.card-container').html(tools['electronics']);
}

function clickMechanical() {
    $('.card-container').html(tools['mechanical']);
}












// var tools = {};

// $(document).ready(function() {
//     $.ajax(
//         {
//             url: "/data/tools.json",
//             success: function(result) {
//                 loadFourthYears(result[1]);
//                 loadThirdYears(result[2]);
//                 $('#allMembersContainer').html(tools['fourthYears']+tools['thirdYears']);
//             }
//         }
//     );
// });

// function getHTMLString(person) {

//     var classID = Math.floor(Math.random()*3);
//     var className = ['green','red','blue'];
//     var returnString = `            
//                         <div class="tool-container">
//                             <div class="tool-details">
//                                 <img src="${person.image}" class="tool-image">
//                                 <h3 class="tool-name">${person.name}</h3>
//                             </div>
//                             <div class="info-details ${className[classID]}">
//                                 <div class="descript-info">
//                                 <p>${person.description}</p>
//                                 </div>
//                             </div>
//                         </div>`;
    
//     return returnString;
// }

// function loadFourthYears(fourthYears) {
//     tools['fourthYears'] = fourthYears.map(fourthYear => getHTMLString(fourthYear)).join('');
// }

// function loadThirdYears(thirdYears) {
//     tools['thirdYears'] = thirdYears.map(thirdYear => getHTMLString(thirdYear)).join('');
// }





// $("#batchButtons button").on("click", function() {
//     var buttons = $('#batchButtons').children();
//     for (button of buttons) {
//         $(button).removeClass("active-batch");
//     }
//     $(this).addClass("active-batch");
// });

// $("#allMembersButtons button").on("click", function() {
//     var buttons = $('#allMembersButtons').children();
//     for (button of buttons) {
//         $(button).removeClass("active-batch");
//     }
//     $(this).addClass("active-batch");
   
//     if (this == buttons[0])
//     {
//         let allbuttons = $('#batchButtons').children();
//         for (allbutton of allbuttons) {
//             $(allbutton).removeClass("active-batch");
//         }
//         $(allbuttons[0]).addClass("active-batch");
//     }

// });



// function clickAllPresentMembers() {
//     $('#allMembersContainer').html(tools['fourthYears']+tools['thirdYears']);
//     $("#alumniButtons").css("display", "none");
//     $("#batchButtons").css("display", "inline-block");
// }

// function clickFourthYears() {
//     $('#allMembersContainer').html(tools['fourthYears']);
// }

// function clickThirdYears() {
//     $('#allMembersContainer').html(tools['thirdYears']);
// }

