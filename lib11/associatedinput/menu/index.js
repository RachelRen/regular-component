'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
// var $ = require('$');
// var Base = require('RegularBase');

var Selectmenu = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		// $.extend(data,{	
		// 	isHide: true,
		// 	selectedIndex: 0
		// });

		var newData = {};
		Object.assign(newData, {
			isHide: true,
			selectedIndex: 0
		}, data);

		this.data = newData;
	},
	init: function init() {},
	select: function select($event) {
		var target = $event.origin;

		this.data.selectedText = {
			id: target.getAttribute("data-id"),
			name: target.getAttribute("name")
		};
		this.$update();
		this.$emit('associateoption');
	},
	mouseselect: function mouseselect($event) {
		var target = $event.origin;
		this.data.selectedIndex = parseInt(target.getAttribute("index"));
	}

});
exports.default = Selectmenu;

// module.exports = Component;