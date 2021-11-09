var SlideVerify = function (path, num) {
  var slideVerify = document.getElementById("slideVerify"),
    chip = slideVerify.getElementsByClassName("chip")[0], //图片小块
    chip2 = slideVerify.getElementsByClassName("chip2")[0],
    box = slideVerify.getElementsByClassName("box")[0],
    bgColor = slideVerify.getElementsByClassName("bgColor")[0], //背景色
    txt = slideVerify.getElementsByClassName("txt")[0], //文本
    slider = slideVerify.getElementsByClassName("slider")[0], //滑块
    icon=slideVerify.getElementsByClassName("icon iconfont iconicon-doubleright-line")[0],
    image = slideVerify.getElementsByClassName("image")[0],
    successMoveDistance = box.offsetWidth - slider.offsetWidth, //解锁需要滑动的距离
    downX, //用于存放鼠标按下时的位置
    offsetX,
    isSuccess = false, //是否解锁成功的标志，默认不成功
    distance,
    imgAt = Math.floor(Math.random() * num)+1;
  image.style.background = "url(" + path + imgAt + ".jpg)";

  //二、获取到需要用到的DOM元素

  var getisSuccess = function () {
    return isSuccess;
  }

  //三、给滑块添加鼠标按下事件
  slider.onmousedown = mousedownHandler;

  //3.1鼠标按下事件的方法实现
  function mousedownHandler(e) {
    bgColor.style.transition = "";
    slider.style.transition = "";
    var e = e || window.event || e.which;
    downX = e.clientX;
    //在鼠标按下时，分别给鼠标添加移动和松开事件

    ry = Math.floor(Math.random() * 80) + 20;
    rx = Math.floor(Math.random() * 150) + 120;
    chip.style.background = "url(" + path + imgAt + ".jpg)";
    chip.style.top = ry + "px";
    chip.style.backgroundPositionX = -rx + "px";
    chip.style.backgroundPositionY = -ry + "px";
    chip2.style.background = "url(" + path + imgAt + ".jpg)";
    chip2.style.top = ry + "px";
    chip2.style.left = rx + "px";
    chip2.style.backgroundPositionX = -rx + "px";
    chip2.style.backgroundPositionY = -ry + "px";
    chip2.style["box-shadow"] = "5px 5px 10px black";
    distance = rx;

    document.onmousemove = mousemoveHandler;
    document.onmouseup = mouseupHandler;

    //四、定义一个获取鼠标当前需要移动多少距离的方法
    function getOffsetX(offset, min, max) {
      if (offset < min) {
        offset = min;
      } else if (offset > max) {
        offset = max;
      }
      return offset;
    }

    //3.1.1鼠标移动事件的方法实现
    function mousemoveHandler(e) {
      var e = e || window.event || e.which;
      var moveX = e.clientX;
      offsetX = getOffsetX(moveX - downX, 0, successMoveDistance);
      bgColor.style.width = offsetX + "px";
      slider.style.left = offsetX + "px";
      chip.style.left = offsetX + "px";

      // if (offsetX == successMoveDistance) {
      //     success();
      // }
      //如果不设置滑块滑动时会出现问题（目前还不知道为什么）
      //e.preventDefault();
    }

    //3.1.2鼠标松开事件的方法实现
    function mouseupHandler(e) {
      if (offsetX - distance < 8 && offsetX - distance > -8) {
        success();
      } else {
        bgColor.style.width = 0 + "px";
        slider.style.left = 0 + "px";
        bgColor.style.transition = "width 0.8s linear";
        slider.style.transition = "left 0.8s linear";

        //imgAt = Math.floor(Math.random() * num);
        //image.style.background = "url(" + path + imgAt + ".jpg)";
        chip.style.background = null;
        chip2.style.background = null;
        chip2.style["box-shadow"] = null;
      }
      document.onmousemove = null;
      document.onmouseup = null;
    }

    //五、定义一个滑块解锁成功的方法
     function success() {
      isSuccess = true;
      txt.innerHTML = "解锁成功";
      bgColor.style.backgroundColor = "lightgreen";
      slider.className = "slider active";
      icon.className = "icon iconfont iconicon_xuanzhong";
      bgColor.style.width=successMoveDistance+"px";
      slider.style.left=successMoveDistance+"px";
      //滑动成功时，移除鼠标按下事件和鼠标移动事件
      slider.onmousedown = null;
      document.onmousemove = null;
      image.onmousedown = "null";

      //成功解锁后的回调函数
      setTimeout(function () {
        alert("解锁成功！");
      }, 100);
    }

  }
return getisSuccess;
};
