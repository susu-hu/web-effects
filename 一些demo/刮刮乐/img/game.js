$(function () {
    // document.onreadystatechange = function () {
    //     if (document.readyState = "complete") {
    //         $(".loading-box").fadeOut();
    //         $("body").addClass("slideIn")
    //     }
    // };
    var $maskRule = $("#mask-rule"),//规则遮罩层
        $maskawards = $("#mask-awards"),//红包遮罩层 
        $mask = $("#mask"),//红包遮罩层 
        $card = $("#card"),
        $close = $("#close"),
        $maskDown = $("#mask-down"),
        $canvasMask = $("#canvas-mask"),//canvas遮罩层
        $btn = $("#btn"),//刮奖按钮
        $change = $("#change").text(),//剩余次数
        data = { count: $change };//次数  

    //点击弹出规则信息
    $(".awards-rule").click(function () {
        $maskRule.show();
        //禁止浏览器滚动
        $("html,body").addClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });

    //点击提交信息
    $(".get-info").click(function () {
        $maskRule.show();
        //禁止浏览器滚动
        $("html,body").addClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });

    //点击弹出中奖信息
    $(".awards-name").click(function () {
        $maskawards.show();
        //禁止浏览器滚动
        $("html,body").addClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });

    //关闭窗口
    $(".close-icon").click(function () {
        $(this).parent().parent().hide();
        $("html,body").removeClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });
    $(".kown-btn,.updata-btn").click(function () {
        $(this).parents(".box-rule").parent().hide();
        $("html,body").removeClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });

    /*中奖信息提示*/
    function win() {
        //遮罩层显示
        $mask.show();
        $winning.addClass("reback");
        setTimeout(function () {
            $card.addClass("pull");
        }, 500);
        //关闭弹出层
        $("#close,.win,.btn").click(function () {
            $mask.hide();
            $winning.removeClass("reback");
            $card.removeClass("pull");
        });
    }

    //点击开始刮奖按钮
    $btn.click(function () {
        //随机生成奖项
        var a = ["很遗憾,您并未中奖", "iPhone 13 Pro", "iPhone 12 Mini", "iPhone 11"]
        //中奖概率
        var num = Math.floor(Math.floor(Math.random() * 999));
        let item = 0;
        if (num >= 0 && num <100) {
            item = 2 // 0-99
        }else if (num >= 100 && num <300){
            item = 3 // 100-299
        }else if (num >= 600 && num <999){
            item = 1 // 600-998
        }else{
            item = 0 // 999
        } 
        //中奖率
        $(".awbox").attr('data-a',item); //保存Item值
        if (data.count > 0) {
            data.count--;//减少抽奖次数
            $("#change").text(data.count); //替换剩余抽奖次数
            $(".awbox").show(); //抽奖区域显示    
            if (item > 0) {
                $("#atext,#mask_img_bg p").html(a[item]); //替换所得奖项
            }
            if (item == 0) {
                $("#mask_img_bg").html("<p><span  class='web-font'>很遗憾，您未中奖</span><br/> <a class='agine'><img src='../assets/images/flash.png'>再刮一次</a></p>");
                $(".agine").on("click", function () {
                    $('#redux').eraser('reset'); //涂抹板重置  
                    $canvasMask.show();
                    $(".awbox").hide();
                    $('#redux').show();
                });
            };
            $('#redux').eraser({
                size: 20,   //设置橡皮擦大小
                completeRatio: .6, //设置擦除面积比例
                completeFunction: showResetButton,  //大于擦除面积比例触发函数
            });
            $canvasMask.hide();
        } else {
            alert("没有次数了"); //抽奖次数用完
            $("#btn img").attr('src', "assets/images/cant.png");  //替换抽奖次数图片
        };

    });
    function showResetButton() {
        const item = $(".awbox").attr('data-a'); //读取Item 值
        //console.log(item + '结束后')
        if (item > 0) {
            $(".gole-awards").fadeIn(300);
            //禁止浏览器滚动
            $("html,body").addClass("overHiden");
            window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
        } else {
            $('#redux').hide();
        }
    }


    /*中奖后点击灰色区域隐藏*/
    $(".gole-awards .mask").click(function () {
        $("html,body").removeClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
        $('#redux').eraser('reset'); //涂抹板重置
        $(".gole-awards").fadeOut(300);
        $(".awbox").hide();
        $canvasMask.show();
    })

    /*判断是否为微信浏览器*/
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        alert(1);
    } else {
        // $maskDown.show();
        // //禁止浏览器滚动
        // $("html,body").addClass("overHiden");
        // window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    }
});
