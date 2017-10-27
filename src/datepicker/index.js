// var $ = require('$');
// var Base = require('RegularBase');
// var Regular = require("Regular");
// var Calendar = require('/javascript/components/calendar/index.es6');
// var MonthPicker = require('/javascript/components/monthPicker/index.es6');

import Regular from 'regularjs';

import template from './index.html';

import CalendarPicker from '../datepicker-day/index';
import MonthPicker from '../datepicker-month/index';
import {formatTime} from '../util/index';
import {getLocation} from '../util/location';
import './index.scss';

/**
** mode: 设置日历或者月份
** minDate：设置日历的最小值
** maxDate: 设置日历的最大值
** date： 选中的日期
**/
var DatePicker = Regular.extend({
	template: template,
	name: "DatePicker",
	config: function(data) {
		let self = this,
			sdata = self.data,
			defaults = {
				show: false,
				hideTimeout: null,
				mode: "day",//["day", "month"]
				format: "yyyy-MM-dd" //["yyyy-MM-dd", "yyyy-MM"]
			};
		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		if(this.data.mode == "month"){
			this.data.format = "yyyy-MM";
		}
	},
	init: function(){
		var self = this,
			sdata = self.data;
	},

	__evFocus: function(){
		var self = this,
			sdata = self.data;
		// sdata.show = true;

	},
	__evChange: function($event){
		var self = this,
			sdata = self.data,
			val = $event.target.value,
			$refs = self.$refs,
			date = sdata.date ? new Date(sdata.date) : null;
			// debugger;
		if(date != "Invalid Date"){
			var formatStr = "yyyy-MM-dd";
			if(sdata.mode == "month"){
				formatStr = "yyyy-MM";
			}
			sdata.date = formatTime(date, formatStr);
			$event.target.value = sdata.date;
		}else{
			// sdata.data = "";
			$event.target.value = sdata.date;
		}

		self.$update();
	},

	__evBlur: function($event) {
		var self = this,
			sdata = self.data;


	// 	var self = this,
	// 		sdata = self.data;
	// 	sdata.hideTimeout = setTimeout(function(){
	// 		sdata.show = false;
	// 	}, 300);
	},

	__evSelect: function(json){
		var self = this,
			sdata = self.data;

		// sdata.date = json;
		self.$refs.input.value = json;
		self.$update({
			date: json
		});
		self.__evToggle(false);
	},
	__show: function(){
		// var self = this;
		// clearTimeout(self.data.hideTimeout);
		// self.data.hideTimeout = null;
	},

	__evToggle: function(show){
		var {data: sdata} = this,
			index;
		if(show === undefined){
			show = !sdata.show;
		}
		sdata.show = show;
		index = DatePicker.shows.indexOf(this);
		if( show && index == -1){
			
			//显示
			if(this.datepicker){
				this.datepicker.show();
			}else{
				let picker = CalendarPicker;
				if(sdata.mode == "month"){
					picker = MonthPicker;
				}
				this.datepicker = new picker({
					data: {
						target: this.$refs.element,
						format: sdata.format
					}
				}).$on("select", ($event) => {
					this.$update({
						date: $event
					})
					this.datepicker.hide();
					this.__evToggle(false);
					if(typeof this.data.onChange == "function"){
						this.data.onChange.call(this, $event);
					}
				});
			}
			DatePicker.shows.push(this);
		}else if(!show && index >= 0) {
			this.datepicker.hide();
			DatePicker.shows.splice(index, 1);
		}

		// component, target, placement


		// let location = getLocation(this.calendar.$refs.component, self.$refs.element, "bottom");
		// debugger;
		this.$update();

	},
	
});

// DatePicker.component('calendar', Calendar);
// DatePicker.component('monthPicker', MonthPicker);



DatePicker.shows = [];
Regular.dom.on(document, "click", function(e){
	DatePicker.shows.forEach(function(o){
		var element = o.$refs.element,
			componentWrap = o.datepicker.$refs.component,
			element2 = e.target;
		while(element2){
			if(element2 == element || element2 == componentWrap){
				return;
			}
			element2 = element2.parentNode;
		}
		//说明都不是
		o.__evToggle(false);

	});
});
module.exports = DatePicker;
