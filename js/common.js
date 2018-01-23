/*wlo:Cflower*/
var dialog; if(!dialog) dialog={};
dialog={
	//关闭
	closeDiv:function(){
		$("#alertInfo").stop(true,true).animate({
			"top":"-100%",
			"opacity":"0"
		},"fast",function(){
			$("#maskLayer,#alertInfo").remove().hide();
		});
		
				$(".tsInfo").stop(true,true).animate({
				"top":"-100%",
				"opacity":"0"
			},"fast",function(){
				$("#mask,.tsInfo").remove().hide();
			});
	},
	//
	maskLayer:function(){
		$("#maskLayer,#alertInfo").remove();
		var maskLayer="<div id='maskLayer'></div>";
		var alertInfo="<div id='alertInfo'><span class='close'>关闭</span></div>";
		$("body").append(maskLayer,alertInfo);
		$("#maskLayer").show();
	},
	//显示提示信息框
	showInfo:function(alertHtml){
		dialog.maskLayer();
		var _winH=$(window).height();             //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
		var _scrollTop=$(document).scrollTop();   //　　　　　　　　　　　├→
		$("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
		var _thisDomWidth=$("#alertInfo").outerWidth();
		var _thisDomHeight=$("#alertInfo").outerHeight();
		var topD=parseInt(_scrollTop+(_winH-_thisDomHeight)/2);
		var mL=parseInt(_thisDomWidth/2);
		if(_thisDomHeight>=_winH){
			topD=_scrollTop;
			if(_scrollTop+_thisDomHeight>=$(document).height()){
				topD=$(document).height()-_thisDomHeight;
			}
		};
		$("#alertInfo").css({
			"margin-left":"-"+mL+"px"
		}).stop(true,true).animate({
			"top":topD+"px",
			"margin-left":"-"+mL+"px",
			"opacity":"1"
		},"fast");
		//console.log("点击弹层时窗口的高度："+_winH);
	},
	//改变窗口大小时改变弹出层的位置
	alertInfoPo:function(){
		var _winHResize=$(window).height();
		var _scrollTopResize=$(document).scrollTop();
		var _thisDomWidthResize=$("#alertInfo").outerWidth();
		var _thisDomHeightResize=$("#alertInfo").outerHeight();
		var topResize=parseInt(_scrollTopResize+(_winHResize-_thisDomHeightResize)/2);
		if(_thisDomHeightResize>=_winHResize){
			topResize=_scrollTopResize;
			if(_scrollTopResize+_thisDomHeightResize>=$(document).height()){
				topResize=$(document).height()-_thisDomHeightResize;
			}
		};
		if(topResize>=$("body").height()-_thisDomHeightResize){
			_scrollTopResize=$("body").height()-_thisDomHeightResize;
			topResize=_scrollTopResize-(_winHResize-_thisDomHeightResize)/2;
		}
		$("html,body").stop(true,true).css({scrollTop:_scrollTopResize});
		$("#alertInfo").stop(true,true).css({
			"top":topResize+"px",
			"margin-left":"-"+(_thisDomWidthResize/2)+"px"
		})
		//console.log("改变大小时窗口的高度："+_winHResize);
		//$("#maskLayer").height($("body").height());
	},
	//提示弹层
	alertMsg:function(msgTitle,msg,func,flag){//msgTitle：提示标题,msg：提示内容,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”取消“,“取消”时的按钮动作是关闭窗口），”s“为单按钮（只有”确定“）
		var btn="<div class='infoBtn w100btn'><a class='click-btn' href='javascript:"+func+";'>确 定</a></div>";
		if(flag=="d") btn="<div class='infoBtn dd'><a class='click-btn' href='javascript:"+func+";'>确 定</a><a class='click-btn c' href='javascript:dialog.closeDiv();'>取 消</a></div>";
		var html="<div class='tsInfo'><span class='closea'></span>"
			+" <h4><span>"+msgTitle+"</span></h4>"
			+" <div class='p'>"+msg+"</div>"
			+btn+"</div>";
			
		var mask="<div id='mask'></div>";
		
		$("body").append(mask,html);	
			$('.closea').click(function(){
				$(".tsInfo").stop(true,true).animate({
				"top":"-100%",
				"opacity":"0"
			},"fast",function(){
				$("#mask,.tsInfo").remove().hide();
			});
		});	
		
	},
		//绑定成功弹层
	alertMsgsuc:function(msgTitle,msg,func){//msgTitle：提示标题,msg：提示内容,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”取消“,“取消”时的按钮动作是关闭窗口），”s“为单按钮（只有”确定“）
		var btn="<div class='infoBtn w100btn'><a class='click-btn' href='javascript:"+func+";'>确 定</a></div>";
		var html="<div class='tsInfo tsInfo1'><span class='closea'></span>"
			+"<img class='titimg' src='images/suc.png'> <h4><span>"+msgTitle+"</span></h4><div class='p'>"+msg+"</div>"
			+"<img class='alimg' src='images/shili.png'>"
			+btn+"</div>";
			
		var mask="<div id='mask'></div>";
		
		$("body").append(mask,html);	
			$('.closea').click(function(){
				$(".tsInfo").stop(true,true).animate({
				"top":"-100%",
				"opacity":"0"
			},"fast",function(){
				$("#mask,.tsInfo").remove().hide();
			});
		});	
		
	},
			//绑定弹层
	alertbind:function(func){//msgTitle：提示标题,msg：提示内容,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”取消“,“取消”时的按钮动作是关闭窗口），”s“为单按钮（只有”确定“）
		var btn='<a  class="alertbtn" href="javascript:'+func+';">确 定</a>';
		var html='<div class="tsInfo"><span class="closea"></span>'
			+'<div class="alertbind">'
			+'<h5>绑定账号</h5>'
			+'<div class="bindBox">'
				+'<input type="text" name="" id="name" value="" style="background-color:#333 ;" placeholder="请输入坦克世界账号"/>'
				+'<input type="password" name="" id="password" value="" style="background-color:#333 ;" placeholder="请输入密码"/>'
				+'<select placeholder="请输入密码">'
					+'<option>请选择大区</option>'
					+'<option>联通北方</option>'
					+'<option>电信南方</option>'
				+'</select>'
			+'</div>'
			+btn+'</div></div>';
			
		var mask="<div id='mask'></div>";
		
		$("body").append(mask,html);	
			$('.closea').click(function(){
				$(".tsInfo").stop(true,true).animate({
				"top":"-100%",
				"opacity":"0"
			},"fast",function(){
				$("#mask,.tsInfo").remove().hide();
			});
		});	
		
	},
			//提示弹层
	alertzone:function(func,name,zone){//msgTitle：提示标题,msg：提示内容,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”取消“,“取消”时的按钮动作是关闭窗口），”s“为单按钮（只有”确定“）
		var btn='<a  class="alertbtn" href="javascript:'+func+';">确 定</a>';
		var html='<div class="tsInfo"><span class="closea"></span>'
			+'<div class="alertbind">'
			+'<h5>绑定账号</h5>'
			+'<div class="bindBox">'
				+'<input type="text" name="" id="name" value="账号:'+name+'" style="background-color:#333 ;"/>'
				+'<input type="text" name="" id="password" value="大区:'+zone+'" style="background-color:#333 ;" />'				
			+'</div>'
			+btn+'</div></div>';
			
		var mask="<div id='mask'></div>";
		
		$("body").append(mask,html);	
			$('.closea').click(function(){
				$(".tsInfo").stop(true,true).animate({
				"top":"-100%",
				"opacity":"0"
			},"fast",function(){
				$("#mask,.tsInfo").remove().hide();
			});
		});
		
	},
	//登录弹层
	alertLog:function(logTitle,func){//func：为“登录”按钮动作处理函数
		dialog.showInfo("<div class='logInfo'>"
			+" <h4><span>"+logTitle+"</span></h4>"
			+" <ul class='logUl clearfloat'>"
			+"  <li><label for='zH'>账　号：</label><input type='text' id='zH' type='text' validate='true' msg='请输入用户名'></li>"
			+"  <li><label for='mM'>密　码：</label><input type='password' name='mM' id='mM' validate='true'  msg='请输入密码'></li>"			
			 +"  <li><label for=''>大　区：</label><div class='selBox'>" +
	        "   <i>请选择大区</i><em><b></b></em>" +
	        "   <div class='selC'>" +
	        "    <a href='javascript:;' value=''>请选择大区</a>" +
	        "    <a href='javascript:;' value='1500200'>电信南方区</a>" +
	        "    <a href='javascript:;' value='1500100'>联通北方区</a>" +
	        "   </div><input type='hidden' class='sel-ed' id='sel-ed' value=''>" +
	        "  </div></li>" 
			+"  <li class='yzM'><label for='yzM'>验证码：</label><input type='text' class='vcode' validate='true' name='yzM' id='yzM' maxlength='4' msg='请输入验证码'><img id='verifyImg' class='verifyImg'  onclick='changeImg()'></li>"
			+"  <li class='tsli' id='loginTips'></li>"
			+" </ul>"
			+" <div class='infoBtn'><a class='click-btn' href='javascript:;' onclick='login(1);'>登 录</a><a target='_blank' class='click-btn colorzc' href='http://wows.kongzhong.com/quickreg/zhuce.html'>注 册</a></div>"
			+"</div>");
		$.divselect(".selBox",".sel-ed");
		changeImg();
		$('.close').click(function(){
			dialog.closeDiv();
		});
	},
	//未登录
	alertLogTwo:function(func,func1){
		dialog.showInfo("<div class='tsInfo'>"
			+"<div class='login'>您还未登录,请先 <a href='javascript:"+func+";'>登录</a></div>"
			+"<div class='infoBtn'><a class='click-btn' href='javascript:"+func1+";'>确 定</a></div>"
			+"</div>");
	},
	//个人动态
	alertPerDt:function(msg){
		dialog.showInfo(msg)
		$(".etable").mCustomScrollbar();
	},
	//划拨密码
	alertPass:function(msg,func){
		dialog.showInfo("<div class='passInfo'>"
			+"<div class='close'></div>"
			+"<p>"+msg+"</p>"
			+"<div class='pas_box'><input type='password' id='hdpwd' validate='true' placeholder='密码（6-16位，区分大小写'' msg='请输入密码'/></div>"
			+" <div class='loginTips'><font></font></div>"
			+" <div class='pasBtn'>"
			+"<a class='' href='javascript:"+func+";'>确定</a>"
			+"</div>"
			+"</div>");
	},
	
	//获得奖励
	alertPzr:function(tit,msg){
		dialog.showInfo(
			'<div class="alertprze">'+
			'<h5>'+tit+'</h5>'+
			'<div>'+
				'<p>'+msg+'</p>'+
			'</div></div>'
		)
		$('.close').click(function(){
			dialog.closeDiv();
		});
	},
	

	//加速成功
	alertJia:function(msg){
		dialog.showInfo(
			'<div class="alertjiasu">'+
			
			'<div>'+
				'<p>'+msg+'</p>'+
			'</div></div>'
		)
		$('.close').click(function(){
			dialog.closeDiv();
		});
	},
	
//选择大区
       alertZone:function(){		
		var html='<div class="sel-zone"><span class="closea"></span>'+
			'<h5>选择大区</h5>'+
			'<div class="sel-zonebox">'+
				'<select>'+
				'	<option value="">请选择大区</option>'+
				'	<option value="">联通北方区</option>'+
				'	<option value="">电信南方区</option>'+
				'</select>'+
			'</div></div>';
				
//		var mask="<div id='mask'></div>";
//		
//		$("body").append(mask,html);	
//			$('.closea').click(function(){
//				$(".sel-zone").stop(true,true).animate({
//				"top":"-100%",
//				"opacity":"0"
//			},"fast",function(){
//				$("#mask,.sel-zone").remove().hide();
//			});
//		});	
	
		
	},




	
	//二次确认
	alertConfirm:function(msg,func,flag){
		//msgTitle：提示标题,msg：提示内容,func：为“确定”按钮动作处理函数,flag：双按钮标识，”d“为双按钮（”确定“和”点券充值“,“点券充值”跳转到新页面），”s“为单按钮（只有”确定“）
		var btn="<div class='pasBtn'><a class='' href='javascript:"+func+";'>确 定</a></div>";
		if(flag=="d") btn="<div class='pasBtn'><a class='confir' href='javascript:"+func+";'>确 定</a><a href='https://passport.kongzhong.com/billing/pay/payment_bank'  target='_blank' class='recharge'>点券充值</a></div>";
		dialog.showInfo("<div class='passInfo'>"
			+"<div class='close'></div>"
			+"<p>"+msg+"</p>"
			+btn
			+"</div>");
	},
		//关注
	alertAttention:function(){
		dialog.showInfo("<div class='userInfo'>"
				+"<a href='javascript:;' class='dialog_close'></a>"
				+" <div class='codeBox' >"
				+"<p>长按识别二维码<br />即可报名参加活动</p>"
				+"<p class='codeImg'><img src='images/code.png' /></p>"
				+" </div>"
				+"</div>")
	},
};

var httpurl='';
function changeImg() {
   // $("#verifyImg").attr("src", httpurl + "/verifyCode?" + Math.random());
    $("#verifyImg").attr("src", 'images/yzm.png');
};



jQuery.divselect = function(divselectid,inputselectid){
	var inputselect = $(inputselectid);
	$(divselectid+" i").click(function(){
		 var selC=$(this).siblings(".selC");
		 if(selC.css("display")=="none"){
			selC.show();
		 }else{
			selC.hide();  
		 }
	});
	$(divselectid+" .selC a").click(function(){
		 var ZoneId=$(this).attr("value");
		 var ZoneTex=$(this).html();
		 $(this).addClass("selectedV").siblings().removeClass("selectedV");
		 $(this).parent().siblings(".sel-ed").val(ZoneId);
		 $(this).parent().siblings("i").html(ZoneTex);
		 $(this).parent().hide();
	});
};