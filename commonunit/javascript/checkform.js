<!--
	var form = '';
	var error_message = '';
	var submitted = false;
	var error = false;
	var check_isNaN = false;
	
	function check_input(field_name, field_size, message, check_isNaN) {
		if (form.elements[field_name] && (form.elements[field_name].type != "hidden")) {
			var field_value = trim_str(form.elements[field_name].value);
		
			if ((field_value == '' || field_value.length < field_size) || (check_isNaN == true && validateInteger(trim_str(field_value)) == true)) {
				error_message = error_message + "* " + message + "\n";
				error = true;
			}
		}
	}
	
	function check_checkbox(field_name, message) {
		var isChecked = false;
	
		if (form.elements[field_name] && (form.elements[field_name].type != "hidden")) {
			var chkbox = form.elements[field_name];
		
			if (chkbox.checked == true) {
				isChecked = true;
			}
		}
		
		if (isChecked == false) {
			error_message = error_message + "* " + message + "\n";
			error = true;
		}
	}
	
	function check_radio(field_name, message) {
		var isChecked = false;
	
		if (form.elements[field_name] && (form.elements[field_name].type != "hidden")) {
			var radio = form.elements[field_name];
		
			for (var i=0; i<radio.length; i++) {
				if (radio[i].checked == true) {
					isChecked = true;
					break;
				}
			}
		
			if (isChecked == false) {
				error_message = error_message + "* " + message + "\n";
				error = true;
			}
		}
	}
	
	function check_select(field_name, field_default, message) {
		if (form.elements[field_name] && (form.elements[field_name].type != "hidden")) {
			var field_value = form.elements[field_name].value;
	
			if (field_value == field_default) {
				error_message = error_message + "* " + message + "\n";
				error = true;
			}
		}
	}
	
	function check_password(field_name_1, field_name_2, field_size, message_1, message_2) {
		if (form.elements[field_name_1] && (form.elements[field_name_1].type != "hidden")) {
			var password = form.elements[field_name_1].value;
			var password_confirmation = form.elements[field_name_2].value;
	
			if (password == '' || password.length < field_size) {
				error_message = error_message + "* " + message_1 + "\n";
				error = true;
			} else if (password != password_confirmation) {
				error_message = error_message + "* " + message_2 + "\n";
				error = true;
			}
		}
	}
	
	function check_password_new(field_name_1, field_name_2, field_name_3, field_size, message_1, message_2, message_3) {
		if (form.elements[field_name_1] && (form.elements[field_name_1].type != "hidden")) {
			var password_current = form.elements[field_name_1].value;
			var password_new = form.elements[field_name_2].value;
			var password_confirmation = form.elements[field_name_3].value;
			
			if (password_current == '' || password_current.length < field_size) {
				error_message = error_message + "* " + message_1 + "\n";
				error = true;
			} else if (password_new == '' || password_new.length < field_size) {
				error_message = error_message + "* " + message_2 + "\n";
				error = true;
			} else if (password_new != password_confirmation) {
				error_message = error_message + "* " + message_3 + "\n";
				error = true;
			}
		}
	}
	
	function check_form(form_name) {
		if (submitted == true) {
			alert("This form has already been submitted. Please press Ok and wait for this process to be completed.");
			return false;
		}
		
		error = false;
		form = eval('document.'+form_name);
		
		error_message = "Errors have occured during the process of your form.\n\nPlease make the following corrections:\n\n";
		var emailaddr = form.elements["account_email_address"].value;
		var contactno = form.elements["contactnumber"].value;
		
		if (validateEmail(emailaddr) != true) {
			error_message = error_message + "* " + "The email provided does not appear to be valid." + "\n";
			error = true;		
		}
		
		//check_input("account_email_address", 6, "Your E-Mail Address must contain a minimum of 6 characters.");
		check_input("password", 6, "Your Password must contain a minimum of 6 characters.");
		check_input("password_confirmation", 6, "The Password Confirmation must match your New Password.");
		check_input("firstname", 2, "Your First Name must contain a minimum of 2 characters.", true);
		check_input("lastname", 2, "Your Last Name must contain a minimum of 2 characters.", true);
		check_select("country", "", "You must select a country from the Countries pull down menu.");
		
		if (trim_str(contactno).length > 0 && isNaN(trim_str(contactno))) {
			error_message = error_message + "* " + "Your phone number does not appear to be valid." + "\n";
			error = true;
		} else if (isNaN(trim_str(contactno)) == false) {
	//		check_input("contactnumber", 3, "Your phone number must be at least 3 number.");
		}
		
		check_select("secretquestion", "", "You must select a secret question from the Secret Question pull down menu.");
		check_input("answer", 3 , "Your Answer must contain a minimum of 3 characters.");
		check_checkbox("agreed", "You must agree to our Terms of Service & Privacy Policy");
	//	check_input("VerificaCode", 4 , "Verification code must contain 4 characters.");
		
		// Optional Information:
//		var day_value = form.elements["dob_day"].value;
//		var mth_value = form.elements["dob_month"].value;
//		var year_value = form.elements["dob_year"].value;
		var baddr1_value = trim_str(form.elements["billingaddress1"].value);
		var baddr2_value = trim_str(form.elements["billingaddress2"].value);
		var bcity_value = trim_str(form.elements["billingcity"].value);
		var bpostcode_value = trim_str(form.elements["billingpostcode"].value);
		var bcountry_value = form.elements["billingcountry"].value;
		var bstate = form.elements["state"];
		
//		if (day_value == '' && (mth_value != '' || year_value != '')) {
//			check_select("dob_day","","You must select a Day from the Day pull down menu. ");
//		}
//		if (mth_value == '' && (day_value != '' || year_value != '')) {
//			check_select("dob_month","","You must select a Month from the Month pull down menu. ");
//		}
//		if (year_value == '' && (mth_value != '' || day_value != '')) {
//			check_select("dob_year","","You must select a Year from the Year pull down menu. ");
//		}

		if (baddr1_value.toLowerCase() != 'null' && baddr1_value.length > 0 && baddr1_value.length < 5 ) {
			error_message = error_message + "* " + "Your Street Address must contain a minimum of 5 characters." + "\n";
			error = true;
			var erraddr1 = true;
		}
		
		if (erraddr1 == true) {
			if (baddr2_value.length > 0 && baddr2_value.toLowerCase() != 'null') {
				check_input("billingaddress2", 5, "Your Street Address must contain a minimum of 5 characters.");
			}
			
			check_input("billingcity", 3, "Your City must contain a minimum of 3 characters.");
			check_input("billingpostcode", 4, "Your Post Code must contain a minimum of 4 characters.");
			check_select("billingcountry", "", "You must select a country from the Countries pull down menu.");
			
			if (bcountry_value != '') {
				if (bstate.type == 'text') {
					check_input("state", 1, "Your State must contain a minimum of 1 characters.", true);
				} else {
					check_select("state", "", "Please select a state from the States pull down menu.");	
				}
			}
		}
		
		if (error == true) {
			alert(error_message);
			return false;
		} else {
			submitted = true;
			return true;
		}
	}


function ez_validation(elObjID, msgObjID, noticemsg, errormsg) {
	var elObj = document.getElementById(elObjID);
	var msgObj = document.getElementById(msgObjID);

	var img_cross = '<img src="files0/error.gif" width="12px" height="12px" style="padding-left:1px;"> ';
	var js_error = false;
	
	getBlur(elObjID, msgObjID, noticemsg);
	
	switch (elObjID) {
		case 'email':
			if (trim_str(elObj.value).length > 0 && validateEmail(elObj.value) != true) {js_error = true;}
			break;
			
		case 'passwd':
			if (elObj.value.toLowerCase() == 'null' || (trim_str(elObj.value).length > 0 && trim_str(elObj.value).length < 6 )) {js_error = true;} 
			break;

		case 'password_confirmation':
			if (elObj.value.toLowerCase() == 'null' || trim_str(elObj.value) != trim_str(document.getElementById('passwd').value) || trim_str(elObj.value).length != trim_str(document.getElementById('passwd').value).length) {js_error = true;} 
			else if (elObj.value.toLowerCase() == 'null' || (trim_str(elObj.value).length > 0 && trim_str(elObj.value).length < 6)) {js_error = true; errormsg = "Password must be at least 6 characters and can only contains letter and number.";} 
			break;
		
		case 'firstname':
			if (elObj.value.toLowerCase() == 'null' || 
				(trim_str(elObj.value).length > 0 && (isNaN(trim_str(elObj.value)) == false || trim_str(elObj.value).length < 2) )
				) {js_error = true;} 
			break;
					
		case 'lastname':
			if (elObj.value.toLowerCase() == 'null' || 
				(trim_str(elObj.value).length > 0 && (isNaN(trim_str(elObj.value)) == false || trim_str(elObj.value).length < 2) ) 
				) {js_error = true;} 
			break;

		case 'country':
			if (elObj.value == null || trim_str(elObj.value) == '') {js_error = true;} 
			break;
			
		case 'contactnumber':
			if (elObj.value.toLowerCase() == 'null' || (trim_str(elObj.value).length > 0 && isNaN(elObj.value))) {js_error = true;} 
			else if (trim_str(elObj.value).length > 0 && trim_str(elObj.value).length < 5) {js_error = true; errormsg = "Your phone number must be at least 5 number.";}
			break;
			
		case 'answer':
			if (elObj.value.toLowerCase() == 'null' || 
				(trim_str(elObj.value).length > 0 && (isNaN(trim_str(elObj.value)) == false || trim_str(elObj.value).length < 3) ) 
				) {js_error = true;} 
			break;
			
		case 'billingaddress1':
			if ((elObj.value.toLowerCase() == 'null' || (trim_str(elObj.value).length > 0 && trim_str(elObj.value).length < 5)) &&
				(trim_str(document.getElementById('billingaddress2').value).length > 0  || trim_str(document.getElementById('billingpostcode').value).length > 0  || 
				 trim_str(document.getElementById('billingcountry').value).length > 0 || trim_str(document.getElementById('state').value).length > 0 ))  {js_error = true;} 
			break;
			
		case 'billingaddress2':
			if (trim_str(document.getElementById('billingaddress2').value).length != 0 && trim_str(document.getElementById('billingaddress2').value).length < 5 ) {js_error = true;} 
			break;

		case 'billingcity':
			if (trim_str(document.getElementById('billingcity').value).length != 0 && (elObj.value.toLowerCase() == 'null' || (trim_str(elObj.value).length > 0 && trim_str(elObj.value).length < 3) )) 
			{js_error = true;} 
			break;
						
		case 'billingpostcode':
			if (trim_str(document.getElementById('billingaddress1').value).length != 0 && (elObj.value.toLowerCase() == 'null' || (trim_str(elObj.value).length > 0 && trim_str(elObj.value).length < 4) )) 
			{js_error = true;} 
			break;
					
		case 'billingcountry':
			if (trim_str(document.getElementById('billingaddress1').value).length != 0 && (elObj.value.toLowerCase() == 'null' || trim_str(elObj.value) == '')) {js_error = true;} 
			break;

		case 'state':
			if ((trim_str(document.getElementById('billingaddress1').value).length > 0 && trim_str(document.getElementById('billingcountry').value).length > 0) && 
				(elObj.type == 'text' && (trim_str(elObj.value).toLowerCase() == 'null' || 
				(trim_str(elObj.value).length > 0 && (isNaN(elObj.value) == false || trim_str(elObj.value).length < 1))))) {js_error = true;}
			break;
		
		case 'agreed':
			if (elObj.checked == '') {js_error = true;}
			elObj.className = "";
			break;
			
		default:
			break;
	}
	
	if (js_error == true) {
		signup_form_error = true;
		msgObj.style.color="red";
		msgObj.innerHTML = img_cross + errormsg;
	} else {
		msgObj.innerHTML = '';
	}
}

	window.onload = function() {
		jQuery('#email').val('');
		jQuery('#passwd').val('');
	}
	
	
	function DoSubmit(obj) {
		if (submitted == true) {
			alert("This form has already been submitted. Please press Ok and wait for this process to be completed.");
			return false;
		}
		
	  form = eval('document.'+obj);
	  var useremail = form.elements["txtEmail"].value;
	  var userpassword  = form.elements["password"].value;
	  var error = false;
	  var errorinfo = 'ERROR\n\n';
	  if (useremail.length < 1 || useremail == 'Account') {
	  errorinfo += ' * Please input your E-Mail address account.  \n';
	  error = true;
	  }
	  if (userpassword.length < 1 || userpassword == 'Password') {
	  errorinfo += ' * Please input the password.  \n';
	  error = true;
	  }
		if (error == true) {
			alert(errorinfo);
			return false;
		} else {
			submitted = true;
			return true;
		}
		
	  }

	function resetpass_form(form_name) {
		if (submitted == true) {
			alert("This form has already been submitted. Please press Ok and wait for this process to be completed.");
			return false;
		}
		
		error = false;
		form = eval('document.'+form_name);
	
		error_message = "Errors have occured during the process of your form.\n\nPlease make the following corrections:\n\n";
		
		var currentpass = form.elements["CurrentPassword"].value;
	    if (currentpass.length < 1) {
	       error_message += '* Please input your current password.  \n';
	       error = true;
	    }			
		check_input("NewPassword", 6, "Your new Password must contain a minimum of 6 characters.");
		check_input("ConfirmNewPassword", 6, "The Password Confirmation must match your New Password.");
		
		if (error == true) {
			alert(error_message);
			return false;
		} else {
			submitted = true;
			return true;
		}
	}

	function edit_form(form_name) {
		if (submitted == true) {
			alert("This form has already been submitted. Please press Ok and wait for this process to be completed.");
			return false;
		}
		
		error = false;
		form = eval('document.'+form_name);
	
		error_message = "Errors have occured during the process of your form.\n\nPlease make the following corrections:\n\n";
		
		check_input("newanswer", 3 , "Your Answer must contain a minimum of 3 characters.");
		
		if (error == true) {
			alert(error_message);
			return false;
		} else {
			submitted = true;
			return true;
		}
	}

	function DoSubmit2(obj) {
		if (submitted == true) {
			alert("This form has already been submitted. Please press Ok and wait for this process to be completed.");
			return false;
		}
		
	  form = eval('document.'+obj);
	  var useremail2 = form.elements["txtEmail2"].value;
	  var VerificaCodePas = form.elements["VerificaCode"].value;
	  var error = false;
	  var errorinfo = 'ERROR\n\n';
	  if (useremail2.length < 1) {
	     errorinfo += ' * Please input your E-Mail address account.  \n';
	     error = true;
	  }
	  else{
		  if(validateEmail(useremail2) != true){
		    errorinfo += ' * The email provided does not appear to be valid.  \n';
	        error = true;
		  }
	  }
	  
	  // if (VerificaCodePas.length != 4) {
	  // errorinfo += ' * Please input the Verification Code.  \n';
	  // error = true;
	  // }
		if (error == true) {
			alert(errorinfo);
			return false;
		} else {
			submitted = true;
			return true;
		}		
	  }

	function DoSubmit3(obj) {
		if (submitted == true) {
			alert("This form has already been submitted. Please press Ok and wait for this process to be completed.");
			return false;
		}
		
	  form = eval('document.'+obj);
	  var answer2 = form.elements["answer2"].value;
	  var error = false;
	  var errorinfo = 'ERROR\n\n';
	  if (answer2.length < 1) {
	  errorinfo += ' * Please input your answer.  \n';
	  error = true;
	  }
		if (error == true) {
			alert(errorinfo);
			return false;
		} else {
			submitted = true;
			return true;
		}
		
	  }

	function DoSubmit4(obj) {
		if (submitted == true) {
			alert("This form has already been submitted. Please press Ok and wait for this process to be completed.");
			return false;
		}
		
		error = false;
		form = eval('document.' + obj);
	
		error_message = "Errors have occured during the process of your form.\n\nPlease make the following corrections:\n\n";
		
		check_input("NewPassword2", 6, "Your new Password must contain a minimum of 6 characters.");
		check_input("ConfirmNewPassword2", 6, "The Password Confirmation must match your New Password.");
		
		if (error == true) {
			alert(error_message);
			return false;
		} else {
			submitted = true;
			return true;
		}
	}


function SetCookie(sName, sValue,iExpireDays)
{
	if(iExpireDays)
	{
		var dExpire = new Date();
		dExpire.setTime(dExpire.getTime()+parseInt(iExpireDays*24*60*60*1000));
		document.cookie = sName + "=" + escape(sValue) + "; expires=" + dExpire.toGMTString();
	}
	else
	{
		document.cookie = sName + "=" + escape(sValue);
	}
}

function GetCookie(sName)
{
	var arr = document.cookie.match(new RegExp("(^| )"+sName+"=([^;]*)(;|$)"));
	if(arr !=null){return unescape(arr[2])};
	return null;
}
