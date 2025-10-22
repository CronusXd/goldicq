jQuery.noConflict();
jQuery(function(){
	function initTablePage(pageSize){
		var allProduct = jQuery('#tbl_product tr.hide');
		allProduct.slice(0,pageSize).show();
		jQuery('#search').keyup(function(){
			var keywordstr = jQuery('#search').val();
			if (keywordstr == '') {
				allProduct.slice(0,pageSize).show();
			} else {
				var keyword = keywordstr.toLowerCase();
				allProduct.hide();
				allProduct.map(function(pro){
					var proname = jQuery(allProduct[pro]).children('.taig:eq(0)').html();
					var pronametest = proname.replace(/<[^>]*>/gi,'').replace('&nbsp;&nbsp;','').toLowerCase();	
					if(pronametest.indexOf(keyword) >= 0)
					{
					   jQuery(allProduct[pro]).show();
					}
				});
			}
		});
	}
	initTablePage(130);
})