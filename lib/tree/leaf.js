"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require("regularjs");

var _regularjs2 = _interopRequireDefault(_regularjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import template from './leaf.html';

var template = "\n\t<ul class=\"roleTree_list tree-hide\"  ref=\"tree_list\" r-style={rStyle}>\n\t\t{#list list as aList by aList_index}\n\t\t\t<li>\n\t\t\t\t<div class=\"tree_item\">\n\t\t\t\t\t<i class=\"iconfont u-arrow\"\n\t\t\t\t\t\tr-class={{\"icon-arrow-right\": !aList.showChild, \"icon-arrow-down\": aList.showChild}}\n\t\t\t\t\t\tr-hide={!(aList.hasChildren || aList.children && aList.children.length)} \n\t\t\t\t\t\tdelegate-click={this.__evShowChildren(aList_index)}></i>\n\t\t\t\t\t<div class=\"tree_name\" r-class={{\"select_item\": aList.id == item.id}} \n\t\t\t\t\t\ton-click={this.__evSelectItem(aList_index)}>\n\t\t\t\t\t\t<i class=\"iconfont icon-loading\" r-hide={!aList.showLoading}></i>\n\t\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"tree_name_link\"><span>{aList.name}</span></a>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t{#include content}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t{#if aList.children && aList.children.length}\n\t\t\t\t\t<leaf list={aList.children} isShow={aList.showChild} \n\t\t\t\t\tisReadOnly={isReadOnly} on-loadChildren={this.__loadChildren($event)} \n\t\t\t\t\ton-selectItem={this.__selectItem($event, aList_index)} selectItem={item}></leaf>\n\t\t\t\t{/if}\n\t\t\t</li>\n\t\t{/list}\n\t\t\n\n\t</ul>\n";
var Leaf = _regularjs2.default.extend({
	template: template,
	name: "leaf",
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			list: [],
			rStyle: {}
		};
		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		// $.extend(true, sdata, defaults);
	},
	init: function init() {

		this.__addWatcher();
	},
	__addWatcher: function __addWatcher() {
		var self = this,
		    sdata = self.data;

		self.$watch("selectItem", function (newVal, oldVal) {
			sdata.item = newVal;
			self.$update();
		});

		self.$watch("isShow", function (newVal, oldVal) {
			//ant-motion-collapse  ant-motion-collapse-active
			//ant-tree-child-tree-open
			var $treeList = self.$refs.tree_list,
			    height = sdata.list.length * 26;
			if (newVal) {
				self.$update({
					rStyle: {
						height: 0
					}
				});
				_regularjs2.default.dom.delClass($treeList, "tree-hide");
				_regularjs2.default.dom.addClass($treeList, "tree-show");
				setTimeout(function () {
					self.$update({
						rStyle: {
							height: height + "px"
						}
					});
				}, 20);
				setTimeout(function () {
					_regularjs2.default.dom.delClass($treeList, "tree-show");
					self.$update({
						rStyle: {
							height: "auto"
						}
					});
				}, 300);
			} else {

				_regularjs2.default.dom.addClass($treeList, "tree-show");
				self.$update({
					rStyle: {
						height: height + "px"
					}
				});
				setTimeout(function () {
					self.$update({
						rStyle: {
							height: 0
						}
					});
				}, 20);

				setTimeout(function () {
					_regularjs2.default.dom.delClass($treeList, "tree-show");
					_regularjs2.default.dom.addClass($treeList, "tree-hide");
				}, 300);
			}
		});

		// self.$watch(["isShow", ], function(){

		// })
	},

	__evSelectItem: function __evSelectItem(index) {
		var self = this,
		    sdata = self.data,
		    list = sdata.list,
		    item = list[index];
		sdata.item = item;
		self.$update();
		this.$emit("selectItem", [item]);
	},
	__selectItem: function __selectItem(itemList, index) {
		var self = this,
		    sdata = self.data,
		    list = sdata.list,
		    parentItem = list[index];

		itemList.push(parentItem);
		sdata.item = itemList[0];
		self.$update();
		this.$emit("selectItem", itemList);
	},
	__evShowChildren: function __evShowChildren(index) {
		var self = this,
		    list = self.data.list,
		    item = list[index];

		item.showLoading = true;
		if (item.children && item.children.length) {
			item.showChild = !item.showChild;
			item.showLoading = false;
			self.$update();
			return;
		}
		// Regular.dom.addClass(self.$refs.tree_list, "tree-hide");
		self.__emitLoadChildren(list[index]);
	},

	__loadChildren: function __loadChildren(json) {
		this.__emitLoadChildren(json);
	},

	__emitLoadChildren: function __emitLoadChildren(item) {
		this.$emit("loadChildren", item);
	}

});

exports.default = Leaf;
// module.exports = Leaf;