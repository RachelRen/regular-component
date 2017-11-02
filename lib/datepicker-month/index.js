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

var MonthPicker = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			months: function () {
				var i = 1,
				    arr = [],
				    months = [];
				while (i < 13) {
					arr.push({
						month: i,
						text: (0, _index3.numberFixed)(i)
					});
					i++;
				}
				months.push(arr.splice(0, 3));
				months.push(arr.splice(0, 3));
				months.push(arr.splice(0, 3));
				months.push(arr.splice(0, 3));
				return months;
			}(),
			date: new Date()

		};
		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
	},
	init: function init() {

		var self = this,
		    sdata = self.data;
		this.$inject(document.body);
		self.show();
		self.__addWatcher();
	},
	show: function show() {
		var sdata = this.data,
		    value = sdata.value,
		    selectedMonth = sdata.selectedMonth,
		    selectedYear = sdata.selectedYear,
		    currentDay = sdata.currentDay,
		    thisDate = value ? new Date(value) : new Date(),
		    _getLocation = (0, _location.getLocation)(this.$refs.component, sdata.target, "bottom"),
		    top = _getLocation.top,
		    left = _getLocation.left;


		this.$update({
			style: {
				top: top + "px",
				left: left + "px",
				display: "block"
			},
			selectedMonth: selectedMonth ? selectedMonth : thisDate.getMonth() + 1,
			selectedYear: selectedYear ? selectedYear : thisDate.getFullYear(),
			currentDay: currentDay ? currentDay : (0, _index3.formatTime)(thisDate, sdata.format)
		});
	},
	hide: function hide() {
		this.$update({
			style: {
				display: "none"
			}
		});
	},
	//点击的时候，显示日期

	__addWatcher: function __addWatcher() {
		var self = this,
		    sdata = self.data;

		self.$watch(["minDate", "maxDate"], function (newVal, oldVal) {
			// list
			self.__setMinMaxDate();
		});
	},
	__setMinMaxDate: function __setMinMaxDate() {
		var self = this,
		    sdata = self.data;

		sdata.months.forEach(function (o, i) {
			o.forEach(function (m) {
				self.__disable(m);
			});
		});
	},
	__disable: function __disable(item) {
		var self = this,
		    sdata = self.data,
		    selectedYear = sdata.selectedYear,
		    minDate = sdata.minDate,
		    maxDate = sdata.maxDate;

		if (minDate) {
			minDate = new Date(minDate);
			var minYear = minDate.getFullYear(),
			    minMonth = minDate.getMonth() + 1;
			if (minYear > selectedYear || minYear == selectedYear && minMonth >= item.month) {
				item.disabled = true;
			} else {
				item.disabled = false;
			}
		}
		if (maxDate) {
			maxDate = new Date(maxDate);
			var maxYear = maxDate.getFullYear(),
			    maxMonth = maxDate.getMonth() + 1;

			if (maxYear < selectedYear || maxYear == selectedYear && maxMonth <= item.month) {
				item.disabled = true;
			} else {
				item.disabled = false;
			}
		}
	},

	__addYear: function __addYear(year) {
		var self = this,
		    selectedYear = self.data.selectedYear;

		self.$update({
			selectedYear: selectedYear + (year - 0)
		});
		self.__setMinMaxDate();
	},

	__evSelect: function __evSelect(month, item) {
		var self = this,
		    sdata = self.data;
		if (item.disabled) {
			return;
		}
		var date = (0, _index3.formatTime)(sdata.selectedYear + "/" + month + "/01", sdata.format);
		self.$update({
			selectedMonth: month
		});
		self.$emit("select", date);
	}

});

// import CalendarPicker from '../datepicker-day/index';
// var $ = require('$');
// var Base = require('RegularBase');

exports.default = MonthPicker;