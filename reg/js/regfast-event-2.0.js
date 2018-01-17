;(function($,window){
                    var  global ={
          httpServer :'https://passport.kongzhong.com',
          account:'account',
          password:'password',
          realname:'realname',
          idcard:'idcard',
          gamerole:'gamerole',
          vcode:'vcode',
          vimgbtn:'vimgbtn',
          smscode:'smscode',
          smsbtn:"smsbtn",
          regSubmitbtn:'regSubmitbtn'
     };
     var unsupportplaceholder =$.browser.msie&&($.browser.version==8.0||$.browser.version==7.0||$.browser.version==9.0);
                  var settings = {};
                  var regType,checkresult,formdata,ajaxState=0;
     kz_reg = function(options){
          return new kz_reg.init(options);
     };
     kz_reg.init = function(options){
          $.extend(true, settings, global, options ||{});
          checkresult = {};
          formdata ={};
          formdata["gameid"]=settings.gameid;
          formdata["regParm"]=settings.regParm;
          formdata["sourceid"]=settings.sourceid;
          formdata["returnUrl"]=settings.returnUrl;
          formdata["redirect"]=settings.redirect;
          formdata["emailUrl"]=settings.emailUrl;
          formdata["auto"]=settings.auto;
          $("#"+settings.account).on("blur",kz_reg.checkaccount);
          $("#"+settings.password).on("blur",kz_reg.checkpassword);
          $("#"+settings.realname).on("blur",kz_reg.checkusername);
          $("#"+settings.idcard).on("blur",kz_reg.checkidcard);
          $("#"+settings.gamerole).on("blur",kz_reg.checknickname);
          $("#"+settings.vcode).on("blur",kz_reg.checkvcode);
          $("#"+settings.smscode).on("blur",kz_reg.checksmscode);
          $("#"+settings.vimgbtn).on("click",kz_reg.createvcode);
          $("#"+settings.smsbtn).on("click",kz_reg.sendsms);
          $("#"+settings.regSubmitbtn).off("click").on("click",step1);
           $('input').each(function(){
          	if(unsupportplaceholder){
          		this.value=$(this).attr('placeholder');
          	 }else{
          	 	this.value="";
          	 }
          	checkresult[this.id] ={};
          	checkresult[this.id].check = false;
          	checkresult[this.id].ajaxcheck = {};
          });
            var pwdText =$("<input type='text' class='input' name='txt_"+$("#"+settings.password).attr("name")+"'  autocomplete='new-password' style='display:none'>");
          $("#"+settings.password).before(pwdText);
          pwdText.val($("#"+settings.password).attr('placeholder'));
          if(unsupportplaceholder){
          	$("#"+settings.password).hide();
          	pwdText.show();
          }
          
          $('input').focus(function () {
            if($(this).attr('class')==='error input'){
            	if(!kz_reg.isempty(this.id)){
	            	 if(formdata[this.id]===$(this).attr('placeholder')){
	            	 	formdata[this.id]="";
	            	 }
	                $(this).val(checkresult[this.id].value);
            	}
            }else{
            	if($(this).val()===$(this).attr('placeholder')){
            		$(this).val("");
            	}
            }
            if(this.name==='txt_'+settings.password){
                    $(this).hide();
                    var pwdtxt =$(this).next("input");
                    pwdtxt.val("");
                    pwdtxt.show();
                    pwdtxt.attr('class','focus input');
                    pwdtxt.select();
                }else{
                    $(this).attr('class','focus input');
                    $(this).select();
                }
        });
     };

     kz_reg.fn = kz_reg.prototype = kz_reg.init.prototype;
     kz_reg.getdefaultvalue = function(inputname){
     	if(formdata[inputname]===$("#"+inputname).attr("placeholder")){
     		return "";
     	}
     	return formdata[inputname];
     }
     kz_reg.checkaccount = function(){
          var _this = this;
          if(kz_reg.isempty(_this.value)){
               showErrorTips(_this,tips.account.empty);
               return true;
          };
          if(_this.value.indexOf("@")>-1){
               if((/^[a-zA-Z0-9_.-]{2,18}\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*(\.[A-Za-z]{2,5})+$/i).test(_this.value)){
                    regType ="email";
               }else{
                   showErrorTips(_this,tips.account.email_error);
                   return false;
               }
          }else if((/^\d+$/i).test(_this.value)){
                if((/^1[34578][0-9]{9}$/i).test(_this.value)){
                    regType ="phone";
               }else{
                    showErrorTips(_this,tips.account.phone_error);
                   return false;
               }
          }else{
          	_this.value="";
               showErrorTips(_this,$(_this).attr("placeholder"));
               return false;
          };
          if(checkresult[_this.id].check===true&&checkresult[_this.id].ajaxcheck[_this.value]&&formdata["regtype"]===regType){
          	return true;
          }
          formdata[settings.account]=_this.value;
          $.ajaxSetup({async: false});//设置成同步
          if(ajaxState===0){
          	checkresult[_this.id].ajaxcheck[_this.value]=false;
          	checkresult[_this.id].check= false;
               $.ajax({
                   url : settings.httpServer+"/ajax/regcheckaccount/"+formdata.gameid,
                   data:{
                         account:formdata.account
                   },
                   dataType:"jsonp",
                   beforeSend:function(xhr){
                         ajaxState =1;
                   },
                   success:function(data) {
                         if(data.state===1){
                              if(regType==="email"){
                                   $("#nametips").text(tips.email);
                                   if(formdata["regtype"]==="phone"){
                                   	hideinput($(".yzimgArea"));
                                   	hideinput($(".messageArea"));
                                   	$("#"+settings.regSubmitbtn).off("click").on("click",step1);
                                   }
                              }else{
                                   $("#nametips").text(tips.phone);
                                   showinput($(".yzimgArea"));
                                   showinput($(".messageArea"));
                                   kz_reg.createvcode();
                              }
                              checkresult[_this.id].check= true;
                              checkresult[_this.id].value = formdata.account;
                              checkresult[_this.id].ajaxcheck[formdata.account]=true;
                              formdata["regtype"]=regType;
                              return true;
                         }else if(data.state===-4){
                              showErrorTips(_this,tips.common.safe_error);
                              return false;
                         }else{
                               if(regType==="email"){
                                   if(data.state===-1){
                                        showErrorTips(_this,tips.account.email_reg_error);
                                        return false;
                                   }else if(data.state===-2){
                                        showErrorTips(_this,tips.account.email_advise);
                                        return false;
                                   }
                               }else{
                                   if(data.state===-1){
                                        showErrorTips(_this,tips.account.phone_reg_error);
                                        return false;
                                   }
                               }
                              showErrorTips(_this,tips.account.error);
                              return false;
                         }
                   },
                   error:function(xhr){
                    showErrorTips(_this,tips.common.server_error);
                    return false;
                   },
                   complete:function(){
                         ajaxState=0;
                   }
               });
          }
         $.ajaxSetup({async: true});
     };
     kz_reg.checkpassword = function(){
           var _this = this;
           if(_this.value===$(_this).attr('placeholder')){
           	_this.value ="";
           }
          if(kz_reg.isempty(_this.value)){
               showErrorTips(_this,tips.password.empty);
               return false;
          };
          if(_this.value.startWith(" ") || _this.value.endWith(" ")){
               showErrorTips(_this,tips.password.pwd_blank);
               return false;
          };
          if(_this.value.length<6||_this.value.length>16){
               showErrorTips(_this,tips.password.pwd_error);
               return false;
          };
          formdata[settings.password]=_this.value;
          checkresult[_this.id].check= true;
          checkresult[_this.id].value = _this.value;
     };
     kz_reg.checkusername = function(){
           var _this = this;
          if(kz_reg.isempty(_this.value)){
               showErrorTips(_this,tips.realname.empty);
               return false;
          };
          if(_this.value.startWith(" ") || _this.value.endWith(" ")){
               showErrorTips(_this,tips.realname.username_blank);
               return false;
          };
          if(_this.value.length<2||_this.value.length>10){
               showErrorTips(_this,tips.realname.username_error);
               return false;
          };
          if(!(/^[\u0391-\uFFE5]+$/.test(_this.value))){
               showErrorTips(_this,tips.realname.username_error);
               return false;
          };
          formdata[settings.realname]=_this.value;
          checkresult[_this.id].check= true;
          checkresult[_this.id].value = _this.value;
     };
     kz_reg.checkidcard = function (){
           var _this = this;
          if(kz_reg.isempty(_this.value)){
          	_this.value="";
               showErrorTips(_this,tips.idcard.empty);
               return false;
          };
          if(!/^[0-9x]+$/i.test($.trim(_this.value))){
          	_this.value="";
          	if(checkresult[_this.id].msg){
          		showErrorTips(_this,checkresult[_this.id].msg);
          	}else{
          		showErrorTips(_this,tips.idcard.empty);
          	}
          	return false;
          }
          if(!checkIDCard(_this.value)){
                showErrorTips(_this,tips.idcard.persionid_error);
               return false;
          };
         if(checkresult[_this.id].check===true&&checkresult[_this.id].ajaxcheck[_this.value]){
          	return true;
          }

           formdata[settings.idcard]=_this.value;
          $.ajaxSetup({async: false});//设置成同步
          if(ajaxState===0){
          	checkresult[_this.id].ajaxcheck[_this.value]=false;
          	checkresult[_this.id].check= false;
               $.ajax({
                   url : settings.httpServer+"/ajax/checkpersionid/"+formdata.gameid,
                   data:{
                         idcard:formdata.idcard
                   },
                   dataType:"jsonp",
                   beforeSend:function(xhr){
                         ajaxState =1;
                   },
                   success:function(data) {
                         if(data.state===1){
                              checkresult[_this.id].ajaxcheck[_this.value]=true;
          		            checkresult[_this.id].check= true;
          		            checkresult[_this.id].value = formdata.idcard;
          		            return true;
                         }else if(data.state===-4){
                              showErrorTips(_this,tips.common.safe_error);
                              return false;
                         }else{
                              showErrorTips(_this,tips.idcard.persionid_reg_error);
                              return false;
                         }
                   },
                   error:function(xhr){
                    showErrorTips(_this,tips.common.server_error);
                    return false;
                   },
                   complete:function(){
                         ajaxState=0;
                   }
               });
          }
         $.ajaxSetup({async: true});
     };
     kz_reg.checknickname = function(){
           var _this = this;
          if(kz_reg.isempty(_this.value)){
               showErrorTips(_this,tips.gamerole.empty);
               return false;
          };
          if(_this.value.length<4||_this.value.length>14){
               showErrorTips(_this,tips.gamerole.nickname_error);
               return false;
          };
          if(!(/^[a-zA-Z0-9-_\u4E00-\u9FA5]+$/.test(_this.value))){
               showErrorTips(_this,tips.gamerole.nickname_error);
               return false;
          };
          if(checkresult[_this.id].check===true&&checkresult[_this.id].ajaxcheck[_this.value]){
          	return true;
          }
          formdata[settings.gamerole]=_this.value;
          $.ajaxSetup({async: false});//设置成同步
          if(ajaxState===0){
          	checkresult[_this.id].ajaxcheck[_this.value]=false;
          	checkresult[_this.id].check= false;
               $.ajax({
                   url : settings.httpServer+"/ajax/checkgamerole/"+formdata.gameid,
                   data:{
                         gamerole:encodeURI(formdata.gamerole,"utf-8")
                   },
                   dataType:"jsonp",
                   beforeSend:function(xhr){
                         ajaxState =1;
                   },
                   success:function(data) {
                         if(data.state===1){
                             checkresult[_this.id].ajaxcheck[_this.value]=true;
          		 checkresult[_this.id].check= true;
          		 checkresult[_this.id].value = formdata.gamerole;
          		 return true;
                         }else if(data.state===-4){
                              showErrorTips(_this,tips.common.safe_error);
                              return false;
                         }else if(data.state===-1){
                              showErrorTips(_this,tips.gamerole.nickname_reg_error);
                              return false;
                         }else if(data.state===-2){
                               showErrorTips(_this,tips.gamerole.nickname_reg_limit);
                              return false;
                         }else if(data.state===-3){
                               showErrorTips(_this,tips.gamerole.nickname_error);
                              return false;
                         }else{
                              showErrorTips(_this,tips.common.server_error);
                              return false;
                         }
                   },
                   error:function(xhr){
                    showErrorTips(_this,tips.common.server_error);
                    return false;
                   },
                   complete:function(){
                         ajaxState=0;
                   }
               });
          }
         $.ajaxSetup({async: true});
     };
     kz_reg.checkvcode = function(){
           var _this = this;
          if(kz_reg.isempty(_this.value)){
          	_this.value="";
               showErrorTips(_this,tips.vcode.empty);
               return false;
          }
          if(!/[a-zA-Z0-9]+/i.test($.trim(_this.value))){
          	_this.value="";
          	if(checkresult[_this.id].msg){
          		showErrorTips(_this,checkresult[_this.id].msg);
          	}else{
          		showErrorTips(_this,tips.vcode.empty);
          	}
          	return false;
          }
          if(checkresult[_this.id].check===true&&checkresult[_this.id].ajaxcheck[_this.value]){
          	return true;
          }
          formdata[settings.vcode]=_this.value;
           $.ajaxSetup({async: false});//设置成同步
          if(ajaxState===0){
          	checkresult[_this.id].ajaxcheck[_this.value]=false;
          	checkresult[_this.id].check= false;
               $.ajax({
                   url : settings.httpServer+"/ajax/checkvcode/"+formdata.gameid,
                   data:{
                         randrequest:formdata.vcode
                   },
                   dataType:"jsonp",
                   beforeSend:function(xhr){
                         ajaxState =1;
                   },
                   success:function(data) {
                         if(data.state==="1"){
                             checkresult[_this.id].ajaxcheck[_this.value]=true;
          		        checkresult[_this.id].check= true;
          		        checkresult[_this.id].value = formdata.vcode;
                              if(regType==="phone"){
                                   $("#"+settings.smsbtn).attr("enable",true);
                              }
                              return true;
                         }else if(data.state===-4){
                              showErrorTips(_this,tips.common.safe_error);
                              return false;
                         }else{
                              showErrorTips(_this,tips.vcode.vode_error);
                              kz_reg.createvcode();
                              return false;
                         }
                   },
                   error:function(xhr){
                    showErrorTips(_this,tips.common.server_error);
                    return false;
                   },
                   complete:function(){
                         ajaxState=0;
                   }
               });
          }
         $.ajaxSetup({async: true});
     };
     kz_reg.checksmscode = function(){
           var _this = this;
          if(kz_reg.isempty(_this.value)){
          	_this.value="";
               showErrorTips(_this,tips.smscode.empty);
               return false;
          }
          if(!/^[0-9]+$/i.test($.trim(_this.value))){
          	_this.value="";
          	if(checkresult[_this.id].msg){
          		showErrorTips(_this,checkresult[_this.id].msg);
          	}else{
          		showErrorTips(_this,tips.smscode.empty);
          	}
          	return false;
          }
           if(!(/^\d{6}$/i.test(_this.value))){
                showErrorTips(_this,tips.smscode.smscode_error);
               return false;
          };
          if(checkresult[_this.id].check===true&&checkresult[_this.id].ajaxcheck[_this.value]){
          	return true;
          }
          formdata[settings.smscode]=_this.value;
          $.ajaxSetup({async: false});//设置成同步
          if(ajaxState===0){
          	checkresult[_this.id].ajaxcheck[_this.value]=false;
          	checkresult[_this.id].check= false;
               $.ajax({
                   url : settings.httpServer+"/ajax/checkregsmscode/"+formdata.gameid,
                   data:{
                         account:formdata.account,
                         smscode:formdata.smscode
                   },
                   dataType:"jsonp",
                   beforeSend:function(xhr){
                         ajaxState =1;
                   },
                   success:function(data) {
                         if(data.state===1){
                              checkresult[_this.id].ajaxcheck[_this.value]=true;
          		        checkresult[_this.id].check= true;
          		        checkresult[_this.id].value = formdata.smscode;
          		 return true;
                         }else if(data.state===-4){
                              showErrorTips(_this,tips.common.safe_error);
                              return false;
                         }else{
                              showErrorTips(_this,tips.smscode.smscode_error);
                              return false;
                         }
                   },
                   error:function(xhr){
                    showErrorTips(_this,tips.common.server_error);
                    return false;
                   },
                   complete:function(){
                         ajaxState=0;
                   }
               });
          }
         $.ajaxSetup({async: true});
     };
     kz_reg.createvcode = function(){
         $("#"+settings.vimgbtn).find("img").attr("src",settings.httpServer+"/ajax/createvcode/"+formdata.gameid+"?w=82&h=30&account="+formdata.account+"&"+Math.random());
     };
     kz_reg.sendsms = function(e){
           var _this = this;
           e.stopPropagation() ;
          if(kz_reg.isempty(formdata.account)){
               return false;
          }
          if(checkresult[settings.account].check&&checkresult[settings.vcode].check){
               $.ajaxSetup({async: false});//设置成同步
               if(ajaxState===0&&$(_this).attr("enable")==="true"){
                    $.ajax({
                        url : settings.httpServer+"/ajax/regsmscode/"+formdata.gameid,
                        data:{
                              account:formdata.account,
                              vcode:formdata.vcode
                        },
                        dataType:"jsonp",
                        beforeSend:function(xhr){
                              ajaxState =1;
                              $(_this).attr("enable",false);
                        },
                        success:function(data) {
                              checkresult[settings.vcode].check = false;
                              if(data.state===1){
                                     checkresult[settings.smscode].check= false;
                                   $(_this).text("(59秒)");
                                   $(_this).attr("class","botspan botspan-gray");
                                   var s=58;
                                   var Interval = setInterval(function(){
                                        $(_this).text("("+s+"秒)");
                                        s--;
                                        if(s===0){
                                             $(_this).text("获取验证码");
                                             $(_this).attr("enable",true);
                                             $(_this).attr("class","botspan");
                                             clearInterval(Interval);
                                        }
                                   },1000);
                              }else{
                                   $(_this).attr("enable",true);
                                   kz_reg.createvcode();
                                   switch(data.state){
                                        case -1:showError($("#"+settings.vcode),tips.vcode.vode_error); break;
                                        case -2:showError($("#"+settings.account),tips.account.phone_reg_error);break;
                                        case -3:showError($("#"+settings.smscode),tips.smscode.smscode_send_limit);break;
                                        case -4:showError($("#"+settings.smscode),tips.common.safe_error);break;
                                        case -5:showError($("#"+settings.smscode),tips.smscode.smscode_send_black);break;
                                        default: showError($("#"+settings.smscode),tips.smscode.smscode_send_error);break;
                                   }
                                   return false;
                              }
                        },
                        error:function(xhr){
                         showError($("#"+settings.smscode),tips.common.server_error);
                         return false;
                        },
                        complete:function(){
                              ajaxState=0;
                        }
                    });
               }
              $.ajaxSetup({async: true});
          }else{
               return false;
          }
     };
     kz_reg.isempty = function(o){
          return (o === null || $.trim(o)===""); 
     };
     function step1(){
          if(!checkresult[settings.account].check){
               $("#"+settings.account).blur();
               return false;
          }
          if(!checkresult[settings.password].check){
               $("#"+settings.password).blur();
               return false;
          }
          if(kz_reg.isempty(formdata.regtype)){
               $("#"+settings.account).blur();
               return false;
          }
          if(formdata.regtype==="email"){
               hideinput($(".accountArea"));
               hideinput($(".pwdArea"));
               hideinput($(".pwdArea"));
               showinput($("#nametips"));
               showinput($(".nameArea"));
               showinput($(".numberArea"));
               showinput($(".nicknameArea"));
               showinput($(".yzimgArea"));
                hideinput($(".messageArea"));
                kz_reg.createvcode();
                checkresult[settings.smscode].check= true;
                $("#"+settings.regSubmitbtn).off("click").on("click",submitdata);
          }else{
               if(formdata.regtype==="phone"){
                    if(!checkresult[settings.smscode].check){
                         $("#"+settings.smscode).blur();
                         return false;
                    }else{
                        checkresult[settings.vcode].check = true;
                    }
                    hideinput($(".accountArea"));
                    hideinput($(".pwdArea"));
                    hideinput($(".pwdArea"));
                    showinput($("#nametips"));
                    showinput($(".nameArea"));
                    showinput($(".numberArea"));
                    showinput($(".nicknameArea"));
                    hideinput($(".yzimgArea"));
                    hideinput($(".messageArea"));
                    $("#"+settings.regSubmitbtn).off("click").on("click",submitdata);
               }else{
                    return false;
               }
          }
     };
     function submitdata(){
          var isformcheck = true;
          $.each(checkresult,function(index,obj){
                    if(!obj.check){
                    	if(obj.msg){
			           showError($("#"+index),obj.msg);
                    	}else{
                    		showError($("#"+index),tips[index].empty);	
                    	}
                    	isformcheck = false;
                         return false;
               }
          });
          if(!isformcheck){
          	return false;
          }
          if(!kz_reg.isempty(formdata.realname)){
               formdata.realname=encodeURI(formdata.realname,"utf-8");
          }
           if(!kz_reg.isempty(formdata.gamerole)){
               formdata.gamerole=encodeURI(formdata.gamerole,"utf-8");
          }
          $.ajaxSetup({async: false});//设置成同步
          if(ajaxState===0){
               $.ajax({
                   url : settings.httpServer+"/kzacc/"+formdata.gameid,
                   data:formdata,
                   dataType:"jsonp",
                   beforeSend:function(xhr){
                         ajaxState =1;
                   },
                   success:function(data) {
                   	try{
 		if(data.state===1){
                               if(formdata.regtype==="email"){
                                   if(!kz_reg.isempty(data.preurl)){
                                        if(settings.urldir==="self"){
                                             if(!kz_reg.isempty(data.account)){
                                                  document.location.href = decodeURIComponent(data.preurl)+"?account="+data.account+"&gameid="+formdata.gameid;
                                             }else{
                                                  document.location.href = decodeURIComponent(data.preurl)+"?gameid="+formdata.gameid;
                                             }
                                        }else if(settings.urldir==="parent"){
                                             window.parent.location.href = decodeURIComponent(data.preurl)+"?gameid="+formdata.gameid;
                                        }else{
                                             window.open(decodeURIComponent(data.preurl));
                                        }
                                   }else{
                                        alert(decodeURIComponent(data.info));
                                   }
                               }else if(formdata.regtype==="phone"){
                                   if(!kz_reg.isempty(data.url)){
                                      if(settings.urldir==="self"){
                                        if(!kz_reg.isempty(data.account)){
                                             var link = decodeURIComponent(data.url);
                                             if(link.indexOf("?")>-1){
                                                  document.location.href = link+"&account="+data.account;
                                             }else{
                                                  document.location.href = link+"?account="+data.account;
                                             }
                                        }else{
                                             document.location.href = decodeURIComponent(data.url);
                                        }
                                      }else if(settings.urldir==="parent"){
                                             window.parent.location.href = decodeURIComponent(data.url);
                                      }else{
                                             window.open(decodeURIComponent(data.url));
                                      }
                                   }
                               }
                               return true;
                         }else if(data.state===-4){
                              showError($("#"+settings.realname),tips.common.safe_error);
                              return false;
                         }else if(data.state===-1){
                              if(kz_reg.isempty(data.url)){
                                   alert(decodeURIComponent(data.error));
                                   kz_reg.createvcode();
                              }else{
                                   window.location.href = decodeURIComponent(data.url);
                              }
                              return false;
                         }else{
                              if(!kz_reg.isempty(data.error)){
                                    var inputname = data.element;
                                   var inputobject = $("#"+inputname);
                                   checkresult[inputname].check=false;
                                   if(inputobject&&inputobject.parent().hasClass("hide")){
                                   showinput($(".accountArea"));
                                   showinput($(".pwdArea"));
                                   hideinput($("#nametips"));
                                   hideinput($(".nameArea"));
                                   hideinput($(".numberArea"));
                                   hideinput($(".nicknameArea"));
                                   if(formdata.regtype==="phone"){
                                        showinput($(".yzimgArea"));
                                        showinput($(".messageArea"));
                                        kz_reg.createvcode();
                                        checkresult[settings.smscode].check=false;
                                    }else{
                                    	hideinput($(".yzimgArea"));
                                    }
                                     $("#"+settings.regSubmitbtn).off("click").on("click",step1);
                               }else{
                               	 if(formdata.regtype==="email"){
                               	 	kz_reg.createvcode();
                               	}
                               }
                               showError(inputobject,decodeURIComponent(data.error));
                               return false;
                              }else{
                                   alert("未知错误，请重试");
                                   return false;
                              }
                         }
                   	}catch(i){
                   		console.log(i);
                   	}
                        
                   },
                   error:function(xhr){
                    showError($("#"+settings.realname),tips.common.server_error);
                    return false;
                   },
                   complete:function(){
                         ajaxState=0;
                   }
               });
          }
         $.ajaxSetup({async: true});
     };
     function showErrorTips(o,msg){
          checkresult[o.id].check=false;
          checkresult[o.id].msg=msg;
          if(o.value===msg){
          	o.vaule =""
          	formdata[o.id]="";
          }
          checkresult[o.id].value=o.value;
          if(o.id===settings.password){
          	 var errortip = $(o).parent().find('[name="txt_'+o.id+'"]');
          	  $(o).hide();
          	 showError(errortip,msg);
               errortip.show();
          }else{
          	 showError(o,msg);
          }

     };
     function hideinput(inputobject){
          if(inputobject&&inputobject.hasClass("hide")){
               return false;
          }
          inputobject.addClass("hide");
     };
     function showinput(inputobject){
          if(inputobject&&inputobject.hasClass("hide")){
               inputobject.removeClass("hide");
          }
          return true;
     };
     String.prototype.startWith = function(s){
          if(s==null||s==""||this.length==0||s.length>this.length){
               return false;
          }
          if(this.substr(0,s.length)==s){
               return true;
          }
          return false;
     };
     String.prototype.endWith = function(s){
            if(s==null||s==""||this.length==0||s.length>this.length){
               return false;
            }
            if(this.substring(this.length-s.length)==s){
                return true;
            }
            return false;
     };
})(jQuery,window);