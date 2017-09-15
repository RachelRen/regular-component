'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import template from './index.html';
// import './index.scss';
var template = '\n\t<div class="input-number {class}">\n\t\t<div class="input-number-handler-wrap" r-hide={!showHandler}>\n\t\t\t<span class="iconfont input-number-handler icon-select-up" \n\t\t\t\ton-click={this.__evAdd(1)}></span>\n\t\t\t<span class="iconfont input-number-handler icon-select-down" \n\t\t\t\ton-click={this.__evAdd(-1)}></span>\n\t\t</div>\n\t\t<div class="input-number-input-wrap">\n\t\t\t<input type="text" class="input-number-input" maxLength={maxLength} on-change={this.__evChange($event)} on-focus={this.__evFocus($event)} r-model={showValue} />\n\t\t</div>\n\t</div>\n';
var InputNumber = _regularjs2.default.extend({
	template: template,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			hasDecimal: false,
			defaultValue: '',
			isPositive: false,
			showHandler: true
			// maxValue: //最大数
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		this.data.showValue = sdata.value || '';
	},
	init: function init() {
		var self = this,
		    sdata = self.data;

		self.__addWatcher();
	},
	__addWatcher: function __addWatcher() {
		var self = this,
		    sdata = self.data;

		self.$watch('value', function (newValue) {
			// debugger;
			//当外面的赋值变化的时候，显示的值也要改变
			//TODO?
			self.$update({
				showValue: newValue
			});
		});
	},
	__evAdd: function __evAdd(num) {
		var self = this,
		    sdata = self.data,
		    value = Math.floor(sdata.value || "") + num;

		self.__updateValue(value);
	},

	__evChange: function __evChange() {
		console.log("change");
		var self = this,
		    sdata = self.data,
		    showValue = sdata.showValue,

		// re = /([0-9]+.[0-9]{2})[0-9]*/,
		decimalsReg = /^\d+?(\.\d{1,2})?$/,
		    //保持小数点两位
		reg = sdata.isPositive ? /^\d+?(\.\d+)?$/ : /^-?\d+?(\.\d+)?$/; //格式正确，是数字形式
		//有小数点
		if (showValue && !reg.test(showValue)) {
			showValue = sdata.value;
			self.$update({
				showValue: showValue
			});
			return;
		}
		//有最大值
		if (sdata.maxValue && showValue > sdata.maxValue) {
			showValue = sdata.value;
			self.$update({
				showValue: showValue
			});
			return;
		}
		if (sdata.hasDecimal) {
			showValue = showValue == "" || showValue == null ? sdata.defaultValue : Math.round(showValue * 100) / 100;
		} else {
			showValue = showValue == "" || showValue == null ? sdata.defaultValue : Math.floor(showValue);
		}

		self.__updateValue(showValue);
	},
	__evFocus: function __evFocus($event) {
		this.$emit("focus");
	},
	__updateValue: function __updateValue(value) {
		var self = this;
		self.$update({
			value: value,
			showValue: value
		});
		self.$emit("change", value);
		if (typeof this.data.onChange == "function") {
			this.data.onChange(value);
		}
		// onChange
	}

});

exports.default = InputNumber;