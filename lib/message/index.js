"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require("regularjs");

var _regularjs2 = _interopRequireDefault(_regularjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import template from './index.html';
// import './index.scss';

var template = "\n\t<div class=\"m-tip-wrap\" r-class={{\"u-success-tip\": type==\"success\", \"u-error-tip\": type==\"error\"}}>\n\t\t<span class=\"iconfont\" \n\t\tr-class={{\"tip_success\": type==\"success\", \"tip_error\": type==\"error\"}}></span>\n\t\t{#include content}\n\t\t<a href=\"javascript:void(0)\" class=\"iconfont tip_close\" on-click={this.__evClose()}></a>\n\t</div>\n";
var Message = _regularjs2.default.extend({
	template: template,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			type: "", //["success", "error"]
			wrap: "",
			timeout: null
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
		clearTimeout(self.data.timeout);
		self.data.timeout = null;
		self.destroy();
	},

	__setTimeClose: function __setTimeClose() {
		var self = this;

		self.data.timeout = setTimeout(function () {
			self.__evClose();
		}, 2000);
	}

});

exports.default = Message;