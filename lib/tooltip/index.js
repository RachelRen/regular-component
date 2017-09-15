'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToolTip = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			placement: "", //位置 默认是top
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
		debugger;
		// this.$on("inject", function(){
		// 	debugger;

		// });
		this.$inject(document.body);
		self.show(sdata.top, sdata.left);
	},
	show: function show(sTop, sLeft) {
		console.log("show");

		var self = this,
		    sdata = self.data,
		    toolTip = self.$refs.toolTip;
		// target = sdata.target,
		// clientRect = target.getBoundingClientRect(),
		// width = clientRect.width,

		if (!_regularjs2.default.dom.hasClass(toolTip, "u-tooltip-hidden")) {
			return;
		}
		_regularjs2.default.dom.delClass(toolTip, "u-tooltip-hidden");
		var client = toolTip.getBoundingClientRect(),
		    top = client.top,
		    left = client.left,
		    width = client.width,
		    //toolTip
		height = client.height,
		    target = sdata.target,
		    targetRact = target.getBoundingClientRect(),
		    sTop = targetRact.top,
		    sLeft = targetRact.left,
		    placement = sdata.placement,
		    top,
		    left;

		_regularjs2.default.dom.addClass(toolTip, "zoom-big-enter zoom-big-enter-active");
		if (!placement) {
			top = sTop - height;
			left = sLeft - parseInt(width / 2);

			top = top < 0 ? 0 : top;
			left = left < 0 ? 0 : left;
		} else if (placement == "right") {
			top = sTop;
			left = sLeft + targetRact.width + 8;
			if (left + width > document.body.clientWidth) {
				//太右边了，就放在左边
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

}); // var $ = require('$');
// var Base = require('RegularBase');
// var Regular = require('Regular');

exports.default = ToolTip;
// module.exports = Component;