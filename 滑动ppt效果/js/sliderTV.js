/*! SliderTV | The MIT License (MIT) | Copyright (c) 2016 GibboK */ ! function(t, i, s) {
	"use strict";

	function e(t, i) {
		this._id = null, this._midPoints = {
				x: null,
				y: null
			}, this._itemDoms = [], this._focus = null, this._prevDom = null, this._nextDom = null, this
			._canCheckMovePrevNext = !0, this._isAnimationOn = !1, this.init(t, i)
	}
	var n = "sliderTV",
		o = {
			animation: {
				duration: 400,
				easing: "linear",
				isVertical: !1
			},
			bullets: {
				canShow: !0
			}
		};
	e.prototype = {
		init: function(i, s) {
			this.element = i, this.defaults = o, this.options = t.extend({}, o, s), this._getId(), this._listen(
					this), this._getItemDoms(), this._setItemPositions(), this._calculateMidPoint(), this
				._setFocus(0), this._createBullets(), this._getBullets(), this._updateBullets(), this
				._getNavigation(), this._showHidePrevNext()
		},
		_getId: function() {
			this._id = t(this.element).attr("id")
		},
		_listen: function() {
			t(this.element).on("move:next", function(t) {
				this._moveTo({
					to: "move:next"
				})
			}.bind(this)), t(this.element).on("move:prev", function(t) {
				this._moveTo({
					to: "move:prev"
				})
			}.bind(this)), t(this.element).on("move:jump", function(t, i) {
				this._moveTo(i)
			}.bind(this))
		},
		_calculateMidPoint: function() {
			var i = t(this.element),
				s = t(i).offset();
			this._midPoints.x = s.left + i.outerWidth() / 2, this._midPoints.y = s.top + i.outerHeight() / 2
		},
		_getItemDoms: function() {
			this._itemDoms = t(this.element).find(".sliderTV__item")
		},
		_setItemPositions: function() {
			if (this.options.animation.isVertical === !1) {
				var i = 0,
					s = 0;
				this._itemDoms.each(function(e, n) {
					s = t(n).width();
					var o = {
						position: "absolute",
						left: i,
						width: s
					};
					t(n).css(o), i += s
				})
			} else {
				var e = 0,
					n = 0;
				this._itemDoms.each(function(i, s) {
					n = t(s).height();
					var o = {
						position: "absolute",
						top: e,
						height: n
					};
					t(s).css(o), e += n
				})
			}
		},
		_setFocus: function(i) {
			this._removeFocus(), this._focus = i, this._itemDoms.each(function(i, s) {
				i === this._focus && t(s).addClass("sliderTV--focus")
			}.bind(this))
		},
		_removeFocus: function() {
			null !== this._focus && (t(this._itemDoms[this._focus]).removeClass("sliderTV--focus"), this
				._focus = null)
		},
		_createBullets: function() {
			if (this.options.bullets.canShow !== !1) {
				var i = "";
				i += '<div id="' + this._id + '__bullets" class="sliderTV__bullets">', this._itemDoms.each(
					function(t, s) {
						i += '<div class="sliderTV__bullet"></div>'
					}.bind(this)), i += "</div>", this._bulletsDom = t(i), t(this.element).append(this
					._bulletsDom)
			}
		},
		_getBullets: function() {
			this.options.bullets.canShow !== !1 && (this._bulletsDoms = t(this.element).find(
				".sliderTV__bullet"))
		},
		_updateBullets: function() {
			if (this.options.bullets.canShow !== !1) {
				this._deactiveBullets();
				var i = "sliderTV__bullet--active";
				this._bulletsDoms.each(function(s, e) {
					if (s === this._focus) t(e).addClass(i);
					else {
						var n = t(e).hasClass();
						n && t(e).removeClass(i)
					}
				}.bind(this))
			}
		},
		_deactiveBullets: function() {
			if (this.options.bullets.canShow !== !1) {
				var i = "sliderTV__bullet--active";
				this._bulletsDoms.each(function(s, e) {
					var n = t(e).hasClass(i);
					n && t(e).removeClass(i)
				}.bind(this))
			}
		},
		_getNavigation: function() {
			var i = t(this.element).find(".sliderTV__next"),
				s = t(this.element).find(".sliderTV__prev"),
				e = i.length > 0,
				n = s.length > 0;
			e && (this._nextDom = i[0]), n && (this._prevDom = s[0]), e && n && (this._canCheckMovePrevNext = !
				0)
		},
		_showHidePrevNext: function() {
			if (this._canCheckMovePrevNext) {
				var i = "visibility",
					s = "hidden",
					e = "visible",
					n = this._itemDoms.length;
				0 === n ? (this._prevDom.css(i, s), this._nextDom.css(i, s)) : 0 === this._focus ? (t(this
					._prevDom).css(i, s), t(this._nextDom).css(i, e)) : this._focus === n - 1 ? (t(this
					._prevDom).css(i, e), t(this._nextDom).css(i, s)) : (t(this._prevDom).css(i, e), t(this
					._nextDom).css(i, e))
			}
		},
		_isItemExists: function(t) {
			return Boolean(this._itemDoms[t])
		},
		_moveTo: function(i) {
			this._calculateMidPoint();
			var s, e = i.to,
				n = "canAnimate" in i ? i.canAnimate : !0,
				o = n ? this.options.animation.duration : 0,
				h = this.options.animation.easing,
				l = !0,
				a = this._focus;
			if ("move:next" === e ? a++ : "move:prev" === e ? a-- : "number" == typeof e ? a = e : l = !1, s =
				this._isItemExists(a), l && s && !this._isAnimationOn) {
				var _, m, u = t(this._itemDoms[a]),
					c = "move:next" === e ? 1 : -1,
					r = 1 === c ? "-=" : "+=";
				this.options.animation.isVertical === !1 ? (_ = u.outerWidth() / 2, m = (u.offset().left - this
						._midPoints.x + _) * c) : (_ = u.outerHeight() / 2, m = (u.offset().top - this
						._midPoints.y + _) * c), this._setFocus(a), this._updateBullets(), this
					._showHidePrevNext(), t(this.element).trigger("animation:start"), this.options.animation
					.isVertical === !1 ? this._itemDoms.each(function(i, s) {
						this._isAnimationOn = !0, t(s).animate({
							left: r + m
						}, o, h, function() {
							this._isAnimationOn = !1, t(this.element).trigger("animation:end")
						}.bind(this))
					}.bind(this)) : this._itemDoms.each(function(i, s) {
						this._isAnimationOn = !0, t(s).animate({
							top: r + m
						}, o, h, function() {
							this._isAnimationOn = !1, t(this.element).trigger("animation:end")
						}.bind(this))
					}.bind(this)), this._showHidePrevNext()
			}
		}
	};
	t.fn[n] = function(i) {
		return this.each(function() {
			t.data(this, "plugin_" + n) || t.data(this, "plugin_" + n, new e(this, i))
		})
	}, t.fn[n].defaults = o
}(jQuery, window, document);
