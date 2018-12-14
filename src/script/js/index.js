define(['config'], function () { //define定义模块
    require(['jquery'], function () {
        $('#header').load('http://10.31.155.143/Stage2/Huaqiang/src/ht-header.html')
        $('#footer').load('http://10.31.155.143/Stage2/Huaqiang/src/ht-footer.html')
    })


    require(['jquery', 'jqlzload'], function () {
        //轮播图       
        var $bannerbox = $('.banner');
        var $bannerpics = $('.banner .banner-container li');
        var $bannerbtns = $('.banner .banner-bot li');
        var $num = 0;
        var time = null;
        $bannerbox.hover(function () {
            clearInterval(time);
            $('.Prev,.Next').show();
        }, function () {
            $('.Prev,.Next').hide();
            time = setInterval(function () {
                $('.Next').click();
            }, 4000)
        })
        $bannerbtns.on('click', function () {
            $num = $(this).index();
            tabswitch();
        })

        function tabswitch() {
            $bannerbtns.eq($num).addClass('active').siblings('li').removeClass('active');
            $bannerpics.eq($num).show().siblings('li').hide();
        }
        $('.Next').on('click', function () {
            $num++;

            if ($num > $bannerbtns.length - 1) {
                $num = 0;
            }
            tabswitch();
        })
        $('.Prev').on('click', function () {
            $num--;

            if ($num < 0) {
                $num = $bannerbtns.length - 1;
            }
            tabswitch();
        })
        time = setInterval(function () {
            $('.Next').click();
        }, 4000)

        //楼梯

        /*  console.log($('.content-todaysec').offset().top) */
        $(window).on('scroll', function () {
            var $top = $(window).scrollTop();
            if ($top >= 544) {
                $('#today-nav-floor').show();
            } else {
                $('#today-nav-floor').hide();
            }
            /* document.title = $top; */
            $('#content .todaylouceng').each(function (index, element) {
                var $scrolltop = $(element).offset().top + $(element).height() - 48;
                if ($scrolltop > $top) {
                    /*  console.log($('#today-nav-floor .todayfloor').length) */
                    /*  $('#today-nav-floor .todayfloor').removeClass('todaybg');
                     $('#today-nav-floor .todayfloor').eq(index).addClass('todaybg');   */
                    $('#today-nav-floor .todayfloor').removeClass('todaybg').css('color', 'black').hover(function () {
                        $(this).css('color', 'red')
                    }, function () {
                        $(this).css('color', 'black')
                    });
                    $('#today-nav-floor .todayfloor').eq(index).addClass('todaybg').css('color', 'white').hover(function () {
                        $(this).css('color', 'white')
                    });
                    return false;
                }
            })

        })



        $('#today-nav-floor .todayfloor').on('click', function () {
            /*   $(this).addClass('todaybg').siblings('.todayfloor').removeClass('todaybg'); */
            var $top = $('#content .todaylouceng').eq($(this).index('.todayfloor')).offset().top;
            $('html,body').animate({
                scrollTop: $top
            }, 500)
        })

        $(' .body-top').on('click', function () {

            $('html,body').animate({
                scrollTop: 0
            }, 1000)
        })

        //数据库拼接
        $.ajax({
            type: 'get',
            url: 'http://10.31.155.143/Stage2/Huaqiang/php/index.php',
            dataType: 'json',
        }).done(
            function (data) {
                var $box = $('.floor1data');
                var str = '';
                $.each(data, function (index, element) {

                    str += '<li><div class="mod-item"><div class="mod-img"><a href="http://10.31.155.143/Stage2/Huaqiang/src/details.html?sid=' + element.mod_id + '" target="_blank"><img class="lazy"  data-original="' + element.mod_url + '" width="160" height="160"> </a> </div><div class="mod-info"><p>' + '¥ ' + ' <i>' + element.mod_curr_price + '</i><del>' + element.mod_mark_price + '</del></p><a href="#"  class="link1">' + element.mod_title + '</a> </div> </div></li>'

                })

                $box.append(str);

                //懒加载        
                $(function () {
                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                });


            }

        )

        //倒计时


        var $pbox = $('.sale-time p ');
        function double(n) {
            return n < 10 ? '0' + n : n;
        }
        function djs() {
            var $futuretime = new Date('2018-12-31 23:59:59');
            var $currenttime = new Date();
            var $time = parseInt(($futuretime - $currenttime) / 1000); //秒数
            var $hour = parseInt($time % 86400 / 3600);
            var $min = parseInt($time % 3600 / 60);
            var $sec = $time % 60;
            var $str = double($hour) + '' + double($min) + '' + double($sec);
            var $strarr = $str.split('');
            return $strarr
        }
        function usetime(){
            var $strvalue = ''
            $.each(djs(), function (index, element) {
                $strvalue += '<span>' + element + '</span>'
            })
            $pbox.html($strvalue)
           
        }
        var timer = setInterval(function () {
            usetime()
        }, 1000)

        usetime();



    })

});