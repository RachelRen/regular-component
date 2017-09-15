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
				timeout: null
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
		clearTimeout(self.data.timeout);
		self.data.timeout = null;
		self.destroy();
	},

	__setTimeClose: function(){
		var self = this;

		self.data.timeout = setTimeout(function(){
			self.__evClose();
		}, 2000);
	}
	
	
});

export default Message;
