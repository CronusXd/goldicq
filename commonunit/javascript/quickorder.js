var thispath="../";
function setthispath(Mthispath)
	{
		thispath=Mthispath;
	}
function showdiv(obj)
	{
		
		if(obj.value==1)
		{
			document.getElementById("divtrack").style.display="";
			document.getElementById("divpowl").style.display="none";
		}
		else
		{
			document.getElementById("divtrack").style.display="none";
			document.getElementById("divpowl").style.display="";
		}
	}
	function rs_Email(emailStr)
	{ 
		var re=/^[\w-]+(\.*[\w-]+)*@([0-9a-z]+(([0-9a-z]*)|([0-9a-z-]*[0-9a-z]))+\.)+[a-z]{2,3}$/i;
		if(re.test(emailStr))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	function Tcheck()
	{
		if(document.getElementById("OrderIDT").value.search(/[^0-9]/)!=-1)
		{
			alert('Please enter your valid Order ID');
			return false;
		}
		else if(!rs_Email(document.getElementById("EmailT").value))
		{
			alert('Please enter your valid email address!');
			return false;
		}
		else
		{
			send_LinkCount(9);
			return true;
		}
			
	}
	function Pcheck()
	{
		if(document.getElementById("OrderIDP").value.search(/[^0-9]/)!=-1)
		{
			alert('Please enter your valid Order ID');
			return false;
		}
		else if(!rs_Email(document.getElementById("EmailP").value))
		{
			alert('Please enter your valid email address!');
			return false;
		}
		else
		{
			return true;
		}
	}
	function Mcheck()
	{
		if (!rs_Email(document.getElementById("LetterEmail").value))
		{
			alert('Please enter your valid Email address');
			return false;
		}
		else
		{
			send_LinkCount(8);
			return true;
		}
	}
	function Scheck()
	{
		if (document.getElementById("txtkeyword").value=="keyword"||document.getElementById("txtkeyword").value=="")
		{
			alert("Please enter a search query");
			return false;		
		}
		else
		{
			return true;
		}
	}

function readProduct(name)
{
   var cookieValue = "";
   var search = name + "=";
   if(document.cookie.length > 0)
   {
     offset = document.cookie.indexOf(search);
     if (offset != -1)
     {
       offset += search.length;
       end = document.cookie.indexOf(";", offset);
       if (end == -1) end = document.cookie.length;
       cookieValue = unescape(document.cookie.substring(offset, end))
     }
   }
   return cookieValue;
}

function Checkset(sTyp)
{
	if(document.theform.GameNameListID.options[document.theform.GameNameListID.selectedIndex].value==0)
	{
		alert("Please select the game!");
		return false;
	}
	else if(document.theform.ServerNameListID.options[document.theform.ServerNameListID.selectedIndex].value==0)
	{
		alert("Please select the server!");
		return false;
	}
	else if(document.theform.ProductNameListID.options[document.theform.ProductNameListID.selectedIndex].value==0)
	{
		alert("Please select the product");
		return false;
	}
	else
	{	
		var CurArr = document.getElementsByName("Qcurency");
		var Proid = document.getElementById('ProductNameListID').value;
		var selCur = 1;
		for(var i=0; i<CurArr.length; i++)
		{
		   if(CurArr[i].checked == true)
	 	   {
			   selCur = CurArr[i].value;
			   break;
		   }
	   }
	 var showtype="1";
	     if(sTyp == 's')
		{
			if (jQuery.cookie('ShowType')=="i")
			{
				 showtype="2";
			}
			writeCookie("0",showtype,"0",Proid,"1",selCur);
		   return false;
		}
		else if(sTyp == 'q')
		{	
			showtype="g";
			if (jQuery.cookie('ShowType')=="i")
			{
				 showtype="i";
			}
			jQuery(".shopcart").hide();
			Quick_Open(Proid,selCur,showtype);
			return true;
		}
	}
}

function Check1()
{
	if(document.theform.GameNameListID.value==0)
	{
		alert("Please select the game.");
		return false;
	}
	else if(document.theform.ServerNameListID.options[document.theform.ServerNameListID.selectedIndex].value==0)
	{
		alert("Please select the server.");
		return false;
	}
	else if(document.theform.ProductNameListID.options[document.theform.ProductNameListID.selectedIndex].value==0)
	{
		alert("Please select the product");
		return false;
	}
	else
	{
		return true;
	}
}

function send_request(url,obj) 
{
	http_request = false;
	
	if(window.XMLHttpRequest) 
	{ 
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) 
		{
			http_request.overrideMimeType("text/xml");
		}
	}
	else if (window.ActiveXObject) 
	{ 
		try 
		{
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) 
		{
			try 
			{
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) 
			{}
		}
	}
	if (!http_request) 
	{ 
		return false;
	}
		http_request.onreadystatechange = obj;		
		
		http_request.open("GET", url, true);
		http_request.send(null);
}

function getGamelist()
{
	send_request(thispath+"ajax/getGameList.asp",BoandGamelist);
}

function BoandGamelist()
{	
	if (http_request.readyState == 4) 
	{
		if (http_request.status == 200) 
		{ 
			var str=http_request.responseText;
			while(document.theform.GameNameListID.options.length>0)
			{
				document.theform.GameNameListID.remove(0)
			}
			document.theform.GameNameListID.selectedIndex=-1;
			var rightstr=str.split("$$$");
			var arrayStr=rightstr[0].split("|");
			var i;
			var opt=document.createElement("OPTION");
			opt.text="-- Please select the game --";
			opt.value="0";
			document.theform.GameNameListID.options.add(opt);
			opt.selected=true;
			if(arrayStr.length-1>0)
			{
				for(i=0;i<arrayStr.length-1;i++)
				{
					var arrayName=new Array(1);
					arrayName=arrayStr[i].split("@");
					var opt=document.createElement("OPTION");
					opt.text=arrayName[1];
					opt.value=arrayName[0];
					document.theform.GameNameListID.options.add(opt);
				}
			}
		}
	}
		
}
var tempGid=0;
function getServerList(gameid)
{
	if(gameid==1)
	{
	   document.getElementById("ServerNameListID").length=1;
	   document.getElementById("ProductNameListID").length=1;
	   document.getElementById("AZs").style.display="";
	   document.getElementById("ServerNameListID").style.width="245px";
	   tempGid = gameid;
	   getServerListByAZ(document.getElementById("AZs").value);
	}
	else{
	tempGid=0;	
	document.getElementById("AZs").style.display="none";
	document.getElementById("ServerNameListID").style.width="245px";
	send_request(thispath+"ajax/getServerList.asp?gameid="+gameid,BoandServerList);
	}
}
function getServerListByAZ(indexA){
	if(tempGid==1||tempGid==15){
    send_request(thispath+"ajax/getServerList.asp?gameid="+tempGid+"&indexA="+indexA,BoandServerList);	
	}
}
function getServerListByAZ2(indexA){
    send_request(thispath+"ajax/getServerList.asp?gameid="+document.getElementById('GameNameListID').value+"&indexA="+indexA,BoandServerList);	
}
function BoandServerList()
{
	while(document.theform.ServerNameListID.options.length>0)
	{
		document.theform.ServerNameListID.remove(0)
	}
	document.theform.ServerNameListID.selectedIndex=-1;
	var opt=document.createElement("OPTION");
	opt.text="--- Loading... ---";
	opt.value="0";
	document.theform.ServerNameListID.options.add(opt);
	opt.selected=true;
	if (http_request.readyState == 4) 
	{
		if (http_request.status == 200) 
		{ 
			var str=http_request.responseText;
			while(document.theform.ServerNameListID.options.length>0)
			{
				document.theform.ServerNameListID.remove(0)
			}
			document.theform.ServerNameListID.selectedIndex=-1;
			var rightstr=str.split("$$$");
			var arrayStr=rightstr[0].split("|");
			var i;
			var opt=document.createElement("OPTION");
			opt.text="--- Please select the server ---";
			opt.value="0";
			document.theform.ServerNameListID.options.add(opt);
			opt.selected=true;
			if(arrayStr.length-1>0)
			{
				for(i=0;i<arrayStr.length-1;i++)
				{
					var arrayName=new Array(1);
					arrayName=arrayStr[i].split("@");
					var opt=document.createElement("OPTION");
					opt.text=arrayName[1];
					opt.value=arrayName[0];
					document.theform.ServerNameListID.options.add(opt);
				}
			}
		}
	}
}

function getProductList(gameid, serverid, sCur)
{
	send_request(thispath+"ajax/getProductList.asp?gameid="+gameid+"&serverid="+serverid+"&scur="+sCur, BoandProductList);
}
function BoandProductList()
{
	while(document.theform.ProductNameListID.options.length>0)
	{
		document.theform.ProductNameListID.remove(0)
	}
	document.theform.ProductNameListID.selectedIndex=-1;
	var opt=document.createElement("OPTION");
	opt.text="--- Loading... ---";
	opt.value="0";
	document.theform.ProductNameListID.options.add(opt);
	opt.selected=true;
	if (http_request.readyState == 4) 
	{
		if (http_request.status == 200) 
		{ 
			var str=http_request.responseText;
			while(document.theform.ProductNameListID.options.length>0)
			{
				document.theform.ProductNameListID.remove(0)
			}
			document.theform.ProductNameListID.selectedIndex=-1;
			var rightstr=str.split("$$$");
			var arrayStr=rightstr[0].split("|");
			var i;
			var opt=document.createElement("OPTION");
			opt.text="--- Please select the product ---";
			opt.value="0";
			document.theform.ProductNameListID.options.add(opt);
			opt.selected=true;
			if(arrayStr.length-1>0)
			{
				for(i=0;i<arrayStr.length-1;i++)
				{
					var arrayName=new Array(1);
					arrayName=arrayStr[i].split("@");
					var opt=document.createElement("OPTION");
					opt.text=arrayName[1];
					opt.value=arrayName[0];
					document.theform.ProductNameListID.options.add(opt);
				}
			}
		}
	}	
}

function showProductList(objval)
{
	var gameid = document.getElementById('GameNameListID').value;
	var CurArr = document.getElementsByName("Qcurency");
	var selCur;
	for(var i=0; i<CurArr.length; i++)
	{
		if(CurArr[i].checked == true)
		{
			selCur = parseInt(CurArr[i].value);
			break;
		}
	}
	getProductList(gameid, objval, selCur);
}

function chgProductList(curTye)
{
	var gameid = document.getElementById('GameNameListID').value;
	var serverid = document.getElementById('ServerNameListID').value;
	if(gameid != 0 && serverid!=0)
	{
		getProductList(gameid, serverid, curTye);
	}
}

var ReLoadAjax = function()
{}
ReLoadAjax.prototype.GetHttpRequest = function()
{
	var reObj="";
	if ( window.XMLHttpRequest ){
		reObj= new XMLHttpRequest() ;
	}
	else if ( window.ActiveXObject ){	
		try{
			reObj=new ActiveXObject("MsXml2.XmlHttp") ;
		}
		catch(e){
			reObj=new 	ActiveXObject("microsoft.XmlHttp")
		}
	}
	return reObj;
}

ReLoadAjax.prototype.LoadUrl = function( urlToCall,altDiv,valInput)
{	
	var oReAjax = this ;
	var oAjaxHttp = this.GetHttpRequest() ;
	oAjaxHttp.open( "GET", urlToCall, true) ;
	oAjaxHttp.onreadystatechange=function()
	{
		if(oAjaxHttp.readyState==4)
		{
			document.getElementById(altDiv).innerHTML=oAjaxHttp.responseText;
		}
	}
	oAjaxHttp.send( null ) ;
}
ReLoadAjax.prototype.LoadUrl2 = function(urlToCall)
{	
	var oReAjax = this ;
	var oAjaxHttp = this.GetHttpRequest() ;
	oAjaxHttp.open( "GET", urlToCall, false) ;
	oAjaxHttp.send( null );
	var result=oAjaxHttp.responseText;
	return result;
}