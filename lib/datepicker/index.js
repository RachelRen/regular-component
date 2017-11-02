'use strict';

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../datepicker-day/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../datepicker-month/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../util/index');

var _location = require('../util/location');

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
** mode: 设置日历或者月份
** minDate：设置日历的最小值
** maxDate: 设置日历的最大值
** date： 选中的日期
**/
var DatePicker = _regularjs2.default.extend({
	template: _index2.default,
	name: "DatePicker",
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			show: false,
			hideTimeout: null,
			mode: "day", //["day", "month"]
			format: "yyyy-MM-dd" //["yyyy-MM-dd", "yyyy-MM"]
		};
		var newData = {};
		// debugger;
		// if(data.mode == "month"){
		// 	defaults.format = "yyyy-MM";
		// }
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		if (this.data.mode == "month") {
			this.data.format = this.data.format.substr(0, this.data.format.indexOf("d") - 1);
		}
		if (this.data.value) {
			this.data.value = (0, _index7.formatTime)(this.data.value, this.data.format);
		}
	},
	init: function init() {
		var self = this,
		    sdata = self.data;
	},

	__evFocus: function __evFocus() {
		var self = this,
		    sdata = self.data;
		// sdata.show = true;
	},
	__evChange: function __evChange($event) {
		var self = this,
		    sdata = self.data,
		    val = $event.target.value,
		    $refs = self.$refs,
		    value = sdata.value ? new Date(sdata.value) : null;
		if (value != "Invalid Date") {
			// var formatStr = "yyyy-MM-dd";
			// if(sdata.mode == "month"){
			// 	formatStr = "yyyy-MM";
			// }
			sdata.value = (0, _index7.formatTime)(value, sdata.format);
			$event.target.value = sdata.value;
		} else {
			// sdata.data = "";
			$event.target.value = sdata.value;
		}

		self.$update();
	},

	__evBlur: function __evBlur($event) {
		var self = this,
		    sdata = self.data;

		// 	var self = this,
		// 		sdata = self.data;
		// 	sdata.hideTimeout = setTimeout(function(){
		// 		sdata.show = false;
		// 	}, 300);
	},

	__evSelect: function __evSelect(json) {
		var self = this,
		    sdata = self.data;

		// sdata.date = json;
		self.$refs.input.value = json;
		self.$update({
			value: json
		});
		self.__evToggle(false);
	},
	__show: function __show() {
		// var self = this;
		// clearTimeout(self.data.hideTimeout);
		// self.data.hideTimeout = null;
	},

	__evToggle: function __evToggle(show) {
		var _this = this;

		var sdata = this.data,
		    index;

		if (show === undefined) {
			show = !sdata.show;
		}
		sdata.show = show;
		index = DatePicker.shows.indexOf(this);
		if (show && index == -1) {

			//显示
			if (this.datepicker) {
				this.datepicker.show();
			} else {
				var picker = _index4.default;
				if (sdata.mode == "month") {
					picker = _index6.default;
				}
				this.datepicker = new picker({
					data: {
						target: this.$refs.element,
						format: sdata.format,
						value: sdata.value
					}
				}).$on("select", function ($event) {
					_this.$update({
						value: $event
					});
					_this.datepicker.hide();
					_this.__evToggle(false);
					if (typeof _this.data.onChange == "function") {
						_this.data.onChange.call(_this, $event);
					}
				});
			}
			DatePicker.shows.push(this);
		} else if (!show && index >= 0) {
			this.datepicker.hide();
			DatePicker.shows.splice(index, 1);
		}

		// component, target, placement


		// let location = getLocation(this.calendar.$refs.component, self.$refs.element, "bottom");
		this.$update();
	}

});

// DatePicker.component('calendar', Calendar);
// DatePicker.component('monthPicker', MonthPicker);


// var $ = require('$');
// var Base = require('RegularBase');
// var Regular = require("Regular");
// var Calendar = require('/javascript/components/calendar/index.es6');
// var MonthPicker = require('/javascript/components/monthPicker/index.es6');

DatePicker.shows = [];
_regularjs2.default.dom.on(document, "click", function (e) {
	DatePicker.shows.forEach(function (o) {
		var element = o.$refs.element,
		    componentWrap = o.datepicker.$refs.component,
		    element2 = e.target;
		while (element2) {
			if (element2 == element || element2 == componentWrap) {
				return;
			}
			element2 = element2.parentNode;
		}
		//说明都不是
		o.__evToggle(false);
	});
});
module.exports = DatePicker;