<template>
  <!--  -->
  <div>
    <div id="page-body">
      <!-- banner图文 -->
      <div class="banner-div">
        <img src="../../../../static/img/productModel/headbg.png" class="headbg" />
        <label class="banner-name">{{current.name}}</label>
        <label class="banner-title">{{current.title}}</label>
        <div class="banner-lab">
          <img src="../../../../static/img/productModel/banner@2x.png" class="banner-divimg" />
        </div>
        <label class="banner-desc">{{current.desc}}</label>
      </div>
      <!-- 播放视图 -->
      <div class="audio-div">
        <div class="bg-blur"></div>
        <div class="audio-block">
          <div class="header">
            <label class="startTime">{{ audio.currentTime | formatSecond}}</label>
            <div class="silder">
              <div class="slider" @touchstart="handleTouchStart">
                <div class="slider-track"></div>
                <div class="silderNone" :style="'width:'+silderNone+'%'"></div>
                <div class="slider-fill" :style="'width:'+sliderTime+'%'"></div>
                <div class="slider-thumb" :style="'left:'+sliderTime+'%'"></div>
              </div>
              <!--  -->
              <audio
                ref="audio"
                @pause="onPause"
                @play="onPlay"
                @timeupdate="onTimeupdate"
                @loadedmetadata="onLoadedmetadata"
                preload="auto"
                autoplay
                :src="current.audioHttp"
                controls="controls"
                style="display:none;"
              ></audio>
            </div>
            <label class="endtime">{{ audio.maxTime | formatSecond}}</label>
          </div>
          <!-- <label class="playname">{{current.title}}</label> -->
          <div class="model-div">
            <img
              src="../../../../static/img/productModel/lasticon.png"
              v-if="current.index!=1"
              class="lasticon"
              @click="switchAudio('top')"
            />
            <img src="../../../../static/img/productModel/lastnone.png" v-else class="lasticon" />
            <img
              v-if="play"
              src="../../../../static/img/productModel/stopicon.png"
              class="playicon"
              @click="startPlayOrPause"
            />
            <img
              v-else
              src="../../../../static/img/productModel/playicon.png"
              class="playicon"
              @click="startPlayOrPause"
            />
            <img
              v-if="current.nextIndex!=2"
              src="../../../../static/img/productModel/nexticon.png"
              class="nexticon"
              @click="switchAudio('bottom')"
            />
            <img v-else src="../../../../static/img/productModel/nextnone.png" class="nexticon" />
          </div>
        </div>
      </div>
      <!-- 课程内容 -->
      <div class="contents">
        <div class="contents-div">
          <label class="label-cont">课程内容</label>
          <label class="label-block"></label>
          <div class="label-text">
            第一次买重疾，这些都要注意
            医疗险，除了百万你还要知道这些写
            家庭支柱，都该看看寿险
            意外险，不是你该省的钱
          </div>
        </div>
      </div>
      <!-- 课程福利 -->
      <div class="welfare-div">
        <div class="contents-div">
          <label class="label-cont">课程福利</label>
          <label class="label-block"></label>
        </div>
        <div class="label-div">
          <div class="left-div">
            <img class="auimg" src="../../../../static/img/productModel/left.png" />
            <label class="auimgName">1次</label>
            <label class="auimgTitle">免费家庭风险测评</label>
          </div>
          <div class="right-div">
            <label class="auimgName">1V1</label>
            <label class="auimgTitle">专家免费咨询</label>
            <img class="auimg" src="../../../../static/img/productModel/right.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { truncate, ftruncate, truncateSync } from "fs";
import { fips } from "crypto";
import { clearInterval } from 'timers';
// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;
 
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
 
    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    // hours + ':' +
    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "0:00:00";
  }
}
var times=null;
export default {
  data() {
    return {
      sliderTime: 0,
      silderNone: 0,
    
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
 
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        minTime: 0,
        step: 0.1
      },
      lefticon: "",
      play: false, // 播放暂停按钮
      current: {
        startTime: "00:00",
        endtime: "00:00",
        index: 1,
        nextIndex: 1,
        poster: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
        name: "第一节:",
        author: "暂无",
        audioHttp: "../../../../static/audio/1.mp3",
        title: "四大基础险种",
        desc: "主讲老师:郭冲老师",
        content: {
          name: "课程内容",
          title:
            "第一次买重疾，这些都要注意 医疗险，除了百万你还要知道这些写家庭支柱，都该看看寿险意外险，不是你该省的钱"
        },
        times: ""
      }
    };
  },
  created() {
    var that = this;
    that.$refs.audio.play();
    that.play = true;
    that.$refs.audio.pause();
    //  that.silderNone=0;
 
  },
  mounted() {
    // this.$refs.audio.play();
    var that=this;
    that.play = true;
    // this.$refs.audio.pause();
      times= setInterval(() => {
      that.silderNone =that.silderNone+10;
         if(that.silderNone==100){
        window.clearInterval(times);
      }
     
    console.log("开始播放",that.silderNone);
 
    }, 1000);
  },
  methods: {
    /**
     * 控制音频的播放与暂停 {三元运算方式简单/后期优化}
     */
    startPlayOrPause() {
      console.log(this.audio.playing);
      if (!this.audio.playing) {
        this.play = true;
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
        this.play = false;
      }
    },
    /**
     * 切换歌曲事件
     */
    switchAudio(value) {
      var that = this;
      if (value === "top") {
        this.current = {
          startTime: "00:00",
          endtime: "00:00",
          index: 1,
          nextIndex: 1,
          poster: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
          name: "第一节:",
          author: "暂无",
          audioHttp: "../../../../static/audio/1.mp3",
          title: "四大基础险种",
          desc: "主讲老师:郭冲老师",
          content: {
            name: "课程内容",
            title:
              "第一次买重疾，这些都要注意 医疗险，除了百万你还要知道这些写家庭支柱，都该看看寿险意外险，不是你该省的钱"
          },
          time: ""
        };
      } else if (value === "bottom") {
        this.current = {
          startTime: "00:00",
          endtime: "00:00",
          index: 2,
          nextIndex: 2,
          poster: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
          name: "第二节:",
          author: "暂无",
          audioHttp: "../../../../static/audio/2.mp3",
          title: "儿童保险",
          desc: "主讲老师:老白老师",
          content: {
            name: "课程内容",
            title:
              "第一次买重疾，这些都要注意 医疗险，除了百万你还要知道这些写家庭支柱，都该看看寿险意外险，不是你该省的钱"
          },
          time: ""
        };
      }
      this.sliderTime = 0;
      this.audio.currentTime = "00:00";
      this.play = true; // 更改播放暂停按钮为播放
      that.silderNone=0;
      // 切换下一首，进度条模拟预加载效果
       times= setInterval(() => {
      that.silderNone =that.silderNone+10;
         if(that.silderNone==100){
        window.clearInterval(times);
      }
     
    console.log("开始播放",that.silderNone);
 
    }, 1000);
      this.$refs.audio.play();
      // index = 0; // 清空颜色进度条
    },
    // 播放音频
    play() {
      console.log("你的播放开启了");
      this.$refs.audio.play();
      this.play = true;
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      console.log("音频正在播放中");
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
      var startTime = parseInt(this.audio.currentTime);
      console.log(
        "this.audio.playing",
        this.audio.playing,
        "maxTime",
        this.audio.maxTime
      );
      //
      this.play = false;
      if (startTime == this.audio.maxTime) {
        this.sliderTime = 0;
        this.audio.currentTime = "00:00";
      }
    },
    handleFocus() {
      console.log("focues");
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    // 结束时间
    onLoadedmetadata(res) {
      console.log("loadedmetadata");
      // console.log(res)
      this.audio.maxTime = parseInt(res.target.duration);
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      console.log("timeupdate");
      // console.log(res)
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
 
    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },
 
    handleTouchStart(e) {
      this.setValue(e.touches[0]);
      this.$refs.audio.play();
      document.addEventListener("touchmove", this.handleTouchMove);
      document.addEventListener("touchup", this.handleTouchEnd);
      document.addEventListener("touchend", this.handleTouchEnd);
      document.addEventListener("touchcancel", this.handleTouchEnd);
 
      // e.preventDefault();
      // this.onDragStart(e);
    },
    handleTouchMove(e) {
      console.log(e.changedTouches[0]);
      this.setValue(e.changedTouches[0]);
    },
    handleTouchEnd(e) {
      this.setValue(e.changedTouches[0]);
      document.removeEventListener("touchmove", this.handleTouchMove);
      document.removeEventListener("touchup", this.handleTouchEnd);
      document.removeEventListener("touchend", this.handleTouchEnd);
      document.removeEventListener("touchcancel", this.handleTouchEnd);
      // this.onDragStop(e);
    },
    // 从点击位置更新 value
    setValue(e) {
      const $el = this.$el;
      const { maxTime, minTime, step } = this.audio;
      let value =
        ((e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth) *
        (maxTime - minTime);
      value = Math.round(value / step) * step + minTime;
      value = parseFloat(value.toFixed(5));
 
      if (value > maxTime) {
        value = maxTime;
      } else if (value < minTime) {
        value = minTime;
      }
      this.$refs.audio.currentTime = value;
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      console.log("拖动进度条");
      // this.audio.playing && this.pause();
      // console.log('拖动了',index,this.sliderTime,this.audio.maxTime,parseInt(index / 100 * this.audio.maxTime))
      // !this.audio.playing && this.play();
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    }
  }
};
</script>
 
<style lang="less">
#page-body {
  background: #f5f5f5;
  overflow: hidden;
 
  .banner-div {
    font-size: 0.44rem;
    font-family: PingFangSC-Medium;
    color: rgba(51, 51, 51, 1);
    width: 100%;
    position: relative;
    background-color: #fff;
    text-align: center;
    height: 4rem;
 
    .headbg {
      width: 100%;
      height: 3rem;
    }
    .banner-lab {
      position: absolute;
      top: 0;
      width: 100%;
      padding-top: 0.5rem;
      height: 3rem;
    }
    .banner-divimg {
      width: 90%;
      margin: 0 auto;
      display: inline-block;
      height: 3.5rem;
    }
    .banner-name {
      position: absolute;
      z-index: 2;
      left: 1.1rem;
      top: 1.1rem;
    }
    .banner-title {
      position: absolute;
      z-index: 2;
      left: 1.1rem;
      top: 1.75rem;
    }
    .banner-desc {
      position: absolute;
      z-index: 2;
      left: 1.1rem;
      font-size: 0.28rem;
      top: 2.8rem;
    }
  }
  .audio-div {
    position: relative;
    width: 100%;
    height: 2.4rem;
    background: #fff;
    margin-bottom: 0.2rem;
 
    .audio-block {
      width: 100%;
      height: 0.9rem;
      display: inline-block;
      position: relative;
      .header {
        position: relative;
        width: 68%;
        display: inline-block;
        top: 0;
        text-align: center;
        height: 0.7rem;
        line-height: 0.7rem;
 
        .slider {
          width: 100%;
          position: relative;
          height: 0.1rem;
          left: 1.2rem;
          display: flex;
          align-items: center;
          bottom: 0.15rem;
          cursor: default;
          border-radius: 0.3rem;
          user-select: none;
          outline: none;
        }
        .silderNone {
            position: absolute;
          height: 0.1rem;
          width: 100%;
          background-color:#ccc;
          left: 0;
          border-radius: 0.3rem;
          top: 50%;
          margin-top: -1px;
        }
 
        .slider-track {
          position: absolute;
          height: 0.1rem;
          left: 0;
          right: 0;
          border-radius: 0.3rem;
          top: 50%;
          background-color: #e4e4e4;
        }
 
        .slider-fill {
          position: absolute;
          height: 0.1rem;
          width: 100%;
          background-color: #ffbb38;
          left: 0;
          border-radius: 0.3rem;
          top: 50%;
          margin-top: -1px;
        }
 
        .slider-thumb {
          position: absolute;
          width: 0.27rem;
          top: 0.08rem;
          height: 0.27rem;
          background-color: #ffbb38;
          color: #ffbb38;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
        }
     
        .startTime {
          font-size: 0.25rem;
          position: absolute;
          z-index: 2;
          left: 0.35rem;
          font-size: 0.26rem;
          bottom: 0.45rem;
        }
        .endtime {
          font-size: 0.25rem;
          position: absolute;
          z-index: 2;
          left: 6.5rem;
          bottom: 0.45rem;
        }
      }
    }
 
    .model-div {
      position: relative;
      width: 100%;
      bottom: 0.5rem;
      height: 1rem;
      text-align: center;
    }
    .playicon {
      width: 1rem;
      height: 1rem;
      position: relative;
      display: inline-block;
      top: 0;
    }
    .lasticon {
      position: absolute;
      width: 0.74rem;
      height: 0.74rem;
      left: 1.2rem;
      top: 0.2rem;
    }
 
    .nexticon {
      position: absolute;
      width: 0.74rem;
      height: 0.74rem;
      right: 1.2rem;
      top: 0.2rem;
    }
  }
  //
  .contents {
    position: relative;
    width: 100%;
    height: 3.04rem;
    margin-bottom: 0.2rem;
    background: #fff;
    .contents-div {
      position: relative;
      width: 100%;
      top: 0.1rem;
      padding-top: 0.3rem;
      height: 0.5rem;
      /* background: red; */
      .label-cont {
        position: absolute;
        left: 0.26rem;
        font-size: 0.4rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(247, 97, 21, 1);
        z-index: 1;
      }
 
      .label-block {
        position: absolute;
        left: 0.22rem;
        width: 1.69rem;
        height: 0.14rem;
        background: rgba(255, 234, 205, 1);
        border-radius: 0.7rem;
        bottom: 0.1rem;
      }
    }
    .label-text {
      position: absolute;
      font-size: 0.3rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      width: 7rem;
      height: 1.66rem;
      line-height: 1.5em;
      left: 0.3rem;
      top: 1rem;
      left: 0.3rem;
      color: rgba(88, 96, 106, 1);
    }
  }
 
  .welfare-div {
    position: relative;
    width: 100%;
    height: 3.34rem;
    background: #ffffff;
    .contents-div {
      position: relative;
      width: 100%;
      top: 0.1rem;
      padding-top: 0.3rem;
      height: 0.5rem;
      /* background: red; */
      .label-cont {
        position: absolute;
        left: 0.26rem;
        font-size: 0.4rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(247, 97, 21, 1);
        z-index: 1;
      }
      .label-block {
        position: absolute;
        left: 0.22rem;
        width: 1.69rem;
        height: 0.14rem;
        background: rgba(255, 234, 205, 1);
        border-radius: 0.7rem;
        bottom: 0.1rem;
      }
    }
    .label-div {
      position: relative;
      width: 100%;
      height: 2rem;
      top: 0.2rem;
      text-align: center;
    }
 
    .left-div {
      position: absolute;
      left: 0.3rem;
      width: 3.32rem;
      background: #fff;
      height: 1.52rem;
      top: 0.2rem;
    }
 
    .right-div {
      position: absolute;
      right: 0.3rem;
      width: 3.32rem;
      background: #fff;
      top: 0.2rem;
      height: 1.52rem;
    }
 
    .auimg {
      width: 3.32rem;
      height: 1.58rem;
    }
 
    .auimgName {
      position: absolute;
      z-index: 1;
      top: 0.35rem;
      left: 0;
      width: 100%;
      display: inline-block;
      font-size: 0.5rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(87, 26, 10, 1);
      text-align: center;
    }
 
    .auimgTitle {
      position: absolute;
      z-index: 1;
      width: 100%;
      left: 0;
      text-align: center;
      height: 0.3rem;
      display: inline-block;
      /* background: #007AFF; */
      top: 1rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(150, 84, 61, 1);
    }
  }
}
</style>