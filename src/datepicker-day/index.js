import Regular from 'regularjs';

import template from './index.html';

import {formatTime, numberFixed} from '../util/index';
import {getLocation} from '../util/location';
import './index.scss';

var CalendarPicker = Regular.extend({
	template: template,
	config: function(data){
		let self = this,
			sdata = self.data,
			defaults = {
				week: ["日","一","二","三","四","五","六"],
				initDate: "",
				currentDay: formatTime(new Date(), data.format),
				// selectedIndex: -1
			};
			let newData = {};
			Object.assign(newData, defaults, sdata);

			this.data = newData;
			
			if(!this.data.value){
				this.data.value = this.data.currentDay;
			}
	},
	init: function(){

		var self = this,
			sdata = self.data;
		this.$inject(document.body);
		this.show();
		self.__addWatcher();
	},
	//点击的时候，显示日期
	show: function(){

		var sdata = this.data;
		// this.$refs.component, self.$refs.element, "bottom"
		let {top, left} = getLocation(this.$refs.component, sdata.target, "bottom");
		this.$update({
			style: {
				top: top + "px",
				left: left + "px",
				display: "block"
			}
		})
		this.__getDays(new Date(sdata.value), sdata.value);
	},
	hide: function(){
		this.$update({
			style: {
				display: "none"
			}
		})
	},
	__addWatcher: function(){
		var self = this,
			sdata = self.data;

		self.$watch("selectedDate", function(newVal, oldVal){
			self.__getDays(new Date(sdata.value || sdata.currentDay), (newVal || sdata.currentDay));
		});
		self.$watch(["minDate", "maxDate"], function(newVal, oldVal){
			self.__getDays(new Date(sdata.value || sdata.currentDay), (sdata.value || sdata.currentDay));
		});
		// self.$watch("maxDate", function(newVal, oldVal){
		// 	self.__getDays(new Date(sdata.value || sdata.currentDay), (newVal || sdata.currentDay));
		// });
	},
	//获取当前这个月的天数
	__getDays: function(date = new Date(), currentDay = this.data.value){
		var self = this,
			sdata = self.data,
			_year = date.getFullYear(),
			_month = date.getMonth(),
			_monthDays = new Date(_year, _month +1, 0).getDate(),//后一个月的第0天，就是这个月的最后一天
			_firstDayIndex = self.__getFirstDayIndex(_year, _month),

			days = [];

		if( _firstDayIndex > 0){
			//上个月要补得空位
			days = days.concat(self.__getPrevMonthDays(_year, _month, _firstDayIndex));
		}
		let minDate = new Date(sdata.minDate),
			maxDate = new Date(sdata.maxDate),
			hasMinDate = false,
			hasMaxDate = false,
			minAllDisabled = false,
			maxAllDisabled = false;

		if(minDate != "Invalid Date" && minDate.getFullYear() == _year && minDate.getMonth() == _month){
			hasMinDate = true;
		}
		if(maxDate != "Invalid Date" && maxDate.getFullYear() == _year && maxDate.getMonth() == _month){
			hasMaxDate = true;
		}
		if(minDate != "Invalid Date" && (minDate.getFullYear() > _year || minDate.getFullYear() == _year && minDate.getMonth() > _month)){
			hasMinDate = true;
			minAllDisabled = true;
		}
		if(maxDate != "Invalid Date" && (maxDate.getFullYear() < _year || maxDate.getFullYear() == _year && minDate.getMonth() < _month)){
			hasMinDate = true;
			maxAllDisabled = true;
		}
		let minDay = hasMinDate ? minDate.getDate() : -1,
			maxDay = hasMaxDate ? maxDate.getDate() : 32;
		for(var i = 0; i < _monthDays; i++){
			let isDisabled = false;
			if(minAllDisabled || maxAllDisabled){
				isDisabled = true;
			}else{
				isDisabled = minDay > i || maxDay <= (i + 1);
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
		if(_lastDayIndex > 0){
			days = days.concat(self.__getNextMonthDays(_year, _month+1, 7 - _lastDayIndex));
		}

		sdata.days = days;
		sdata.year = _year;
		sdata.month = _month;
		sdata.yearMonth = _year + "-" + numberFixed(_month + 1);
		self.$update();
	},
	__getPrevMonthDays: function(year, month, number){
		var self = this,
			days = [],
			lastDay = new Date(year, month, 0).getDate();
		for(var i = number; i > 0; i--){
			days.push({
				disabled: true,
				isSelected: false,
				day: lastDay - i + 1
			});
		}
		return days;
	},
	__getNextMonthDays: function(year, month, number){
		var self = this,
			days = [];
		for(var i = 0; i < number; i++){
			days.push({
				disabled: true,
				isSelected: false,
				day: i + 1
			});
		}
		return days;
	},
	__getFirstDayIndex: function(year, month){
		var self = this;
		return new Date(year, month, 1).getDay();
	},

	__addYear: function(year){
		var self = this,
			sdata = self.data,
			date = new Date(sdata.year + year, sdata.month, 1);
		self.$emit("show");
		self.__getDays(date, sdata.value);

	},
	__addMonth: function(month){
		var self = this,
			sdata = self.data,
			date = new Date(sdata.year, sdata.month + month, 1);
		self.$emit("show");
		self.__getDays(date, sdata.value);
	},
	

	__evSelect: function(item, index){
		var self = this,
			sdata = self.data,
			month = sdata.month + 1;
		var date = formatTime((sdata.year + "/" + month + "/" + item.day), sdata.format );
		self.$update({
			// selectedIndex: index,
			selectedDay: item.day
		});
		self.$emit("select", date);

	}



});

export default CalendarPicker;
