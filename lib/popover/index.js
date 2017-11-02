'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

require('./index.scss');

var _index3 = require('../tooltip/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var Tooltip = require('/javascript/components/tooltip/index.es6');

var Popover = _index4.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			placement: "top", //位置 默认是top
			popoverClassName: ""
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		self.supr(this.data);
	},
	init: function init(data) {
		this.supr(data);
	}
	// __evToolTipLeave: function(){
	// 	this.supr();
	// }


});

exports.default = Popover;