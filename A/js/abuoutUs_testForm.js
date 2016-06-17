(function(){
				
	var message = document.querySelectorAll('.message')[0];
	var oForm = message.getElementsByTagName('form')[0];
	var aInp = message.getElementsByTagName('input');
	var textarea = message.getElementsByTagName('textarea')[0];
	var aI = message.getElementsByTagName('i');
	
	oForm.addEventListener('submit',function(ev){
		
		if( !libs.tools.testNull(aInp[0].value) ){
			aI[0].className = 'error';
			aI[0].innerHTML = '请输入留言标题';
			ev.preventDefault();
		}else{
			aI[0].className = '';
			aI[0].innerHTML = '';
		}
		
		if( !libs.tools.testLength(aInp[1].value,2) ){
			aI[1].className = 'error';
			aI[1].innerHTML = '请输入您的姓名';
			ev.preventDefault();
		}else{
			aI[1].className = '';
			aI[1].innerHTML = '';
		}
		if( !libs.tools.testTel(aInp[3].value) ){
			aI[3].className = 'error';
			aI[3].innerHTML = '请输入正确的电话号码';
			ev.preventDefault();
		}else{
			aI[3].className = '';
			aI[3].innerHTML = '';
		}
		if( !libs.tools.testNull(textarea.value) ){
			aI[4].className = 'error';
			aI[4].innerHTML = '请输入留言内容';
			ev.preventDefault();
		}else{
			aI[4].className = '';
			aI[4].innerHTML = '';
		}
	},false);
	
})()