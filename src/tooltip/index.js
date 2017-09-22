// var $ = require('$');
// var Base = require('RegularBase');
// var Regular = require('Regular');

import Regular from 'regularjs';

import template from './index.html';
import './index.scss';

var ToolTip = Regular.extend({
	template: template,
	name: 'tooltip',
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				placement: "",//位置 默认是top
				topTipClassName: "",
				arrowDirction: "",
				// target:{}
			};

		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		//sdata = $.extend(true, {}, defaults, sdata);
	},
	init: function(){
		var self = this,
			sdata = self.data;
		// this.$on("inject", function(){
		// 	debugger;
			
		// });
		
		this.$inject(document.body);
		this.__addEvents();

		//self.show(sdata.top, sdata.left);
	},
	__addEvents: function(){
		this.data.target.onmouseover = (event) => {
			var self = this,
	            sdata = self.data,
	            target = sdata.target,
	            clientRect = target.getBoundingClientRect(),
	            width = clientRect.width,
	            top = clientRect.top,
	            left = clientRect.left;

	        self.show(top, left);

		}
		this.data.target.onmouseout = (event) => {
			this.hide(event);
			// var self = this,
	  //           sdata = self.data,
	  //           target = sdata.target,
	  //           clientRect = target.getBoundingClientRect(),
	  //           width = clientRect.width,
	  //           top = clientRect.top,
	  //           left = clientRect.left;

	  //       self.show(top, left);

		}
		// this.data.target.onmouseover = function(){
		// 	debugger;
			
		// }
		// this.$on("tooltip", function(event){
		// 	debugger;
		// })
		// this.data.target.$on("mouseover", function(){
		// 	debugger;
		// })

	},
	show: function(sTop, sLeft){
		console.log("show");
		

		var self = this,
			sdata = self.data,
			toolTip = self.$refs.toolTip;
			// target = sdata.target,
			// clientRect = target.getBoundingClientRect(),
			// width = clientRect.width,
           
		if(!Regular.dom.hasClass(toolTip, "u-tooltip-hidden")){
			return;
		}
		Regular.dom.delClass(toolTip, "u-tooltip-hidden");
		var client = toolTip.getBoundingClientRect(),
			top = client.top,
			left = client.left,
			width = client.width,//toolTip
			height = client.height,
			target = sdata.target,
			targetRact = target.getBoundingClientRect(),
			sTop = targetRact.top,
            sLeft = targetRact.left,
			placement = sdata.placement,
			top, left;

		Regular.dom.addClass(toolTip, "zoom-big-enter zoom-big-enter-active");
		if(!placement){
			top = (sTop - height);
			left = (sLeft - parseInt(width/2));

			top = top < 0 ? 0 : top;
			left = left < 0 ? 0 : left;
		}else if(placement == "right"){
			top = sTop;
			left = sLeft + targetRact.width + 8;
			if(left + width > document.body.clientWidth){//太右边了，就放在左边
				left = sLeft - width - 8;
				sdata.arrowDirction = "left";
			}
		}
		
		self.$update({
			style: {
				top: top + "px",
				left: left + "px"
			}
		});
		setTimeout(function(){
			Regular.dom.delClass(toolTip, "zoom-big-enter zoom-big-enter-active");
		}, 200);
		
	},

	hide: function($event){
		//zoom-big-leave zoom-big-leave-active zoom-big-enter-active zoom-big-enter
		var self = this,
			$refs = self.$refs,
			toolTip = $refs.toolTip,
			sdata = self.data,
			hoverTarget = sdata.target,
			target = $event.relatedTarget,
			isShow = false;

		while(target){
			if(target == toolTip){
				isShow = true;
				return;
			}
			target = target.parentNode;
		}
		if(!isShow){
			target = $event.relatedTarget;
			while(target){
				if(target == hoverTarget){
					isShow = true;
					return;
				}
				target = target.parentNode;
			}
		}
		if(!isShow){
			//需要隐藏
			Regular.dom.addClass(toolTip, "zoom-big-leave zoom-big-leave-active");
			setTimeout(function(){
				Regular.dom.addClass(toolTip, "u-tooltip-hidden");
				Regular.dom.delClass(toolTip, "zoom-big-leave zoom-big-leave-active");
			}, 200);
		}
		

		
	},
	__evToolTipLeave: function($event){
		var self = this;
		self.hide($event);
	}
	
	
});

export default ToolTip;
// module.exports = Component;