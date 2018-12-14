define(['config'], function () {
    require(['jquery'], function () {
        $('#cart-header').load('http://10.31.155.143/Stage2/Huaqiang/src/otherheader.html')
        $('.cart-footer').load('http://10.31.155.143/Stage2/Huaqiang/src/otherfooter.html ')
    })

    require(['jquery','jqcookie'], function () {
//传参判断渲染商品列表
        function goodlist(id,count){

            $.ajax({
                url:'http://10.31.155.143/Stage2/Huaqiang/php/cart.php',
                dataType:'json' 
            }).done(function(data){
                  $.each(data,function(index,value){ 
                    value
                    if(id==value.mod_id){
                        var $clonebox=$('.cart-list tbody:hidden').clone(true,true);
                        $clonebox.find('.td-pic a').find('img').attr('src',value.mod_url);//图片路径
                        $clonebox.find('.td-pic a').find('img').attr('modid',value.mod_id);//
                        $clonebox.find('.td-info p').find('a').html(value.mod_title);//商品标题
                        $clonebox.find('.td-price-p').find('.td-price').html(value.mod_curr_price);//商品价格
                        $clonebox.find('.plus_minus').find('input').val(count);//商品数量
                        $clonebox.find('.td-total-p').find('.td-total').html((value.mod_curr_price*count).toFixed(2));//商品总计
                        $clonebox.css('display','block');
                        $('.cart-list').append($clonebox);//插入克隆的盒子
                        priceall()//插入盒子同时调用计算总价函数
                    }
                })  
            })
        }

//获取cookie,给渲染商品函数参数赋值
/* console.log($.cookie('modid'))
console.log($.cookie('modnum')) */
        if($.cookie('modid') && $.cookie('modnum')){
            var d=$.cookie('modid').split(',');
          /*   console.log(d) */
            var n=$.cookie('modnum').split(',');
         /*    console.log(n) */
            $.each(d,function(i,value){
                goodlist(d[i],n[i]);
            })
        }

//获取到cookie,隐藏空盒子
        function kong(){
            if($.cookie('modid') && $.cookie('modnum')){
                $('.empty-box').hide()
                $('#cart').show()
            }else{
                $('.empty-box').show()
            }
        }
        kong()


//计算选中商品总价，总数
        function priceall(){
            var $sum=0;
            var $count=0;
              
            $('.cart-list tbody:visible').each(function(index,element){               
                if($(element).find('.td-select input').prop('checked')){                 
                   $sum+=parseInt($(element).find('.plus_minus').find('input').val());
                  
                    $count+=parseFloat($(element).find('.td-total-p').find('b').html()) 
                  
                }
            });
            $('.total-tips').find('.total-count').html($sum);
            $('.total-tips').find('.total-sum').html($count.toFixed(2));
        }
//事件委托，根据选中状态重新计算数量总价              
        var $inputs=$('.cart-list tbody:visible').find(':checkbox');
        $('.cart-list').on('change',$inputs,function(){
            if($('tbody:visible').find('.td-select input').prop('checked')){
                priceall()
            }else{
                priceall()
            }
        })

//改变商品数量

        $('.plus_minus .plus').on('click',function(){
            var $count=$(this).parents('.plus_minus').find(' input').val();
            $count++;
            if($count>=99){
                $count=99
            }
            $(this).parents('.plus_minus').find('input').val($count)
            $(this).parents('tr').find('.td-total-p').find('.td-total').html(singlegoodsprice($(this)));
            priceall();
            setcookie($(this));
        })

        $('.plus_minus .minus').on('click',function(){
            var $count=$(this).parents('.plus_minus').find(' input').val();
            $count--;
            if($count<=1){
                $count=1
            }
            $(this).parents('.plus_minus').find('input').val($count);
            $(this).parents('tr').find('.td-total-p').find('.td-total').html(singlegoodsprice($(this)));
            priceall();
            setcookie($(this));
        })

        $('.plus_minus input').on('input',function(){
            var $reg = /^\d+$/g;
            var $value = parseInt($(this).val());
            if ($reg.test($value)) {
                if ($value >= 99) {
                    $(this).val(99);
                } else if ($value <= 0) {
                    $(this).val(1);
                } else {
                    $(this).val($value);
                }
            } else {
                $(this).val(1);
            }
            $(this).parents('tr').find('.td-total-p').find('.td-total').html(singlegoodsprice($(this)));
            priceall();
            setcookie($(this)); 
        })

// 数量改变，价格改变      
        function singlegoodsprice(obj) {
            var $dj=parseFloat(obj.parents('tr').find('.td-price-p').find('.td-price').html())
            var $cnum=parseInt(obj.parents('tr').find('.plus_minus').find('input').val());
            return ($dj*$cnum).toFixed(2);

        }

//添加cookie
        var arrmodid = [];
        var arrmodnum = [];
    
        function cookiearray(){
          if($.cookie('modid') && $.cookie('modnum')){
            arrmodid=$.cookie('modid').split(',');
            arrmodnum=$.cookie('modnum').split(',');
          }
        }

        function setcookie(obj){
            cookiearray();
            var $index=obj.parents('tr').find('img').attr('modid');
            arrmodnum[$.inArray($index,arrmodid)]=obj.parents('tr').find('.plus_minus input').val();
            $.cookie('modnum', arrmodnum.toString(),{ expires: 10 });
        }

//删除cookie
        function delgoodslist(modid,arrmodid) {
           var $index=-1;
           $.each(arrmodid,function(index,value){
               if(modid==value){
                $index=index
               }

           })
           arrmodid.splice($index,1);
           arrmodnum.splice($index,1)
           $.cookie('modnum', arrmodnum.toString(),{ expires: 10 });
           $.cookie('modid', arrmodid.toString(),{ expires: 10 });
         }

         $('tr').on('click','.del_parent a',function(){
            cookiearray();
            if(confirm('你确定要删除吗？')){
                $(this).first().parents('tbody').remove();
                delgoodslist($(this).first().parents('tbody').find('img').attr('modid'), arrmodid);  
                if(arrmodid.length<=0){
                    location.reload(true); 
                }
                                
           }
         
	         priceall();
         })




    })

})
    