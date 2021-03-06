import './assets/sass/style.scss';
import Regular from 'regularjs';

import Tree from './tree/index';
import ToolTip from './tooltip/index';
import Popover from './popover/index';

import Select from './select/index';
import Pager from './pager/index';
import Message from './message/index';

import InputNumber from './inputnumber/index';

// import Calendar from './calendar/index';
import Calendar from './calendar/index';
import Checkbox from './checkbox/index';

import DatePicker from './datepicker/index';

import Cascader from './cascader/index';

import Loading from './loading/index';

import AssociatedInput from './associatedinput/index';

const options = [{
	id: '1',
	name: 'Zhejiang',
	children: [{
		id: '11',
		name: 'Hangzhou',
		children: [{
			id: '111',
			name: 'West Lake',
		}],
	}],
}, {
	id: '2',
	name: 'Jiangsu',
	children: [{
		id: '22',
		name: 'Nanjing',
		children: [{
			id: '222',
			name: 'Zhong Hua Men',
		}],
	}],
}];
var Note = Regular.extend({
  template:`
  	<checkbox text="rere" checked={false}></checkbox>
  	<DatePicker format="yyyy-MM-dd" value={"2018-1-1"} />
  	<DatePicker format="yyyy/MM/dd" mode="month" value={"2018-1"}/>
  	<loading  />
  `
});

// inject component into #app , you can also inject at 'before' , 'after', 'top'.
var note = new Note().$inject("#component");

var dataSource = [{
	name: "name1",
	id: 11
},{
	name: "name22",
	id: 22
},{
	name: "name 32",
	id: 32
}]

var associatedInput = new AssociatedInput({
	data: {
		dataSource: dataSource,
		selectedList: [{
			id: '1',
			name: '12'
		},{
			id: '23',
			name: '34'
		}],
		onChange: function(){
			this.data.dataSource.push({
				name: "name44",
				id: 22
			})
		}
	}
})

associatedInput.$inject("#component");
// import Test from './index'
// console.log(Test);
let tree = new Tree({
	data:{
        //service: self.__loadTree(),
        list: [{
        	name: "tree 1",
        	id: 1,
        	hasChildren: true,
        	// showChild: true,
        	children: [{
        		name: "tree 11",
        		id: 11,
        	},{
        		name: "tree 12",
        		id: 12,
        	}]
        },{
        	name: "tree 2",
        	id: 2
        },{
        	name: "tree 3",
        	id: 3
        }]
    }
});

function loadList(id){
	let len = ~~(Math.random()*5) + 1,
		list = [];

	for(let i = 0; i < len; i++){
		list.push({
			name: "name" + (id || "") + i,
			id: (id || "") + i,
			hasChildren: i % 2 ? true : false
		})
	}
	return list;
	
}
let tree2 = new Tree({
	data: {
		service: (()=>{
			return (id, callback) => {
				callback(loadList(id))
			}
		})(),
		onSelect: function(json){
			debugger;
		},
		onCheck: function(json){
			debugger;
		}
	}
})

// function loadTree(){
// 	return function(id, callback) {
// 		callback(loadList(id))
// 	}
// }

tree2.$inject("#component");


let tree3 = new Tree({
	data: {
		multiple: true,
		service: (()=>{
			return (id, callback) => {
				callback(loadList(id))
			}
		})(),
		onSelect: function(json){
			debugger;
		},
		onCheck: function(json){
			debugger;
		}
	}
})

tree3.$inject("#component");
let cascader = new Cascader({
	data: {
		list: options
	}
})

cascader.$inject("#component");


new ToolTip({
	data: {
		// placement: "right",
		target: document.getElementById("toolTip"),
        content: "基于员工的职位、职级、年度绩效、基本薪资以及部门调薪额度，测算出建议调薪金额供主管参考。",
        placement: "top"
	}
})
new ToolTip({
	data: {
		// placement: "right",
		target: document.getElementById("toolTip1"),
        content: "bottombottom基于员工的职位、职级、年度绩效、基本薪资以及部门调薪额度，测算出建议调薪金额供主管参考。",
        placement: "bottom"
	}
})
new Popover({
	data: {
		// placement: "right",
		target: document.getElementById("popover"),
		title: "title",
        content: "基于员工的职位",
        placement: "bottom",
	}
})

// window.buttonClick = function(){
	
// }

let select = new Select({
	data: {
		value: '1',
		class: 'selectClass',
		list: [{
			value: '',
			text: "rerer"
		},{
			value: 1,
			text: "text"
		},{
			value: 2,
			text: "text 2"
		}],
		onChange: function(value){
			debugger;
		}
	}
})
select.$inject("#component");

let pager = new Pager({
	data: {
		current: 1,
		total: 2,
		mode: 2,
		hasPageSize: true,
		onChange: function(current){
			debugger;
		}
	}
})
pager.$inject("#component");

var message = new Message({
	data: {
        "type": "success",
        "content": '更新成功'
    }
})

let inputNumber = new InputNumber({
	data: {
		value: 2,
		showHandler: true,//false
		max: 3,
		isPositive: true,
		hasDecimal: true,
		class: "",
		step: 0.1,
		maxLength: 23,
		defaultValue: "3",
		onChange: (value) =>{
			console.log(value)
		}
	}
});
inputNumber.$inject("#component");


let calendar = new Calendar();
calendar.$inject("#component");

const checkbox2 = new Checkbox({
	data: {
		text: 'rercheckbox2e2',
		checked: true,
		onChange: (o) =>{
			debugger;
		}
	}
})
checkbox2.$inject("#component");