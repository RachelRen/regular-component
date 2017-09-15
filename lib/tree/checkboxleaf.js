'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _leaf = require('./leaf.js');

var _leaf2 = _interopRequireDefault(_leaf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import template from './checkboxleaf.html';

//import './checkboxleaf.scss';
// var $ = require('$');
// var Base = require('RegularBase');

var template = '\n\t<ul class="roleTree_list {class}" ref="tree_list" r-style={rStyle}>\n\t{#list list as aList by aList_index}\n\t\t<li>\n\t\t\t<div class="tree_item">\n\t\t\t\t<i class="iconfont u-arrow"\n\t\t\t\t\tr-class={{"icon-arrow-right": !aList.showChild, "icon-arrow-down": aList.showChild}}\n\t\t\t\t\tr-hide={!(aList.hasChildren || aList.children && aList.children.length)} \n\t\t\t\t\tdelegate-click={this.__evShowChildren(aList_index)}></i>\n\t\t\t\t<label class="iconfont mulTreeCheck u-check" \n\t\t\t\t\t\t{#if !isReadOnly}delegate-click={this.__evClickCheck(aList_index)}{/if}\n\t\t\t\t\t\tr-class={{"z-check": aList.value == 1, "z-part": aList.value == 2,"disabled": isReadOnly}}></label>\n\t\t\t\t<span class="tree_name" r-class={{"select_item": aList.id == item.id}} \n\t\t\t\t\ton-click={this.__evSelectItem(aList_index)}>\n\t\t\t\t\t<i class="iconfont icon-loading" r-hide={!aList.showLoading}></i>\n\t\t\t\t\t<a href="javascript:void(0)" class="tree_name_link"><span>{@(aList.name)}</span></a>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t{#if aList.children && aList.children.length}\n\t\t\t\t<treeLeaf list={aList.children} class="tree-child-tree" isShow={aList.showChild} allValue={aList.value}\n\t\t\t\tisReadOnly={isReadOnly} on-changeCheckVal={this.__changeCheckVal($event, aList_index)}\n\t\t\t\ton-loadChildren={this.__loadChildren($event)}\n\t\t\t\ton-selectItem={this.__selectItem($event, aList_index)} selectItem={item}></treeLeaf>\n\t\t\t{/if}\n\t\t</li>\n\t{/list}\n\t\n\n</ul>\n';
var CheckboxLeaf = _leaf2.default.extend({
	template: template,
	name: "treeLeaf",
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			list: []
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		this.supr(data);
	},
	init: function init(data) {
		this.supr(data);
		this.__addWatcher1();
	},
	__addWatcher1: function __addWatcher1() {

		var self = this,
		    sdata = self.data;

		self.$watch('allValue', function (newVal, oldVal) {
			if (newVal == 1 || newVal == 0) {
				sdata.list.forEach(function (o) {
					o.value = newVal;
					// self.__checkActionButtons(o);
				});
			}
		});
	},
	__checkActionButtons: function __checkActionButtons(item) {
		if (item.value == 0 && item.buttons && item.buttons.length) {
			item.buttons.forEach(function (o, i) {
				o.value = 0;
			});
		}
	},
	__evClickCheck: function __evClickCheck(index) {
		var self = this,
		    sdata = self.data,
		    list = sdata.list,
		    item = list[index];
		switch (item.value) {
			case 0:
				item.value = 1;
				break;
			case 1:
				item.value = 0;
				break;
			case 2:
				item.value = 1;
				break;
			default:
				item.value = 1;
				break;
		}
		//当菜单不被选中时，后面的按钮自动取消
		// self.__checkActionButtons(item);
		self.$update();
		self.__emitCheckVal({
			value: item.value,
			selectedItem: item
		});
	},
	// __evActionClick: function(listIndex, actionIndex){
	// 	var self = this,
	// 		sdata = self.data,
	// 		list = sdata.list,
	// 		item = list[listIndex],
	// 		button = item.buttons[actionIndex];

	// 	switch(button.value){
	// 		case 0:
	// 			button.value = 1;
	// 			break;
	// 		case 1:
	// 			button.value = 0;
	// 			break;
	// 		default:
	// 			button.value = 1;
	// 			break;
	// 	}
	// 	debugger;
	// 	//当按钮选中时，菜单自动选上
	// 	if(button.value && item.value != 1){
	// 		item.value = 1;
	// 		self.__emitCheckVal(item.value);
	// 	}

	// },
	__emitCheckVal: function __emitCheckVal(json) {
		var self = this,
		    sdata = self.data,
		    list = sdata.list,
		    value = json.value;

		var checkValue = value == 2 ? 0 : value;
		var flag = list.some(function (o, index) {
			if (o.value == undefined) {
				o.value = 0;
			}
			return o.value !== checkValue;
		});
		self.$emit("changeCheckVal", {
			value: !flag ? value : 2,
			selectedItem: json.selectedItem
		});
	},
	__changeCheckVal: function __changeCheckVal(json, index) {
		var self = this,
		    sdata = self.data,
		    list = sdata.list;
		list[index].value = json.value;
		self.__emitCheckVal({
			value: json.value,
			selectedItem: json.selectedItem
		});
	}

});

exports.default = CheckboxLeaf;

// module.exports = Component;