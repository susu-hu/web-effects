/**
 * 俄罗斯方块
 * @author zhangkai.net
 */

import { createApp } from 'https://cdn.staticfile.net/vue/3.3.4/vue.esm-browser.prod.min.js';
import { TetrisGame } from './Tetris.js';

createApp({
    data: () => ({
        game: new TetrisGame(20, 10),   //游戏对象
        bgMap: Array(20).fill(Array(10).fill(0)), //游戏地图数组
        msg: "",                        //弹出消息
        score: 0,                       //得分
        level: 1,                       //关卡
        playTime: 0,                    //游戏时间
        playTimeID: 0,                  //游戏时间计时器ID
        clearLineCount: 0,              //消行计数
        flashEffect: false,             //激活消行闪烁动画效果
        downEffect: false,              //激活下落震动动画效果
        levelEffect: false,             //激活过关闪烁动画效果
        isOver: true,                   //是否结束
        isPause: false,                 //是否暂停
        timeoutID: 0,                   //计时器ID
        topTen: [],                     //排行榜
        countdown: 0,                   //开始时的倒计时
    }),
    created() {
        try {//读取排行榜
            this.topTen = JSON.parse(window.localStorage.getItem("topTen") || "[]")
                .sort((f, s) => s.score - f.score)
                .slice(0, 10)
                .map(n => { n.date = new Date(n.date); return n });
        } catch (error) { }

        // 监听方向键
        window.addEventListener("keydown", ev => {
            if (this.isOver || this.isPause) { return; }
            switch (ev.key) {
                case "ArrowLeft": this.left(); break;
                case "ArrowRight": this.right(); break;
                case "ArrowUp": this.up(); break;
                case "ArrowDown": this.down(); break;
            }
        })

        //判断触屏滑动
        let touchPoint = { x: 0, y: 0 };//
        document.addEventListener("touchstart", e => {
            if (this.isOver || this.isPause) { return; }
            e.preventDefault();
            let t = e.changedTouches[0];
            touchPoint = { x: t.screenX, y: t.screenY };
        })
        document.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
        document.addEventListener("touchend", e => {
            if (this.isOver || this.isPause) { return; }
            e.preventDefault();
            let t = e.changedTouches[0];
            let diff = { x: t.screenX - touchPoint.x, y: t.screenY - touchPoint.y };
            Math.abs(diff.x) < 5 ? diff.x = 0 : null;  //忽略横向小于 5 距离的滑动
            Math.abs(diff.y) < 5 ? diff.y = 0 : null;  //忽略纵向小于 5 距离的滑动
            Math.abs(diff.x) > Math.abs(diff.y) ? diff.y = 0 : diff.x = 0;  //斜向滑动时，忽略距离小的。相等时按纵向。
            // 0:上; 1:右; 2:下; 3:左
            if (diff.y < 0) { this.up(); return; };
            if (diff.x > 0) { this.right(); return; };
            if (diff.y > 0) { this.down(); return; };
            if (diff.x < 0) { this.left(); return; };
        })

        /** Gave Over 事件 */
        this.game.onGameOver = () => {
            window.clearInterval(this.playTimeID);
            this.isOver = true;
            this.msg = "Game Over";
            window.setTimeout(() => { this.msg = ""; }, 6000);
            this.topTen.push({
                date: new Date,
                level: this.level,
                clearLineCount: this.clearLineCount,
                score: this.score,
                playTime: this.playTime
            });
            this.topTen.sort((f, s) => s.score - f.score).splice(10);
            window.localStorage.setItem("topTen", JSON.stringify(this.topTen));
        };

        /** 消行事件
         * @param count {number} 消除的行数
        */
        this.game.onClearLine = count => {
            console.log("OK")
            this.clearLineCount += count;
            let _level = Math.floor(this.clearLineCount / 10) + 1;  //10行一关
            if (_level > this.level) {
                this.levelEffect = true;
                window.setTimeout(() => this.levelEffect = false, 200);
                this.level = _level;
            }
            this.score += count * 100 + (count - 1) * 50;    //一次清除行越多，额外得分越多
            this.flashEffect = true;
            window.setTimeout(() => this.flashEffect = false, 200);
        }
    },
    methods: {
        /** 向左移动 */
        left() { this.game.left(); this.update(); },

        /** 向右移动 */
        right() { this.game.right(); this.update(); },

        /** 向上移动 */
        up() { this.game.up(); this.update(); },

        /** 落下 */
        down() {
            this.game.down();
            this.update();
            this.downEffect = true; // 添加落下震动效果样式
            window.setTimeout(() => this.downEffect = false, 200);  //200毫秒后移除效果
        },
        play() {
            if (this.isOver) {
                this.bgMap = Array(20).fill(Array(10).fill(0));
                let _countdown = 3; //开始倒计时
                this.countdown = _countdown;
                let timer = window.setInterval(async () => {
                    this.countdown = 0;
                    await new Promise(res => window.setTimeout(() => res(), 100));
                    if (_countdown == 1) {
                        window.clearInterval(timer);

                        this.game.init();
                        this.isOver = false;
                        this.isPause = false;
                        this.score = 0;
                        this.level = 1;
                        this.playTime = 0;
                        this.playTimeID = window.setInterval(() => this.playTime += 1, 1000);
                        this.clearLineCount = 0;
                        this.next();
                    }
                    _countdown--;
                    this.countdown = _countdown;
                }, 1000)
            }
        },
        pause() {
            this.isPause = !this.isPause;
            if (this.isPause) {
                window.clearInterval(this.playTimeID);
            } else {
                this.playTimeID = window.setInterval(() => this.playTime += 1, 1000);
            }
            this.next();
        },
        next() {
            if (this.isOver || this.isPause) { return; }
            this.game.next();
            this.update();
        },
        update() {
            window.clearTimeout(this.timeoutID); //键盘操作时停止下落
            this.bgMap = [...this.game.bgMap];//浅拷贝，目的是激活 Vue 响应;
            this.timeoutID = window.setTimeout(this.next, Math.floor(1000 / this.level));
        }
    }
}).mount("#app");
