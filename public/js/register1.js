function ValidateForm(form){
var abs = document.getElementById("project-abstract").innerHTML;   
if(abs=="")
    {
        document.getElementById("error").innerHTML="*Required";
    }
}