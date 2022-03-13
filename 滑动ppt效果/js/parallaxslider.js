/************************************************************************************************************
 *
 * @ Version 1.0.2
 * @ Parallax slider
 * @ Date 03. 24. 2016
 * @ Author PIGNOSE
 * @ Licensed under MIT.
 *
 ***********************************************************************************************************/

! function(t) {
	t.fn.pignoseParallaxSlider = function(i) {
		var e = {
			init: function(i) {
				var n = this;
				return this.settings = t.extend({
						speed: 1200,
						interval: 3e3,
						direction: "right",
						easing: "easeInOutExpo",
						diffTime: 300,
						controlAnim: !0,
						pagination: !0,
						auto: !0,
						isLocal: !0,
						play: null,
						pause: null,
						next: null,
						prev: null,
						afterMoved: null
					}, i), void 0 === t.easing && void 0 === window.easing && (this.settings.easing = ""),
					this.each(function() {
						var i, s, a = t(this),
							l = t(this).children(".slide-visual"),
							d = l.children(".slide-group"),
							r = l.find(".script-group").wrap('<div class="script-inner"></div>'),
							o = n.settings.isLocal === !0 ? a : t(document);
						a.addClass("pignose-parallaxslider"), void 0 !== n.settings.play && null !== n
							.settings.play && o.find(n.settings.play).unbind(
								"click.slideControlHandler").bind("click.slideControlHandler", function(
								t) {
								if (s) try {
									clearInterval(s)
								} catch (i) {}
								s = setInterval(function() {
									e.move.apply(n, Array(n.settings.direction))
								}, n.settings.interval), t.preventDefault()
							}), void 0 !== n.settings.pause && null !== n.settings.pause && o.find(n
								.settings.pause).unbind("click.slideControlHandler").bind(
								"click.slideControlHandler",
								function(t) {
									if (s) try {
										clearInterval(s)
									} catch (i) {}
									s = null, t.preventDefault()
								}), void 0 !== n.settings.prev && null !== n.settings.play && o.find(n
								.settings.prev).unbind("click.slideControlHandler").bind(
								"click.slideControlHandler",
								function(t) {
									e.move.apply(n, ["left" == n.settings.direction ? "right" : "left",
										1, !0
									]), t.preventDefault()
								}), void 0 !== n.settings.next && null !== n.settings.play && o.find(n
								.settings.next).unbind("click.slideControlHandler").bind(
								"click.slideControlHandler",
								function(t) {
									e.move.apply(n, [n.settings.direction, 1, !0]), t.preventDefault()
								}), r.parent().after('<div class="script-tint"></div>'), l.append(
								'<div class="slide_tint left">&nbsp;</div>').append(
								'<div class="slide_tint right">&nbsp;</div>'), n.$slide = d.data("type",
								"slide"), n.$script = r.data("type", "script"), n.currIdx = 0, n
							.settings.pagination === !0 && (i = t(
									'<div class="slide-pagination"></div>'), i.appendTo(r.parent()), n
								.$pagination = i), d.add(r).each(function() {
								var s = t(this).children("li"),
									a = 0;
								s.clone().appendTo(t(this)).addClass("slide-dummy"), s.clone()
									.prependTo(t(this)).addClass("slide-dummy"), s.each(function(
									l) {
										a += s.width(), r.length > 0 && n.settings
											.pagination === !0 && i.length > 0 && !i.hasClass(
												"completedPagination") && ($page = t(
													'<a href="#" class="btn-page">' + (l + 1) +
													"氩堨Ц 鞀澕鞚措摐 氤搓赴</a>"), l == n.currIdx &&
												$page.addClass("on"), $page.bind(
													"click.slideControlHandler",
													function(i) {
														var s = t(this).index() - n.currIdx,
															a = "right";
														0 > s && (a = "left", s *= -1), e.move
															.apply(n, [a, s, !0]), i
															.preventDefault()
													}), $page.appendTo(i))
									}), r.length > 0 && n.settings.pagination === !0 && i.addClass(
										"completedPagination"), n[t(this).data("type")] = {
										offset: a,
										width: 3 * a,
										widthOnce: s.outerWidth(!0),
										length: s.length
									}, t(this).css({
										display: "block",
										width: n[t(this).data("type")].width + "px",
										marginLeft: -n[t(this).data("type")].offset - s
											.outerWidth(!0) + "px",
										overflow: "hidden"
									}).children("li").css({
										display: "block",
										"float": "left"
									})
							}), n.settings.auto === !0 && (s = setInterval(function() {
								e.move.apply(n, Array(n.settings.direction))
							}, n.settings.interval))
					})
			},
			move: function(i, e) {
				if (void 0 === this.$slide) return !1;
				if (void 0 === this.$script) return !1;
				void 0 !== e && e > 0 || (e = 1);
				var n = this,
					s = 0;
				(1 == this.settings.controlAnim && !this.$slide.is(":animated") || 0 == this.settings
					.controlAnim) && ("right" == i ? (n.currIdx = (n.currIdx + e) % n.slide.length, this
					.$slide.add(this.$script).each(function() {
						var i = t(this);
						setTimeout(function() {
							i.stop(!0, !0).animate({
								marginLeft: -(n[i.data("type")].offset + n[i.data(
									"type")].widthOnce * (1 + e)) + "px"
							}, {
								duration: n.settings.speed,
								easing: n.settings.easing,
								complete: function() {
									t(this).children("li").slice(0, e).appendTo(
											i), t(this).css({
											marginLeft: -n[i.data("type")]
												.offset - n[i.data("type")]
												.widthOnce + "px"
										}), "function" == typeof n.settings
										.afterMoved && n.settings.afterMoved()
								}
							})
						}, s), s += n.settings.diffTime
					})) : "left" == i && (n.currIdx = n.currIdx - e, n.currIdx < 0 && (n.currIdx = n
					.slide.length + n.currIdx), this.$slide.add(this.$script).each(function() {
					var i = t(this);
					setTimeout(function() {
						i.stop(!0, !0).animate({
							marginLeft: -(n[i.data("type")].offset + n[i.data(
								"type")].widthOnce * (1 - e)) + "px"
						}, {
							duration: n.settings.speed,
							easing: n.settings.easing,
							complete: function() {
								t(this).children("li").slice(-e).prependTo(
										i), t(this).css({
										marginLeft: -n[i.data("type")]
											.offset - n[i.data("type")]
											.widthOnce + "px"
									}), "function" == typeof n.settings
									.afterMoved && n.settings.afterMoved()
							}
						})
					}, s), s += n.settings.diffTime
				})), n.settings.pagination === !0 && this.$pagination.children(".btn-page").eq(n
					.currIdx).addClass("on").siblings(".on").removeClass("on"))
			}
		};
		return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ?
			void console.log("Occurred error of an null method call") : e.init.apply(this, arguments)
	}
}(jQuery);
