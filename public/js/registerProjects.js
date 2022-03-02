var projects = {};

$(document).ready(function() {
    $.ajax(
        {
            url: "/data/projects.json",
            success: function(result) {
                loadRMI(result[1]);
                loadD3D(result[2]);
                loadPSI(result[3]);
                loadDC(result[4]);
                loadEver(result[5]);
                $('#allProjectsContainer').html(projects['RMI']+projects['3D']+projects['PSI']+projects['DC']+projects['Ever']);
            }
        }
    );
});

function getHTMLString(prop) {
    var returnString = `
        <div class="cardContainer">
          <div class="projectCARD">
            <div class="imgBox"><img src="${prop.img}" alt=""></div>
            <div class="contentBox">
              <h2>${prop.title}</h2>
              <!-- <h3>${prop.club}</h3>
              <h4>${prop.timespan}</h4> -->
              <p class="textDescription">${prop.description}</p>
            </div>
          </div>
        </div>`;
    
    return returnString;
}

function loadRMI(RMI) {
    // Populate RMI
    projects['RMI'] = RMI.map(temp1 => getHTMLString(temp1)).join('');
}

function loadD3D(D3D) {
    // Populate 3D
    projects['3D'] = D3D.map(temp2 => getHTMLString(temp2)).join('');
}

function loadPSI(PSI) {
    // Populate PSI
    projects['PSI'] = PSI.map(temp3 => getHTMLString(temp3)).join('');
}

function loadDC(DC) {
    // Populate DC
    projects['DC'] = DC.map(temp4 => getHTMLString(temp4)).join('');
}

function loadEver(Ever) {
    // Populate Ever
    projects['Ever'] = Ever.map(temp5 => getHTMLString(temp5)).join('');
}





// function to highlight selected tab on batchButton
$("#projectButtons button").on("click", function() {
    var buttons = $('#projectButtons').children();
    for (button of buttons) {
        $(button).removeClass("active-batch");
    }
    $(this).addClass("active-batch");
});

// function to highlight selected tab on "allProjectsContainer" Bar
$("#allProjectsContainer button").on("click", function() {
    var buttons = $('#allProjectsContainer').children();
    for (button of buttons) {
        $(button).removeClass("active-batch");
    }
    $(this).addClass("active-batch");
   
    // if "presentMembers" tab selected, make "all" as selected Tab on "projectButtons"
    if (this == buttons[0])
    {
        let allbuttons = $('#projectButtons').children();
        for (allbutton of allbuttons) {
            $(allbutton).removeClass("active-batch");
        }
        $(allbuttons[0]).addClass("active-batch");
    }

});



function clickAll() {
    $('#allProjectsContainer').html(projects['RMI']+projects['3D']+projects['PSI']+projects['DC']+projects['Ever']);
    $("#projectButtons").css("display", "inline-block");
}

function clickRMI() {
    $('#allProjectsContainer').html(projects['RMI']);
}

function clickD3D() {
    $('#allProjectsContainer').html(projects['3D']);
}

function clickPSI() {
    $('#allProjectsContainer').html(projects['PSI']);
}

function clickDC() {
    $('#allProjectsContainer').html(projects['DC']);
}

function clickEver() {
    $('#allProjectsContainer').html(projects['Ever']);
}













// *****************************************************************************************************************************************************
        // To be added into projects.json, after shortening description and finding a suitable image

      // {
      //    "title": "C-BASS",
      //    "club": "Designers' Consortium",
      //    "timespan": "Nov-2021",
      //    "description": "As the number of hostile or unauthenticated boats is on the rise, there is a pressing need for a solution that can stop ships at sea without resorting to force. This might be beneficial  during peacetime operations, such as VBSS (Visit Board, Search, and Seizure) operations or stopping a boat heading towards friendly forces (at sea or in a harbour/anchorage) where the  boat's intent cannot be determined. The vessels should not sustain any permanent damage, but their speed should be reduced or, preferably, they should be brought to a complete halt. One of the current focuses in non-lethal technologies research is the ideation of measures to stop vehicles and vessels that offer a potential threat of criminal and terrorist activity. So, considering the situation, we devised a system to achieve the same. To design a system that a host can deploy to stop non-compliant vessels at sea without causing permanent damage to the target.",
      //    "img": "./images/projects/DC-4.jpeg",
      //    "scientrole": "Scient provided us with conferece room, to dscuss all of our ideas, wifi connection for researching and  machineries for fabrication of prototypes."
      // },
      // {
      //    "title": "ICTALMATE",
      //    "club": "Designers' Consortium",
      //    "timespan": "Nov-2021",
      //    "description": "Epilepsy is a disorder in which nerve cell activity becomes abnormal, causing seizures. A seizure is a sudden electrical disturbance that causes changes in behavior, movements, and level of consciousness in a person. Our product aims to detect General Tonic-Clonic Seizures (GTCS) and mitigate the injuries caused by GTCS.",
      //    "img": "./images/projects/DC-5.jpeg",
      //    "scientrole": "Scient provided us with conferece room, to dscuss all of our ideas, wifi connection for researching and  machineries for fabrication of prototypes."
      // },
      // {
      //    "title": "CALTEC",
      //    "club": "Designers' Consortium",
      //    "timespan": "Nov-2021",
     //  "description": "An oil spill releases a liquid petroleum hydrocarbon (PHCs) into the environment, especially the marine ecosystem. It can be caused by human error, natural disasters, technical failures or deliberate releases. It is estimated that 30-50% of all oil spills are directly or indirectly caused by human error, with approximately 20-40% of oil spills being attributed to equipment failure or malfunction. It affects a huge part of the ecosystem, and the effects of the same can be devastating and prove to be fatal for plants, animals, and human life. The oil penetrates the structure of the plumage of birds and the fur of mammals, reducing their insulating ability, and making them more vulnerable to temperature fluctuations and much less buoyant in the water.  To counter the above effects of the oil spill, we have come up with a product idea name CALTEC that helps deter the mammals and birds near the oil-contaminated area and identify, rescue and aid the ones which are already affected due to the oil spills.",
      //    "img": "./images/projects/DC-6.jpeg",
      //    "scientrole": "Scient provided us with conferece room, to dscuss all of our ideas, wifi connection for researching and  machineries for fabrication of prototypes."
      // }

// *****************************************************************************************************************************************************


// new-project idea validation

function ValidateForm(form) {
	var abs = document.getElementById("project-abstract").innerHTML;   
	if(abs == "") {
	    document.getElementById("error").innerHTML="*Required";
	}
}

function fileUpload() {
    $("#file-upload").click();
}
      
var i = 0; 

/* function for automatic increament of field's "Name" attribute*/ 
function increment() {
	i += 1;                         
}

function removeElement(parentDiv, childDiv) {
    if (childDiv == parentDiv) {
        alert("The parent div cannot be removed.");
    } else if (document.getElementById(childDiv)) {     
        var child = document.getElementById(childDiv);
        var parent = document.getElementById(parentDiv);
        parent.removeChild(child);
    } else {
        alert("Child div has already been removed or does not exist.");
        return false;
    }
}

function addTeamMembers() {

    var r=document.createElement('span');
    var br=document.createElement('br');
    br.appendChild(r);
    var y = document.createElement("INPUT");
    y.style.width = "70%";
    var z = document.createElement("INPUT");
    z.style.width = "70%";
    y.setAttribute("type", "text");
    y.setAttribute("name", "teamMembersNames");
    y.setAttribute("placeholder","Name");
    var g = document.createElement("IMG");
    g.setAttribute("src", "images/delete.png");
    z.setAttribute("type", "text");
    z.setAttribute("name", "teamMembersRoll");
    z.setAttribute("placeholder","Roll Number");
    increment(); 
    r.appendChild(y);
    r.appendChild(z);
    g.setAttribute("onclick", "removeElement('new_field','id_"+ i +"')");
    r.appendChild(g);
    r.setAttribute("id", "id_"+i);
    document.getElementById("new_field").appendChild(r);
    
}

function addMaterial() {
    var r=document.createElement('span');
    var br=document.createElement('br');
    br.appendChild(r);
    var y = document.createElement("INPUT");
    y.style.width = "70%";
    var z = document.createElement("INPUT");
    z.style.width = "70%";
    var x = document.createElement("INPUT");
    x.style.width = "70%";
    var w = document.createElement("INPUT");
    w.style.width = "70%";
    var t = document.createElement("INPUT");
    t.style.width = "70%";
    var s = document.createElement("INPUT");
    s.style.width = "70%";
    y.setAttribute("type", "text");
    y.setAttribute("name", "materialNames");
    y.setAttribute("placeholder","Name");
    var g = document.createElement("IMG");
    g.setAttribute("src", "images/delete.png");
    z.setAttribute("type", "text");
    z.setAttribute("name", "materialSpecs");
    z.setAttribute("placeholder","Specification");
    x.setAttribute("type", "text");
    x.setAttribute("name", "materialQuantity");
    x.setAttribute("placeholder","Quantity");
    w.setAttribute("type", "text");
    w.setAttribute("name", "materialPrice");
    w.setAttribute("placeholder","Price");
    t.setAttribute("type", "text");
    t.setAttribute("name", "purpose");
    t.setAttribute("placeholder","Purpose");
    s.setAttribute("type", "text");
    s.setAttribute("name", "vendors");
    s.setAttribute("placeholder","Link/vendor");
    increment(); 
    r.appendChild(y);
    r.appendChild(z);
    r.appendChild(x);
    r.appendChild(w);
    r.appendChild(t);
    r.appendChild(s);
    g.setAttribute("onclick", "removeElement('material_field','id_"+ i +"')");
    r.appendChild(g);
    r.setAttribute("id", "id_"+i);
    document.getElementById("material_field").appendChild(r);

}
      
function addService() {

    var r=document.createElement('span');
    var br=document.createElement('br');
    br.appendChild(r);
    var y = document.createElement("INPUT");
    y.style.width = "70%";
    var z = document.createElement("INPUT");
    z.style.width = "70%";
    var x = document.createElement("INPUT");
    x.style.width = "70%";
    y.setAttribute("type", "text");
    y.setAttribute("name", "serviceNames");
    y.setAttribute("placeholder","Name");
    var g = document.createElement("IMG");
    g.setAttribute("src", "images/delete.png");
    z.setAttribute("type", "text");
    z.setAttribute("name", "serviceSpecs");
    z.setAttribute("placeholder","Specification");
    x.setAttribute("name", "servicePrice");
    x.setAttribute("placeholder","Price");
    increment(); 
    r.appendChild(y);
    r.appendChild(z);
    r.appendChild(x);
    g.setAttribute("onclick", "removeElement('service_field','id_"+ i +"')");
    r.appendChild(g);
    r.setAttribute("id", "id_"+i);
    document.getElementById("service_field").appendChild(r);
        
}