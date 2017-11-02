import Regular from 'regularjs';

import template from './index.html';
import './index.scss';

var Message = Regular.extend({
	template: template,
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				type:"",//["success", "error"]
				wrap:"",
				timeout: null,
				duration: 2000 
			};

		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
	},
	init: function(){
		
		this.__setTimeClose();
		this.$inject(this.data.wrap ||document.body);
	},
	__evClose: function(index){
		var self = this;
		if(typeof this.data.onClose == "function"){
			this.data.onClose.call(this);
		}
		clearTimeout(self.data.timeout);
		self.data.timeout = null;
		self.destroy();
	},

	__setTimeClose: function(){
		var self = this;

		self.data.timeout = setTimeout(function(){
			self.__evClose();
		}, this.data.duration);
	}
	
	
});

export default Message;
