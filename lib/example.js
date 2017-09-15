'use strict';

require('./assets/sass/style.scss');

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_index2.default);
// let tree = new Tree({
// 	data:{
//         //service: self.__loadTree(),
//         list: [{
//         	name: "tree 1",
//         	id: 1,
//         	hasChildren: true,
//         	// showChild: true,
//         	children: [{
//         		name: "tree 11",
//         		id: 11,
//         	},{
//         		name: "tree 12",
//         		id: 12,
//         	}]
//         },{
//         	name: "tree 2",
//         	id: 2
//         },{
//         	name: "tree 3",
//         	id: 3
//         }]
//     }
// });

// function loadList(id){
// 	let len = ~~(Math.random()*5) + 1,
// 		list = [];

// 	for(let i = 0; i < len; i++){
// 		list.push({
// 			name: "name" + (id || "") + i,
// 			id: (id || "") + i,
// 			hasChildren: i % 2 ? true : false
// 		})
// 	}
// 	return list;

// }
// let tree2 = new Tree({
// 	data: {
// 		service: (()=>{
// 			return (id, callback) => {
// 				callback(loadList(id))
// 			}
// 		})(),
// 		selectItemCallback: function(json){
// 			debugger;
// 		}
// 	}
// })

// // function loadTree(){
// // 	return function(id, callback) {
// // 		callback(loadList(id))
// // 	}
// // }

// tree2.$inject("#component");


// let tree3 = new Tree({
// 	data: {
// 		multiple: true,
// 		service: (()=>{
// 			return (id, callback) => {
// 				callback(loadList(id))
// 			}
// 		})(),
// 		selectItemCallback: function(json){
// 			debugger;
// 		},
// 		onCheck: function(json){
// 			debugger;
// 		}
// 	}
// })

// tree3.$inject("#component");


// window.buttonClick = function(){
// 	new ToolTip({
// 		data: {
// 			// placement: "right",
// 			target: document.getElementById("toolTip"),
// 	        content: "基于员工的职位、职级、年度绩效、基本薪资以及部门调薪额度，测算出建议调薪金额供主管参考。"
// 		}
// 	})
// }

// let select = new Component({
// 	data: {
// 		value: '1',
// 		class: 'selectClass',
// 		list: [{
// 			value: '',
// 			text: "rerer"
// 		},{
// 			value: 1,
// 			text: "text"
// 		},{
// 			value: 2,
// 			text: "text 2"
// 		}],
// 		onChange: function(value){
// 			debugger;
// 		}
// 	}
// })
// select.$inject("#component");

// let pager = new Pager({
// 	data: {
// 		current: 1,
// 		total: 2,
// 		onChange: function(current){
// 			debugger;
// 		}
// 	}
// })
// pager.$inject("#component");

// var message = new Message({
// 	data: {
//         "type": "success",
//         "content": '更新成功'
//     }
// })

// let inputNumber = new InputNumber({
// 	data: {
// 		value: 2
// 	}
// });
// inputNumber.$inject("#component");


// let calendar = new Calendar();
// calendar.$inject("#component");