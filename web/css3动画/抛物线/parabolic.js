/*!
参考链接：
https://www.zhangxinxu.com/wordpress/2013/12/javascript-js-%E5%85%83%E7%B4%A0-%E6%8A%9B%E7%89%A9%E7%BA%BF-%E8%BF%90%E5%8A%A8-%E5%8A%A8%E7%94%BB/
*/
var funParabola = function (element, target, options) {
    /*
     * 缃戦〉妯℃嫙鐜板疄闇€瑕佷竴涓瘮渚嬪昂
     * 濡傛灉鎸夌収1鍍忕礌灏辨槸1绫虫潵绠楋紝鏄剧劧涓嶅悎閫傦紝鍥犱负椤甸潰鍔ㄤ笉鍔ㄥ氨鍑犵櫨鍍忕礌
     * 椤甸潰涓婏紝鎴戜滑鏀句袱涓墿浣擄紝200~800鍍忕礌涔嬮棿锛屾垜浠彲浠ユ槧灏勪负鐜板疄涓栫晫鐨�2绫冲埌8绫筹紝涔熷氨鏄�100:1
     * 涓嶈繃锛屾湰鏂规硶娌℃湁瀵规鏈夋墍浣撶幇锛屽洜姝や笉蹇呭湪鎰�
    */

    var defaults = {
        speed: 166.67, // 姣忓抚绉诲姩鐨勫儚绱犲ぇ灏忥紝姣忓抚锛堝浜庡ぇ閮ㄥ垎鏄剧ず灞忥級澶х害16~17姣
        curvature: 0.001,  // 瀹為檯鎸囩劍鐐瑰埌鍑嗙嚎鐨勮窛绂伙紝浣犲彲浠ユ娊璞℃垚鏇茬巼锛岃繖閲屾ā鎷熸墧鐗╀綋鐨勬姏鐗╃嚎锛屽洜姝ゆ槸寮€鍙ｅ悜涓嬬殑
        progress: function () { },
        complete: function () { }
    };

    var params = {}; options = options || {};

    for (var key in defaults) {
        params[key] = options[key] || defaults[key];
    }

    var exports = {
        mark: function () { return this; },
        position: function () { return this; },
        move: function () { return this; },
        init: function () { return this; }
    };

    /* 纭畾绉诲姩鐨勬柟寮� 
     * IE6-IE8 鏄痬argin浣嶇Щ
     * IE9+浣跨敤transform
    */
    var moveStyle = "margin", testDiv = document.createElement("div");
    if ("oninput" in testDiv) {
        ["", "ms", "webkit"].forEach(function (prefix) {
            var transform = prefix + (prefix ? "T" : "t") + "ransform";
            if (transform in testDiv.style) {
                moveStyle = transform;
            }
        });
    }

    // 鏍规嵁涓ょ偣鍧愭爣浠ュ強鏇茬巼纭畾杩愬姩鏇茬嚎鍑芥暟锛堜篃灏辨槸纭畾a, b鐨勫€硷級
    /* 鍏紡锛� y = a*x*x + b*x + c;
    */
    var a = params.curvature, b = 0, c = 0;

    // 鏄惁鎵ц杩愬姩鐨勬爣蹇楅噺
    var flagMove = true;

    if (element && target && element.nodeType == 1 && target.nodeType == 1) {
        var rectElement = {}, rectTarget = {};

        // 绉诲姩鍏冪礌鐨勪腑蹇冪偣浣嶇疆锛岀洰鏍囧厓绱犵殑涓績鐐逛綅缃�
        var centerElement = {}, centerTarget = {};

        // 鐩爣鍏冪礌鐨勫潗鏍囦綅缃�
        var coordElement = {}, coordTarget = {};

        // 鏍囨敞褰撳墠鍏冪礌鐨勫潗鏍�
        exports.mark = function () {
            if (flagMove == false) return this;
            if (typeof coordElement.x == "undefined") this.position();
            element.setAttribute("data-center", [coordElement.x, coordElement.y].join());
            target.setAttribute("data-center", [coordTarget.x, coordTarget.y].join());
            return this;
        }

        exports.position = function () {
            if (flagMove == false) return this;

            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            // 鍒濆浣嶇疆
            if (moveStyle == "margin") {
                element.style.marginLeft = element.style.marginTop = "0px";
            } else {
                element.style[moveStyle] = "translate(0, 0)";
            }

            // 鍥涜竟缂樼殑鍧愭爣
            rectElement = element.getBoundingClientRect();
            rectTarget = target.getBoundingClientRect();

            // 绉诲姩鍏冪礌鐨勪腑蹇冪偣鍧愭爣
            centerElement = {
                x: rectElement.left + (rectElement.right - rectElement.left) / 2 + scrollLeft,
                y: rectElement.top + (rectElement.bottom - rectElement.top) / 2 + scrollTop
            };

            // 鐩爣鍏冪礌鐨勪腑蹇冪偣浣嶇疆
            centerTarget = {
                x: rectTarget.left + (rectTarget.right - rectTarget.left) / 2 + scrollLeft,
                y: rectTarget.top + (rectTarget.bottom - rectTarget.top) / 2 + scrollTop
            };

            // 杞崲鎴愮浉瀵瑰潗鏍囦綅缃�
            coordElement = {
                x: 0,
                y: 0
            };
            coordTarget = {
                x: -1 * (centerElement.x - centerTarget.x),
                y: -1 * (centerElement.y - centerTarget.y)
            };

            /*
             * 鍥犱负缁忚繃(0, 0), 鍥犳c = 0
             * 浜庢槸锛�
             * y = a * x*x + b*x;
             * y1 = a * x1*x1 + b*x1;
             * y2 = a * x2*x2 + b*x2;
             * 鍒╃敤绗簩涓潗鏍囷細
             * b = (y2+ a*x2*x2) / x2
            */
            // 浜庢槸
            b = (coordTarget.y - a * coordTarget.x * coordTarget.x) / coordTarget.x;

            return this;
        };

        // 鎸夌収杩欎釜鏇茬嚎杩愬姩
        exports.move = function () {
            // 濡傛灉鏇茬嚎杩愬姩杩樻病鏈夌粨鏉燂紝涓嶅啀鎵ц鏂扮殑杩愬姩
            if (flagMove == false) return this;

            var startx = 0, rate = coordTarget.x > 0 ? 1 : -1;

            var step = function () {
                // 鍒囩嚎 y'=2ax+b
                var tangent = 2 * a * startx + b;
                // 涓嬮潰鏄牴鎹‘瀹氱殑绉诲姩閫熷害锛屽緱鍒板綋鍓嶅垏绾夸笅x涔熷氨鏄按骞虫柟鍚戠Щ鍔ㄧ殑澶у皬
                // 宸茬煡涓ょ偣涔嬮棿鐨勮窛绂讳负
                // Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
                // 鍥犳搴斿綋鏄�
                // Math.sqrt(鈻硏*鈻硏 + 鈻硑*鈻硑) = speed
                // 鍥犱负鍐欒繖娈典唬鐮佺殑鏃跺€欙紝鑴戝瓙涓嶅湪绾匡紝鎵€浠ワ紝鏍瑰彿蹇樿浜�
                // 灏卞鐢ㄤ簡涓嬮潰鐨勫叕寮忥紙瀵艰嚧寰堝灏忎紮浼翠笉鐞嗚В锛岃繖閲岃澹版姳姝夛級
                // 涓嶈繃瀵逛簬澶у姛鑳藉苟涓嶅奖鍝嶏紝灏辨槸杩欎釜speed鍙傛暟鍊兼湁浜涘ぇ锛屽搱鍝�
                // y*y + x*x = speed
                // (tangent * x)^2 + x*x = speed
                // x = Math.sqr(speed / (tangent * tangent + 1));
                startx = startx + rate * Math.sqrt(params.speed / (tangent * tangent + 1));

                // 闃叉杩囩晫
                if ((rate == 1 && startx > coordTarget.x) || (rate == -1 && startx < coordTarget.x)) {
                    startx = coordTarget.x;
                }
                var x = startx, y = a * x * x + b * x;

                // 鏍囪褰撳墠浣嶇疆锛岃繖閲屾湁娴嬭瘯浣跨敤鐨勫珜鐤戯紝瀹為檯浣跨敤鍙互灏嗚繖涓€琛屾敞閲�
                element.setAttribute("data-center", [Math.round(x), Math.round(y)].join());

                // x, y鐩墠鏄潗鏍囷紝闇€瑕佽浆鎹㈡垚瀹氫綅鐨勫儚绱犲€�
                if (moveStyle == "margin") {
                    element.style.marginLeft = x + "px";
                    element.style.marginTop = y + "px";
                } else {
                    element.style[moveStyle] = "translate(" + [x + "px", y + "px"].join() + ")";
                }

                if (startx !== coordTarget.x) {
                    params.progress(x, y);
                    window.requestAnimationFrame(step);
                } else {
                    // 杩愬姩缁撴潫锛屽洖璋冩墽琛�
                    params.complete();
                    flagMove = true;
                }
            };
            window.requestAnimationFrame(step);
            flagMove = false;

            return this;
        };

        // 鍒濆鍖栨柟娉�
        exports.init = function () {
            this.position().mark().move();
        };
    }

    return exports;
};

/*! requestAnimationFrame.js
低版本IE浏览器也有效果，需要再调用后面这个JS: requestAnimationFrame.js, 很少量的JS代码，主要做兼容处理的
*/

(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());