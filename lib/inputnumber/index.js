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

var InputNumber = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			hasDecimal: false,
			defaultValue: '',
			isPositive: false,
			showHandler: true,
			step: 1
			// max: //最大数
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
	__evAdd: function __evAdd(isPositive) {
		var self = this,
		    sdata = self.data,
		    value = parseFloat(sdata.value || "");
		if (isPositive) {
			value += sdata.step;
		} else {
			value -= sdata.step;
		}

		self.__evChange(value);
	},

	__evChange: function __evChange() {
		var showValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.showValue;

		console.log("change");
		var self = this,
		    sdata = self.data,

		// showValue = sdata.showValue,
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
		if (sdata.max && showValue > sdata.max) {
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
		if (typeof this.data.onFocus == "function") {
			this.data.onFocus(value);
		}
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