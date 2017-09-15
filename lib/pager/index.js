"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require("regularjs");

var _regularjs2 = _interopRequireDefault(_regularjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = "\n\t<div class=\"m-page {class}\" r-class={{\"mode2\": mode == 2}} r-hide={total < 2}>\n\t\t<a href=\"javascript: void(0)\" class=\"prevPage\" on-click={this.nav(current - 1)} r-class={{\"disabled\": 1 == current}}></a>\n\t\t{#if total -5 > show *2}\n\t\t\t<a href=\"javascript:void(0)\" on-click={this.nav(1)} r-class={{\"current\": 1 == current}}>1</a>\n\t\t\t{#if begin >2}\n\t\t\t\t<a href=\"javascript:void(0)\"><i>...</i></a>\n\t\t\t{/if}\n\t\t\t{#list begin.. end as i}\n\t\t\t\t<a href=\"javascript:void(0)\" on-click={this.nav(i)}  r-class={{\"current\": i == current}}>{i}</a>\n\t\t\t{/list}\n\t\t\t{#if end < total-1}\n\t\t\t\t<a href=\"javascript:void(0)\"><i>...</i></a>\n\t\t\t{/if}\n\t\t\t<a href=\"javascript:void(0)\" on-click={this.nav(total)} r-class={{\"current\": total == current}}>{total}</a>\n\t\t{#else}\n\t\t\t{#list 1..total as i}\n\t\t\t\t<a href=\"javascript:void(0)\" on-click={this.nav(i)} r-class={{\"current\": i == current}}>{i}</a>\n\t\t\t{/list}\n\t\t{/if}\n\t\t<a href=\"javascript: void(0)\" class=\"nextPage\" on-click={this.nav(current - 0 + 1)} r-class={{\"disabled\": total == current}}></a>\n\t\t<span r-hide={!hasPageSize}>\n\t\t\t\u5171<span>{total}</span>\u9875\n\t\t\t<span style=\"padding-left: 20px;\">\u6BCF\u9875\u663E\u793A</span>\n\t\t\t&nbsp;&nbsp;\n\t\t\t<select r-model={pageSize}>\n\t\t\t\t<option value=\"20\">20</option>\n\t\t\t\t<option value=\"50\">50</option>\n\t\t\t\t<option value=\"100\">100</option>\n\t\t\t</select>\n\t\t</span>\n\t</div>\n";
var Pager = _regularjs2.default.extend({
	template: template,
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