// var $ = require('$');
// var Base = require('RegularBase');

import Regular from 'regularjs';
import Leaf from './leaf.js';

// import template from './checkboxleaf.html';

//import './checkboxleaf.scss';
let template = `
	<ul class="roleTree_list {class}" ref="tree_list" r-style={rStyle}>
	{#list list as aList by aList_index}
		<li>
			<div class="tree_item">
				<i class="iconfont u-arrow"
					r-class={{"icon-arrow-right": !aList.showChild, "icon-arrow-down": aList.showChild}}
					r-hide={!(aList.hasChildren || aList.children && aList.children.length)} 
					delegate-click={this.__evShowChildren(aList_index)}></i>
				<label class="iconfont mulTreeCheck u-check" 
						{#if !isReadOnly}delegate-click={this.__evClickCheck(aList_index)}{/if}
						r-class={{"z-check": aList.value == 1, "z-part": aList.value == 2,"disabled": isReadOnly}}></label>
				<span class="tree_name" r-class={{"select_item": aList.id == item.id}} 
					on-click={this.__evSelectItem(aList_index)}>
					<i class="iconfont icon-loading" r-hide={!aList.showLoading}></i>
					<a href="javascript:void(0)" class="tree_name_link"><span>{@(aList.name)}</span></a>
				</span>
			</div>
			{#if aList.children && aList.children.length}
				<treeLeaf list={aList.children} class="tree-child-tree" isShow={aList.showChild} allValue={aList.value}
				isReadOnly={isReadOnly} on-changeCheckVal={this.__changeCheckVal($event, aList_index)}
				on-loadChildren={this.__loadChildren($event)}
				on-selectItem={this.__selectItem($event, aList_index)} selectItem={item}></treeLeaf>
			{/if}
		</li>
	{/list}
	

</ul>
`
var CheckboxLeaf = Leaf.extend({
	template: template,
	name: "treeLeaf",
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				list: []
			};

		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		this.supr(data);
	},
	init: function(data){
		this.supr(data);
		this.__addWatcher1();
	},
	__addWatcher1: function(){

		var self = this,
			sdata = self.data;

		self.$watch('allValue', function(newVal, oldVal){
			if(newVal == 1 || newVal == 0){
				sdata.list.forEach(function(o){
					o.value = newVal;
					// self.__checkActionButtons(o);
				});
			}
		});
	},
	__checkActionButtons: function(item){
		if(item.value == 0 && item.buttons && item.buttons.length){
			item.buttons.forEach(function(o, i){
				o.value = 0;
			})
		}
	},
	__evClickCheck: function(index){
		var self = this,
			sdata = self.data,
			list = sdata.list,
			item = list[index];
		switch(item.value){
			case 0:
				item.value = 1;
				break;
			case 1:
				item.value = 0;
				break;
			case 2:
				item.value = 1;
				break;
			default:
				item.value = 1;
				break;
		}
		//当菜单不被选中时，后面的按钮自动取消
		// self.__checkActionButtons(item);
		self.$update();
		self.__emitCheckVal({
			value: item.value,
			selectedItem: item
		});
	},
	// __evActionClick: function(listIndex, actionIndex){
	// 	var self = this,
	// 		sdata = self.data,
	// 		list = sdata.list,
	// 		item = list[listIndex],
	// 		button = item.buttons[actionIndex];
		
	// 	switch(button.value){
	// 		case 0:
	// 			button.value = 1;
	// 			break;
	// 		case 1:
	// 			button.value = 0;
	// 			break;
	// 		default:
	// 			button.value = 1;
	// 			break;
	// 	}
	// 	debugger;
	// 	//当按钮选中时，菜单自动选上
	// 	if(button.value && item.value != 1){
	// 		item.value = 1;
	// 		self.__emitCheckVal(item.value);
	// 	}

	// },
	__emitCheckVal: function(json){
		var self = this,
			sdata = self.data,
			list = sdata.list,
			value = json.value;

		var checkValue  = value == 2? 0 : value;
		var flag = list.some(function(o,index){
			if(o.value == undefined){
				o.value = 0;
			}
			return o.value !== checkValue;
		});
		self.$emit("changeCheckVal",{
			value: !flag ? value : 2,
			selectedItem: json.selectedItem
		});

	},
	__changeCheckVal: function(json, index){
		var self = this,
			sdata = self.data,
			list = sdata.list;
		list[index].value = json.value;
		self.__emitCheckVal({
			value: json.value,
			selectedItem: json.selectedItem
		});
	},
	
});

export default CheckboxLeaf;

// module.exports = Component;