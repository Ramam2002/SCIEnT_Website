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