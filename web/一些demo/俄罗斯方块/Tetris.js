/**
 * 俄罗斯方块类
 * 
 * @method init 初始化游戏
 * @method counterClockwiseRotation 逆时针旋转
 * @method clockwiseRotation 顺时针旋转
 * 
 * @property id {number} 形状索引
 * @property matrix {array} 形状矩阵
 * @property width {number} 形状宽度
 * @property height {number} 形状高度
 * @property point {object} 位置
 * 
 * @author zhangkai.net
 */

/**
 * 方块类
 */
class Block {
    /**构造过程
     * @param id {number} 构造指定的形状索引
     */
    constructor(id) {
        let block = [
            [[1, 1], [1, 1]],        //  田
            [[1, 1, 0], [0, 1, 1]],  //  -|_
            [[0, 1, 1], [1, 1, 0]],  //  _|-
            [[0, 0, 1], [1, 1, 1]],  //  __|
            [[1, 0, 0], [1, 1, 1]],  //  |__
            [[0, 1, 0], [1, 1, 1]],  //  _|_
            [[1, 1, 1, 1]]           //  ----
        ];

        /** 形状索引，用于区分不同形状*/
        this.id = id + 1;

        /** 矩阵 */
        this.matrix = block[id];

        /** 位置。默认为出生位置 */
        this.point = { x: 4, y: 0 };
    }

    /** 形状宽度 */
    get width() {
        return this.matrix[0].length;
    }

    /** 形状高度 */
    get height() {
        return this.matrix.length;
    }

    /** 逆时针转 */
    counterClockwiseRotation() {
        let r_arr = [];
        this.matrix.forEach((n, i) => {
            n.forEach((m, j) => {
                r_arr[j] ? null : r_arr[j] = [];
                r_arr[j][i] = m;
            });
        });
        this.matrix = r_arr.reverse();
    }

    /** 顺时针转 */
    clockwiseRotation() {
        let r_arr = [];
        this.matrix.reverse().forEach((n, i) => {
            n.forEach((m, j) => {
                r_arr[j] ? null : r_arr[j] = [];
                r_arr[j][i] = m;
            });
        });
        this.matrix = r_arr;
    }
}

/**
 * 游戏类，控制方块的移动，碰撞检测等
 * 
 * @method init 初始化游戏
 * @method left 左移
 * @method right 右移
 * @method up 旋转
 * @method down 下落
 * @method next 下一个方块
 * @method drawBlock 绘制方块
 * @method move 移动
 * @method isCollision 碰撞检测
 * 
 * @event onClearLine 清除行事件
 * @event onGameOver 游戏结束事件
 */
export class TetrisGame {
    constructor(rows = 20, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        this.bgMap = [];
        for (let i = 0; i < this.rows; i++) {
            this.bgMap.push(Array(this.cols).fill(0));
        };
    }

    init() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.bgMap[i][j] = 0;
            }
        };
        this.curBlock = new Block(Math.floor(Math.random() * 7));
        this.nextBlock = new Block(Math.floor(Math.random() * 7));
        this.drawBlock();
    }

    left() {
        this.move(-1, 0);
    }

    right() {
        this.move(1, 0);
    }

    up() {
        this.drawBlock(0);
        this.curBlock.clockwiseRotation();
        if (this.isCollision(0, 0)) {
            this.curBlock.counterClockwiseRotation();   //转动之后如果碰撞则再转回来，表示不能旋转
        }
        this.drawBlock();
    }

    down() {
        let y = 1
        while (!this.isCollision(0, y)) {
            y += 1;
        }
        this.move(0, y - 1);
    }

    next() {
        if (this.isCollision(0, 1)) {

            this.drawBlock(-1);

            //-------------------------------------------------------------------------    
            /** 要清除行的索引列表 */
            let clearLine = [];
            this.bgMap.forEach((n, i) => {
                if (n.every(m => m)) { clearLine.push(i) };
            })
            clearLine.forEach((n, i) => {
                this.bgMap.splice(n, 1);
                this.bgMap.unshift(Array(this.cols).fill(0));
            });
            clearLine.length && this.onClearLine ? this.onClearLine(clearLine.length) : null;   //引发清除行事件
            //-------------------------------------------------------------------------

            this.curBlock = this.nextBlock;
            // 游戏结束
            if (this.isCollision(0, 0)) { this.onGameOver ? this.onGameOver() : null; return; }

            this.drawBlock();
            this.nextBlock = new Block(Math.floor(Math.random() * 7));

        } else {
            this.move(0, 1);
        }

    }

    /** 将块数组“画”到背景数组中
     * @param v {number} 填充的数值，默认为块的 id
     */
    drawBlock(v = this.curBlock.id) {
        this.curBlock.matrix.forEach((n, i) => {
            n.forEach((m, j) => {
                m ? this.bgMap[this.curBlock.point.y + i][this.curBlock.point.x + j] = v : null;
            })
        });
    }

    /** 移动 */
    move(x = 0, y = 0) {
        if (!this.isCollision(x, y)) {

            this.drawBlock(0);

            this.curBlock.point.x += x;
            this.curBlock.point.y += y;

            this.drawBlock(this.curBlock.id);

        }
    }

    /** 碰撞检查 */
    isCollision(offX, offY) {
        if (this.curBlock.point.x + offX < 0) { return true };
        if (this.curBlock.point.x + offX + this.curBlock.width > this.cols) { return true };
        if (this.curBlock.point.y + offY + this.curBlock.height > this.rows) { return true };

        for (let i = 0; i < this.curBlock.height; i++) {
            for (let j = 0; j < this.curBlock.width; j++) {
                if (this.bgMap[this.curBlock.point.y + i + offY][this.curBlock.point.x + j + offX] == -1 && this.curBlock.matrix[i][j]) {
                    return true;
                }
            }
        }
        return false;
    }
};