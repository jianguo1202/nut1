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
	
	var swit=false;
	var m_index=10;
	var win_height=$(window).height(),
	win_width=$(window).width();
	$('.main').css({'width':win_width+'px','height':win_height+'px'});
	var oV=document.getElementById('myVideo');
	function rnd(n,m){
		//把n-m之间的随机数作为rnd的返回值返回给外边;
		return parseInt(Math.random()*(m-n)+n);
	}
	var barnum=0;

	var timer=setInterval(function(){
//		var TimeRanges=oV.buffered;//获取时间对象
//		var timeBuffered =TimeRanges.end(TimeRanges.length - 1);
//		var bufferPercent = (timeBuffered / oV.duration)*100; //获取缓冲百分比返回数字
//	    var strbuff=bufferPercent.toString();//转为字符串
//	    var arrnum=strbuff.split('.');//切割
//	    var arrnum1=arrnum[0];//拿到数组
//	    $('.bar').html(arrnum1+'%...');
//		console.log(strbuff);
		
		barnum=rnd(0,5)+barnum;
		if(barnum<100){
			$('.bar').html(barnum+'%...');
		}
		
		if(barnum>=100){//完成百分之九十九	
			$('.bar').html('100%');
			$('.main').hide();			
			window.clearTimeout(timer);
			oV.play();			
		}
	},30);
	oV.addEventListener('ended',function(){
		$('#myVideo').hide();
		m_index++;
		$('.main').hide();
		$('.main-2').show().css({
			'z-index':m_index
		})

		///此时缓存其他视频
	});
			//打电话质问
		$('#main-btn1').on('click',function(){
			m_index++;
			$('.videos').hide()
			$('#myVideo1').show().css({
				'z-index':m_index
			}).get(0).play();
		
		});
		//当做没看到
		$('#main-btn2').on('click',function(){
			m_index++;
			$('.videos').hide()
			$('#myVideo2').show().css({
				'z-index':m_index
			}).get(0).play();
		
		});
		//跟上去一探究竟
		$('#main-btn3').on('click',function(){
			m_index++;
			$('.videos').hide()
			$('#myVideo3').show().css({
				'z-index':m_index
			}).get(0).play();
		
		})
	function resbtn(){
		$('.main-btn-res').on('click',function(){
			$('.videos').hide();
			$('.main').hide();
			m_index++;
			$('.main-2').show().css({
				'z-index':m_index
			})
		});
	}
	document.getElementById('myVideo1').addEventListener('ended',function(){
		m_index++;
		$('.videos').hide();
		$('.main').hide();
		$('.main-3').show().css({
			'z-index':m_index
		});
		resbtn();
		
	});
	document.getElementById('myVideo2').addEventListener('ended',function(){
		m_index++;
		$('.videos').hide();
		$('.main').hide();
		$('.main-4').show().css({
			'z-index':m_index
		});
		
		
		resbtn();
	});
	document.getElementById('myVideo3').addEventListener('ended',function(){
		m_index++;
		$('.videos').hide();
		$('.main').hide();
		$('.main-5').show().css({
			'z-index':m_index
		});
		$('.main-5 .fr').on('click',function(){
			m_index++;
			$('.main-6').show().css({
				'z-index':m_index
			});
		});
		resbtn();
	});


});

window.onresize = function(){
		var win_height=$(window).height(),
	win_width=$(window).width();
	$('.main').css({'width':win_width+'px','height':win_height+'px'});
	$('.videos').css({'width':win_width+'px'});
}






























//参数为标题，内容，确定按钮执行函数，默认
//dialog.alertMsg('领取成功','恭喜您领取成功','dialog.closeDiv()','s');

//参数为标题，内容，确定按钮执行函数
//dialog.alertMsgsuc('领取成功','恭喜您领取成功','dialog.closeDiv()');

//参数为确定按钮执行函数
//dialog.alertbind('dialog.closeDiv()');

//参数为确定按钮执行函数，账号，大区
//dialog.alertzone('dialog.closeDiv()','战三','南方电信');
 