$(document).ready(function(){
	$('.news-tit li').click(function(){
		$('.news-tit li').removeClass('act');
		$('.news-box ul').hide();
		var nesl=$(this).index();
		$('.news-box ul').eq(nesl).show();
		$('.news-tit li').eq(nesl).addClass('act');
	});
	$('.reward li').mouseover(function(){
	
		var liinex=$(this).index();

		$('.wenzi').eq(liinex).css('margin-top','-165px');
	});
	$('.reward li').mouseout(function(){		
		$('.wenzi').css('margin-top','0px');
	});
	

	$('.rules p').click(function(){
		$('.tanceng').css('display','block');
	});
	$('.tc-close').click(function(){
		$('.tanceng').css('display','none');
		$('.tanceng-a').css('display','none');
	});
    

	
});