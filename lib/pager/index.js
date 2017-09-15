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

var Pager = _regularjs2.default.extend({
	template: _index2.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			total: "",
			current: "",
			pageSize: 50,
			hasPageSize: false
			// mode:1, 这里有两种样式
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		// $.extend(true,sdata,defaults);
		var count = 3;
		sdata.show = Math.floor(count / 2);
	},
	init: function init() {
		var self = this;
		self.__addWatcher();
	},
	__addWatcher: function __addWatcher() {
		var self = this,
		    sdata = self.data;

		self.$watch(['current', 'total'], function (current, total) {
			var show = sdata.show;
			current = current - 0;
			total = total - 0;
			sdata.begin = current - show;
			sdata.end = current + show;
			if (sdata.begin < 2) sdata.begin = 2;
			if (sdata.end > sdata.total - 1) sdata.end = sdata.total - 1;
			if (current - sdata.begin <= 1) sdata.end = sdata.end + show + sdata.begin - current;
			if (sdata.end - current <= 1) sdata.begin = sdata.begin - show - current + sdata.end;
		});

		self.$watch("pageSize", function (newVal, oldVal) {
			if (!oldVal) {
				return;
			}
			var self = this,
			    sdata = self.data;
			sdata.pageSize = newVal;
			this.$emit("nav", {
				pageSize: newVal,
				current: 1
			});
			self.$update();
		});
	},
	nav: function nav(index) {
		var self = this,
		    sdata = self.data;

		if (index < 1) {
			return;
		}
		if (index > sdata.total) {
			return;
		}
		if (index == sdata.current) {
			return;
		}
		var json = {
			current: index
		};
		if (sdata.hasPageSize) {
			json.pageSize = sdata.pageSize;
		}
		if (typeof sdata.onChange == "function") {
			sdata.onChange(json);
		}
		this.$emit("nav", json);
	}
});

exports.default = Pager;