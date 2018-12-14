define(['config'], function () {
    require(['jquery','jqcookie'], function () {
       
        $('#login-header').load('http://10.31.155.143/Stage2/Huaqiang/src/otherheader.html #other-header')
        $('#login-footer').load('http://10.31.155.143/Stage2/Huaqiang/src/otherfooter.html')


        var $phone=$('.loginform .phone');
     
        var $pass=$('.loginform .password');
        var $submit=$('.loginform .submit')


        $submit.on('click',function(){

           $.ajax({
                type:'post',
                url:'http://10.31.155.143/Stage2/Huaqiang/php/login.php',
                data:{
                    phonevalue:$phone.val(),
                    passwordvalue:$pass.val()
                },
                success:function(data){
                    if(!data){
                        alert('登陆失败');
                        $phone.val()='';
                        $pass.val()='';
                    }else{
                        location.href='http://10.31.155.143/Stage2/Huaqiang/src/index.html';

                    }
                }
            });




        })


    })


})

   