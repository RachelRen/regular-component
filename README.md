Regular Component is a set of frend-end components built with RegularJS.

Install

npm install regular-component


Usage

import {Select} from 'regular-component';

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

And import style manully:

import 'regular-component/dist/index.css'


Development

$ git clone git@github.com:ant-design/ant-design.git
$ npm install
$ npm start

