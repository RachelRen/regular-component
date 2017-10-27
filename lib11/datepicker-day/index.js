'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../util/index');

var _location = require('../util/location');

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarPicker = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			week: ["日", "一", "二", "三", "四", "五", "六"],
			initDate: "",
			currentDay: (0, _index3.formatTime)(new Date(), data.format)
			// selectedIndex: -1
		};
		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		if (!this.data.value) {
			this.data.value = this.data.currentDay;
		}
	},
	init: function init() {

		var self = this,
		    sdata = self.data;
		this.$inject(document.body);
		this.show();
		self.__addWatcher();
	},
	//点击的时候，显示日期
	show: function show() {

		var sdata = this.data;
		// this.$refs.component, self.$refs.element, "bottom"

		var _getLocation = (0, _location.getLocation)(this.$refs.component, sdata.target, "bottom"),
		    top = _getLocation.top,
		    left = _getLocation.left;

		this.$update({
			style: {
				top: top + "px",
				left: left + "px",
				display: "block"
			}
		});
		this.__getDays(new Date(sdata.value), sdata.value);
	},
	hide: function hide() {
		this.$update({
			style: {
				display: "none"
			}
		});
	},
	__addWatcher: function __addWatcher() {
		var self = this,
		    sdata = self.data;

		self.$watch("selectedDate", function (newVal, oldVal) {
			self.__getDays(new Date(sdata.value || sdata.currentDay), newVal || sdata.currentDay);
		});
		self.$watch(["minDate", "maxDate"], function (newVal, oldVal) {
			self.__getDays(new Date(sdata.value || sdata.currentDay), sdata.value || sdata.currentDay);
		});
		// self.$watch("maxDate", function(newVal, oldVal){
		// 	self.__getDays(new Date(sdata.value || sdata.currentDay), (newVal || sdata.currentDay));
		// });
	},
	//获取当前这个月的天数
	__getDays: function __getDays() {
		var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
		var currentDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.data.value;

		var self = this,
		    sdata = self.data,
		    _year = date.getFullYear(),
		    _month = date.getMonth(),
		    _monthDays = new Date(_year, _month + 1, 0).getDate(),
		    //后一个月的第0天，就是这个月的最后一天
		_firstDayIndex = self.__getFirstDayIndex(_year, _month),
		    days = [];

		if (_firstDayIndex > 0) {
			//上个月要补得空位
			days = days.concat(self.__getPrevMonthDays(_year, _month, _firstDayIndex));
		}
		var minDate = new Date(sdata.minDate),
		    maxDate = new Date(sdata.maxDate),
		    hasMinDate = false,
		    hasMaxDate = false,
		    minAllDisabled = false,
		    maxAllDisabled = false;

		if (minDate != "Invalid Date" && minDate.getFullYear() == _year && minDate.getMonth() == _month) {
			hasMinDate = true;
		}
		if (maxDate != "Invalid Date" && maxDate.getFullYear() == _year && maxDate.getMonth() == _month) {
			hasMaxDate = true;
		}
		if (minDate != "Invalid Date" && (minDate.getFullYear() > _year || minDate.getFullYear() == _year && minDate.getMonth() > _month)) {
			hasMinDate = true;
			minAllDisabled = true;
		}
		if (maxDate != "Invalid Date" && (maxDate.getFullYear() < _year || maxDate.getFullYear() == _year && minDate.getMonth() < _month)) {
			hasMinDate = true;
			maxAllDisabled = true;
		}
		var minDay = hasMinDate ? minDate.getDate() : -1,
		    maxDay = hasMaxDate ? maxDate.getDate() : 32;
		for (var i = 0; i < _monthDays; i++) {
			var isDisabled = false;
			if (minAllDisabled || maxAllDisabled) {
				isDisabled = true;
			} else {
				isDisabled = minDay > i || maxDay <= i + 1;
			}

			// isDisabled = minDay ? minDay > i : false;
			// isDisabled = maxDay ? maxDay < i : false;
			// if(hasMinDate && (minDate.getDate() > i)){
			// 	isDisabled = true;
			// }
			// if(hasMaxDate && (maxDate.getDate() < i)){
			// 	isDisabled = true;
			// }
			days.push({
				disabled: isDisabled,
				isSelected: false,
				day: i + 1
			});
		}
		// sdata.selectedIndex = -1;
		var selectedDate = new Date(currentDay);
		// if(_year == selectedDate.getFullYear() && _month == selectedDate.getMonth()){
		// 	// days[].isSelected = true;
		// 	// sdata.selectedIndex = selectedDate.getDate() + _firstDayIndex - 1;

		// }
		sdata.selectedDay = sdata.selectedDay ? sdata.selectedDay : selectedDate.getDate();
		var _lastDayIndex = (_monthDays + _firstDayIndex) % 7;
		if (_lastDayIndex > 0) {
			days = days.concat(self.__getNextMonthDays(_year, _month + 1, 7 - _lastDayIndex));
		}

		sdata.days = days;
		sdata.year = _year;
		sdata.month = _month;
		sdata.yearMonth = _year + "-" + (0, _index3.numberFixed)(_month + 1);
		self.$update();
	},
	__getPrevMonthDays: function __getPrevMonthDays(year, month, number) {
		var self = this,
		    days = [],
		    lastDay = new Date(year, month, 0).getDate();
		for (var i = number; i > 0; i--) {
			days.push({
				disabled: true,
				isSelected: false,
				day: lastDay - i + 1
			});
		}
		return days;
	},
	__getNextMonthDays: function __getNextMonthDays(year, month, number) {
		var self = this,
		    days = [];
		for (var i = 0; i < number; i++) {
			days.push({
				disabled: true,
				isSelected: false,
				day: i + 1
			});
		}
		return days;
	},
	__getFirstDayIndex: function __getFirstDayIndex(year, month) {
		var self = this;
		return new Date(year, month, 1).getDay();
	},

	__addYear: function __addYear(year) {
		var self = this,
		    sdata = self.data,
		    date = new Date(sdata.year + year, sdata.month, 1);
		self.$emit("show");
		self.__getDays(date, sdata.value);
	},
	__addMonth: function __addMonth(month) {
		var self = this,
		    sdata = self.data,
		    date = new Date(sdata.year, sdata.month + month, 1);
		self.$emit("show");
		self.__getDays(date, sdata.value);
	},

	__evSelect: function __evSelect(item, index) {
		var self = this,
		    sdata = self.data,
		    month = sdata.month + 1;
		var date = (0, _index3.formatTime)(sdata.year + "/" + month + "/" + item.day, sdata.format);
		self.$update({
			// selectedIndex: index,
			selectedDay: item.day
		});
		self.$emit("select", date);
	}

});

exports.default = CalendarPicker;