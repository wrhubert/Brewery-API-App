function showList() { 
    console.log("button clicked"); 
    //brewery_list.style.display = 'block'; 
} 

function show()
{
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
        document.getElementById('yourmodal').innerHTML=xmlhttp.responseText;
        }
    }
 xmlhttp.open("GET","/showmodalroute",true);
 xmlhttp.send();
} 
