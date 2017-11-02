/**
 *
 */
// var $ = require('$');
// var Base = require('RegularBase');

import Regular from 'regularjs';
import template from './index.html';

var Selectmenu = Regular.extend({
	template: template,
	config: function(data) {
		// $.extend(data,{	
		// 	isHide: true,
		// 	selectedIndex: 0
		// });

		let newData = {};
		Object.assign(newData, {
			isHide: true,
			selectedIndex: 0
		}, data);

		this.data = newData;

	},
	init: function(){
	},
	select: function($event){
		var target = $event.origin;
		
		this.data.selectedText = {
			id: target.getAttribute("data-id"),
			name: target.getAttribute("name")
		};
		this.$update();
		this.$emit('associateoption');
	},
	mouseselect: function($event){
		var target = $event.origin;
		this.data.selectedIndex = parseInt(target.getAttribute("index"));
	}

});
export default Selectmenu

// module.exports = Component;
