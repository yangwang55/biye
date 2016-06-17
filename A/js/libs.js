var libs = {};
libs.tools = {};

libs.tools.getTop = function(obj) {
	var iTop = 0;
	while(obj) {
		iTop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return iTop;
}
libs.tools.getLeft = function(obj){
	var iLeft = 0;
	while(obj){
		iLeft += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return iLeft;
}
libs.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}

libs.tools.testNull = function(str){
	
	if( str.trim() == '' ){
		return false;
	}
	return true;
}
libs.tools.testLength = function(str,length){
	
	if( str.trim().length < length ){
		return false;
	}
	return true;
}
libs.tools.testTel = function(str){
	
	var re = /(\d{3}-)?\d{8}|(\d{4}-)?\d{7}/;
	var re2 = /^1[3|4|5|8]\d{9}$/;
	var str = str.trim();
	
	if( str != '' ){
		return re.test(str) || re2.test(str);	
	}
	return true;
}

libs.ui = {};	
//运动框架
libs.ui.startMove = function (obj,json,endFn){

	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		
		var bBtn = true;
		
		for(var attr in json){
			
			var iCur = 0;
		
			if(attr == 'opacity'){
				if(Math.round(parseFloat(libs.tools.getStyle(obj,attr))*100)==0){
					iCur = Math.round(parseFloat(libs.tools.getStyle(obj,attr))*100);
				}else{
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
				}	
			}else{
				iCur = parseInt(libs.tools.getStyle(obj,attr)) || 0;
			}
			
			var iSpeed = (json[attr] - iCur)/10;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur!=json[attr]){
				bBtn = false;
			}
			
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
				obj.style.opacity = (iCur + iSpeed)/100;
				
			}else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			
		}
		
		if(bBtn){
			clearInterval(obj.timer);
			
			if(endFn){
				endFn.call(obj);
			}
		}
		
	},30);

}

	
libs.app = {};
	

//选项卡
libs.app.tab = function(btn,box){
	for (var i=0 ;i<btn.length ;i++ ) {
		btn[i].index = i;
		btn[i].onclick = function(){
			var This = this;
			setTimeout(function(){
				for (var i=0 ;i<btn.length ;i++ ) {
					btn[i].className = '';
					box[i].style.display = 'none';
				}
				
				This.className = 'selected';
				box[This.index].style.display = 'block';
			},200);
			
		}
	}
}
		
//滚动定位
libs.app.scrollFixed = function(obj){
	var scroll = document.documentElement.scrollTop || document.body.scrollTop;
	var iTop = libs.tools.getTop(obj);
	var iLeft = libs.tools.getLeft(obj);
	if( scroll >= iTop){
		obj.style.left = iLeft + 'px';
		obj.style.top = '30px';
		obj.style.position = 'fixed';
	}else{
		obj.style.left = '0';
		obj.style.top = '0';
		obj.style.position = 'relative';
	}
	
}
libs.app.toBanner = function(oBox,oCtrl){  		//轮播窗
	
	var aBox = oBox.getElementsByTagName('li');
	var aCtrl = oCtrl.getElementsByTagName('li');
	var w = aBox[0].offsetWidth;
	var iNow = 0;
	var timer = null;

	for(var i=0 ;i<aBox.length; i++){
		var li = document.createElement('li');
		oCtrl.appendChild(li);
	}
	aCtrl[0].className = 'active';
	
	
	oBox.style.width = w * aBox.length + 'px';
	oCtrl.style.marginLeft = -(oCtrl.offsetWidth/2) + 'px';
	
	for(var i=0 ;i<aCtrl.length ;i++){
		
		aCtrl[i].index = i;
		aCtrl[i].addEventListener('click',function(){
			
			var This = this;
			iNow = this.index;
			for(var i=0 ;i<aCtrl.length ;i++){
				aCtrl[i].className = '';
			}
			libs.ui.startMove(oBox,{left: -1 * (this.index*w) },function(){
				This.className = 'active';
			});
			
		},false);
		
	}
	
	
	function autoPlay(){
		iNow++;
		if(iNow>aBox.length-1){
			iNow=0;
		}
		for(var i=0 ;i<aCtrl.length ;i++){
				aCtrl[i].className = '';
		}
		libs.ui.startMove(oBox,{left: -1 * (iNow*w) },function(){
			aCtrl[iNow].className = 'active';
		});
	}
	
	
	timer = setInterval(autoPlay,5000);
	oBox.parentNode.addEventListener('mouseover',function(){
		clearInterval(timer);
	},false);
	oBox.parentNode.addEventListener('mouseout',function(){
		timer = setInterval(autoPlay,5000);
	},false);
	
}
		
