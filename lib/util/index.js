'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.formatTime = formatTime;
function formatTime(value) {
	var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "yyyy-MM-dd HH:mm";

	var maps = {
		'yyyy': function yyyy(data) {
			return data.getFullYear();
		},
		'MM': function MM(data) {
			return numberFixed(data.getMonth() + 1);
		},
		'dd': function dd(data) {
			return numberFixed(data.getDate());
		},
		'HH': function HH(data) {
			return numberFixed(data.getHours());
		},
		'mm': function mm(data) {
			return numberFixed(data.getMinutes());
		}
	};

	var trunk = new RegExp(Object.keys(maps).join("|"), "g");
	value = new Date(value);
	return format.replace(trunk, function (capture) {
		return maps[capture] ? maps[capture](value) : "";
	});
}

var numberFixed = function numberFixed(value) {
	return value >= 10 ? value : "0" + value;
};

exports.numberFixed = numberFixed;