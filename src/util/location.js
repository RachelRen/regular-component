/**
** component: 要显示的组件
** target: 鼠标点击的位置
** placement: 组件显示的位置
**/
export function getLocation(component, target, placement){
	var client = component.getBoundingClientRect(),
		// top = client.top,
		// left = client.left,
		// width = client.width,
		// height = client.height,
		{top, left, width, height} = client,
		// target = sdata.target,
		targetRact = target.getBoundingClientRect(),
		{top: sTop, left: sLeft, width: sWidth, height: sHeight} = targetRact,
		// sTop = targetRact.top,
  //       sLeft = targetRact.left,
		// placement = sdata.placement,
		arrowDirction;

	// Regular.dom.addClass(toolTip, "zoom-big-enter zoom-big-enter-active");
	if(!placement){
		top = (sTop - height);
		left = (sLeft - parseInt(width/2));

		// top = top < 0 ? 0 : top;
		// left = left < 0 ? 0 : left;
	}else{
		switch(placement){
			case "right":
				top = sTop;
				left = sLeft + targetRact.width + 8;
				if(left + width > document.body.clientWidth){//太右边了，就放在左边
					left = sLeft - width - 8;
					arrowDirction = "left";
				}
				break;
			case "left":
				top = ~~(sTop - (height - sHeight)/2);
				left = sLeft - width;
				arrowDirction = "right";
				// if(left + width > document.body.clientWidth){//太右边了，就放在左边
				// 	left = sLeft - width - 8;
				// 	arrowDirction = "left";
				// }
				break;
			case "top":
				top = ~~(sTop - height);
				left = sLeft;
				arrowDirction = "bottom";
				// top = top < 0 ? 0 : top;
				// left = left < 0 ? 0 : left;
				break;
			case "bottom":
				top = sTop + sHeight;
				left = sLeft;
				arrowDirction = "top";
				// if(left + width > document.body.clientWidth){//太右边了，就放在左边
				// 	left = sLeft - width - 8;
				// 	arrowDirction = "left";
				// }
				break;
		}
		
	}
	top = top < 0 ? 0 : top;
	left = left < 0 ? 0 : left;
	return {
		left,
		top,
		arrowDirction
	}
}