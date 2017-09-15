'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regularjs = require('regularjs');

var _regularjs2 = _interopRequireDefault(_regularjs);

var _index = require('./tooltip/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var Tooltip = require('/javascript/components/tooltip/index.es6');
var template = '\n\t<div class="u-poptip u-tooltip-hidden {poptipClassName}" on-mouseout={this.__evToolTipLeave($event)} r-style={style} ref="toolTip">\n\t\t<div class="u-poptip-content">\n\t\t\t<div class="u-poptip-arrow u-poptip-arrow-right" \n\t\t\tr-class={{"u-poptip-arrow-left": arrowDirction=="left"}}></div>\n\t\t\t<div class="u-poptip-inner">\n\t\t\t\t{#include content}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n';

// import template from './index.html';
// import './index.scss';

var Popover = _index2.default.extend({
	template: template,
	config: function config(data) {
		var self = this,
		    sdata = self.data,
		    defaults = {
			placement: "", //位置 默认是top
			topTipClassName: ""
		};

		var newData = {};
		Object.assign(newData, defaults, sdata);

		this.data = newData;

		self.supr(this.data);
	},
	init: function init(data) {
		this.supr(data);
	}
	// __evToolTipLeave: function(){
	// 	this.supr();
	// }


});

exports.default = Popover;