import Regular from 'regularjs';

import template from './index.html';
import './index.scss';

var Loading = Regular.extend({
	template: template,
	name: 'loading',
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				error:{
					msg: "",
					code: ""
				},
				state: 'loading',//[loading | complete | error]
			};

		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
	},
	init: function(){
	}
});


export default Loading;
