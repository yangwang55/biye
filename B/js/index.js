$(function() {
	//轮播窗
    $(".swiper-container").swiper({
		autoplay: 3000,//可选选项，自动滑动
		width : window.innerWidth
	});
	//侧栏
	$(document).on("click", "#menu-btn", function() {
	  $.openPanel("#menu");
	});
	$(document).on("click", ".panel-nav-list li", function() {
	  $.closePanel("#message");
	});
	//popup
	$(document).on('click','#message-btn', function(){
	  $.popup('#message-popup');
	});
	$(document).on('click','#about-us-btn', function(){
	  $.popup('#about-us-popup');
	});
	//表单
	$(document).on('click','#message-reset',function(){
		$('#message-popup').find('input').val('');
		$('#message-popup').find('textarea').val('');
	})
});