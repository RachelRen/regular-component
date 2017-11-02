'use strict';

require('./assets/sass/style.scss');

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./tree/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./tooltip/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./popover/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./select/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./pager/index');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('./message/index');

var _index12 = _interopRequireDefault(_index11);

var _index13 = require('./inputnumber/index');

var _index14 = _interopRequireDefault(_index13);

var _index15 = require('./calendar/index');

var _index16 = _interopRequireDefault(_index15);

var _index17 = require('./checkbox/index');

var _index18 = _interopRequireDefault(_index17);

var _index19 = require('./datepicker/index');

var _index20 = _interopRequireDefault(_index19);

var _index21 = require('./cascader/index');

var _index22 = _interopRequireDefault(_index21);

var _index23 = require('./loading/index');

var _index24 = _interopRequireDefault(_index23);

var _index25 = require('./associatedinput/index');

var _index26 = _interopRequireDefault(_index25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Calendar from './calendar/index';
var options = [{
	id: '1',
	name: 'Zhejiang',
	children: [{
		id: '11',
		name: 'Hangzhou',
		children: [{
			id: '111',
			name: 'West Lake'
		}]
	}]
}, {
	id: '2',
	name: 'Jiangsu',
	children: [{
		id: '22',
		name: 'Nanjing',
		children: [{
			id: '222',
			name: 'Zhong Hua Men'
		}]
	}]
}];
var Note = _regularjs2.default.extend({
	template: '\n  \t<checkbox text="rere" checked={false}></checkbox>\n  \t<DatePicker format="yyyy-MM-dd" value={"2018-1-1"} />\n  \t<DatePicker format="yyyy/MM/dd" mode="month" value={"2018-1"}/>\n  \t<loading  />\n  '
});

// inject component into #app , you can also inject at 'before' , 'after', 'top'.
var note = new Note().$inject("#component");

var dataSource = [{
	name: "name1",
	id: 11
}, {
	name: "name22",
	id: 22
}, {
	name: "name 32",
	id: 32
}];

var associatedInput = new _index26.default({
	data: {
		dataSource: dataSource,
		selectedList: [{
			id: '1',
			name: '12'
		}, {
			id: '23',
			name: '34'
		}],
		onChange: function onChange() {
			this.data.dataSource.push({
				name: "name44",
				id: 22
			});
		}
	}
});

associatedInput.$inject("#component");
// import Test from './index'
// console.log(Test);
var tree = new _index2.default({
	data: {
		//service: self.__loadTree(),
		list: [{
			name: "tree 1",
			id: 1,
			hasChildren: true,
			// showChild: true,
			children: [{
				name: "tree 11",
				id: 11
			}, {
				name: "tree 12",
				id: 12
			}]
		}, {
			name: "tree 2",
			id: 2
		}, {
			name: "tree 3",
			id: 3
		}]
	}
});

function loadList(id) {
	var len = ~~(Math.random() * 5) + 1,
	    list = [];

	for (var i = 0; i < len; i++) {
		list.push({
			name: "name" + (id || "") + i,
			id: (id || "") + i,
			hasChildren: i % 2 ? true : false
		});
	}
	return list;
}
var tree2 = new _index2.default({
	data: {
		service: function () {
			return function (id, callback) {
				callback(loadList(id));
			};
		}(),
		onSelect: function onSelect(json) {
			debugger;
		},
		onCheck: function onCheck(json) {
			debugger;
		}
	}
});

// function loadTree(){
// 	return function(id, callback) {
// 		callback(loadList(id))
// 	}
// }

tree2.$inject("#component");

var tree3 = new _index2.default({
	data: {
		multiple: true,
		service: function () {
			return function (id, callback) {
				callback(loadList(id));
			};
		}(),
		onSelect: function onSelect(json) {
			debugger;
		},
		onCheck: function onCheck(json) {
			debugger;
		}
	}
});

tree3.$inject("#component");
var cascader = new _index22.default({
	data: {
		list: options
	}
});

cascader.$inject("#component");

new _index4.default({
	data: {
		// placement: "right",
		target: document.getElementById("toolTip"),
		content: "基于员工的职位、职级、年度绩效、基本薪资以及部门调薪额度，测算出建议调薪金额供主管参考。",
		placement: "top"
	}
});
new _index4.default({
	data: {
		// placement: "right",
		target: document.getElementById("toolTip1"),
		content: "bottombottom基于员工的职位、职级、年度绩效、基本薪资以及部门调薪额度，测算出建议调薪金额供主管参考。",
		placement: "bottom"
	}
});
new _index6.default({
	data: {
		// placement: "right",
		target: document.getElementById("popover"),
		title: "title",
		content: "基于员工的职位",
		placement: "bottom"
	}
});

// window.buttonClick = function(){

// }

var select = new _index8.default({
	data: {
		value: '1',
		class: 'selectClass',
		list: [{
			value: '',
			text: "rerer"
		}, {
			value: 1,
			text: "text"
		}, {
			value: 2,
			text: "text 2"
		}],
		onChange: function onChange(value) {
			debugger;
		}
	}
});
select.$inject("#component");

var pager = new _index10.default({
	data: {
		current: 1,
		total: 2,
		onChange: function onChange(current) {
			debugger;
		}
	}
});
pager.$inject("#component");

var message = new _index12.default({
	data: {
		"type": "success",
		"content": '更新成功'
	}
});

var inputNumber = new _index14.default({
	data: {
		value: 2,
		showHandler: true, //false
		max: 3,
		isPositive: true,
		hasDecimal: true,
		class: "",
		step: 0.1,
		maxLength: 23,
		defaultValue: "3",
		onChange: function onChange(value) {
			console.log(value);
		}
	}
});
inputNumber.$inject("#component");

var calendar = new _index16.default();
calendar.$inject("#component");

var checkbox2 = new _index18.default({
	data: {
		text: 'rercheckbox2e2',
		checked: true,
		onChange: function onChange(o) {
			debugger;
		}
	}
});
checkbox2.$inject("#component");