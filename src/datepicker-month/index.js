// var $ = require('$');
// var Base = require('RegularBase');

import Regular from 'regularjs';

import template from './index.html';

// import CalendarPicker from '../datepicker-day/index';
import {formatTime, numberFixed} from '../util/index';
import {getLocation} from '../util/location';
import './index.scss';


var MonthPicker = Regular.extend({
	template: template,
	config: function(data){
		let self = this,
			sdata = self.data,
			defaults = {
				months: (()=>{
					let i = 1,
						arr = [],
						months = [];
					while(i < 13){
						arr.push({
							month: i,
							text: numberFixed(i)
						});
						i++;
					}
					months.push(arr.splice(0, 3));
					months.push(arr.splice(0, 3));
					months.push(arr.splice(0, 3));
					months.push(arr.splice(0, 3));
					return months;
				})(),
				date: new Date() 
				
				
			};
		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		
			
	},
	init: function(){
		
		var self = this,
			sdata = self.data;
		this.$inject(document.body);
		self.show();
		self.__addWatcher();
	},
	show: function(){
		var {data: sdata} = this,
			{value, selectedMonth, selectedYear, currentDay} = sdata,
			thisDate = value ? new Date(value) : new Date(),
			{top, left} = getLocation(this.$refs.component, sdata.target, "bottom");
			
		this.$update({
			style: {
				top: top + "px",
				left: left + "px",
				display: "block"
			},
			selectedMonth: selectedMonth ? selectedMonth : thisDate.getMonth() + 1,
			selectedYear: selectedYear ? selectedYear : thisDate.getFullYear(),
			currentDay: currentDay ? currentDay : formatTime(thisDate, sdata.format)
		});
	},
	hide: function(){
		this.$update({
			style: {
				display: "none"
			}
		})
	},
	//点击的时候，显示日期
	
	__addWatcher: function(){
		var self = this,
			sdata = self.data;

		self.$watch(["minDate", "maxDate"], function(newVal, oldVal){
			// list
			self.__setMinMaxDate();
		});
	},
	__setMinMaxDate: function(){
		var self = this,
			sdata = self.data;

		sdata.months.forEach((o, i)=>{
			o.forEach((m)=>{
				self.__disable(m);
			})
		});
	},
	__disable: function(item){
		var self = this,
			sdata = self.data,
			selectedYear = sdata.selectedYear,
			minDate = sdata.minDate,
			maxDate = sdata.maxDate;

		if(minDate){
			minDate = new Date(minDate);
			var minYear = minDate.getFullYear(),
				minMonth = minDate.getMonth() + 1;
			if(minYear > selectedYear || 
				(minYear == selectedYear && minMonth >=item.month)){
				item.disabled = true;
			}else{
				item.disabled = false;
			}
		}
		if(maxDate){
			maxDate = new Date(maxDate);
			var maxYear = maxDate.getFullYear(),
				maxMonth = maxDate.getMonth() + 1;

			if(maxYear < selectedYear || 
				(maxYear == selectedYear && maxMonth <= item.month)){
				item.disabled = true;
			}else{
				item.disabled = false;
			}
		}
	},
	
	__addYear: function(year){
		var self = this,
			selectedYear = self.data.selectedYear;

		self.$update({
			selectedYear: selectedYear + (year - 0)
		});
		self.__setMinMaxDate();
	},
	
	__evSelect: function(month, item){
		var self = this,
			sdata = self.data;
		if(item.disabled){
			return;
		}
		var date = formatTime((sdata.selectedYear + "/" + month + "/01"), sdata.format );
		self.$update({
			selectedMonth: month
		});
		self.$emit("select", date);

	}

	

	
	
});

export default MonthPicker;
