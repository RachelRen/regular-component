'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./droplist/index');

var _index4 = _interopRequireDefault(_index3);

var _location = require('../util/location');

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cascader = _regularjs2.default.extend({
	template: _index2.default,
	name: "cascader",
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			showName: "",
			id: ""
			// selectedItem: {
			// 	"deptId": "",
			// 	"deptName": ""
			// }
		};
		var newData = {};
		Object.assign(newData, defaults, sdata);
		this.data = newData;
	},
	init: function init() {},

	__evClick: function __evClick($event) {
		var _this = this;

		var self = this,
		    sdata = self.data,
		    $refs = self.$refs;

		if (!sdata.dropList) {
			sdata.dropList = new _index4.default({
				data: {
					list: sdata.list,
					target: $refs.selectdrop
				}
			}).$inject(document.body).$on("selectList", function (list) {
				var showName = '';
				list.forEach(function (o) {
					showName = showName ? o.name + ' / ' + showName : o.name;
				});
				_this.$update({
					showName: showName,
					id: list[0].id
				});
				if (typeof _this.data.onChange == "function") {
					_this.data.onChange.call(_this, list);
				}
			});
		}

		sdata.dropList.show();

		return;
		if (sdata.list) {
			sdata.list.$update({
				show: true
			});
			sdata.list.__animateShow();
			// $(self.$refs.selectListWrap).animate({
			// 	height: 28*len +2
			// },"slow");
		} else {
			sdata.list = new List().$inject($refs.selectBd).$on("selectList", function (json) {
				self.$update({
					selectedItem: json.selectedItem
				});
				sdata.list.$update({
					show: false
				});
				self.$emit("selectChange");
			});
		}
	},
	__setLocation: function __setLocation() {
		debugger;

		var _getLocation = (0, _location.getLocation)(this.$refs.selectListWrap, this.data.target, "bottom"),
		    top = _getLocation.top,
		    left = _getLocation.left;
		// this.$update({
		// 	style: {
		// 		top: top + "px",
		// 		left: left + "px",
		// 		display: "block"
		// 	}
		// })

	},
	__evMouseout: function __evMouseout($event) {
		var self = this,
		    sdata = self.data,
		    target = $event.target,
		    origin = $event.origin;

		var e = $event.toElement || $event.relatedTarget;
		while (e && e.parentNode && e.parentNode != window) {
			if (e.parentNode == origin || e == origin) {
				if (e.preventDefault) e.preventDefault();
				return false;
			}
			e = e.parentNode;
		}
		setTimeout(function () {
			if (sdata.list) {
				sdata.dropList.hide();
				// sdata.list.$update({
				// 	show: false,
				// 	selectedIndex: -1
				// });
			}
		}, 200);
	}

}); // var $ = require('$');
// var Base = require('RegularBase');
// var List = require('./dropList/index.es6');
exports.default = Cascader;