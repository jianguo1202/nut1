var httpurl="http://hd.wot.kongzhong.com";
//var httpurl = "http://test.kongzhong.com:8080/hdCore";//测试用
$(function(){
	var ispc = IsPC();
	if(ispc){
		login(2);
	}else{
		window.location.href="http://arena.kongzhong.com/zt/wgl2017/m/";
	}
});

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "UCBrowser", "Windows Phone",
                "iPad", "iPod","MQQBrowser"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
var giftLogs = new Array();
var activity_hd = [];
var amount = 0;
var gift_type = 0;
var ship_level = 0;
var gift_id = 0;
var shipname = "";
var typesed = 0;
var nickname = '';
var canprize = true;
function login(type) {
	if(type==1&&!validate()){
		return;
	}
	var login = $("#login_name").val();
	var password = hex_md5($("#password").val());
	var zoneId = $("#zonese").val();
	var inputVerifyCode = $("#verify1").val();
	$.ajax({
		url : httpurl + "/wotWglMatch",
		type : "get",
		dataType : "jsonp",
		data : {
			login:login,
			password:password,
			inputVerifyCode:inputVerifyCode,
			zoneId:zoneId,
			type:type,
			op:"login",
			typesed:typesed,
			channel:1
		},
		jsonp : "jsonpcallback",
		success : function(json) {
			if(json.success){
				$(".log_pop").hide();
				$("#fade_div").hide();
				$("#login_msg").text("");
				$(".logo-box-dl").hide();
				$(".logo-box-xx").show();
				//登录成功
				$("#login_end").show();
				$("#nick_name").text(json.nickname);
				$("#zone").text(json.zoneid);
				if(json.qdSuccess==0 && json.typesed==3){
					showtanc("恭喜您点赞中国队成功！");
				}
				
				nickname = json.nickname; 
				$("#ivote").attr('src',"http://comment.kongzhong.com/commentarena/wgl2017/");
			}
			else{
				if(json.code==0){
				}else if(json.code==1){
					$("#login_msg").text("登录异常");
				}else if(json.code==2){
					$("#login_msg").text("验证码错误");
				}else if(json.code==3){
					$("#login_msg").text("用户名或者密码错误");
				}
				changeImg();
			}
		}
	});
};
//登出
function logout(){
    $.ajax({
        url : httpurl + "/wotWglMatch",
        type : "get",
        dataType : "jsonp",
        data : {
            op : "logout"
        },
        jsonp : "jsonpcallback",
        success : function(json) {
            $("#login_begin").show();
            $("#login_end").hide();
            clearInfo();
            location.reload();
        }
    });
};

//点赞
function getgiftone(aaa){
	if(!canprize){
		alert("正在点赞中~~~"); 
		return;
	}
	canprize = false;
	$("#fade_div").show();  //遮罩层显示
	if(!checkLogin()){
		canprize = true;
		showPopLogin1();
		$("#fade_div").hide(); //遮罩层隐藏
		return false;
	}
	$.ajax({
		url : httpurl + "/wotWglMatch",
		type : "get",
		dataType : "jsonp",
		data : {
			op:"getmytask",
			channel:aaa
		},
		jsonp : "jsonpcallback",
		success : function(json) {
			if(json.success){
				showtanc(json.code);
				$("#fade_div").hide();  //遮罩层隐藏
				canprize = true;
			}else{
				if(json.code==1){
					showPopLogin();
				}else if(json.code==2){
					alert("请稍后重试");   
				}else if(json.code==3){
					alert("抽奖次数不足");   
				}else if(json.code==4){
					alert("非网吧ip");   
				}
				$("#fade_div").hide();  //遮罩层隐藏
				canprize = true;
			}
		}
	});
}
function clearInfo(){
    $("#nick_name").html("");
    $("#zone").html("");
};
//表单验证
function validate() {
	if($("#login_name").val().replace(/^\s*/, "").replace(/\s*$/, "") == "") {
		$("#login_msg").text("请输入账号");
		return false;
	}
	if($("#password").val().replace(/^\s*/, "").replace(/\s*$/, "") == "") {
		$("#login_msg").text("请输入密码");
		return false;
	}else{
		//$("#password").val(hex_md5($("#password").val()));
	}
	if($("#zonese").val()== "") {
		$("#login_msg").text("请选择大区");
		return false;
	}
	if($("#verify1").val().replace(/^\s*/, "").replace(/\s*$/, "") == "") {
		$("#login_msg").text("请输入验证码");
		return false;
	}
	return true;
};

function changeImg() {
    $(".verify").attr("src", httpurl + "/verifyCode?" + Math.random());
};
function showPopLogin(){
	typesed = 0;
	$(".overlay").show();
    $(".log_pop_old").fadeIn();
};
function showPopLogin1(){
	typesed = 3;
	$(".overlay").show();
    $(".log_pop_old").fadeIn();
};
//function showPopLoginNew(){
//  $(".overlay").show();
//  $(".log_pop_old").addClass("new");
//  $(".log_pop_old").fadeIn();
//}
/**
 * 检查用户是否登陆
 */
function checkLogin(){
    var nk=$.trim($("#nick_name").text());
    if(nk.length>1){
        return true;
    }else{
        return false;
    }
}

function showtanc(tancn){
	$('.tanceng-a').css('display','block');
	$('.tanceng-a p').html(tancn);
};