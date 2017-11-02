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

var Message = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			type: "", //["success", "error"]
			wrap: "",
			timeout: null,
			duration: 2000
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
	},
	init: function init() {

		this.__setTimeClose();
		this.$inject(this.data.wrap || document.body);
	},
	__evClose: function __evClose(index) {
		var self = this;
		if (typeof this.data.onClose == "function") {
			this.data.onClose.call(this);
		}
		clearTimeout(self.data.timeout);
		self.data.timeout = null;
		self.destroy();
	},

	__setTimeClose: function __setTimeClose() {
		var self = this;

		self.data.timeout = setTimeout(function () {
			self.__evClose();
		}, this.data.duration);
	}

});

exports.default = Message;