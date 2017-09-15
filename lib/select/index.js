'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index2 = require('./index.html');

var _index3 = _interopRequireDefault(_index2);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = _regularjs2.default.extend({
	name: 'dropdown',
	template: '\n\t\t<div class="m-component-select-dropdown m-select-dropdown-hidden" r-style={style} ref="dropdown">\n\t\t\t<div>\n\t\t\t\t<ul class="m-component-select-dropdown-menu" ref="dropdownMenu">\n\t\t\t\t\t{#list list as aList}\n\t\t\t\t\t\t<option value={aList.value} selectdValue={rModel} text={aList.text}>{@(aList.text)}</option>\n\t\t\t\t\t{/list}\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t',
	config: function config(data) {
		var self = this,
		    sdata = self.data;

		sdata.toggleTimer = 200;
		sdata.selectedIndex = 0;
	},
	init: function init() {
		var self = this,
		    selectedOption = self.data.selectedOption;
		// self.__getDefaultSelected();
		self.$inject(document.body);
		self.__addEvent();
		self.__addWatcher();
	},
	__getDefaultSelected: function __getDefaultSelected() {

		var self = this,
		    sdata = self.data,
		    selectedOption = sdata.selectedOption,
		    list = sdata.list;

		if ((!selectedOption || selectedOption && selectedOption.value == "") && list && list.length) {
			var firstList = list[0];
			selectedOption = {
				value: firstList.value,
				text: firstList.text
			};
			self.$update({
				selectedOption: selectedOption
			});
		}
	},
	__addEvent: function __addEvent() {
		var self = this;

		self.$on("change", function (json) {
			self.__hideDropdown();
			self.data.selectedOption = {
				value: json.value,
				text: json.text
			};
			self.$emit("dochange", json);
		});
		self.$on("initValue", function () {
			self.__getDefaultSelected();
			var selectedOption = self.data.selectedOption;

			self.$emit("change", {
				value: selectedOption.value,
				text: selectedOption.text,
				isInitValue: true
			});
		});
	},
	__addWatcher: function __addWatcher() {
		var self = this;

		self.$watch("isShow", function (json) {
			self.__evToogleDropdown();
		});
	},
	__evToogleDropdown: function __evToogleDropdown() {
		var self = this,
		    sdata = self.data;
		if (sdata.isShow) {
			self.__showDropdown();
		} else {
			self.__hideDropdown();
		}
	},
	__setScrollTop: function __setScrollTop() {
		var self = this,
		    $refs = self.$refs,
		    sdata = self.data,
		    $dropdownMenu = $refs.dropdown,
		    scrollHeight = void 0,
		    offsetHeight = void 0;

		$dropdownMenu.scrollTop = 0;
		//正常情况下能显示下8个，超过八个才需要展示移动滚动条的位置
		if (sdata.selectedIndex > 7) {
			$dropdownMenu = $refs.dropdownMenu, scrollHeight = $dropdownMenu.scrollHeight, offsetHeight = $dropdownMenu.offsetHeight;
			if (scrollHeight > offsetHeight) {
				var scrollTop = sdata.selectedIndex * 32;
				if (offsetHeight + scrollTop < scrollHeight) {
					//最好放在中间的位置
					scrollTop = (sdata.selectedIndex - 3.5) * 32;
				}
				$dropdownMenu.scrollTop = scrollTop;
			}
		}
	},
	__showDropdown: function __showDropdown() {
		var self = this,
		    $refs = self.$refs,
		    sdata = self.data,
		    $dropdown = $refs.dropdown;

		self.__strongSelectedOption();

		self.$update({
			style: sdata.style
		});

		_regularjs2.default.dom.delClass($dropdown, "m-select-dropdown-hidden");
		_regularjs2.default.dom.addClass($dropdown, "slide-up-enter slide-up-enter-active");

		self.__setScrollTop();
		setTimeout(function () {
			_regularjs2.default.dom.delClass($dropdown, "slide-up-enter slide-up-enter-active");
		}, sdata.toggleTimer);
		sdata.isShow = true;
	},
	__hideDropdown: function __hideDropdown() {
		var self = this,
		    $refs = self.$refs,
		    sdata = self.data,
		    $dropdown = $refs.dropdown;
		_regularjs2.default.dom.addClass($dropdown, "slide-up-leave slide-up-leave-active");
		setTimeout(function () {
			_regularjs2.default.dom.delClass($dropdown, "slide-up-leave slide-up-leave-active");
			_regularjs2.default.dom.addClass($dropdown, "m-select-dropdown-hidden");
		}, sdata.toggleTimer);
		sdata.isShow = false;
	},

	__strongSelectedOption: function __strongSelectedOption() {
		var self = this,
		    sdata = self.data,
		    selectedValue = void 0;
		if (!sdata.selectedOption) {
			return;
		}
		selectedValue = sdata.selectedOption.value;
		//TODO
		self._children.forEach(function (o, i) {
			if (o.data.value == selectedValue) {
				o.$update({
					selected: true
				});
				sdata.selectedIndex = i;
			} else {
				o.$update({
					selected: false
				});
			}
		});
	}
}); /**
    * 替代浏览器下拉框的
    * 样式和行为模仿ant.design中的select: https://ant.design/components/select/
    **/
// var $ = require('$');
// var Base = require('RegularBase');
// const Regular = require('Regular');

var optionTpl = '\n\t<li class="m-component-select-dropdown-menu-item" style="-webkit-user-select: none" aria-selected={selected}\n\t delegate-click={this.__evSelected($event)} r-class={{"selectedItem": selected}}\n\t delegate-mouseover={this.__evMouseover()} delegate-mouseout={this.__evMouseout()}\n\tvalue={value} ref="option" title={text}>{text}</li>\n';
var Option = _regularjs2.default.extend({
	template: optionTpl,
	config: function config(data) {},
	init: function init() {
		var self = this,
		    $refs = self.$refs,
		    sdata = self.data;
		if (sdata.selected) {
			self.$parent.data.selectedOption = {
				value: sdata.value,
				text: sdata.text
			};
		}
		if (sdata.selectdValue == sdata.value) {
			self.$parent.data.selectedOption = {
				value: sdata.value,
				text: sdata.text
			};
		}
		self.__addEvent();
	},
	__addEvent: function __addEvent() {
		var self = this;
	},
	__evSelected: function __evSelected($event) {
		var self = this,
		    $refs = self.$refs,
		    sdata = self.data;
		self.$parent.$emit("change", {
			value: sdata.value,
			text: $refs.option.innerText
		});
	},
	__evMouseover: function __evMouseover() {
		var self = this,
		    $refs = self.$refs,
		    sdata = self.data;

		_regularjs2.default.dom.addClass($refs.option, "hoverItem");
	},
	__evMouseout: function __evMouseout() {
		var self = this,
		    $refs = self.$refs,
		    sdata = self.data;

		_regularjs2.default.dom.delClass($refs.option, "hoverItem");
	}
});

Dropdown.component('option', Option);

var Component = _regularjs2.default.extend({
	template: _index3.default,
	config: function config(data) {
		var self = this,
		    sdata = self.data;
		sdata.isShow = false;
		sdata.toggleTimer = 200;
	},
	init: function init() {
		var self = this,
		    sdata = self.data;

		sdata.dropdown = new Dropdown({
			data: {
				// list: sdata.list,
				rModel: sdata.value
			}
		}).$on("dochange", function (json) {
			self.__setSelectedValue(json, false);
			if (!json.isInitValue) {
				//如果只是赋值，就不用向外触发事件
				if (typeof sdata.onChange == "function") {
					sdata.onChange(json.value);
				}

				self.$emit("change", json.value);
			}
		});
		// self.__setInitValue();
		self.__addWatcher();
	},
	__addWatcher: function __addWatcher() {
		var self = this,
		    sdata = self.data,
		    list = sdata.list;

		if (list && list.length) {
			sdata.dropdown.data.list = list;
			//如果没有默认值，那么list的第一项就是选中值
			var index = 0;
			list.some(function (o, i) {
				if (o.value == sdata.value) {
					index = i;
					return true;
				}
			});
			sdata.value = list[index].value;

			if (!sdata.value) {
				self.__setSelectedValue(list[0], true);
			} else {
				self.__setSelectedValue(list[index], true);
			}
		}

		self.$watch("list", function (newVal, oldVal) {
			//为了下拉框选项的值变了
			if (newVal) {
				sdata.dropdown.data.list = newVal;
				//如果没有默认值，那么list的第一项就是选中值
				var _index = 0;
				sdata.list.some(function (o, i) {
					if (o.value == sdata.value) {
						_index = i;
						return true;
					}
				});
				sdata.rModel = newVal[_index].value;
				// sdata.rModel = sdata.rModel == undefined ? newVal[0].value : sdata.rModel;
				// sdata.dropdown.$emit("initValue");//为了渲染初始值, 不用了，用watch rModel来修改
			}
		}, true);
		self.$watch("value", function (newVal, oldVal) {
			// return;
			//当表面的值改变的时候，需要对这个下拉框选中的值进行改变
			var index = 0;
			sdata.list.some(function (o, i) {
				index = i;
				return o.value == newVal;
			});
			self.__setSelectedValue(sdata.list[index], true);
		});
	},

	//isManualSelect来判断值得改变是通过赋值，还是手动选值来改变的，
	//如果是赋值改变的，要改变下拉框选中的值
	__setSelectedValue: function __setSelectedValue(json, isManualSelect) {
		var self = this,
		    sdata = self.data;

		self.$update({
			selectedOption: json,
			// isShow: false,
			rModel: json.value
		});
		if (isManualSelect) {
			self.data.dropdown.data.selectedOption = json;

			// self.data.dropdown.__getDefaultSelected();
		} else {
			self.$update({
				isShow: false
			});
		}

		// self.$update({
		// 	selectedOption: {
		// 		value: json.value,
		// 		text: json.text,
		// 		rModel: json.value
		// 	}
		// })
	},
	__evToogleDropdown: function __evToogleDropdown($event) {
		var self = this,
		    sdata = self.data,
		    $selectSection = self.$refs.selectSection,
		    dropdown = sdata.dropdown;

		if (!sdata.isShow) {
			var panel = $event.origin,
			    rect = panel.getBoundingClientRect();

			dropdown.$update({
				isShow: !sdata.isShow,
				style: {
					top: rect.top + panel.offsetHeight + "px",
					left: rect.left + "px",
					width: rect.right - rect.left + "px"
				}
			});
		} else {
			dropdown.$update({
				isShow: !sdata.isShow
			});
		}
		sdata.isShow = !sdata.isShow;
		self.$update();
		// self.$update({
		// 	isShow: 
		// });
		self.__evToggle();
	},
	__evToggle: function __evToggle(isShow) {
		var self = this,
		    sdata = self.data,
		    index = void 0;
		if (isShow === undefined) {
			isShow = sdata.isShow;
		} else {
			//点击其他地方让页面消失
			self.data.dropdown.$update({
				isShow: isShow
			});
		}
		// sdata.isShow = isShow;
		self.$update({
			isShow: isShow
		});
		// if(isShow){
		// 	Regular.dom.addClass($selectSection,"select-open");
		// }else{
		// 	Regular.dom.delClass($selectSection,"select-open");
		// }
		index = Component.shows.indexOf(self);
		if (sdata.isShow && index == -1) {
			Component.shows.push(self);
		} else if (!sdata.isShow && index >= 0) {
			Component.shows.splice(index, 1);
		}
	}
});

Component.shows = [];
_regularjs2.default.dom.on(document, "click", function (e) {
	Component.shows.forEach(function (o) {
		var element = o.$refs.select,
		    //点击的那部分
		dropdown = o.data.dropdown.$refs.dropdown,
		    //展示的那部分
		element2 = e.target;
		while (element2) {
			if (element2 == element || element2 == dropdown) {
				return;
			}
			element2 = element2.parentNode;
		}
		//说明都不是
		o.__evToggle(false);
	});
});
// Component.component('dropdown', Dropdown);
exports.default = Component;
// module.exports = Component;