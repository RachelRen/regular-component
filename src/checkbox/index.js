import Regular from 'regularjs';

import template from './index.html';
import './index.scss';

// var Tooltip = require('/javascript/components/tooltip/index.es6');

var Checkbox = Regular.extend({
	template: template,
	name: 'checkbox',
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				
			};

		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		
	},
	init: function(data){
	},
	onChange: function($event){
		if(typeof this.data.onChange == "function"){
			this.data.onChange.call(this, this.data.checkbox);
		}
	}
	
	
});

export default Checkbox;
