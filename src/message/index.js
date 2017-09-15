import Regular from 'regularjs';

// import template from './index.html';
// import './index.scss';

var template = `
	<div class="m-tip-wrap" r-class={{"u-success-tip": type=="success", "u-error-tip": type=="error"}}>
		<span class="iconfont" 
		r-class={{"tip_success": type=="success", "tip_error": type=="error"}}></span>
		{#include content}
		<a href="javascript:void(0)" class="iconfont tip_close" on-click={this.__evClose()}></a>
	</div>
`
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
