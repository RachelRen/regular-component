'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../util/index');

var _index4 = require('../select/index');

var _index5 = _interopRequireDefault(_index4);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    today = new Date(),
		    thisYear = today.getFullYear(),
		    defaults = {
			today: (0, _index3.formatTime)(today, "yyyy-MM-dd"),
			thisYear: thisYear,
			thisMonth: (0, _index3.numberFixed)(today.getMonth() + 1),
			yearList: function () {
				var list = [];
				for (var i = thisYear - 10; i < thisYear + 10; i++) {
					list.push({
						value: i,
						text: i
					});
				}
				return list;
			}(),
			monthList: function () {
				var list = [];
				for (var i = 1; i < 13; i++) {
					list.push({
						value: (0, _index3.numberFixed)(i),
						text: (0, _index3.numberFixed)(i)
					});
				}
				return list;
			}()
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
	},
	init: function init() {
		var self = this;
		self.__getDays();
		self.__addWatcher();
	},

	__addWatcher: function __addWatcher() {
		var self = this,
		    sdata = self.data;

		self.$watch("[thisYear, thisMonth]", function (newVal, oldVal) {
			if (oldVal == null) {
				return;
			}
			//清除之前页面留下的toolTip
			// self.__destroyPopTip();
			self.__getCalendarFisrtLastDate(sdata.thisYear, sdata.thisMonth);
		});
	},
	__getCalendarFisrtLastDate: function __getCalendarFisrtLastDate() {
		var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getFullYear();
		var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getMonth() + 1;

		var self = this,
		    sdata = self.data,
		    monthTotalDays = new Date(year, month, 0).getDate(),
		    firstDayIndex = self.__getFirstDayIndex(year, month),
		    prevMonthDays = [],
		    nextMonthDayCount = 42 - monthTotalDays - firstDayIndex,
		    startDate = year + "-" + month + "-01",
		    endDate = "";
		if (firstDayIndex > 0) {
			prevMonthDays = self.__getPrevMonthDays(year, month, firstDayIndex);
			startDate = prevMonthDays[0].title;
		}

		var nextMonth = parseInt(month) + 1,
		    nextYear = year;
		if (nextMonth > 12) {
			nextMonth = (0, _index3.numberFixed)(1);
			nextYear++;
		}

		endDate = nextYear + "-" + nextMonth + "-" + nextMonthDayCount;

		// this.__loadData(startDate, endDate);
		this.__getDays(sdata.thisYear, parseInt(sdata.thisMonth));
	},
	/**
 * month 是正常显示的月份
 **/
	__getDays: function __getDays() {
		var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getFullYear();
		var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getMonth() + 1;
		var reminderMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		var self = this,
		    sdata = self.data,
		    monthTotalDays = new Date(year, month, 0).getDate(),
		    firstDayIndex = self.__getFirstDayIndex(year, month),
		    prevMonthDays = [],
		    days = [],
		    dayList = [],
		    nextMonthDayCount = 42 - monthTotalDays - firstDayIndex;

		if (firstDayIndex > 0) {
			prevMonthDays = self.__getPrevMonthDays(year, month, firstDayIndex, reminderMap);
			days = days.concat(prevMonthDays);
		}
		var monthStr = (0, _index3.numberFixed)(month);
		for (var i = 0; i < monthTotalDays; i++) {
			var day = (0, _index3.numberFixed)(i + 1),
			    title = year + "-" + monthStr + "-" + day,
			    content = reminderMap[title]; //reminderMap.get(title);

			days.push({
				disabled: false,
				isSelected: false,
				day: day,
				title: title,
				classNames: content ? content.classNames : [],
				contents: content ? content.contents : []
			});
		}

		var nextMonth = month + 1,
		    nextYear = year;
		if (nextMonth > 12) {
			nextMonth = (0, _index3.numberFixed)(1);
			nextYear++;
		}
		for (var i = 0; i < nextMonthDayCount; i++) {
			var _day = (0, _index3.numberFixed)(i + 1),
			    _title = nextYear + "-" + nextMonth + "-" + _day,
			    _content = reminderMap[_title]; //reminderMap.get(title);
			days.push({
				disabled: true,
				isSelected: false,
				day: _day,
				title: _title,
				classNames: _content ? _content.classNames : [],
				contents: _content ? _content.contents : []
			});
		}

		dayList.push(days.slice(0, 7));
		dayList.push(days.slice(7, 14));
		dayList.push(days.slice(14, 21));
		dayList.push(days.slice(21, 28));
		dayList.push(days.slice(28, 35));
		dayList.push(days.slice(35, 42));
		self.$update({
			dayList: dayList
		});
	},
	__renderDates: function __renderDates(dayList) {
		var self = this,
		    sdata = self.data;

		self.$update({
			dayList: dayList
		});
	},
	__getFirstDayIndex: function __getFirstDayIndex(year, month) {
		return new Date(year, month - 1, 1).getDay();
	},
	__getPrevMonthDays: function __getPrevMonthDays(year, month, number) {
		var reminderMap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

		var self = this,
		    days = [],
		    lastDay = new Date(year, month - 1, 0).getDate();
		month--;
		if (month < 1) {
			year = year - 1;
			month = 12;
		}
		month = (0, _index3.numberFixed)(month);
		for (var i = number; i > 0; i--) {
			var day = lastDay - i + 1,
			    title = year + "-" + month + "-" + day,
			    content = reminderMap[title]; //reminderMap.get(title);
			days.push({
				disabled: true,
				isSelected: false,
				day: day,
				title: title,
				classNames: content ? content.classNames : [],
				contents: content ? content.contents : []
			});
		}
		return days;
	}

	// __loadData: function(startDate, endDate){
	// 	var self = this,
	// 		sdata = self.data;

	// 	self.$update({
	// 		__error: {},
	// 		__ajaxState: "loading",
	// 		dayList: []
	// 	});
	// 	$.ajax({
	// 		url: sdata.url,
	// 		type:'GET',
	// 		data: {
	// 			startDate: startDate,
	// 			endDate: endDate,
	// 			deptId: sdata.dept.deptId,
	// 			directSub: sdata.directSub ? "1" : "0"
	// 		},
	// 		success: function (json) {
	// 			self.__formatData(json.data.remindDateList)
	// 		},
	// 		error: function (json) {
	// 			self.__getDays();
	// 		},
	// 		complete: function () {
	// 			self.$update();
	// 		}
	// 	});
	// },
	// __classNamesComparison: function(a, b){
	// 	var comparisonMap = {
	// 		"birthday" : 1,
	// 		"anniversary" : 2,
	// 		"positive" : 3,
	// 		"expire" : 4
	// 	};
	// 	if(comparisonMap[a] > comparisonMap[b]){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}
	// },
	// __contentComparison: function(a, b){
	// 	if(a.index > b.index){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}
	// },
	// __formatData: function(remindDateList){
	// 	var list = [];
	// 	var map = {},//new Map(),
	// 		self = this,
	// 		sdata = self.data;
	// 	remindDateList.forEach((o, i) =>{
	// 		let remindTypeList = o.remindTypeList;
	// 		let {contents, classNames} = this.__reminderContent(remindTypeList);
	// 		classNames.sort(self.__classNamesComparison);
	// 		contents.sort(self.__contentComparison);
	// 		map[o.remindDate] = {
	// 			classNames: classNames,
	// 			contents: contents
	// 		};
	// 		// map.set(o.remindDate, {
	// 		// 	classNames: classNames,
	// 		// 	contents: contents
	// 		// });

	// 	});
	// 	this.__getDays(sdata.thisYear, parseInt(sdata.thisMonth), map);
	// },
	// __reminderContent: function(list){
	// 	let self = this,
	// 		contents = [],
	// 		classNames = [];

	// 	list.forEach((o, i) =>{
	// 		let {title, contentList, index} = self.__setContentByType(o.remindType, o.remindList);
	// 		classNames.push(o.remindType);
	// 		contents.push({
	// 			title: title,
	// 			contentList: contentList,
	// 			index: index
	// 		});
	// 	});
	// 	return {contents, classNames};
	// },
	// __setContentByType: function(type, remindList){
	// 	var contentList = [],
	// 		title = "",
	// 		index = 0;

	// 	switch(type) {
	// 		case "birthday":
	// 			title = "生日";
	// 			index = 1;
	// 			remindList.forEach((o, i)=>{
	// 				contentList.push(`<span class="tip-name">${o.name}</span><span class="tip-number">${o.ext}</span>岁生日`);
	// 				// contentList.push(`o.name + "入职" + o.ext + "生日"`);
	// 			});
	// 			break;
	// 		case "anniversary":
	// 			title = "周年";
	// 			index = 2;
	// 			remindList.forEach((o, i)=>{
	// 				contentList.push(`<span class="tip-name">${o.name}</span>入职<span class="tip-number">${o.ext}</span>周年`);
	// 			});
	// 			break;
	// 		case "positive":
	// 			title = "转正提醒";
	// 			index = 3;
	// 			remindList.forEach((o, i)=>{
	// 				contentList.push(o.name);
	// 			});
	// 			break;
	// 		case "expire":
	// 			title = "合同到期提醒";
	// 			index = 4;
	// 			remindList.forEach((o, i)=>{
	// 				contentList.push(o.name);
	// 			});
	// 			break;
	// 	}
	// 	return {contentList, title, index};
	// },
	// __destroyPopTip: function(){
	// 	var self = this,
	// 		sdata = self.data,
	// 		reminderTips = sdata.reminderTips;

	// 	reminderTips.forEach((o, i)=>{
	// 		if(o){
	// 			o.destroy();
	// 			reminderTips[i] = null;
	// 		}
	// 	});
	// },
	// __evshowConent: function($event, row, col){
	// 	var self = this,
	// 		sdata = self.data,
	// 		refs = self.$refs,
	// 		dayList = sdata.dayList,
	// 		target = $event.target;
	// 	while(target.className.indexOf("reminder-calendar-date") == -1){
	// 		target = target.parentNode;
	// 	}

	// 	var	contentEl = target.querySelector(".reminder-calendar-content"),
	// 		targetRect = target.getBoundingClientRect(),
	// 		targetLeft = targetRect.left,
	// 		targetTop = targetRect.top;

	// 		var dayList = sdata.dayList,
	// 			item = dayList[row][col],
	// 			index = (row + 1) * 7 + (col + 1),
	// 			contents = item.contents,
	// 			contentTempList = [],
	// 			reminderTips = sdata.reminderTips;

	// 		contentTempList = contents.map((o, i) =>{
	// 			let title = `<h3 class="tip-content-title">${o.title}</h3>`;
	// 			let reminderList = [];
	// 			reminderList = o.contentList.map((reminder)=>{
	// 				return `<p>${reminder}</p>`;
	// 			});
	// 			return `<div class="tip-content-item">${title}<div class="tip-content-inner">${reminderList.join("")}</div></div>`;
	// 		});

	// 		if(reminderTips[index]){
	// 			reminderTips[index].show(targetTop, targetLeft);

	// 		}else{
	// 			reminderTips[index] = new PopTip({
	// 				data: {
	// 					wrap: target,
	// 					top: targetTop,
	// 					left: targetLeft,
	// 					content: contentTempList.join(""),
	// 					topTipClassName: "u-reminder-calendar-toolTip",
	// 					placement: "right"
	// 				}
	// 			});
	// 		}

	// },
	// __evHideConent: function($event, row, col){
	// 	var self = this,
	// 		sdata = self.data,
	// 		target = $event.target,
	// 		origin = $event.origin;
	// 	//关于mouseout的问题
	// 	//http://stackoverflow.com/questions/4697758/prevent-onmouseout-when-hovering-child-element-of-the-parent-absolute-div-withou
	// 	var e = $event.toElement || $event.relatedTarget;
	// 	while(e && e.parentNode && e.parentNode != window) {
	// 	    if (e.parentNode == origin ||  e == origin) {
	// 	        if(e.preventDefault) e.preventDefault();
	// 	        return false;
	// 	    }
	// 	    e = e.parentNode;
	// 	}
	// 	this.data.reminderTips[(row + 1) * 7 + (col + 1)].hide($event);
	// }
});

// Component.component('loading', Loading);
Calendar.component('select', _index5.default);
exports.default = Calendar;
// module.exports = Calendar;