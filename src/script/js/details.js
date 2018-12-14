define(['config'], function () {

  require(['jquery', 'jqcookie'], function () {
 
    $('#details-header').load('http://10.31.155.143/Stage2/Huaqiang/src/ht-header.html')
    $('.details-nav').load('http://10.31.155.143/Stage2/Huaqiang/src/index.html .content-nav')
     $('#footer').load('http://10.31.155.143/Stage2/Huaqiang/src/ht-footer.html .footer-middle,.footer-bottom')
     $('#details_aside_bar').load('http://10.31.155.143/Stage2/Huaqiang/src/index.html #aside_bar')

  })

  require(['jquery', 'jqcookie'], function () {
    //详情页拼接

    var picid = location.search.substring(1).split('=')[1];
    $.ajax({
      type: 'get',
      url: 'http://10.31.155.143/Stage2/Huaqiang/php/details.php',
      data: {
        sid: picid
      },
      dataType: 'json'
    }).done(function (data) {
      //左侧图片数据信息   
      var detailspicarr = data.mod_urls.split(',')
      /* console.log(detailspicarr); */
      //上面大图      
      var $bigshowbox = $('.big-show .spic');
      $bigshowbox.append('<img class="bigpic1" src="' + detailspicarr[0] + '">');

      //因为图片没有ID属性，所以给它的盒子单独赋值ID，方便在添加购物车时获取到对应的ID
      $('.big-show .spic').attr('mod_id', data.mod_id)


      //右侧放大镜图片
      var $rightshowbox = $('.big-show .bf img');
      $rightshowbox.attr('src', detailspicarr[0]);



      //下面小图     
      $smallpicbox = $('.tab-gd-detail');
      var str = '';
      $.each(detailspicarr, function (index, element) {
        /*    console.log(element) */
        str += '<li><img class="smallpic1" src="' + element + '"></li>'

      });
      $smallpicbox.prepend(str);


      //右侧品牌信息
      var detailsbrand = data.mod_brand;
      $brandbox = $('.v-title .brand');
      $brandbox.append(detailsbrand);

      //右侧标题信息
      var detailstitle = data.mod_title;
      $titlebox = $('.v-title .v-a1');
      $titlebox.append(detailstitle);
      // 右侧现价信息
      var detailscurrentprice = data.mod_curr_price;
      $currentbox = $('.v-info1 .sku-price');
      $currentbox.append(detailscurrentprice);
      //右侧市场价
      var detailsmarkprice = data.mod_mark_price;
      $markbox = $('.v-info1 .mark-price');
      $markbox.append(detailsmarkprice);

    })
    var $smallpicul = $('.tab-gd .tab-gd-detail');
    $smallpicul.on('mouseover', function (ev) {
      var $ele = $(ev.target);
      var $elesrc = $ele.attr('src');
      $ele.parent().css("border-color", "red").siblings().css("border-color", "#e1e1e1");
      $('.big-show .bf img').attr('src', $elesrc);
      $('.big-show .spic img').attr('src', $elesrc);
    })
  })

  require(['jquery'], function () {
    //放大镜
    var $leftxfbox = $('.big-show');
    var $leftxf = $('.big-show .spic .sf')
    var $rightbfbox = $('.gd-info-img .big-show .bf');
    var $rightbfimg = $('.gd-info-img .big-show .bf img')



    $leftxfbox.on('mouseover', function () {

      $leftxf.css("visibility", "visible");
      $rightbfbox.css("visibility", "visible");


    })
    $leftxfbox.on('mouseout', function () {
      $leftxf.css("visibility", "hidden");
      $rightbfbox.css("visibility", "hidden");

    })
    var $xfwidth = $rightbfbox.width() * $leftxfbox.width() / $rightbfimg.width();
    //console.log($xfwidth)
    var $xfheight = $rightbfbox.height() * $leftxfbox.height() / $rightbfimg.height()
    //console.log($leftxfbox.height())
    $leftxf.css({
      width: $xfwidth,
      height: $xfheight
    })



    $leftxfbox.on('mousemove', function (ev) {

      var $sl = ev.pageX - $leftxfbox.offset().left - $xfwidth / 2;
      var $st = ev.pageY - $leftxfbox.offset().top - $xfheight / 2;

      $leftxf.css({
        left: $sl + 'px',
        top: $st + 'px'
      })

      if ($sl < 0) {
        $leftxf.css("left", 0);
        $sl = 0;

      }
      if ($sl >= $leftxfbox.width() - $leftxf.width()) {
        $leftxf.css("left", $leftxfbox.width() - $leftxf.width())

        $sl = $leftxfbox.width() - $leftxf.width()
      }
      if ($st < 0) {
        $leftxf.css("top", 0);
        $st = 0
      }
      if ($st >= $leftxfbox.height() - $leftxf.height()) {

        $leftxf.css("top", $leftxfbox.height() - $leftxf.height())

        $st = $leftxfbox.height() - $leftxf.height()
      }

      var $bili = $rightbfbox.width() / $leftxfbox.width();

      var $bimgleft = -$sl * $bili + 'px';
      var $bimgright = -$st * $bili + 'px';

      $rightbfimg.css({
        left: $bimgleft,
        top: $bimgright
      })

    })
    //下面小图tab切换
    //加
    var $num = 4   
    $('.sl-prev').css('cursor', 'not-allowed');   
    $('.sl-next').on('click', $('.tab-box ul li'), function () {
      var $list = $('.tab-box ul li').size() //8
      var $liwidth = ($('.tab-box ul li').eq(0)).outerWidth(true) //70
    /*   console.log($liwidth) */
      if ($list > $num) {
            $num++;         
          $('.sl-prev').css('cursor', '');                       
      }
      if ($list == $num) {
          $('.sl-next').css('cursor', 'not-allowed');         
        }
      $('.tab-box ul').animate({
        left: -$liwidth*($num-4)
      })

    })

    //减     

    $('.sl-prev').on('click', $('.tab-box ul li'), function () {
      var $liwidth = ($('.tab-box ul li').eq(0)).outerWidth(true)
      /*console.log($liwidth) */
      if($num>4){
        $num--;
         $('.sl-next').css('cursor', ''); 
        if($num<=4){
          $('.sl-prev').css('cursor', 'not-allowed');                     
        }
      }
      $('.tab-box ul').animate({
         left: $liwidth*(4-$num) 
      })
    })




    //购物车
    //提前获取cookie
    var arrmodid = [];
    var arrmodnum = [];

    function cookiearray() {
      if ($.cookie('modid') && $.cookie('modnum')) {
        arrmodid = $.cookie('modid').split(',');
        arrmodnum = $.cookie('modnum').split(',');
      }
    }
    //点击购物车按钮做出判断

    $('.addcart').on('click', function () {
      location.reload(true);
      var $modid = $(this).parents('.gd-info').find('.big-show .spic').attr('mod_id');
      cookiearray();
      if ($.inArray($modid, arrmodid) != -1) {
        var num = parseInt(arrmodnum[$.inArray($modid, arrmodid)]) + parseInt($('#count').val());
        arrmodnum[$.inArray($modid, arrmodid)] = num;
        $.cookie('modnum', arrmodnum.toString(), {
          expires: 10
        });
      } else {
        arrmodid.push($modid);
        $.cookie('modid', arrmodid.toString(), {
          expires: 10
        });
        arrmodnum.push($('#count').val());
        $.cookie('modnum', arrmodnum.toString(), {
          expires: 10
        });
      }

    })

//数量加减，输入控制 
    $('.num-box .zeng').on('click',function(){
      var $count=$('.sku-num').val();
      $count++;
      if($count>=99){
          $count=99
      }
      $(this).parents('.num-box').find('input').val($count)

    })

    $('.num-box .shan').on('click',function(){
      var $count=$('.sku-num').val();
      $count--;
      if($count<=1){
          $count=1
      }
      $(this).parents('.num-box').find('input').val($count)

    })

    $('.num-box .sku-num').on('input',function(){
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
      
      })

  })

})