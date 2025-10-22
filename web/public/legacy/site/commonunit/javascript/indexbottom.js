jQuery.noConflict();
(function(){
	var lc = jQuery('.wlylc_bg');
	lc.floatdiv('rightmiddle');
	jQuery('.close',lc).click(function(){
		lc.hide();	
	});
})()