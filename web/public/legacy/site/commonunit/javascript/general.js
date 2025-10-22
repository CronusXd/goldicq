// JavaScript Document
window.onload = function ()
{
	var objIM = document.getElementById("instantmessage");
	objIM.options[0].selected = true;
}


/* add new instant message row */
var hasLoaded = false;
var ROW_BASE = 1;
var im_account_counter = 1;
var tr = document.getElementsByTagName("tr");

function createIM(im_account_limit)
{
	if (im_account_counter <= im_account_limit)
	{
		addNewIMRow();
	}
	else
	{
		alert("You only can create " + im_account_limit + " instant message accounts.");
	}
}

function addNewIMRow()
{
	var tbl = document.getElementById("InstantMessageTBody");
	var objIM = document.getElementById("instantmessage");
	
	var newTR = document.createElement("tr");
	var newTD1 = document.createElement("td");
	var newTD2 = document.createElement("td");
	var newTD3 = document.createElement("td");
	var newTD4 = document.createElement("td");

	if (objIM.options[objIM.selectedIndex].value == '')
	{
		//alert("Please select an Instant Message Type.");
	}
	else 
	{
		newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + ":<input type='hidden' style='width:140px;height:21px;' name='instantmessageaccounttype[]' value='"+ objIM.options[objIM.selectedIndex].value +"'>";
		newTD2.innerHTML = "<input type='text' name='instantmessageaccount[]' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		newTD3.innerHTML = "&nbsp;";
		newTD4.innerHTML = "&nbsp;";
		
		newTD1.className = "style7";
		newTD3.className = "style7";
		
		if (objIM.options[objIM.selectedIndex].value == '1')
		{
			newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + "&nbsp;IM:<input type='hidden' name='AOL_Messenger[]' value='" + objIM.options[objIM.selectedIndex].value + "'>";
			newTD2.innerHTML = "<input type='text' name='AOL_Messenger' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		    newTD3.innerHTML = "&nbsp;";
		    newTD4.innerHTML = "&nbsp;";
		
			newTD1.className = "style7";
			newTD3.className = "style7";
		}
		
		if (objIM.options[objIM.selectedIndex].value == '2')
		{
			newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + "&nbsp;IM:<input type='hidden' name='MSN_Messenger[]' value='" + objIM.options[objIM.selectedIndex].value + "'>";
			newTD2.innerHTML = "<input type='text' name='MSN_Messenger' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		    newTD3.innerHTML = "&nbsp;";
		    newTD4.innerHTML = "&nbsp;";
		
			newTD1.className = "style7";
			newTD3.className = "style7";
		}
		
		if (objIM.options[objIM.selectedIndex].value == '3')
		{
			newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + "&nbsp;IM:<input type='hidden' name='Yahoo_Messenger[]' value='" + objIM.options[objIM.selectedIndex].value + "'>";
			newTD2.innerHTML = "<input type='text' name='Yahoo_Messenger' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		    newTD3.innerHTML = "&nbsp;";
		    newTD4.innerHTML = "&nbsp;";
		
			newTD1.className = "style7";
			newTD3.className = "style7";
		}
		
		if (objIM.options[objIM.selectedIndex].value == '4')
		{
			newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + "&nbsp;IM:<input type='hidden' name='Goggle_Talk[]' value='" + objIM.options[objIM.selectedIndex].value + "'>";
			newTD2.innerHTML = "<input type='text' name='Goggle_Talk' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		    newTD3.innerHTML = "&nbsp;";
		    newTD4.innerHTML = "&nbsp;";
		
			newTD1.className = "style7";
			newTD3.className = "style7";
		}
		
		if (objIM.options[objIM.selectedIndex].value == '5')
		{
			newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + "&nbsp;IM:<input type='hidden' name='QQ_Message[]' value='" + objIM.options[objIM.selectedIndex].value + "'>";
			newTD2.innerHTML = "<input type='text' name='QQ_Message' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		    newTD3.innerHTML = "&nbsp;";
		    newTD4.innerHTML = "&nbsp;";
		
			newTD1.className = "style7";
			newTD3.className = "style7";
		}
		
		if (objIM.options[objIM.selectedIndex].value == '6')
		{
			newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + "&nbsp;IM:<input type='hidden' name='Skype[]' value='" + objIM.options[objIM.selectedIndex].value + "'>";
			newTD2.innerHTML = "<input type='text' name='Skype' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		    newTD3.innerHTML = "&nbsp;";
		    newTD4.innerHTML = "&nbsp;";
		
			newTD1.className = "style7";
			newTD3.className = "style7";
		}
		
		if (objIM.options[objIM.selectedIndex].value == '7')
		{
			newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + "&nbsp;IM:<input type='hidden' name='ICQ[]' value='" + objIM.options[objIM.selectedIndex].value + "'>";
			newTD2.innerHTML = "<input type='text' name='ICQ' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		    newTD3.innerHTML = "&nbsp;";
		    newTD4.innerHTML = "&nbsp;";
		
			newTD1.className = "style7";
			newTD3.className = "style7";
		}
		
		if (objIM.options[objIM.selectedIndex].value == '0')
		{
			newTD1.innerHTML = objIM.options[objIM.selectedIndex].text + "&nbsp;IM:<input type='hidden' name='OthersIM[]' value='" + objIM.options[objIM.selectedIndex].value + "'>";
			newTD2.innerHTML = "<input type='text' name='OthersIM' style='width:130px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>";
			newTD3.innerHTML = "ID:";
			newTD4.innerHTML = "<input type='text' name='OthersIMID' style='width:110px;height:21px;' onfocus='this.className=\"focus\"' onblur='this.className=\"\"'>" + " &nbsp;<image src='/files0/cut.gif' id='rmInstantMessageAccount' onclick='deleteIMRow(this)'>";
		
			newTD1.className = "style7";
			newTD3.className = "style7";
		}
		
		newTD1.setAttribute('width', '135');
		newTD2.setAttribute('width', '200');
		newTD3.setAttribute('width', '15');
		newTD4.setAttribute('width', '140');
		
		newTD1.setAttribute('height', '25');
		newTD2.setAttribute('height', '25');
		newTD3.setAttribute('height', '25');
		newTD4.setAttribute('height', '25');
			
		newTR.appendChild(newTD1);
		newTR.appendChild(newTD2);
		newTR.appendChild(newTD3);
		newTR.appendChild(newTD4);
			
		tbl.appendChild(newTR);

		hasLoaded = true;
		im_account_counter = im_account_counter + 1;
	}
}


function deleteIMRow(obj)
{
	var rowArray = new Array(obj.parentNode.parentNode);
	
	if (hasLoaded)
	{
		if (tr.length == 1)
		{
			hasLoaded = false;
		}
		else
		{
			for (var i=0; i < rowArray.length; i++)
			{
				var delIndex = rowArray[i].sectionRowIndex;
				rowArray[i].parentNode.deleteRow(delIndex);
			}
			
			if (im_account_counter > 1)
			{
				im_account_counter = im_account_counter - 1;
			}
		}
	}
}

// Input fields effect
function getFocus (elObjID, msgObjID, msg)
{
	var classNameOnFocus = "focus";
	var classNameOnBlur = "style10";
	var elObj = document.getElementById(elObjID);

	if (elObj)
	{	
		elObj.className = classNameOnFocus;

		if (elObjID && msgObjID)
		{
			displayMessage(elObjID, msgObjID, msg);
		}
	}
}

function getBlur (elObjID, msgObjID, msg)
{
	var classNameOnBlur = "style10";
	var elObj = document.getElementById(elObjID);

	if (elObj)
	{	
		elObj.className = classNameOnBlur;

		if (elObjID && msgObjID)
		{
			//displayMessage(elObjID, msgObjID, msg);
			hideMessage(elObjID, msgObjID);
		}
	}
}

function displayMessage(elID, msgID, msg)
{
	if (document.getElementById(elID) && document.getElementById(msgID))
 	{
 		var elObj = document.getElementById(elID);
 		var msgObj= document.getElementById(msgID);
 	
 		if ((elObj.value.length == 0 || trim_str(elObj.value) == '' || elObj.value == null) && msgID && msg)
 		{
 			document.getElementById(msgID).innerHTML = msg;
 			document.getElementById(msgID).style.color = "#666666";
 		}
 		else if (msg == msgObj.innerHTML)
 		{
 			hideMessage(elID, msgID);
 		}
 	}
 
}

function hideMessage(elID, msgID)
{
	if (document.getElementById(msgID) != null) // && document.getElementById(elID).value.length > 0)
	{
		document.getElementById(msgID).innerHTML = "";
	}
}

function trim_str(strValue) {
	return ltrim_str(rtrim_str(strValue));
}

function ltrim_str(strValue) {
	var LTRIMrgExp = /^\s */;
	return strValue.replace(LTRIMrgExp, '');
}

function rtrim_str(strValue) {
	var RTRIMrgExp = /\s *$/;
	return strValue.replace(RTRIMrgExp, '');
}

function validateEmail(str) {
	var at="@";
	var dot=".";
	var lat=str.indexOf(at);
	var lstr=str.length;
	var ldot=str.indexOf(dot);

	if (str.indexOf(at)==-1) {
	   return false;
	}

	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)== (lstr-1)) {
	   return false;
	}

	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==(lstr-1)) {
	    return false;
	}

	if (str.indexOf(at,(lat+1))!=-1) {
	    return false;
	}

	if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot) {
	    return false;
	}

	if (str.indexOf(dot,(lat+2))==-1) {
		return false;
	}

	if (str.indexOf(" ")!=-1) {
		return false;
	}

	return true;
}

function validateInteger( strValue ) {
	var objRegExp  = /(^\d\d*$)/;

	//check for integer characters
	return objRegExp.test(strValue);
}

function validateSignInteger( strValue ) {
	var objRegExp  = /^[\+\-]?\d\d*$/;

	//check for integer characters
	return objRegExp.test(strValue);
}

function validateMayHvPtSignDecimal(strValue) {
	var objRegExp  = /^[\+\-]?\d+(\.\d+)?$/;

	//check for integer characters
	return objRegExp.test(strValue);
}