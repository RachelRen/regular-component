'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

var _location = require('../../util/location');

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropList = _regularjs2.default.extend({
	template: _index2.default,
	name: "cascader-dropList",
	config: function config(data) {
		var defaults = {
			url: '/user/depts.do',
			list: [],
			__ajaxState: 'loading', //[loading | complete | error]
			selectedIndex: -1,
			__error: {
				code: '',
				msg: ''
			},
			show: false,
			_outTimer: null,
			isOut: false,
			isFirst: true
		};
		var newData = {};
		Object.assign(newData, defaults, data);
		this.data = newData;
	},
	init: function init() {
		var self = this;
		// if(!self.data.list.length){
		// 	self.__loadList();
		// }
		// this.$inject(document.body);
		// this.__setLocation();
		self.__addEvents();
		self.__addWatcher();
	},
	show: function show() {
		var _getLocation = (0, _location.getLocation)(this.$refs.selectListWrap, this.data.target, "bottom"),
		    top = _getLocation.top,
		    left = _getLocation.left;

		this.$update({
			style: {
				top: top + "px",
				left: left + "px",
				display: "block"
			}
		});
	},
	hide: function hide() {
		this.$update({
			style: {
				display: "none"
			}
		});
	},
	__evMouseEnter: function __evMouseEnter($event, index, id) {
		var self = this,
		    sdata = self.data,
		    list = sdata.list;

		this.$update({
			selectedIndex: index,
			style: {
				display: "block"
			}
		});
	},
	__addWatcher: function __addWatcher() {
		var self = this;

		// self.$watch("selectedIndex", function(newVal, oldVal){

		// 	if(oldVal == null){
		// 		return;
		// 	}
		// 	debugger;
		// 	console.log("selectedIndex: " + newVal);
		// 	if(newVal == -1){
		// 		self.$update({
		// 			show: false
		// 		});
		// 	}
		// });
	},
	__addEvents: function __addEvents() {
		var self = this,
		    $refs = self.$refs;
		// self.$on("mouseout", function(){
		// 	self.__evMouseout();
		// })
	},
	__mouseoutHide: function __mouseoutHide() {
		this.$update({
			selectedIndex: -1
		});
		this.hide();
		this.$emit("mouseoutHide");
	},
	__evMouseout: function __evMouseout($event) {
		var self = this,
		    sdata = self.data,
		    target = $event.target,
		    origin = $event.origin;
		//关于mouseout的问题 
		//http://stackoverflow.com/questions/4697758/prevent-onmouseout-when-hovering-child-element-of-the-parent-absolute-div-withou
		var e = $event.toElement || $event.relatedTarget;
		while (e && e.parentNode && e.parentNode != window) {
			if (e.parentNode == origin || e == origin) {
				if (e.preventDefault) e.preventDefault();
				return false;
			}
			e = e.parentNode;
		}

		this.$update({
			selectedIndex: -1
		});
		this.hide();
		this.$emit("mouseoutHide");
		return;

		if ($event.target.className == "select-list-wrap") {
			if (sdata.isOut) {
				clearTimeout(sdata._outTimer);
			}
			sdata._outTimer = setTimeout(function () {
				self.__updateSelectedIndex(target, -1);
				sdata.isOut = false;
			}, 100);
			sdata.isOut = true;
		}
	},

	__updateSelectedIndex: function __updateSelectedIndex(target, index) {
		console.log("target:  " + target.className + "---" + new Date().getTime());
		this.$update({
			selectedIndex: index
		});
	},

	__evClick: function __evClick($event, item) {
		var self = this,
		    $refs = self.$refs;

		console.log("click");
		self.$emit("selectList", [{
			id: item.id,
			name: item.name
		}]);
	},
	__selectList: function __selectList(selectList) {
		var self = this,
		    sdata = self.data,
		    list = sdata.list,
		    selectedIndex = sdata.selectedIndex,
		    item = list[selectedIndex];


		selectList.push({
			id: item.id,
			name: item.name
		});
		// this.data.selectedIndex
		self.$emit("selectList", selectList);
	},
	__animateShow: function __animateShow() {
		var self = this,
		    sdata = self.data,
		    len = sdata.list.length,
		    initHeight = sdata.isFirst ? 30 : 0;

		sdata.isFirst = false;

		$(self.$refs.selectListWrap).height(initHeight);
		$(self.$refs.selectListWrap).animate({
			height: 28 * len + 2
		}, "normal");
	},
	__loadList: function __loadList() {
		var self = this,
		    sdata = self.data;

		self.$update({
			__ajaxState: 'loading',
			show: true
		});

		$.ajax({
			url: sdata.url,
			type: 'GET',
			success: function success(json) {
				sdata.list = json.data;
				sdata.__ajaxState = 'complete';
				self.__animateShow();
			},
			error: function error(json) {
				sdata.__ajaxState = 'error';
				sdata.__error = {
					code: json.code,
					msg: json.msg
				};
			},
			complete: function complete() {
				self.$update();
			}
		});
	}
	// __formatDataList: function(list){
	// 	list.forEach(function(o, i){
	// 		o.id = o.deptId;
	// 		o.name = o.deptName;
	// 	});

	// 	return list;
	// }
});

exports.default = DropList;