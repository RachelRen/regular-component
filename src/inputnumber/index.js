import Regular from 'regularjs';

import template from './index.html';
import './index.scss';

var InputNumber = Regular.extend({
	template: template,
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				hasDecimal: false,
				defaultValue: '',
				isPositive: false,
				showHandler: true
				// maxValue: //最大数
			};

		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		
		this.data.showValue = sdata.value || '';
	},
	init: function() {
		var self = this,
			sdata = self.data;
		
		self.__addWatcher();

	},
	__addWatcher: function(){
		let self = this,
			sdata = self.data;

		self.$watch('value', function(newValue){
			// debugger;
			//当外面的赋值变化的时候，显示的值也要改变
			//TODO?
			self.$update({
				showValue: newValue
			})
		})
	},
	__evAdd: function(num){
		let self = this,
			sdata = self.data,
			value = Math.floor(sdata.value || "") + num;

		self.__updateValue(value);
	},
	
	__evChange: function(){
		console.log("change");
		let self = this,
			sdata = self.data,
			showValue = sdata.showValue,
			// re = /([0-9]+.[0-9]{2})[0-9]*/,
			decimalsReg = /^\d+?(\.\d{1,2})?$/,//保持小数点两位
			reg = sdata.isPositive ? /^\d+?(\.\d+)?$/ : /^-?\d+?(\.\d+)?$/;//格式正确，是数字形式
		//有小数点
		if(showValue && !reg.test(showValue)){
			showValue = sdata.value;
			self.$update({
				showValue: showValue
			});
			return;
		}
		//有最大值
		if(sdata.maxValue && showValue > sdata.maxValue){
			showValue = sdata.value;
			self.$update({
				showValue: showValue
			});
			return;
		}
		if(sdata.hasDecimal){
			showValue = (showValue == "" || showValue == null) ? sdata.defaultValue : Math.round(showValue * 100) / 100;
		}else{
			showValue = (showValue == "" || showValue == null) ?  sdata.defaultValue : Math.floor(showValue);
		}

		self.__updateValue(showValue);
	},
	__evFocus: function($event){
		this.$emit("focus");
	},
	__updateValue: function(value){
		let self = this;
		self.$update({
			value: value,
			showValue: value
		});
		self.$emit("change", value);
		if(typeof this.data.onChange == "function"){
			this.data.onChange(value);
		}
		// onChange
	}
	
	
	
});

export default InputNumber;