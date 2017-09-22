import Regular from 'regularjs';

import template from './index.html';
import {getLocation} from '../../util/location';
import './index.scss';

var DropList = Regular.extend({
	template: template,
	name: "cascader-dropList",
	config: function(data){
		var defaults = {
			url: '/user/depts.do',
			list:[],
			__ajaxState: 'loading',//[loading | complete | error]
			selectedIndex: -1,
			__error:{
				code:'',
				msg:''
			},
			show: false,
			_outTimer: null,
			isOut: false,
			isFirst: true
		};
		let newData = {};
		Object.assign(newData, defaults, data);
		this.data = newData;
	},
	init: function(){
		var self = this;
		// if(!self.data.list.length){
		// 	self.__loadList();
		// }
		// this.$inject(document.body);
		// this.__setLocation();
		self.__addEvents();
		self.__addWatcher();
	},
	show: function(){
		let {top, left} = getLocation(this.$refs.selectListWrap, this.data.target, "bottom");
		this.$update({
			style: {
				top: top + "px",
				left: left + "px",
				display: "block"
			}
		})
	},
	hide: function(){
		this.$update({
			style: {
				
				display: "none"
			}
		})
	},
	__evMouseEnter: function($event, index, id){
		var self = this,
			sdata = self.data,
			list = sdata.list;


		this.$update({
			selectedIndex: index
		});
		

	},
	__addWatcher: function(){
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
	__addEvents: function(){
		var self = this,
			$refs = self.$refs;
			// self.$on("mouseout", function(){
			// 	self.__evMouseout();
			// })
	},
	__evMouseout: function($event){
		var self = this,
			sdata = self.data,
			target = $event.target,
			origin = $event.origin;
		//关于mouseout的问题 
		//http://stackoverflow.com/questions/4697758/prevent-onmouseout-when-hovering-child-element-of-the-parent-absolute-div-withou
		var e = $event.toElement || $event.relatedTarget;
		while(e && e.parentNode && e.parentNode != window) {
		    if (e.parentNode == origin ||  e == origin) {
		        if(e.preventDefault) e.preventDefault();
		        return false;
		    }
		    e = e.parentNode;
		}

        this.$update({
			selectedIndex: -1
		});
        return;

		if($event.target.className == "select-list-wrap"){
			if(sdata.isOut){
				clearTimeout(sdata._outTimer);
			}
			sdata._outTimer = setTimeout(function(){
				self.__updateSelectedIndex(target, -1);
				sdata.isOut = false;
			},100);
			sdata.isOut = true;
		}
		
	},

	__updateSelectedIndex: function(target, index){
		console.log("target:  " + target.className + "---"+  new Date().getTime());
		this.$update({
			selectedIndex: index
		});

	},

	
	
	__evClick: function($event, item){
		var self = this,
			$refs = self.$refs;

		console.log("click");
		self.$emit("selectList", {
			value: item.value,
			label: item.label
		});

			
	},
	__selectList: function($event){
		var self = this;
		self.$emit("selectList", $event);
	},
	__animateShow: function(){
		var self = this,
			sdata = self.data,
			len = sdata.list.length,
			initHeight = sdata.isFirst ? 30 : 0;

		sdata.isFirst = false;

		$(self.$refs.selectListWrap).height(initHeight);
		$(self.$refs.selectListWrap).animate({
			height: 28*len +2
		},"normal");
	},
	__loadList: function(){
		var self = this,
			sdata = self.data;

		self.$update({
			__ajaxState: 'loading',
			show: true
		});

		$.ajax({
			url: sdata.url,
			type: 'GET',
			success: function (json) {
				sdata.list = json.data;
				sdata.__ajaxState = 'complete';
				self.__animateShow();
			},
			error: function (json) {
				sdata.__ajaxState = 'error';
				sdata.__error = {
					code: json.code,
					msg: json.msg
				}
			},
			complete: function () {
				self.$update();
			}
		});
	},
	__formatDataList: function(list){
		list.forEach(function(o, i){
			o.id = o.deptId;
			o.name = o.deptName;
		});

		return list;
	}
});

export default DropList;
