var tips ={
	common:{
		server_error:"服务器忙,校验失败,请稍候再试",
		safe_error:"访问太频繁，请稍候再试"
	},
	account:{
		empty:"请输入邮箱或者手机号",
		error:"校验失败，请稍后再试",
		phone_error:"手机号格式错误",
		email_error:"邮箱格式错误",
		phone_reg_error:"手机号已注册",
		email_reg_error:"邮箱已注册",
		email_advise:"操作太频繁，请稍候再试"
	},
	password:{
		empty:"密码不能为空",
		pwd_error:"请填写6-16位任意字符，区分大小写",
		pwd_blank:"密码首尾不能有空格"
	},
	safetip:{
		phone:"为了您的账号安全，请填写实名认证信息。手机号不可用时，可通过实名资料更改手机号",
		email:"为了您的账号安全，请填写实名认证信息。邮箱不可用时，可通过实名资料更改安全邮箱"
	},
	realname:{
		empty:"请填写您的真实姓名",
		username_error:"真实姓名格式错误",
		username_blank:"姓名首尾不能有空格"
	},
	idcard:{
		empty:"请填写有效的身份证号",
		persionid_error:"身份证号码格式错误",
		persionid_reg_error:"该身份证号码不可用"
	},
	gamerole:{
		empty:"游戏昵称不能为空",
		nickname_error:"游戏昵称格式错误",
		nickname_reg_error:"该游戏昵称已被注册",
		nickname_reg_limit:"该游戏昵称不可用"
	},
	vcode:{
		empty:"请填写验证码",
		vode_error:"验证码错误"
	},
	smscode:{
		empty:"短信验证码不能为空",
		smscode_error:"短信验证码错误",
		smscode_send_error:"短信验证码发送失败",
		smscode_send_limit:"操作太频繁，请稍候再试",
		smscode_send_black:"手机号码不可用"
	}
};

var showError = function(inputobject,msg){
	$(inputobject).attr('class','error input');
	$(inputobject).val(msg);
};

var getQueryString = function(name) {  
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");   
	var r = window.location.search.substr(1).match(reg);   
	if (r != null) return unescape(r[2]); 
	return null;
};

var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} ;
var checkIDCard = function(idcard){
	var _idcard =idcard;
	if(!/^\d{17}(\d|x)$/i.test(_idcard)) return false; 
	_idcard=_idcard.replace(/x$/i,"a"); 
	if(aCity[parseInt(_idcard.substr(0,2))]==null) return false; 
	sBirthday=_idcard.substr(6,4)+"-"+Number(_idcard.substr(10,2))+"-"+Number(_idcard.substr(12,2)); 
	var d=new Date(sBirthday.replace(/-/g,"/")) ;
	if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return false;
	return true; 
};

