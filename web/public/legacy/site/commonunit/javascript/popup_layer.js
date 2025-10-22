jQuery.noConflict();
Function.prototype.binding = function() {
    if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
    var __method = this, args = jQuery.makeArray(arguments), object = args.shift();
    return function() {
        return __method.apply(object, args.concat(jQuery.makeArray(arguments)));
    }
}

var Class = function(subclass){
	subclass.setOptions = function(options){
		this.options = jQuery.extend({}, this.options,options);
		for(var key in options){
			if(/^on[A-Z][A-Za-z]*$/.test(key)){
				jQuery(this).bind(key,options[key]);
			}
		}
	}
    var fn =  function(){
        if(subclass._init && typeof subclass._init == 'function'){
            this._init.apply(this,arguments);
        }
    }
    if(typeof subclass == 'object'){
        fn.prototype = subclass;
    }
    return fn;
}

var PopupLayer = new Class({
	options:{
		trigger:null,
		popupBlk:null,
		closeBtn:null,
		popupLayerClass:"popupLayer",
		eventType:"click",
		offsets:{
			x:0,
			y:0
		},
		useFx:false,
		useOverlay:false,
		usePopupIframe:true,
		isresize:true,
		onBeforeStart:function(){}
	},
	_init:function(options){
		this.setOptions(options);
		this.isSetPosition = this.isDoPopup = this.isOverlay = true;
		this.popupLayer = jQuery(document.createElement("div")).addClass(this.options.popupLayerClass);
		this.popupIframe = jQuery(document.createElement("iframe")).attr({border:0,frameborder:0});
		this.trigger = jQuery(this.options.trigger);
		this.popupBlk = jQuery(this.options.popupBlk);
		this.closeBtn = jQuery(this.options.closeBtn);
		jQuery(this).trigger("onBeforeStart");
		this._construct()
		this.trigger.bind(this.options.eventType,function(){
			if(this.isSetPosition){
				var sTop = document.documentElement.scrollTop + document.body.scrollTop;
				var ldiff;
				if(jQuery.browser.msie)
				{
					ldiff = -50;
				}
				else
				{
					ldiff = 0;
				}
				this.setPosition(this.trigger.offset().left + this.options.offsets.x, (this.trigger.offset().top + ldiff + sTop + 50) + this.trigger.get(0).offsetHeight + this.options.offsets.y);
			}
			this.options.useOverlay?this._loadOverlay():null;
			(this.isOverlay && this.options.useOverlay)?this.overlay.show():null;
			if(this.isDoPopup && (this.popupLayer.css("display")== "none")){
				this.options.useFx?this.doEffects("open"):this.popupLayer.show();
			}							 
		}.binding(this));
		this.isresize?jQuery(window).bind("resize",this.doresize.binding(this)):null;
		this.options.closeBtn?this.closeBtn.bind("click",this.close.binding(this)):null;
	},
	_construct:function(){
		this.popupBlk.show();
		this.popupLayer.append(this.popupBlk.css({opacity:1})).appendTo(jQuery(document.body)).css({position:"absolute",'z-index':2,width:this.popupBlk.get(0).offsetWidth,height:this.popupBlk.get(0).offsetHeight});
		this.options.usePopupIframe?this.popupLayer.append(this.popupIframe):null;
		this.recalculatePopupIframe();
		this.popupLayer.hide();
	},
	_loadOverlay:function(){
		pageWidth = (jQuery.browser.version=="6.0")?jQuery(document).width()-21:jQuery(document).width();
		this.overlay?this.overlay.remove():null;
		this.overlay = jQuery(document.createElement("div"));
		this.overlay.css({position:"absolute","z-index":1,left:0,top:0,zoom:1,display:"none",width:pageWidth,height:jQuery(document).height()}).appendTo(jQuery(document.body)).append("<div style='position:absolute;z-index:3;width:100%;height:100%;left:0;top:0;opacity:0.3;filter:Alpha(opacity=30);background:#000'></div><iframe frameborder='0' border='0' style='width:100%;height:100%;position:absolute;z-index:3;left:0;top:0;filter:Alpha(opacity=0);'></iframe>")
	},
	doresize:function(){
		this.overlay?this.overlay.css({width:(jQuery.browser.version=="6.0")?jQuery(document).width()-21:jQuery(document).width(),height:(jQuery.browser.version=="6.0")?jQuery(document).height()-4:jQuery(document).height()}):null;
		if(this.isSetPosition){			
			this.setPosition(this.trigger.offset().left + this.options.offsets.x, this.trigger.offset().top + this.trigger.get(0).offsetHeight + this.options.offsets.y);
		}
	},
	setPosition:function(left,top){
		this.popupLayer.css({left:left,top:top});
	},
	doEffects:function(way){
		way == "open"?this.popupLayer.show("slow"):this.popupLayer.hide("slow");		
	},
	recalculatePopupIframe:function(){
		this.popupIframe.css({position:"absolute",'z-index':-1,left:0,top:0,opacity:0,width:this.popupBlk.get(0).offsetWidth,height:this.popupBlk.get(0).offsetHeight});
	},
	close:function(){
		this.options.useOverlay?this.overlay.hide():null;
		this.options.useFx?this.doEffects("close"):this.popupLayer.hide();
	}
});﻿

   jQuery(document).ready(function() {
	  new PopupLayer({trigger:"#elePro",popupBlk:"#blkPro",closeBtn:"#closPro",useFx:true,useOverlay:true,offsets:{x:0,y:0}});
   });