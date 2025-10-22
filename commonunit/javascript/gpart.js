jQuery.noConflict();
function writeCookie(name, value1, value2, value3, value4, value5)
{
	var oldname=readProduct(name);
	if  (oldname.length<1)
	{
		oldname="1";
	}
	document.cookie = name + "=" +oldname + "," + escape(value1) + "_" + escape(value2) + "_" + escape(value3) + "_" + escape(value4) + "_" + escape(value5);
	loadproduct(value3,value4);
	jQuery(".shopcart").slideDown('fast');
	return false;
}

function writepwCookie(name, value1, value2, value3, value4, value5, value6, value7, value8)
{
	var oldname=readProduct(name);
	if  (oldname.length<1)
	{
	oldname="1";
	}
	document.cookie = name + "=" +oldname+ "," + escape(value1) + "_" + escape(value2) + "_" + escape(value3) + "_" + escape(value4) + "_" + escape(value5) + "_" + escape(value6) + "_" + escape(value7) + "_" + escape(value8);
}
function isPositiveNum(s){
var re = /^[0-9]*[1-9][0-9]*$/ ; 
return re.test(s) 
}
 function CPos(x, y)
    {
        this.x = x;
        this.y = y;
    }

function GetObjPos(ATarget)
    {
        var target = ATarget;
        var pos = new CPos(target.offsetLeft, target.offsetTop);
        var target = target.offsetParent;
        while (target)
        {
            pos.x += target.offsetLeft;
            pos.y += target.offsetTop;
            target = target.offsetParent
        }
        return pos;
    }
	

function showPic(p,sUrl,W,H)
{ 
//p.className='linebg2';
if (sUrl == "") 
{
	return;
}
var x,y; 
x =GetObjPos(p)['x']; 
if (H < 45 ){
	y =GetObjPos(p)['y']+55; 
}
else {
	y =GetObjPos(p)['y']+H+5; 
}

document.getElementById("Layer1").style.left =x+"px"; 
document.getElementById("Layer1").style.top = y+"px"; 
	document.getElementById("Layer1").innerHTML = "<img src=\"" + sUrl + "\">"; 
document.getElementById("Layer1").style.display = "block"; 
} 


function hiddenPic(p)
{ 
//p.className='linebg1';
document.getElementById("Layer1").innerHTML = ""; 
document.getElementById("Layer1").style.display = "none"; 
} 

function Quick_Open2(Pro_id,C_Code,Tpy,Q)
{
   jQuery("#parea").load("ajax/quickbuy.asp?proid="+Pro_id+"&c="+C_Code+"&p="+Tpy+"&q="+Q+"&t="+new Date().getTime());
   qbtran('elePro');
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

function openUrl(url)
{  
   if (window.XMLHttpRequest)  
   {
       objxml = new XMLHttpRequest();
    }  
       else if (window.ActiveXObject)  
    {   
       objxml = new ActiveXObject("Msxml2.XMLHTTP");   
    }        
    objxml.open("GET",url,false);        
    objxml.send("");
    retInfo=objxml.responseText;
    if (objxml.status== "200")
    {
       return retInfo;
    }  
    else
    {
       return "";  
    }  
}

function show(gid,sid,cu,typ,hash="")
{
	if (jQuery("#p_note"))
{
	jQuery("#p_note").load("ajax/GetNote.asp?gid=" + gid + "&sid="+ sid +"&t="+new Date().getTime());
}
   jQuery("#p_area").load("ajax/showproduct.asp?gid=" + gid + "&sid=" + sid + "&cur=" + cu + "&typ=" + typ,function(responseTxt,statusTxt,xhr){
	if(statusTxt=="success")
	{
		if(hash!=""){
			window.location.hash=hash;
		}
	}
   });
   jQuery("#srarea div").removeClass();
   jQuery("#srarea div a").removeClass();
   jQuery("#srarea div").addClass("gamemore");
   jQuery("#srarea div a").addClass("gamemore1");
   jQuery("#svr_"+sid).removeClass();
   jQuery("#svr_"+sid+" a").removeClass();
   jQuery("#svr_"+sid).addClass("gamemore2");
   jQuery("#svr_"+sid+" a").addClass("gamemore3");
}


function showother(gid,sid,cu,typ,st,hash="")
{
	if (jQuery("#p_note"))
{
	jQuery("#p_note").load("ajax/GetNote.asp?gid=" + gid + "&sid="+ sid +"&t="+new Date().getTime());
}
   jQuery("#p_area_"+st).load("ajax/showproduct.asp?gid=" + gid + "&sid=" + sid + "&cur=" + cu + "&typ=" + typ + "&st=" + st,function(responseTxt,statusTxt,xhr){
	if(statusTxt=="success")
	{
		if(hash!=""){
			window.location.hash=hash;
		}
	}
   });
   jQuery("#tb_"+st+" div").removeClass();
   jQuery("#tb_"+st+" div").addClass("gamemore");
   jQuery("#tb_"+st+" div a").removeClass();
   jQuery("#tb_"+st+" div a").addClass("gamemore1");
   jQuery("#svr_"+sid).removeClass();
   jQuery("#svr_"+sid+" a").removeClass();
   jQuery("#svr_"+sid).addClass("gamemore2");
   jQuery("#svr_"+sid+" a").addClass("gamemore3");
}

function showitunes(gid,sid,cu,typ)
{
	jQuery.ajax({
		   url:"ajax/showitunes.asp?gid=" + gid + "&sid=" + sid + "&cur=" + cu + "&typ=" + typ,
		   cache:false,
		   success:function(html){
			   jQuery("#p_area").append(html);
		       }
		   });
}

function Quick_Open(Pro_id,C_Code,Tpy)
{
   jQuery("#parea").load("ajax/quickbuy.asp?proid="+Pro_id+"&c="+C_Code+"&p="+Tpy);
   qbtran('elePro');
}

function wrtefrm()
{
	document.write('<form name="quick_form" id="quick_form" action="quick-transfer.html" method="post" target="_blank">')
	document.write('<input type="hidden" id="ProID" name="ProID" />')
	document.write('<input type="hidden" id="CharcName" name="CharcName" />')
	document.write('<input type="hidden" id="PayMethod" name="PayMethod" />')
	document.write('<input type="hidden" id="CurrencyCode" name="CurrencyCode" />')
	document.write('<input type="hidden" id="B_Type" name="B_Type" />')
	document.write('<input type="hidden" id="TimeZone" name="TimeZone" />')
	document.write('</form>')
}

function direct(selobj)
{
   var dirpage = selobj.value;
   window.location = dirpage;
}

function chgRate(rtpy)
{
	jQuery("#ProEraea span").each(function(){
		var OrigTpy = jQuery(this).attr("id").split("-")[0];
		var OrigID = jQuery(this).attr("id").split("-")[1];
		if(OrigTpy == "p")
		{
		   	var pNumber = jQuery("#h-"+OrigID).html();
			var sNumber = 0;
			var sCur = "";
			if(rtpy == 1)
			{
				sNumber = (pNumber*1) * uself;
				sCur = "USD";
			}
			else if(rtpy == 2)
			{
				sNumber = (pNumber*1) * uTe;
				sCur = "EUR";
			}
			else if(rtpy == 3)
			{
				sNumber = (pNumber*1) * uTg;
				sCur = "GBP";
			}
			else if(rtpy == 4)
			{
				sNumber = (pNumber*1) * uTc;
				sCur = "AUD";
			}
			else if(rtpy == 5)
			{
				sNumber = (pNumber*1) * uTa;
				sCur = "CAD";
			}
			jQuery(this).html(sNumber.toFixed(2)+ " " +sCur);
			document.cookie = "CurrencyCode=" + CuCode;
			CuCode = rtpy;
		}
	});
}

function Addcart(Cname, gd, pID)
{
	var price = jQuery("#p-"+pID).html().split(" ")[0];
	writepwCookie(Cname, gd, 0, price, 0,0,0,pID,CuCode);
}

<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->