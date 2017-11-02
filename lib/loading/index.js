'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = _regularjs2.default.extend({
	template: _index2.default,
	name: 'loading',
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			error: {
				msg: "",
				code: ""
			},
			state: 'loading' //[loading | complete | error]
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
	},
	init: function init() {}
});

exports.default = Loading;