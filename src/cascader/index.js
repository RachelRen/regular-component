// var $ = require('$');
// var Base = require('RegularBase');
// var List = require('./dropList/index.es6');
import Regular from 'regularjs';

import template from './index.html';

import DropList from './droplist/index';

import {getLocation} from '../util/location';
import './index.scss';

var Cascader = Regular.extend({
	template: template,
	name: "cascader",
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				selectedItem: {
					"deptId": "",
					"deptName": ""
				}
			};
		let newData = {};
		Object.assign(newData, defaults, sdata);
		this.data = newData;
	},
	init: function(){

	},
	
	__evClick: function($event){
		var self = this,
			sdata = self.data,
			$refs = self.$refs;

		if(!sdata.dropList){
			sdata.dropList = new DropList({
				data: {
					list: sdata.list,
					target: $refs.selectdrop
				}
			}).$inject(document.body).$on("selectList", (item) => {
				debugger;
			});
		}
		
		sdata.dropList.show();

		return;
		if(sdata.list){
			sdata.list.$update({
				show: true
			});
			sdata.list.__animateShow();
			// $(self.$refs.selectListWrap).animate({
			// 	height: 28*len +2
			// },"slow");
		}else{
			sdata.list = new List().$inject($refs.selectBd).$on("selectList", function(json){
				self.$update({
					selectedItem: json.selectedItem
				});
				sdata.list.$update({
					show: false
				})
				self.$emit("selectChange");
			});
			
		}
		

	},
	__setLocation: function(){
		debugger;
		let {top, left} = getLocation(this.$refs.selectListWrap, this.data.target, "bottom");
		// this.$update({
		// 	style: {
		// 		top: top + "px",
		// 		left: left + "px",
		// 		display: "block"
		// 	}
		// })
	},
	__evMouseout: function($event){
		var self = this,
			sdata = self.data,
			target = $event.target,
			origin = $event.origin;

		var e = $event.toElement || $event.relatedTarget;
		while(e && e.parentNode && e.parentNode != window) {
		    if (e.parentNode == origin ||  e == origin) {
		        if(e.preventDefault) e.preventDefault();
		        return false;
		    }
		    e = e.parentNode;
		}
		setTimeout(function(){
			if(sdata.list){
				sdata.dropList.hide();
				// sdata.list.$update({
				// 	show: false,
				// 	selectedIndex: -1
				// });
			}
		}, 200);
		
	},
	
});

export default Cascader;
