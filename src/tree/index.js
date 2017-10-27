import Regular from 'regularjs';
import Leaf from './leaf.js';
import CheckboxLeaf from './checkboxleaf.js';
import template from './index.html';

import './index.scss';

var Tree = Regular.extend({
	template: template,
	config: function(data){
		var self = this,
			sdata = self.data,

			defaults = {
				list: [],
				__ajaxState: 'loading',//[loading | complete | error]
				__error:{
				},
				parentList: [{
					id: "",
					name:"全部",
					deptName:"全部",
					hasChildren: true,
					children: []
				}],
				isShow: true
			};
		// $.extend(true, sdata, defaults);
		let newData = {};
		Object.assign(newData, defaults, sdata);
		this.data = newData;
		if(data.service){
			self.service = data.service;
		}
		if(data.hasRoot){
			data.list = data.parentList;
		}
	},
	init: function(){
		var self = this,
			sdata = self.data;

		if(sdata.hasRoot){
			self.__getFirstChildren();
			// self.$refs.root.$emit("loadChildren");
		}else{
			self.service && self.service(null, function(data){
				self.data.list = data;
				self.data.__ajaxState = "complete";
				self.data.__error = {};
				self.data.isShow = true;
				self.$update();
			})
		}
		self.data.isShow = true;
		self.$emit("initLoad");

	},
	__addWatcher: function(){
		var self = this,
			sdata = self.data;

		
	},
	__getFirstChildren: function(json = this.data.parentList[0]){
		var self = this;
		self.service && self.service(json.id, function(data){
			json.children = data;
			json.showChild = true;
			json.showLoading = false;
			if( self.data.hasRoot ) {
				let count = 0;
				data.forEach((o)=>{
					count += o.userCount;
				});
				self.data.list[0].name = "全部" + "(" + count + ")";
				self.data.list[0].userCount = count;
				self.$refs.root.$update();
			}
			self.$update();
			self.$emit("initLoad");
		})
	},
	__loadChildren: function(json = this.data.parentList[0]) {
		var self = this;
		self.service && self.service(json.id, function(data){
			json.children = data;
			json.showChild = true;
			json.showLoading = false;
			self.$update();
			
		})
	},
	__selectItem: function(json){
		var self = this;
		if(typeof self.data.onSelect == "function"){
			self.data.onSelect.bind(this, json);
		}
		
		// self.$emit("selectItem", json);
	},
	__check: function(json){
		if(typeof self.data.onCheck == "function"){
			self.data.onCheck.bind(this, json.selectedItem);
		}

	}
	// __clearSelectItem: function(){
	// 	this.$refs.leaf.data.item = [];
	// 	// this.data.item = []; 
	// },
	
	
});
Tree.component('leaf', Leaf);
Tree.component('checkboxLeaf', CheckboxLeaf);

// Component.component('loading', Loading);

export default Tree;
// module.exports = Tree;