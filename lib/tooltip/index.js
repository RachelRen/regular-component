'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _location = require('../util/location');

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var $ = require('$');
// var Base = require('RegularBase');
// var Regular = require('Regular');

var ToolTip = _regularjs2.default.extend({
	template: _index2.default,
	name: 'tooltip',
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			placement: "top", //位置 默认是top
			topTipClassName: "",
			arrowDirction: ""
			// target:{}
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		//sdata = $.extend(true, {}, defaults, sdata);
	},
	init: function init() {
		var self = this,
		    sdata = self.data;
		// this.$on("inject", function(){
		// 	debugger;

		// });

		this.$inject(document.body);
		this.__addEvents();

		//self.show(sdata.top, sdata.left);
	},
	__addEvents: function __addEvents() {
		var _this = this;

		this.data.target.onmouseover = function (event) {
			var self = _this,
			    sdata = self.data,
			    target = sdata.target,
			    clientRect = target.getBoundingClientRect(),
			    width = clientRect.width,
			    top = clientRect.top,
			    left = clientRect.left;

			self.show(top, left);
		};
		this.data.target.onmouseout = function (event) {
			_this.hide(event);
			// var self = this,
			//           sdata = self.data,
			//           target = sdata.target,
			//           clientRect = target.getBoundingClientRect(),
			//           width = clientRect.width,
			//           top = clientRect.top,
			//           left = clientRect.left;

			//       self.show(top, left);
		};
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
	show: function show(sTop, sLeft) {
		console.log("show");

		var self = this,
		    sdata = self.data,
		    toolTip = self.$refs.toolTip,
		    target = sdata.target,
		    placement = sdata.placement;
		// target = sdata.target,
		// clientRect = target.getBoundingClientRect(),
		// width = clientRect.width,

		if (!_regularjs2.default.dom.hasClass(toolTip, "u-tooltip-hidden")) {
			return;
		}
		_regularjs2.default.dom.delClass(toolTip, "u-tooltip-hidden");
		// var client = toolTip.getBoundingClientRect(),
		// 	top = client.top,
		// 	left = client.left,
		// 	width = client.width,//toolTip
		// 	height = client.height,
		// 	target = sdata.target,
		// 	targetRact = target.getBoundingClientRect(),
		// 	sTop = targetRact.top,
		//           sLeft = targetRact.left,
		// 	placement = sdata.placement,
		// 	top, left;
		//组件，target

		var location = (0, _location.getLocation)(toolTip, target, placement, true);
		_regularjs2.default.dom.addClass(toolTip, "zoom-big-enter zoom-big-enter-active");
		// if(!placement){
		// 	top = (sTop - height);
		// 	left = (sLeft - parseInt(width/2));

		// 	top = top < 0 ? 0 : top;
		// 	left = left < 0 ? 0 : left;
		// }else if(placement == "right"){
		// 	top = sTop;
		// 	left = sLeft + targetRact.width + 8;
		// 	if(left + width > document.body.clientWidth){//太右边了，就放在左边
		// 		left = sLeft - width - 8;
		// 		sdata.arrowDirction = "left";
		// 	}
		// }
		self.$update({
			style: {
				top: location.top + "px",
				left: location.left + "px"
			},
			arrowClass: {
				'arrow-right': location.arrowDirction == "left",
				'arrow-left': location.arrowDirction == "right",
				'arrow-top': location.arrowDirction == "bottom",
				'arrow-bottom': location.arrowDirction == "top"
			}
		});
		setTimeout(function () {
			_regularjs2.default.dom.delClass(toolTip, "zoom-big-enter zoom-big-enter-active");
		}, 200);
	},

	hide: function hide($event) {
		//zoom-big-leave zoom-big-leave-active zoom-big-enter-active zoom-big-enter
		var self = this,
		    $refs = self.$refs,
		    toolTip = $refs.toolTip,
		    sdata = self.data,
		    hoverTarget = sdata.target,
		    target = $event.relatedTarget,
		    isShow = false;

		while (target) {
			if (target == toolTip) {
				isShow = true;
				return;
			}
			target = target.parentNode;
		}
		if (!isShow) {
			target = $event.relatedTarget;
			while (target) {
				if (target == hoverTarget) {
					isShow = true;
					return;
				}
				target = target.parentNode;
			}
		}
		if (!isShow) {
			//需要隐藏
			_regularjs2.default.dom.addClass(toolTip, "zoom-big-leave zoom-big-leave-active");
			setTimeout(function () {
				_regularjs2.default.dom.addClass(toolTip, "u-tooltip-hidden");
				_regularjs2.default.dom.delClass(toolTip, "zoom-big-leave zoom-big-leave-active");
			}, 200);
		}
	},
	__evToolTipLeave: function __evToolTipLeave($event) {
		var self = this;
		self.hide($event);
	}

});

exports.default = ToolTip;
// module.exports = Component;