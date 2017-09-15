import Regular from 'regularjs';
// import template from './leaf.html';

let template = `
	<ul class="roleTree_list tree-hide"  ref="tree_list" r-style={rStyle}>
		{#list list as aList by aList_index}
			<li>
				<div class="tree_item">
					<i class="iconfont u-arrow"
						r-class={{"icon-arrow-right": !aList.showChild, "icon-arrow-down": aList.showChild}}
						r-hide={!(aList.hasChildren || aList.children && aList.children.length)} 
						delegate-click={this.__evShowChildren(aList_index)}></i>
					<div class="tree_name" r-class={{"select_item": aList.id == item.id}} 
						on-click={this.__evSelectItem(aList_index)}>
						<i class="iconfont icon-loading" r-hide={!aList.showLoading}></i>
						<a href="javascript:void(0)" class="tree_name_link"><span>{aList.name}</span></a>
						<div>
							{#include content}
						</div>
					</div>
				</div>

				{#if aList.children && aList.children.length}
					<leaf list={aList.children} isShow={aList.showChild} 
					isReadOnly={isReadOnly} on-loadChildren={this.__loadChildren($event)} 
					on-selectItem={this.__selectItem($event, aList_index)} selectItem={item}></leaf>
				{/if}
			</li>
		{/list}
		

	</ul>
`
var Leaf = Regular.extend({
	template: template,
	name: "leaf",
	config: function(data) {
		var self = this,
			sdata = self.data,
		
			defaults = {
				list: [],
				rStyle: {}
			};
		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		// $.extend(true, sdata, defaults);
	},
	init: function() {

		this.__addWatcher();
	},
	__addWatcher: function() {
		var self = this,
			sdata = self.data;

		self.$watch("selectItem", function(newVal, oldVal) {
			sdata.item = newVal;
			self.$update();
		});

		self.$watch("isShow", function(newVal, oldVal) {
			//ant-motion-collapse  ant-motion-collapse-active
			//ant-tree-child-tree-open
			let $treeList = self.$refs.tree_list,
				height = sdata.list.length * 26;
			if (newVal) {
				self.$update({
					rStyle: {
						height: 0
					}
				})
				Regular.dom.delClass($treeList, "tree-hide");
				Regular.dom.addClass($treeList, "tree-show");
				setTimeout(function() {
					self.$update({
						rStyle: {
							height: height + "px"
						}
					})
				}, 20);
				setTimeout(function() {
					Regular.dom.delClass($treeList, "tree-show");
					self.$update({
						rStyle: {
							height: "auto"
						}
					})
				}, 300)
			} else {

				Regular.dom.addClass($treeList, "tree-show");
				self.$update({
					rStyle: {
						height: height + "px"
					}
				})
				setTimeout(function() {
					self.$update({
						rStyle: {
							height: 0
						}
					})
				}, 20);

				setTimeout(function() {
					Regular.dom.delClass($treeList, "tree-show");
					Regular.dom.addClass($treeList, "tree-hide");
				}, 300)

			}

		});

		// self.$watch(["isShow", ], function(){

		// })

	},

	__evSelectItem: function(index) {
		var self = this,
			sdata = self.data,
			list = sdata.list,
			item = list[index];
		sdata.item = item;
		self.$update();
		this.$emit("selectItem", [item]);
	},
	__selectItem: function(itemList, index) {
		var self = this,
			sdata = self.data,
			list = sdata.list,
			parentItem = list[index];

		itemList.push(parentItem);
		sdata.item = itemList[0];
		self.$update();
		this.$emit("selectItem", itemList);
	},
	__evShowChildren: function(index) {
		var self = this,
			list = self.data.list,
			item = list[index];
			
		item.showLoading = true;
		if (item.children && item.children.length) {
			item.showChild = !item.showChild;
			item.showLoading = false;
			self.$update();
			return;
		}
		// Regular.dom.addClass(self.$refs.tree_list, "tree-hide");
		self.__emitLoadChildren(list[index]);
	},

	__loadChildren: function(json) {
		this.__emitLoadChildren(json);
	},

	__emitLoadChildren: function(item) {
		this.$emit("loadChildren", item);
	}


});


export default Leaf;
// module.exports = Leaf;