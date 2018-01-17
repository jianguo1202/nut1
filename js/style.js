;
$(document).ready(function() {
	
	$('.side ul li').hover(function(){
		$(this).find('div').fadeIn();
	
		if($(this).index()==1){
			$(this).find('p').html(' ');
			$(this).find('img').css('top','0px');
		}
	},function(){
		$(this).find('div').fadeOut();
		if($(this).index()==1){
			$(this).find('p').html('关注微信');
			$(this).find('img').css('top','300px')
		}
	})
	
	



//视频播放
	function showV(url) {
		var video = '<div class="videobox"><embed src='+url+' allowFullScreen="true" quality="high" width="917" height="516" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed></div>';
		//alert('a')
		//$("#video").html(video);
		dialog.showInfo(video);
		return false;
	}
	$('#mainvideo').on('click', function() {
		showV($('#mainvideo').attr('data-url'));
	})


    $('.v-box-ul .payvideo').on('click',function(){
    	
    	var vurl=$(this).parent().attr('data-url');
    	//console.log(vurl);
    	var video = "<div class='v-box-show'><embed class='otoplay' width='801' height='450' wmode='opaque' allowfullscreen='true' allowscriptaccess='always' type='application/x-shockwave-flash' src="+vurl+"></div>";
    	$(this).parent().append(video);
    })

	$('.colunmn .lingqu').on('click', function() {
		//alert(12);
		$('.colunmn .li4').fadeIn();
		$('.li2 .title1').hide();
		$('.li2 .title2').show();
		$('.li2 span').on('click',function(){
			$('.colunmn .li4').fadeOut();
			$('.li2 .title1').show();
			$('.li2 .title2').hide();
		});
		

	});
//坦克展示 

//图片懒加载
	function imgLoad() {

		$('.tank-xq .on').each(function() {
			var attrs = $(this).find('img').attr('data-src');
			//console.log(attrs);
			$(this).find('img').attr('src',attrs);
		});
	}

	
	var vNum=0;
	function banner(vNum){
		$('.tank').css({'background':'url(images/bg'+vNum+'-1.jpg) no-repeat', 'background-position':'center' });	
		$('.v-box-ul').animate({'left':'-'+vNum*801+'px'},'linear');
		$('.tank-nav li').removeClass('on').eq(vNum).addClass('on');
		$('.v-box-ul').find('.v-box-show').remove();
		return vNum;
	}
	$('.tank-nav li').on('mouseover',function(){
	
			vNum=$(this).index();		
			banner(vNum)

	
		
	});
	$('.v-right').on('click',function(){		
		vNum++;
		if(vNum>$('.tank-nav li').length-1){
			vNum=0;
		};
		banner(vNum);
	});
	$('.v-left').on('click',function(){
		vNum--;
		if(vNum<0){
			vNum=$('.tank-nav li').length-1;
		};
		banner(vNum);
	});
});
		
	