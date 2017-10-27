import Regular from 'regularjs';

import template from './index.html';
import './index.scss';
import ToolTip from '../tooltip/index'

// var Tooltip = require('/javascript/components/tooltip/index.es6');

var Popover = ToolTip.extend({
	template: template,
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				placement: "top",//位置 默认是top
				popoverClassName: ""
			};

		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		
		self.supr(this.data);
	},
	init: function(data){
		this.supr(data);
	},
	// __evToolTipLeave: function(){
	// 	this.supr();
	// }
	
	
});

export default Popover;
