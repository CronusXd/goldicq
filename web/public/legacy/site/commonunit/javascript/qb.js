function SetMed(objid)
{
	document.getElementById("Payment_Method"+objid).checked = true;
}
function QuickCheckOut()
{ 
	var ChcName="";
	var ShotMsg="";
	var error = false;
	var errorinfo = 'ERROR\n\n';
	var b_CharcName=document.getElementById("b_CharcName");
	if (b_CharcName != null)
	{
		 ChcName=b_CharcName.value;
	}
	else
	{
		ChcName="0";
	}
   var PayMed = document.getElementsByName("b_PayMethod");
   var SigPayMed;
   for(var i=0; i<PayMed.length; i++)
   {
      if(PayMed[i].checked)
	    SigPayMed = PayMed[i].value;
   }
   if(ChcName.length < 1)
   {
    errorinfo += ' * Please fill in your character name in game.  \n';
	   alert(errorinfo);
	  document.getElementById("b_CharcName").focus();
	 return false;
   }
   else
   {
	jQuery("#msg :input[msg='1']").each(function(i){ 
					if (jQuery(this).attr("must")=="1" && jQuery(this).val()=="")
				{
					 errorinfo += ' * Please fill in the '+jQuery(this).attr("name")+'.  \n';
					  error = true;
				}
				else
				{
					ShotMsg=ShotMsg+ jQuery(this).attr("name")+":"+jQuery(this).val()+";";
				}
	});
	if (error == true) {
			alert(errorinfo);
			return false;
		}
	  var dt=new Date();
	  document.getElementById("CharcName").value = ChcName;
	  document.getElementById("PayMethod").value = SigPayMed;
	  document.getElementById("TimeZone").value = dt.toTimeString();
	  document.getElementById("ShotMsg").value = ShotMsg;
	  document.getElementById("quick_form").submit();
	 // qbtran('closPro');
	  return true;
   }
}

function CheckCoupon(Price,CurrencyFlag,rate)
{
	jQuery("#CouponMsg").html("");
	if (Price==0)
	{
		RestorQuantity();
	}
	var Coupon=jQuery("#CouponCode").val();
	if (Coupon==""){
		return;
	} 
	var B_Type=jQuery("#B_Type").val();
	var ajaxurl="ajax/Couponajax.asp?Proid="+jQuery("#ProID").val()+"&type="+B_Type;
	jQuery.post(ajaxurl,"Coupon="+Coupon,function(result){
	var reg=/^[0-9]+.?[0-9]*$/; 
	if (result=="" || result=="err" || !reg.test(result)){
		jQuery("#CouponMsg").html("Sorry, this coupon is not correct or expired.");
	}
	else
	{
		var RePrice=jQuery("#RePrice").html();
		jQuery("#Prices").html('<br/><strike><span class="qbstyle5"><strong>'+RePrice+'</strong></span>'+jQuery("#Prices").html()+'</strike>')
		jQuery("#Prices").css("padding-left","161px");
		if (Price==0)
		{
			RePrice=RePrice.replace("&nbsp;","");
			RePrice=RePrice.replace(CurrencyFlag,"");
		}
		else
		{
			RePrice=Price;
		}
		//console.log(RePrice);
		RePrice=parseFloat(RePrice);
		RePrice=RePrice-RePrice*parseInt(result)*0.01;
		RePrice=RePrice.toFixed(2);
		jQuery("#RePrice").html(RePrice+'&nbsp;'+CurrencyFlag+'('+result+'%&nbsp;Off)');
		RePrice=RePrice/rate;
		RePrice=RePrice.toFixed(2);	
		ChangeTitle(RePrice);
	}
	
	 });
	
}

function ChangePrice_Quik (num,CurrencyFlag,Prices,Temp_Gold,Temp_Gold2,Temp_Power,rate,type)
{
if (num<1)
{
alert(num);
return;
}
var RePrice=Prices * (1 - Temp_Gold)*num;
RePrice=RePrice.toFixed(2);
jQuery("#Prices").css("padding-left","0px");
jQuery("#RePrice").html(RePrice+"&nbsp;"+CurrencyFlag);
jQuery("#Prices").html("("+Prices+" * "+Temp_Gold2+"% * "+num+" + 0.00 *"+Temp_Power+"%)&nbsp;&nbsp;");
RePrice=RePrice/rate;
RePrice=RePrice.toFixed(2);
ChangeTitle(RePrice);
if (type=="1")
{
CheckCoupon(RePrice,CurrencyFlag,rate);
}
}

function ChangeTitle(RePrice)
{
var titles="";
if (jQuery("#pnt").length<1)
{
	if(jQuery("#pp1").length<1)
	{
		return;
	}
	else
	{
		titles=jQuery("#pp1").attr("title");
	}
}
else
{
	titles=jQuery("#pnt").attr("title");
}
if (RePrice<8)
{
if (titles.indexOf("0% fee")>0)
{
	if (jQuery("#pp1").length >0)
	{
	jQuery("#pp1").attr("tiptitle","<font color='red'>0.3 USD fee</font> for less than $8 payment is needed");
	jQuery("#pp2").attr("tiptitle","<font color='red'>0.3 USD fee</font> for less than $8 payment is needed");
	}
	jQuery("#pnt").attr("tiptitle","<font color='red'>0.3 USD fee</font> for less than $8 payment is needed");
}
}
else
{
if (titles.indexOf("less than")>0)
{
	if (jQuery("#pp1").length >0)
	{
	jQuery("#pp1").attr("tiptitle","<font color='red'>0% fee</font> for each payment is needed");
	jQuery("#pp2").attr("tiptitle","<font color='red'>0% fee</font> for each payment is needed");
	}
	jQuery("#pnt").attr("tiptitle","<font color='red'>0% fee</font> for each payment is needed");
}	
}
}

function qbtran(name)
{
	if(document.all)
	{
		document.getElementById(name).click();
	}
	else
	{
		var evt = document.createEvent("MouseEvents");   
        evt.initEvent("click", true, true);
        document.getElementById(name).dispatchEvent(evt);
	}
}
