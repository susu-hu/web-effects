var cancelFrame =
  window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
var requestFrame = window.requestAnimationFrame;
var time =
  !window.performance || !window.performance.now
    ? function () {
        return +new Date();
      }
    : function () {
        return performance.now();
      };

/**
 * 计算两点距离
 * @param points
 * @returns {number}
 * distance([{x:0,y:0},{x:1,y:1}]);
 */
var distance = function (points) {
  var p1 = points[0];
  var p2 = points[1];
  var a = p2.x - p1.x;
  var b = p2.y - p1.y;
  return Math.sqrt(a * a + b * b);
};

/**
 * 圆公式
 * @param rotation 弧度
 * 计算公式：
 * Math.PI;     //圆周率
 * Math.sin();  //正弦 x      -左 +右
 * Math.cos;    //余弦 y      -下 +上
 */
var circleMath = {
  /**
   * 根据弧度计算角度
   * @param rotation 弧度
   * rotation, farScale, xs, xr, ys, yr, itemWidth
   */
  // parseRotate: function (rotation) {
  //     return (180 / Math.PI * rotation) - 180;
  // },
  parseRotate: function (rotation, self) {
    var sin = Math.sin(rotation),
      cos = Math.cos(rotation);
    var sin_cos = sin * cos; //得出偏移正负值，从0°向左依次 +-+-
    var angle = (180 / Math.PI) * rotation - 180;
    var lastAngle = angle;

    // console.log('rotation',rotation)
    // console.log('sin',sin)
    // console.log('cos',cos)
    // console.log('sin*cos',sin*cos);
    // console.log('统一偏移角度',self.yr * (sin_cos/Math.PI))

    lastAngle = angle + self.yr * (sin_cos / (Math.PI + 1));

    return lastAngle;
  },
  /**
   * 计算scale,x,y
   * scale    最小尺寸 + ((1 - 最小尺寸) * (sin正弦 + 1) * 0.5)
   * x        x起点 + (尺寸 * cos余弦 * x半径) - 元素宽度一半
   * y        y起点 + (尺寸 * sin正弦 * x半径) - 元素宽度一半
   * farScale, xs, xr, ys, yr, itemWidth
   */
  parseSXY: function (rotation, self) {
    var farScale = self.farScale;
    var itemWidth = self.itemWidth;
    var xs = self.xs;
    var xr = self.xr;
    var ys = self.ys;
    var yr = self.yr;
    var sin = Math.sin(rotation),
      cos = Math.cos(rotation);
    var scale = farScale + (1 - farScale) * (sin + 1) * 0.5; //单个尺寸

    // 按设置尺寸
    // var x = xs + (scale * cos * xr) - (itemWidth * 0.5);
    // var y = ys + (scale * sin * yr) - (itemWidth * 0.5);
    // 不使用压缩
    // var x = xs + (cos * xs) - (itemWidth * 0.5);
    // var y = ys + (sin * ys) - (itemWidth * 0.5);
    // 使用压缩
    var x = xs + cos * xr - itemWidth * 0.5;
    var y = ys + sin * yr - itemWidth * 0.5;
    var distanceNumber = distance([
      {
        x: self.$rotation.width() / 2 - self.$item.width() / 2,
        y: self.$rotation.height() / 2 - self.$item.height() / 2,
      },
      { x: x, y: y },
    ]);

    // console.log({x:self.$rotation.width()/2, y:self.$rotation.height()/2})
    // console.log('x,y',x,y)
    // console.log('两点距离',distanceNumber)

    return {
      x: x,
      y: y,
      scale: scale,
      distanceNumber: distanceNumber,
    };
  },
};
/**
 * 3D旋转
 * @param id
 */
var Rotation3D = (window.Rotation3D = function (_opts) {
  var self = this;
  this.$rotation = $(_opts.id);
  this.$lineList = this.$rotation.find(".lineList");
  this.$item = this.$rotation.find(".rotation3D__item");
  this.$line = this.$rotation.find(".rotation3D__line");
  this.itemWidth = this.$item.width();
  this.itemHeight = this.$item.height();
  this.length = this.$item.length;
  // 圆计算
  this.rotation = Math.PI / 2; //圆周率/2
  this.destRotation = this.rotation;

  var xr = this.$rotation.width() * 0.5;
  var yr = this.$rotation.height() * 0.5;
  var xRadius = _opts.xRadius || 0;
  var yRadius = _opts.yRadius || 0;

  var opts = Object.assign(
    {
      farScale: 1, // 最小尺寸
      xs: xr, // x起点
      ys: yr, // y起点
      xr: xr - xRadius, // x半径-压缩
      yr: yr - yRadius, // y半径-压缩
      // 播放
      autoPlay: false,
      autoPlayDelay: 3000,
      currenIndex: -1,
      fps: 30,
      speed: 4,
    },
    _opts
  );
  Object.assign(this, opts);

  // 遍历子元素
  this.$item.each(function (index) {
    $(this).click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      self.goTo(index);
    });
  });
  // 当前控件进入离开
  this.$rotation.mouseenter(function () {
    clearInterval(self.autoPlayTimer);
  });
  this.$rotation.mouseleave(function () {
    self.onAutoPlay();
  });

  this.onAutoPlay();
  this.onDrag();
  this.render();
});
/**
 * item样式
 * x    x起点 + (尺寸 * 余弦 * x压缩) - 元素宽度一半
 * y    y起点 + (尺寸 * 正弦 * y压缩) - 元素宽度一半
 */
Rotation3D.prototype.itemStyle = function ($item, index, rotation) {
  // console.log(rotation)
  var parseSXY = circleMath.parseSXY(rotation, this);
  var scale = parseSXY.scale;
  var x = parseSXY.x;
  var y = parseSXY.y;
  var $line = this.$lineList.find(".rotation3D__line").eq(index);

  //设置当前子菜单的位置（left,top） = (x,y)
  $item.find(".scale").css({
    transform: `scale(${scale})`,
    // 'top': `${this.itemWidth * (1-scale) }`,
  });
  $item.css({
    position: "absolute",
    display: "inline-block",
    // opacity: scale,
    "z-index": parseInt(scale * 100),
    "transform-origin": "0px 0px",
    // 'transform': `translate(${x}px, ${y}px) scale(${scale})`,
    transform: `translate(${x}px, ${y}px)`,
  });

  /**
   * 线样式
   */
  $line.css({
    height: parseSXY.distanceNumber,
  });
  $line.find("svg").css({
    height: parseSXY.distanceNumber,
  });
  $line.find(".dot1").css({
    "offset-path": `path("M0 ${parseSXY.distanceNumber}, 0 0")`,
  });
  $line.find("#path1").attr({
    d: `M0 ${parseSXY.distanceNumber}, 0 0`,
  });

  $line.find(".dot2").css({
    "offset-path": `path("M0 ${parseSXY.distanceNumber / 2}, 0 0")`,
  });
  $line.find("#path2").attr({
    d: `M0 ${parseSXY.distanceNumber}, 0 0`,
  });

  $line.find(".dot3").css({
    "offset-path": `path("M20 ${parseSXY.distanceNumber} S 0 ${
      parseSXY.distanceNumber / 2
    }, 20 0")`,
  });
  $line.find("#path3").attr({
    d: `M20 ${parseSXY.distanceNumber} S 0 ${
      parseSXY.distanceNumber / 2
    }, 20 0`,
  });

  $line.find(".dot4").css({
    "offset-path": `path("M20 0 S 40 ${parseSXY.distanceNumber / 2}, 20 ${
      parseSXY.distanceNumber
    }")`,
  });
  $line.find("#path4").attr({
    d: `M20 0 S 40 ${parseSXY.distanceNumber / 2}, 20 ${
      parseSXY.distanceNumber
    }`,
  });
};
/**
 * line样式
 */
Rotation3D.prototype.lineStyle = function ($line, index, rotation) {
  var rotate = circleMath.parseRotate(rotation, this);
  // console.log(rotate)

  $line.css({
    transform: "rotate(" + rotate + "deg)",
  });
  this.$lineList.css({
    // transform: `rotateX(${this.yRadius / 3}deg)`,
  });
};

/**
 * 旋转至index
 */
Rotation3D.prototype.goTo = function (index) {
  var self = this;
  this.currenIndex = index;
  console.log("currenIndex", index);
  /**
   * 1.计算floatIndex,用于控死amdiff
   */
  var itemsRotated =
    (this.length * (Math.PI / 2 - this.rotation)) / (2 * Math.PI);
  var floatIndex = itemsRotated % this.length;
  if (floatIndex < 0) {
    floatIndex = floatIndex + this.length;
  }

  /**
   * 2.计算diff,判断方向正反
   */
  var diff = index - (floatIndex % this.length);
  if (2 * Math.abs(diff) > this.length) {
    diff -= diff > 0 ? this.length : -this.length;
  }
  // 停止任何正在进行的旋转
  this.destRotation += ((2 * Math.PI) / this.length) * -diff;
  this.scheduleNextFrame();
};
/**
 * 定时器渐近旋转
 */
Rotation3D.prototype.scheduleNextFrame = function () {
  var self = this;
  this.lastTime = time();
  // 暂停
  var pause = function () {
    cancelFrame ? cancelFrame(this.timer) : clearTimeout(self.timer);
    self.timer = 0;
  };
  // 渐进播放
  var playFrame = function () {
    var rem = self.destRotation - self.rotation;
    var now = time(),
      dt = (now - self.lastTime) * 0.002;
    self.lastTime = now;
    // console.log('rem',rem)

    if (Math.abs(rem) < 0.003) {
      self.rotation = self.destRotation;
      pause();
    } else {
      // 渐近地接近目的地
      self.rotation = self.destRotation - rem / (1 + self.speed * dt);
      self.scheduleNextFrame();
    }
    self.render();
  };

  this.timer = cancelFrame
    ? requestFrame(playFrame)
    : setTimeout(playFrame, 1000 / this.fps);
};
/**
 * 更新
 */
Rotation3D.prototype.render = function () {
  var self = this;

  // 图形间隔：弧度
  var spacing = (2 * Math.PI) / this.$item.length;
  var itemRotation = this.rotation;
  var lineRotation = this.rotation + Math.PI / 2;

  this.$item.each(function (index) {
    self.itemStyle($(this), index, itemRotation);
    itemRotation += spacing;
  });
  this.$line.each(function (index) {
    self.lineStyle($(this), index, lineRotation);
    lineRotation += spacing;
  });
};
/**
 * 自动播放
 */
Rotation3D.prototype.onAutoPlay = function () {
  var self = this;

  if (this.autoPlay) {
    this.autoPlayTimer = setInterval(function () {
      if (self.currenIndex < 0) {
        self.currenIndex = self.length - 1;
      }
      self.goTo(self.currenIndex);
      self.currenIndex--; //倒叙
    }, this.autoPlayDelay);
  }
};
/**
 * 拖拽
 */
Rotation3D.prototype.onDrag = function () {
  var self = this;
  var startX, startY, moveX, moveY, endX, endY;

  // 拖拽：三个事件-按下 移动 抬起
  //按下
  this.$rotation.mousedown(function (e) {
    startX = e.pageX;
    startY = e.pageY;

    // 移动
    $(document).mousemove(function (e) {
      // console.log('移动');
      endX = e.pageX;
      endY = e.pageY;
      moveX = endX - startX;
      moveY = endY - startY;
      // console.log('x,y',moveX,moveY);
    });
    // 抬起
    $(document).mouseup(function (e) {
      endX = e.pageX;
      endY = e.pageY;
      moveX = endX - startX;
      moveY = endY - startY;

      // 每40旋转一步
      var moveIndex = parseInt(Math.abs(moveX) / 50);
      console.log("moveIndex", moveIndex);
      if (moveIndex > 0) {
        // console.log(moveX<0 ? '向左' : '向右')
        if (moveX < 0) {
          //向左
          self.currenIndex = self.currenIndex - moveIndex;
          play(moveIndex);
        } else {
          //向右
          self.currenIndex = self.currenIndex + moveIndex;
          play(moveIndex);
        }
      }

      // 解绑
      $(document).unbind("mousemove");
      $(document).unbind("mouseup");
    });
  });

  function play() {
    if (self.currenIndex == 0) {
      self.currenIndex = self.length - 1;
    }
    self.goTo(self.currenIndex % self.length);
  }
};
