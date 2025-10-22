var qTipX = -30; //This is topic1's X offset//
var qTipY = 15; //This is topic1's Y offset//
//There's No need to edit anything below this line//
tooltip = {
  name : "topic1",
  offsetX : qTipX,
  offsetY : qTipY,
  tip : null
}
tooltip.init = function () {
	var tipNameSpaceURI = "http://www.w3.org/1999/xhtml";
	if(!tipContainerID){ var tipContainerID = "topic1";}
	var tipContainer = document.getElementById(tipContainerID);
	if(!tipContainer) {
	  tipContainer = document.createElementNS ? document.createElementNS(tipNameSpaceURI, "div") : document.createElement("div");
		tipContainer.setAttribute("id", tipContainerID);
	  document.getElementsByTagName("body").item(0).appendChild(tipContainer);
	}
	if (!document.getElementById) return;
	this.tip = document.getElementById (this.name);
	if (this.tip) document.onmousemove = function (evt) {tooltip.move (evt)};
	var a, sTitle;
	var anchors = document.getElementsByTagName ("td");
	for (var i = 0; i < anchors.length; i ++) {
		a = anchors[i];
		sTitle = a.getAttribute("title");
		if(sTitle) {
			a.setAttribute("tiptitle", sTitle);
			a.removeAttribute("title");
			a.onmouseover = function() {tooltip.show(this.getAttribute('tiptitle'))};
			a.onmouseout = function() {tooltip.hide()};
		}
	}
	 anchors = document.getElementsByTagName ("tr");
	for (var i = 0; i < anchors.length; i ++) {
		a = anchors[i];
		sTitle = a.getAttribute("title");
		if(sTitle) {
			a.setAttribute("tiptitle", sTitle);
			a.removeAttribute("title");
			a.onmouseover = function() {tooltip.show(this.getAttribute('tiptitle'))};
			a.onmouseout = function() {tooltip.hide()};
		}
	}
}
tooltip.move = function (evt) {
	var x=0, y=0;
	if (document.all) {//IE
		x = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
		y = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
		x += window.event.clientX;
		y += window.event.clientY;
		
	} else {//Good Browsers
		x = evt.pageX;
		y = evt.pageY;
	}
	this.tip.style.left = (x + this.offsetX) + "px";
	this.tip.style.top = (y + this.offsetY) + "px";
}
tooltip.show = function (text) {
	if (!this.tip) return;
	this.tip.innerHTML = text;
	this.tip.style.display = "block";
}
tooltip.hide = function () {
	if (!this.tip) return;
	this.tip.innerHTML = "";
	this.tip.style.display = "none";
}

function hotKeys() {
    var ua = navigator.userAgent.toLowerCase();
    var str = '';
    var isWebkit = (ua.indexOf('webkit') != - 1);
    var isMac = (ua.indexOf('mac') != - 1);

    if (ua.indexOf('konqueror') != - 1) {
        str = 'CTRL + B'; // Konqueror
    } else if (window.home || isWebkit || isMac) {
        str = (isMac ? 'Command/Cmd' : 'CTRL') + ' + D'; // Netscape, Safari, iCab, IE5/Mac
    }
    return ((str) ? 'Please Press ' + str + ' Add to Favorite after closing this.' : str);
}

function exAddFavorite(sTitle)
{
   var t=document.title;
   var sURL = document.location.href;

   if (window.sidebar) // Firefox
        window.sidebar.addPanel(sTitle, sURL, '');
    else if(window.opera && window.print) // Opera
    {
        var elem = document.createElement('a');
        elem.setAttribute('href',sURL);
        elem.setAttribute('title',sTitle);
        elem.setAttribute('rel','sidebar'); // required to work in opera 7+
        elem.click();
    }
    else if(document.all) // IE
	{
      window.external.AddFavorite(sURL,sTitle + " - " + t);
   }
    else {
        alert(hotKeys());
    }
}


function Language(hostname)
{
   var thisUrl = window.location.href;
   var FileName = thisUrl.split(".com")[1];
   window.location.href = "http://"+hostname+".goldicq.com"+FileName;
}

function openwindow(flg)
{
    if(document.getElementById("open"+flg).style.display=="none")
    {
        document.getElementById("open"+flg).style.display="";
    }
    else
    {
        document.getElementById("open"+flg).style.display="none";
    }
	if (flg="A")
	{
		jQuery("#linkopen").html('<div class="checkout" onclick="if(check_checkbox1(\'payment_form\')){jQuery(\'#payment_form\').submit()}">Continue</div>');
		jQuery("#linkopen").attr("align","center");
	}
	tooltip.init();
}

function checksc()
{
   var Pnum = parseInt(GetSC('GoodsNum')) + parseInt(GetSC('PowerNum'));
   if(Pnum == 0 || isNaN(Pnum))
   {
	   document.write('<img src="files0/topcart1.gif" border="0" />');		   
   }
   else
   {
	   document.write('<div class="paddingleft30">')
	   document.write('<div class="margintopbot5"><a href="https://www.goldicq.com/shoppingcart.html" class="style10"><u>' + Pnum + ' product(s) in shopping cart</u></a></div>')
	   document.write('<div align="right"><span class="style10">Total: ' + GetSC('PaymentPrice').replace('+',' ') + '</span></div>')
	   document.write('</div>')
   }
}

function GetSC(sName)
{
	var arr = document.cookie.match(new RegExp("(^| )"+sName+"=([^;]*)(;|$)"));
	if(arr !=null){return unescape(arr[2])};
	return null;
}

function fChange(objid,fn)
{
   document.getElementById(objid).src="commonunit/"+fn+".asp?"+Math.random();
}