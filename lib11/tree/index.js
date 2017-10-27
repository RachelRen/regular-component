'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _leaf = require('./leaf.js');

var _leaf2 = _interopRequireDefault(_leaf);

var _checkboxleaf = require('./checkboxleaf.js');

var _checkboxleaf2 = _interopRequireDefault(_checkboxleaf);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tree = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			list: [],
			__ajaxState: 'loading', //[loading | complete | error]
			__error: {},
			parentList: [{
				id: "",
				name: "全部",
				deptName: "全部",
				hasChildren: true,
				children: []
			}],
			isShow: true
		};
		// $.extend(true, sdata, defaults);
		var newData = {};
		Object.assign(newData, defaults, sdata);
		this.data = newData;
		if (data.service) {
			self.service = data.service;
		}
		if (data.hasRoot) {
			data.list = data.parentList;
		}
	},
	init: function init() {
		var self = this,
		    sdata = self.data;

		if (sdata.hasRoot) {
			self.__getFirstChildren();
			// self.$refs.root.$emit("loadChildren");
		} else {
			self.service && self.service(null, function (data) {
				self.data.list = data;
				self.data.__ajaxState = "complete";
				self.data.__error = {};
				self.data.isShow = true;
				self.$update();
			});
		}
		self.data.isShow = true;
		self.$emit("initLoad");
	},
	__addWatcher: function __addWatcher() {
		var self = this,
		    sdata = self.data;
	},
	__getFirstChildren: function __getFirstChildren() {
		var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.parentList[0];

		var self = this;
		self.service && self.service(json.id, function (data) {
			json.children = data;
			json.showChild = true;
			json.showLoading = false;
			if (self.data.hasRoot) {
				var count = 0;
				data.forEach(function (o) {
					count += o.userCount;
				});
				self.data.list[0].name = "全部" + "(" + count + ")";
				self.data.list[0].userCount = count;
				self.$refs.root.$update();
			}
			self.$update();
			self.$emit("initLoad");
		});
	},
	__loadChildren: function __loadChildren() {
		var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.parentList[0];

		var self = this;
		self.service && self.service(json.id, function (data) {
			json.children = data;
			json.showChild = true;
			json.showLoading = false;
			self.$update();
		});
	},
	__selectItem: function __selectItem(json) {
		var self = this;
		self.data.selectItemCallback(json);
		// self.$emit("selectItem", json);
	},
	__check: function __check(json) {
		this.data.onCheck(json.selectedItem);
	}
	// __clearSelectItem: function(){
	// 	this.$refs.leaf.data.item = [];
	// 	// this.data.item = []; 
	// },


});
Tree.component('leaf', _leaf2.default);
Tree.component('checkboxLeaf', _checkboxleaf2.default);

// Component.component('loading', Loading);

exports.default = Tree;
// module.exports = Tree;