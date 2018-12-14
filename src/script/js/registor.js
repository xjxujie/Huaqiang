define(['config'], function () {

 require(['jquery','jqvalidate'], function () {

    $('#registor-header').load('http://10.31.155.143/Stage2/Huaqiang/src/otherheader.html  #other-header')
    $('#registor-footer').load('http://10.31.155.143/Stage2/Huaqiang/src/otherfooter.html')


$(function() {
 $(function(){
        $('#form1').validate({
            rules:{
                phone:{
                    required:true,
                    rangelength:[11,11],
                    checktel:true,
                     remote:{
                        type:'post',
                        url:'http://10.31.155.143/Stage2/Huaqiang/php/registor.php'
                    } 
                },
                  password:{
                    required:true,
                    minlength:6
                },
                 repass:{
                    required:true,
                    equalTo:'#password'
                } 


            },
            messages:{

                phone:{
                    required:'<span style="color:red">手机号码不能为空</span>',
                    rangelength:'<span style="color:red">手机号码长度不符合</span>',
                    checktel:'<span style="color:red">手机号码不符合规范</span>',
                    remote:'<span style="color:red">手机号码已注册</span>'
                },
               password:{
                    required:'<span style="color:red;">密码不能为空</span>',
					minlength:'<span style="color:red;">密码不能小于6位</span>',
                },
                repass:{
                    required:'<span style="color:red;">密码重复不能为空</span>',
					equalTo:'<span style="color:red;">密码重复不匹配</span>'

                } 

            }

        })
 
    })


//自定义正则
    $.validator.addMethod("checktel", function(value, element) {
		var score = /^1[3578]\d{9}$/;
		return this.optional(element) || (score.test(value));
	}, "手机号码不符合规范");


    $.validator.setDefaults({
        success: function(label){
            label.text('√').css('color','green').addClass('valid');
        }
    });

 })

})
   
})
   
   