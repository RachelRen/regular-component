/**
 *
 */

// require('./selectmenu.js');
import Regular from 'regularjs';
import template from './index.html';
import Selectmenu from './menu/index'
// var Selectmenu = require('./selectmenu.es6');
import './index.scss';

var AssociatedInput =  Regular.extend({
	template: template,
	name: 'associatedinput',
	config: function(data) {
		let newData = {};
		Object.assign(newData, {
			url: '/rms/offer/dimension/hr.do', // 默认查询员工名称接口
			selectedList: [], //已经被选中的数组,
			selectedIdList:[]//选中的id
		}, data);

		this.data = newData;

		// $.extend(data,{
		// 	url: '/rms/offer/dimension/hr.do', // 默认查询员工名称接口
		// 	selectedList: [], //已经被选中的数组,
		// 	selectedIdList:[]//选中的id
		// });
	},
	init: function(){
		this.newSelect();
	},
	backspaceAssociate: function($event){
		if(!this.__selectMenu){
			this.newSelect();
			/*this.__selectMenu = new _sel().$inject(document.body);
			this.__selectMenu.$on('associateoption', function(){
				this.__associateoption();
			});*/
		}
		var _target = $event.target,
			_value = _target.value,
			_keycode = $event.which,
			_menuData = this.__selectMenu.data;
		if(_keycode == 8){
			//按backspace键时，当文字框内没有文字时，删除前一个已经选择了, 跟邮箱一样
			if(_value.length >= 1){
				_menuData.isHide = true;
				this.__selectMenu.$update();
			}else{
				var _length = this.data.selectedList.length;
				this.data.selectedList.splice(_length - 1, 1);
				this.data.selectedIdList.splice(_length - 1, 1);
			}
		}
	},
	newSelect: function(){
		var self = this;
		self.__selectMenu = new Selectmenu().$inject(document.body);
		self.__selectMenu.$on('associateoption', function(){
			self.__associateoption();
		});

		// require(['./selectmenu.es6'], function(menu){
			
		// });
	},
	associate: function($event){
		var self = this;
		if(!self.__selectMenu){
			self.newSelect();
		}
		var _target = $event.target,
			_value = _target.value,
			_keycode = $event.which,
			_menuData = self.__selectMenu.data;
		if(!_menuData.selectedIndex){
			_menuData.selectedIndex = 0;
		}
		switch(_keycode){
		case 13:
			//enter 选中
			self.__associateoption(true);
			break;
		case 38:
			//往上
			if(_menuData.selectedIndex == 0){
				_menuData.selectedIndex = _menuData.showList.length - 1;
			}else{
				--_menuData.selectedIndex;
			}
			break;
		case 40:
			//往下
			if(_menuData.selectedIndex == (_menuData.showList.length - 1)){
				_menuData.selectedIndex = 0;
			}else{
				++_menuData.selectedIndex;
			}
			break;
		default:
			_menuData.showList = [{
				name: "name",
				id: 1
			},{
				name: "name2",
				id: 2
			},{
				name: "name 3",
				id: 3
			}];
			_menuData.isHide = false;
			_menuData.selectedIndex = 0;

			// 最多展示8项
			if (_menuData.showList.length > 10) {
				_menuData.showList.length = 10;
			}

			var _rect = _target.getBoundingClientRect(),
				_pageBox = document.body;
			/*var _offset = _e._$offset(_target, document.body),
				_pageBox = _e._$getPageBox();*/
			_menuData.style = {
				top: _rect.top + _pageBox.scrollTop + (_rect.bottom - _rect.top)  + "px",
				left: _rect.left + _pageBox.scrollLeft  +  "px"
			};
			self.__selectMenu.$update();

			

		}
		self.__selectMenu.$update();
	},
	/**
	 * 当enter键或者直接点击的时候，选择数据
	 * isEnter来判断是什么方式
	 */
	__associateoption: function(isEnter){
		var _menuData = this.__selectMenu.data,
			_selectedItem,
			_data = this.data,
			_selectedList = _data.selectedList,
			_selectedIdList = _data.selectedIdList;
		if(isEnter){
			_selectedItem = _menuData.showList[_menuData.selectedIndex];
		}else{
			_selectedItem = this.__selectMenu.data.selectedText;
		}
		var _selectedId = _selectedItem.id + '';
		if(_selectedIdList.indexOf(_selectedId) == -1){
			//说明这个不存在
			_selectedList.push(_selectedItem);
			_selectedIdList.push(_selectedId);
		}
		this.data.assInput = "";
		_menuData.selectedIndex = -1;
		_menuData.showList = [];
		_menuData.isHide = true;
		this.$update();

	},
	deleteItem: function(index){
		this.data.selectedList.splice(index,1);
		this.data.selectedIdList.splice(index, 1);
		return false;
	},
	focus: function(event){
		var _target = event.target,
			_assInput = this.$refs.assInput;
		_assInput && _assInput.focus();
	},

	__evBlur: function (ev) {
		var self = this,
			__selectMenu = self.__selectMenu;

		if (!__selectMenu) {
			return;
		}

		setTimeout(function () {
			__selectMenu.data.isHide = true;
			__selectMenu.$update();
		}, 200);
	}
});

// Component.component('selectmenu', Selectmenu);
export default AssociatedInput

