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

// var Tooltip = require('/javascript/components/tooltip/index.es6');

var Checkbox = _regularjs2.default.extend({
	template: _index2.default,
	name: 'checkbox',
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
	},
	init: function init(data) {},
	onChange: function onChange($event) {
		if (typeof this.data.onChange == "function") {
			this.data.onChange.call(this, this.data.checkbox);
		}
	}

});

exports.default = Checkbox;