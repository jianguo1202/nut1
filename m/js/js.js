//REM适配分辨率JS
function DOMReady(fn) {
	if(document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function() {
			fn && fn();
		}, false)
	} else {
		document.attachEvent('readystatechange', function() {
			if(document.readyState == 'complete') {
				fn && fn();
			};
		});
	};
};
DOMReady(
	function() {;
		(function(win, doc) {
			function change() {
				doc.documentElement.style.fontSize = 50 * doc.documentElement.clientWidth / 375 + 'px';
			}
			change();
			win.addEventListener('resize', change, false);
		})(window, document);
	}
);

$(document).ready(function() {
	$('.guize p').click(function() {
		$('.tanc-box').show();
		$('.tchdgz').animate({
			'top': '20%'
		});
	});
	$('.close-gz').click(function() {
		$('.tanc-box').hide();
		$('.tchdgz').animate({
			'top': '-100%'
		});
	});
	$(".close").click(function() {
		$(".pop").fadeOut();
		$(".overlay").hide();
	});
	$(".tc-close").click(function() {
		
		$(".tanceng-a").hide();
	});
	function showtc(tancn){
		$(".tanceng-a").show();
		$(".tanceng-a p").html(tancn);
	};
	

});
window.onload=function(){
	var odiv=$('.foot');	
    var h=$('.foot').offset().top-$(window).height();
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;				
		if(scrollTop>=h){
			$('.down').css('display','none');					 
		}else{
			$('.down').css('display','block');
		}
	}
}
