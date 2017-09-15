

import Regular from 'regularjs';


let template = `
	<div class="m-page {class}" r-class={{"mode2": mode == 2}} r-hide={total < 2}>
		<a href="javascript: void(0)" class="prevPage" on-click={this.nav(current - 1)} r-class={{"disabled": 1 == current}}></a>
		{#if total -5 > show *2}
			<a href="javascript:void(0)" on-click={this.nav(1)} r-class={{"current": 1 == current}}>1</a>
			{#if begin >2}
				<a href="javascript:void(0)"><i>...</i></a>
			{/if}
			{#list begin.. end as i}
				<a href="javascript:void(0)" on-click={this.nav(i)}  r-class={{"current": i == current}}>{i}</a>
			{/list}
			{#if end < total-1}
				<a href="javascript:void(0)"><i>...</i></a>
			{/if}
			<a href="javascript:void(0)" on-click={this.nav(total)} r-class={{"current": total == current}}>{total}</a>
		{#else}
			{#list 1..total as i}
				<a href="javascript:void(0)" on-click={this.nav(i)} r-class={{"current": i == current}}>{i}</a>
			{/list}
		{/if}
		<a href="javascript: void(0)" class="nextPage" on-click={this.nav(current - 0 + 1)} r-class={{"disabled": total == current}}></a>
		<span r-hide={!hasPageSize}>
			共<span>{total}</span>页
			<span style="padding-left: 20px;">每页显示</span>
			&nbsp;&nbsp;
			<select r-model={pageSize}>
				<option value="20">20</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
		</span>
	</div>
`
var Pager = Regular.extend({
	template: template,
	config: function(data){
		var self = this,
			sdata = self.data,
			defaults = {
				total:"",
				current: "",
				pageSize: 50,
				hasPageSize: false,
				// mode:1, 这里有两种样式
			};

		let newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;
		
		// $.extend(true,sdata,defaults);
		var count = 3;
		sdata.show = Math.floor(count/2);

	},
	init: function(){
		var self = this;
		self.__addWatcher();

	},
	__addWatcher: function(){
		var self = this,
			sdata = self.data;

		self.$watch(['current', 'total'], function(current, total){
			var show = sdata.show;
			current = current -0;
			total = total -0;
			sdata.begin = current - show;
			sdata.end = current + show;
			if(sdata.begin < 2) sdata.begin = 2;
	        if(sdata.end > sdata.total-1) sdata.end = sdata.total-1;
	        if(current-sdata.begin <= 1) sdata.end = sdata.end + show + sdata.begin- current;
	        if(sdata.end - current <= 1) sdata.begin = sdata.begin-show-current+ sdata.end;

		});

		self.$watch("pageSize", function(newVal, oldVal){
			if (!oldVal) {
				return;
			}
			var self = this,
				sdata = self.data;
			sdata.pageSize = newVal;
			this.$emit("nav", {
				pageSize: newVal,
				current: 1
			});
			self.$update();
		});
	},
	nav: function(index){
		var self = this,
			sdata = self.data;

		if(index < 1){
			return;
		}
		if(index > sdata.total){
			return;
		}
		if(index == sdata.current){
			return;
		}
		var json = {
			current: index
		};
		if(sdata.hasPageSize){
			json.pageSize = sdata.pageSize;
		}
		if(typeof sdata.onChange == "function"){
			sdata.onChange(json);
		}
		this.$emit("nav", json);
	}
});

export default Pager;

