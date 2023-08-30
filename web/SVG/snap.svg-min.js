!(function (l) {
  var m,
    n,
    o = "0.4.2",
    p = "hasOwnProperty",
    q = /[\.\/]/,
    r = "*",
    s = function () {},
    t = function (c, d) {
      return c - d;
    },
    u = {
      n: {},
    },
    v = function (b, c) {
      b = String(b);
      var i,
        k = n,
        w = Array.prototype.slice.call(arguments, 2),
        x = v.listeners(b),
        y = 0,
        z = [],
        A = {},
        B = [],
        C = m;
      (m = b), (n = 0);
      for (var D = 0, E = x.length; E > D; D++) {
        "zIndex" in x[D] &&
          (z.push(x[D].zIndex), x[D].zIndex < 0 && (A[x[D].zIndex] = x[D]));
      }
      for (z.sort(t); z[y] < 0; ) {
        if (((i = A[z[y++]]), B.push(i.apply(c, w)), n)) {
          return (n = k), B;
        }
      }
      for (D = 0; E > D; D++) {
        if (((i = x[D]), "zIndex" in i)) {
          if (i.zIndex == z[y]) {
            if ((B.push(i.apply(c, w)), n)) {
              break;
            }
            do {
              if ((y++, (i = A[z[y]]), i && B.push(i.apply(c, w)), n)) {
                break;
              }
            } while (i);
          } else {
            A[i.zIndex] = i;
          }
        } else {
          if ((B.push(i.apply(c, w)), n)) {
            break;
          }
        }
      }
      return (n = k), (m = C), B.length ? B : null;
    };
  (v._events = u),
    (v.listeners = function (f) {
      var g,
        j,
        w,
        x,
        y,
        z,
        A,
        B,
        C = f.split(q),
        D = u,
        E = [D],
        F = [];
      for (x = 0, y = C.length; y > x; x++) {
        for (B = [], z = 0, A = E.length; A > z; z++) {
          for (D = E[z].n, j = [D[C[x]], D[r]], w = 2; w--; ) {
            (g = j[w]), g && (B.push(g), (F = F.concat(g.f || [])));
          }
        }
        E = B;
      }
      return F;
    }),
    (v.on = function (f, h) {
      if (((f = String(f)), "function" != typeof h)) {
        return function () {};
      }
      for (var i = f.split(q), j = u, k = 0, w = i.length; w > k; k++) {
        (j = j.n),
          (j =
            (j.hasOwnProperty(i[k]) && j[i[k]]) ||
            (j[i[k]] = {
              n: {},
            }));
      }
      for (j.f = j.f || [], k = 0, w = j.f.length; w > k; k++) {
        if (j.f[k] == h) {
          return s;
        }
      }
      return (
        j.f.push(h),
        function (b) {
          +b == +b && (h.zIndex = +b);
        }
      );
    }),
    (v.f = function (c) {
      var d = [].slice.call(arguments, 1);
      return function () {
        v.apply(null, [c, null].concat(d).concat([].slice.call(arguments, 0)));
      };
    }),
    (v.stop = function () {
      n = 1;
    }),
    (v.nt = function (b) {
      return b ? new RegExp("(?:\\.|\\/|^)" + b + "(?:\\.|\\/|$)").test(m) : m;
    }),
    (v.nts = function () {
      return m.split(q);
    }),
    (v.off = v.unbind =
      function (e, f) {
        if (!e) {
          return (
            (v._events = u =
              {
                n: {},
              }),
            void 0
          );
        }
        var g,
          j,
          k,
          w,
          x,
          y,
          z,
          A = e.split(q),
          B = [u];
        for (w = 0, x = A.length; x > w; w++) {
          for (y = 0; y < B.length; y += k.length - 2) {
            if (((k = [y, 1]), (g = B[y].n), A[w] != r)) {
              g[A[w]] && k.push(g[A[w]]);
            } else {
              for (j in g) {
                g[p](j) && k.push(g[j]);
              }
            }
            B.splice.apply(B, k);
          }
        }
        for (w = 0, x = B.length; x > w; w++) {
          for (g = B[w]; g.n; ) {
            if (f) {
              if (g.f) {
                for (y = 0, z = g.f.length; z > y; y++) {
                  if (g.f[y] == f) {
                    g.f.splice(y, 1);
                    break;
                  }
                }
                !g.f.length && delete g.f;
              }
              for (j in g.n) {
                if (g.n[p](j) && g.n[j].f) {
                  var C = g.n[j].f;
                  for (y = 0, z = C.length; z > y; y++) {
                    if (C[y] == f) {
                      C.splice(y, 1);
                      break;
                    }
                  }
                  !C.length && delete g.n[j].f;
                }
              }
            } else {
              delete g.f;
              for (j in g.n) {
                g.n[p](j) && g.n[j].f && delete g.n[j].f;
              }
            }
            g = g.n;
          }
        }
      }),
    (v.once = function (d, e) {
      var f = function () {
        return v.unbind(d, f), e.apply(this, arguments);
      };
      return v.on(d, f);
    }),
    (v.version = o),
    (v.toString = function () {
      return "You are running Eve " + o;
    }),
    "undefined" != typeof module && module.exports
      ? (module.exports = v)
      : "undefined" != typeof define
      ? define("eve", [], function () {
          return v;
        })
      : (l.eve = v);
})(this),
  (function (c, d) {
    "function" == typeof define && define.amd
      ? define(["eve"], function (a) {
          return d(c, a);
        })
      : d(c, c.eve);
  })(this, function (e, f) {
    var g = (function (a) {
      var r = {},
        s =
          e.requestAnimationFrame ||
          e.webkitRequestAnimationFrame ||
          e.mozRequestAnimationFrame ||
          e.oRequestAnimationFrame ||
          e.msRequestAnimationFrame ||
          function (b) {
            setTimeout(b, 16);
          },
        t =
          Array.isArray ||
          function (b) {
            return (
              b instanceof Array ||
              "[object Array]" == Object.prototype.toString.call(b)
            );
          },
        u = 0,
        v = "M" + (+new Date()).toString(36),
        w = function () {
          return v + (u++).toString(36);
        },
        x = function () {
          return +new Date();
        },
        y = function (d) {
          var i = this;
          if (null == d) {
            return i.s;
          }
          var j = i.s - d;
          (i.b += i.dur * j), (i.B += i.dur * j), (i.s = d);
        },
        z = function (c) {
          var d = this;
          return null == c ? d.spd : ((d.spd = c), void 0);
        },
        A = function (c) {
          var d = this;
          return null == c
            ? d.dur
            : ((d.s = (d.s * c) / d.dur), (d.dur = c), void 0);
        },
        B = function () {
          var b = this;
          delete r[b.id], a("mina.stop." + b.id, b);
        },
        C = function () {
          var b = this;
          b.pdif || (delete r[b.id], (b.pdif = b.get() - b.b));
        },
        D = function () {
          var b = this;
          b.pdif && ((b.b = b.get() - b.pdif), delete b.pdif, (r[b.id] = b));
        },
        E = function () {
          var b = 0;
          for (var c in r) {
            if (r.hasOwnProperty(c)) {
              var d,
                l = r[c],
                m = l.get();
              if (
                (b++,
                (l.s = (m - l.b) / (l.dur / l.spd)),
                l.s >= 1 && (delete r[c], (l.s = 1), b--),
                t(l.start))
              ) {
                d = [];
                for (var n = 0, o = l.start.length; o > n; n++) {
                  d[n] = l.start[n] + (l.end[n] - l.start[n]) * l.easing(l.s);
                }
              } else {
                d = l.start + (l.end - l.start) * l.easing(l.s);
              }
              l.set(d), 1 == l.s && a("mina.finish." + l.id, l);
            }
          }
          b && s(E);
        },
        F = function (c, d, j, k, l, m, n) {
          var o = {
            id: w(),
            start: c,
            end: d,
            b: j,
            s: 0,
            dur: k - j,
            spd: 1,
            get: l,
            set: m,
            easing: n || F.linear,
            status: y,
            speed: z,
            duration: A,
            stop: B,
            pause: C,
            resume: D,
          };
          r[o.id] = o;
          var p,
            q = 0;
          for (p in r) {
            if (r.hasOwnProperty(p) && (q++, 2 == q)) {
              break;
            }
          }
          return 1 == q && s(E), o;
        };
      return (
        (F.time = x),
        (F.getById = function (b) {
          return r[b] || null;
        }),
        (F.linear = function (b) {
          return b;
        }),
        (F.easeout = function (b) {
          return Math.pow(b, 1.7);
        }),
        (F.easein = function (b) {
          return Math.pow(b, 0.48);
        }),
        (F.easeinout = function (i) {
          if (1 == i) {
            return 1;
          }
          if (0 == i) {
            return 0;
          }
          var j = 0.48 - i / 1.04,
            k = Math.sqrt(0.1734 + j * j),
            l = k - j,
            m = Math.pow(Math.abs(l), 1 / 3) * (0 > l ? -1 : 1),
            n = -k - j,
            o = Math.pow(Math.abs(n), 1 / 3) * (0 > n ? -1 : 1),
            p = m + o + 0.5;
          return 3 * (1 - p) * p * p + p * p * p;
        }),
        (F.backin = function (c) {
          if (1 == c) {
            return 1;
          }
          var d = 1.70158;
          return c * c * ((d + 1) * c - d);
        }),
        (F.backout = function (c) {
          if (0 == c) {
            return 0;
          }
          c -= 1;
          var d = 1.70158;
          return c * c * ((d + 1) * c + d) + 1;
        }),
        (F.elastic = function (b) {
          return b == !!b
            ? b
            : Math.pow(2, -10 * b) *
                Math.sin(((b - 0.075) * 2 * Math.PI) / 0.3) +
                1;
        }),
        (F.bounce = function (i) {
          var j,
            k = 7.5625,
            l = 2.75;
          return (
            1 / l > i
              ? (j = k * i * i)
              : 2 / l > i
              ? ((i -= 1.5 / l), (j = k * i * i + 0.75))
              : 2.5 / l > i
              ? ((i -= 2.25 / l), (j = k * i * i + 0.9375))
              : ((i -= 2.625 / l), (j = k * i * i + 0.984375)),
            j
          );
        }),
        (e.mina = F),
        F
      );
    })("undefined" == typeof f ? function () {} : f);
    !(function () {
      function b(c) {
        c = c || Object(c);
        for (var i, j, k = 1, l = c.length + 1, m = n(c, 0); l > k; k++) {
          (i = j),
            (j = m),
            (m = n(c, k)),
            (this.raw += j),
            r.call(this, j, m, i);
        }
        return (
          (this._beforeEnd = function () {
            r.call(this, "", "", j);
          }),
          this
        );
      }
      function n(c, d) {
        return c && (c.charAt ? c.charAt(d) : c[d]);
      }
      function o(c, d) {
        (this.events = this.events || {}),
          (this.events[c] = this.events[c] || []),
          this.events[c].push(d);
      }
      function p(i, j, k) {
        "function" == typeof f &&
          f("elemental." + i + (j ? "." + j : ""), null, j, k || "", this.raw);
        for (var l = this.events && this.events[i], m = l && l.length; m--; ) {
          try {
            this.events[i][m](j, k || "", this.raw);
          } catch (y) {}
        }
        this.raw = "";
      }
      function q() {
        r.call(this, "eof"), this.event("eof");
      }
      function r(d, i, j) {
        "\n" == d && this.event("newline"), x[this.mode].call(this, d, i, j);
      }
      function s(a, d) {
        var i = function (c) {
          i.parse(c);
        };
        return (
          (i.mode = "text"),
          (i.type = String(a || "html").toLowerCase()),
          (i.textchunk = ""),
          (i.raw = ""),
          (i.parse = b),
          (i.on = o),
          (i.event = p),
          (i.end = q),
          d && (t = d),
          i
        );
      }
      var t = {
          lt: 60,
          "lt;": 60,
          "AMP;": 38,
          AMP: 38,
          "GT;": 62,
          GT: 62,
          "QUOT;": 34,
          QUOT: 34,
          "apos;": 39,
          "bull;": 8226,
          "bullet;": 8226,
          "copy;": 169,
          copy: 169,
          "deg;": 176,
          deg: 176,
        },
        u =
          /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]/,
        v = function (c) {
          var d;
          return (
            "#" == c.charAt() &&
              (d =
                "x" == c.charAt(1).toLowerCase()
                  ? parseInt(c.substring(2), 16)
                  : parseInt(c.substring(1), 10)),
            (d = t[c]),
            d ? String.fromCharCode(d) : "&" + c
          );
        },
        w = function () {
          for (var c in this.attr) {
            this.attr.hasOwnProperty(c) &&
              this.event("attr", c, {
                value: this.attr[c],
                tagname: this.tagname,
                attr: this.attr,
              });
          }
        },
        x = {
          text: function (c) {
            switch (c) {
              case "<":
              case "eof":
                (this.nodename = ""),
                  (this.attr = {}),
                  (this.mode = "tag name start"),
                  (this.raw = this.raw.slice(0, -1)),
                  this.textchunk && this.event("text", this.textchunk),
                  (this.raw += c),
                  (this.textchunk = "");
                break;
              case "&":
                (this.mode = "entity"), (this.entity = "");
                break;
              default:
                this.textchunk += c;
            }
          },
          entity: function (c) {
            u.test(c)
              ? ((this.textchunk += v(this.entity)), (this.mode = "text"))
              : ";" == c
              ? ((this.textchunk += v(this.entity + c)), (this.mode = "text"))
              : (this.entity += c);
          },
          special: function (d, i, j) {
            return "!" == j && "-" == d && "-" == i
              ? ((this.mode = "comment start"), void 0)
              : "[CDATA" == this.textchunk && "[" == d
              ? ((this.mode = "cdata"), (this.textchunk = ""), void 0)
              : ">" == d || "eof" == d
              ? (this.event("special", this.textchunk),
                (this.mode = "text"),
                (this.textchunk = ""),
                void 0)
              : ((this.textchunk += d), void 0);
          },
          cdata: function (d, i, j) {
            return "]" == j && "]" == d && ">" == i
              ? ((this.mode = "cdata end"),
                (this.textchunk = this.textchunk.slice(0, -1)),
                void 0)
              : ("eof" == d && x["cdata end"].call(this),
                (this.textchunk += d),
                void 0);
          },
          "cdata end": function () {
            this.event("cdata", this.textchunk),
              (this.textchunk = ""),
              (this.mode = "text");
          },
          "comment start": function (c, d) {
            ">" == d || "eof" == c
              ? (this.event("comment", ""), (this.mode = "skip"))
              : (this.mode = "comment");
          },
          skip: function () {
            this.mode = "text";
          },
          comment: function (d, i, j) {
            "-" == d && "-" == j && ">" == i
              ? ((this.mode = "comment end"),
                (this.textchunk = this.textchunk.slice(0, -1)))
              : "eof" == d
              ? this.event("comment", this.textchunk)
              : (this.textchunk += d);
          },
          "comment end": function () {
            this.event("comment", this.textchunk),
              (this.textchunk = ""),
              (this.mode = "text");
          },
          declaration: function (c, d) {
            return "?" == c && ">" == d
              ? ((this.mode = "declaration end"), void 0)
              : ("eof" == c && this.event("comment", this.textchunk),
                (this.textchunk += c),
                void 0);
          },
          "declaration end": function () {
            this.event("comment", this.textchunk),
              (this.textchunk = ""),
              (this.mode = "text");
          },
          "tag name start": function (d, i, j) {
            if ("eof" == d) {
              return this.event("text", "<"), void 0;
            }
            if (!u.test(d)) {
              if (((this.mode = "tag name"), "/" == d)) {
                return (this.mode = "close tag name start"), void 0;
              }
              if ("!" == d) {
                return (this.mode = "special"), (this.textchunk = ""), void 0;
              }
              if ("?" == d) {
                return (this.mode = "declaration"), void 0;
              }
              x[this.mode].call(this, d, i, j);
            }
          },
          "close tag name start": function (d, i, j) {
            u.test(d) ||
              ((this.mode = "close tag name"),
              (this.tagname = ""),
              (this.nodename = ""),
              x[this.mode].call(this, d, i, j));
          },
          "close tag name": function (c) {
            if (u.test(c)) {
              this.tagname = this.nodename;
            } else {
              switch (c) {
                case ">":
                  this.event("/tag", this.tagname || this.nodename),
                    (this.mode = "text");
                  break;
                default:
                  !this.tagname && (this.nodename += c);
              }
            }
          },
          "tag name": function (c, d) {
            if (u.test(c)) {
              (this.tagname = this.nodename),
                (this.nodename = ""),
                (this.mode = "attr start");
            } else {
              switch (c) {
                case ">":
                  this.event("tag", this.nodename), (this.mode = "text");
                  break;
                case "/":
                  (this.raw += d),
                    this.event("tag", this.nodename),
                    this.event("/tag", this.nodename),
                    (this.mode = "skip");
                  break;
                default:
                  this.nodename += c;
              }
            }
          },
          "attr start": function (d, i, j) {
            u.test(d) ||
              ((this.mode = "attr"),
              (this.nodename = ""),
              x[this.mode].call(this, d, i, j));
          },
          attr: function (c) {
            if (u.test(c) || "=" == c) {
              (this.attr[this.nodename] = ""), (this.mode = "attr value start");
            } else {
              switch (c) {
                case ">":
                  "/" == this.nodename
                    ? (delete this.attr["/"],
                      this.event("tag", this.tagname, this.attr),
                      w.call(this),
                      this.event("/tag", this.tagname, !0))
                    : (this.nodename && (this.attr[this.nodename] = ""),
                      this.event("tag", this.tagname, this.attr),
                      w.call(this)),
                    (this.mode = "text");
                  break;
                default:
                  this.nodename += c;
              }
            }
          },
          "attr value start": function (d, i, j) {
            if (!u.test(d)) {
              if (
                ((this.mode = "attr value"),
                (this.quote = !1),
                "'" == d || '"' == d)
              ) {
                return (this.quote = d), void 0;
              }
              x[this.mode].call(this, d, i, j);
            }
          },
          "attr value": function (d, i, j) {
            if (u.test(d) && !this.quote) {
              this.mode = "attr start";
            } else {
              if (">" != d || this.quote) {
                switch (d) {
                  case '"':
                  case "'":
                    this.quote == d && "\\" != j && (this.mode = "attr start");
                    break;
                  default:
                    this.attr[this.nodename] += d;
                }
              } else {
                this.event("tag", this.tagname, this.attr),
                  (this.mode = "text");
              }
            }
          },
        };
      (s.version = "0.2.4"),
        (("undefined" == typeof exports ? this : exports).elemental = s);
    })();
    var h = (function () {
      function ag(d, i) {
        if (d) {
          if (d.tagName) {
            return bg(d);
          }
          if (d instanceof a5) {
            return d;
          }
          if (null == i) {
            return (d = ax.doc.querySelector(d)), bg(d);
          }
        }
        return (
          (d = null == d ? "100%" : d),
          (i = null == i ? "100%" : i),
          new be(d, i)
        );
      }
      function aj(i, j) {
        if (j) {
          if (("string" == typeof i && (i = aj(i)), "string" == typeof j)) {
            return "xlink:" == j.substring(0, 6)
              ? i.getAttributeNS(ar, j.substring(6))
              : i.getAttribute(j);
          }
          for (var k in j) {
            if (j[aA](k)) {
              var l = aD(j[k]);
              l
                ? "xlink:" == k.substring(0, 6)
                  ? i.setAttributeNS(ar, k.substring(6), l)
                  : i.setAttribute(k, l)
                : i.removeAttribute(k);
            }
          }
        } else {
          i = ax.doc.createElementNS("http://www.w3.org/2000/svg", i);
        }
        return i;
      }
      function am(d, i) {
        return (
          (i = aD.prototype.toLowerCase.call(i)),
          "finite" == i
            ? !ba[aA](+d)
            : "array" == i &&
              (d instanceof Array || (Array.isArray && Array.isArray(d)))
            ? !0
            : ("null" == i && null === d) ||
              (i == typeof d && null !== d) ||
              ("object" == i && d === Object(d)) ||
              a6.call(d).slice(8, -1).toLowerCase() == i
        );
      }
      function ap(d) {
        if ("function" == typeof d || Object(d) !== d) {
          return d;
        }
        var i = new d.constructor();
        for (var j in d) {
          d[aA](j) && (i[j] = ap(d[j]));
        }
        return i;
      }
      function at(i, j) {
        for (var k = 0, l = i.length; l > k; k++) {
          if (i[k] === j) {
            return i.push(i.splice(k, 1)[0]);
          }
        }
      }
      function aw(i, j, k) {
        function l() {
          var d = Array.prototype.slice.call(arguments, 0),
            m = d.join("␀"),
            n = (l.cache = l.cache || {}),
            o = (l.count = l.count || []);
          return n[aA](m)
            ? (at(o, m), k ? k(n[m]) : n[m])
            : (o.length >= 1000 && delete n[o.shift()],
              o.push(m),
              (n[m] = i.apply(j, d)),
              k ? k(n[m]) : n[m]);
        }
        return l;
      }
      function az(i, j, k, l, m, n) {
        if (null == m) {
          var o = i - k,
            p = j - l;
          return o || p ? (180 + (180 * aM.atan2(-p, -o)) / aY + 360) % 360 : 0;
        }
        return az(i, j, m, n) - az(k, l, m, n);
      }
      function aC(d) {
        return ((d % 360) * aY) / 180;
      }
      function aF(d) {
        return ((180 * d) / aY) % 360;
      }
      function aI() {
        return this.x + a4 + this.y + a4 + this.width + " × " + this.height;
      }
      function aL(i, j, k, l, m, n) {
        return null == j && "[object SVGMatrix]" == a6.call(i)
          ? ((this.a = i.a),
            (this.b = i.b),
            (this.c = i.c),
            (this.d = i.d),
            (this.e = i.e),
            (this.f = i.f),
            void 0)
          : (null != i
              ? ((this.a = +i),
                (this.b = +j),
                (this.c = +k),
                (this.d = +l),
                (this.e = +m),
                (this.f = +n))
              : ((this.a = 1),
                (this.b = 0),
                (this.c = 0),
                (this.d = 1),
                (this.e = 0),
                (this.f = 0)),
            void 0);
      }
      function aO(d) {
        var i = [];
        return (
          (d = d.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (j, k, l) {
            return (
              (l = l.split(/\s*,\s*/)),
              "rotate" == k && 1 == l.length && l.push(0, 0),
              "scale" == k &&
                (2 == l.length && l.push(0, 0),
                1 == l.length && l.push(l[0], 0, 0)),
              "skewX" == k
                ? i.push(["m", 1, 0, aM.tan(aC(l[0])), 1, 0, 0])
                : "skewY" == k
                ? i.push(["m", 1, aM.tan(aC(l[0])), 0, 1, 0, 0])
                : i.push([k.charAt(0)].concat(l)),
              j
            );
          })),
          i
        );
      }
      function aR(n, r) {
        var s = aT(n),
          t = new aL();
        if (s) {
          for (var u = 0, v = s.length; v > u; u++) {
            var w,
              x,
              y,
              z,
              A,
              B = s[u],
              C = B.length,
              D = aD(B[0]).toLowerCase(),
              E = B[0] != D,
              F = E ? t.invert() : 0;
            "t" == D && 3 == C
              ? E
                ? ((w = F.x(0, 0)),
                  (x = F.y(0, 0)),
                  (y = F.x(B[1], B[2])),
                  (z = F.y(B[1], B[2])),
                  t.translate(y - w, z - x))
                : t.translate(B[1], B[2])
              : "r" == D
              ? 2 == C
                ? ((A = A || r),
                  t.rotate(B[1], A.x + A.width / 2, A.y + A.height / 2))
                : 4 == C &&
                  (E
                    ? ((y = F.x(B[2], B[3])),
                      (z = F.y(B[2], B[3])),
                      t.rotate(B[1], y, z))
                    : t.rotate(B[1], B[2], B[3]))
              : "s" == D
              ? 2 == C || 3 == C
                ? ((A = A || r),
                  t.scale(
                    B[1],
                    B[C - 1],
                    A.x + A.width / 2,
                    A.y + A.height / 2
                  ))
                : 4 == C
                ? E
                  ? ((y = F.x(B[2], B[3])),
                    (z = F.y(B[2], B[3])),
                    t.scale(B[1], B[1], y, z))
                  : t.scale(B[1], B[1], B[2], B[3])
                : 5 == C &&
                  (E
                    ? ((y = F.x(B[3], B[4])),
                      (z = F.y(B[3], B[4])),
                      t.scale(B[1], B[2], y, z))
                    : t.scale(B[1], B[2], B[3], B[4]))
              : "m" == D && 7 == C && t.add(B[1], B[2], B[3], B[4], B[5], B[6]);
          }
        }
        return t;
      }
      function aU(d, i) {
        if (null == i) {
          var j = !0;
          if (
            ((i =
              "linearGradient" == d.type || "radialGradient" == d.type
                ? d.node.getAttribute("gradientTransform")
                : "pattern" == d.type
                ? d.node.getAttribute("patternTransform")
                : d.node.getAttribute("transform")),
            !i)
          ) {
            return new aL();
          }
          i = aO(i);
        } else {
          (i = aW.test(i)
            ? aD(i).replace(/\.{3}|\u2026/g, d._.transform || a1)
            : aO(i)),
            am(i, "array") && (i = ag.path ? ag.path.toString.call(i) : aD(i)),
            (d._.transform = i);
        }
        var k = aR(i, d.getBBox(1));
        return j ? k : ((d.matrix = k), void 0);
      }
      function aX(d) {
        if (ag._.someDefs) {
          return ag._.someDefs;
        }
        var i =
            d.paper ||
            (d.node.parentNode && ag(d.node.parentNode)) ||
            ag.select("svg") ||
            ag(0, 0),
          j = i.select("defs").node;
        return j || (j = bc("defs", i.node).node), (ag._.someDefs = j), j;
      }
      function a0(k, l, m) {
        function n(d) {
          return null == d
            ? a1
            : d == +d
            ? d
            : (aj(s, {
                width: d,
              }),
              s.getBBox().width);
        }
        function o(d) {
          return null == d
            ? a1
            : d == +d
            ? d
            : (aj(s, {
                height: d,
              }),
              s.getBBox().height);
        }
        function p(i, j) {
          null == l
            ? (r[i] = j(k.attr(i)))
            : i == l && (r = j(null == m ? k.attr(i) : m));
        }
        var q = aX(k),
          r = {},
          s = q.querySelector(".svg---mgr");
        switch (
          (s ||
            ((s = aj("rect")),
            aj(s, {
              width: 10,
              height: 10,
              class: "svg---mgr",
            }),
            q.appendChild(s)),
          k.type)
        ) {
          case "rect":
            p("rx", n), p("ry", o);
          case "image":
            p("width", n), p("height", o);
          case "text":
            p("x", n), p("y", o);
            break;
          case "circle":
            p("cx", n), p("cy", o), p("r", n);
            break;
          case "ellipse":
            p("cx", n), p("cy", o), p("rx", n), p("ry", o);
            break;
          case "line":
            p("x1", n), p("x2", n), p("y1", o), p("y2", o);
            break;
          case "marker":
            p("refX", n),
              p("markerWidth", n),
              p("refY", o),
              p("markerHeight", o);
            break;
          case "radialGradient":
            p("fx", n), p("fy", o);
            break;
          case "tspan":
            p("dx", n), p("dy", o);
            break;
          default:
            p(l, n);
        }
        return r;
      }
      function a3(i) {
        am(i, "array") || (i = Array.prototype.slice.call(arguments, 0));
        for (var j = 0, k = 0, l = this.node; this[j]; ) {
          delete this[j++];
        }
        for (j = 0; j < i.length; j++) {
          "set" == i[j].type
            ? i[j].forEach(function (d) {
                l.appendChild(d.node);
              })
            : l.appendChild(i[j].node);
        }
        var m = l.childNodes;
        for (j = 0; j < m.length; j++) {
          m[j].snap && (this[k++] = av[m[j].snap]);
        }
      }
      function a5(i) {
        if (i.snap in av) {
          return av[i.snap];
        }
        var j,
          k = (this.id = ao());
        try {
          j = i.ownerSVGElement;
        } catch (l) {}
        if (
          ((this.node = i),
          j && (this.paper = new be(j)),
          (this.type = i.tagName),
          (this.anims = {}),
          (this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            deg: 0,
            dx: 0,
            dy: 0,
            dirty: 1,
          }),
          (i.snap = k),
          (av[k] = this),
          "g" == this.type)
        ) {
          this.add = a3;
          for (var m in be.prototype) {
            be.prototype[aA](m) && (this[m] = be.prototype[m]);
          }
        }
      }
      function a7(i) {
        for (var j, k = 0, l = i.length; l > k; k++) {
          if ((j = j || i[k])) {
            return j;
          }
        }
      }
      function a9(d) {
        this.node = d;
      }
      function bc(i, j) {
        var k = aj(i);
        j.appendChild(k);
        var l = bg(k);
        return (l.type = i), l;
      }
      function be(i, j) {
        var k,
          l,
          m,
          n = be.prototype;
        if (i && "svg" == i.tagName) {
          if (i.snap in av) {
            return av[i.snap];
          }
          (k = new a5(i)),
            (l = i.getElementsByTagName("desc")[0]),
            (m = i.getElementsByTagName("defs")[0]),
            l ||
              ((l = aj("desc")),
              l.appendChild(ax.doc.createTextNode("Created with Snap")),
              k.node.appendChild(l)),
            m || ((m = aj("defs")), k.node.appendChild(m)),
            (k.defs = m);
          for (var o in n) {
            n[aA](o) && (k[o] = n[o]);
          }
          k.paper = k.root = k;
        } else {
          (k = bc("svg", ax.doc.body)),
            aj(k.node, {
              height: j,
              version: 1.1,
              width: i,
              xmlns: "http://www.w3.org/2000/svg",
            });
        }
        return k;
      }
      function bg(d) {
        return d
          ? d instanceof a5 || d instanceof a9
            ? d
            : "svg" == d.tagName
            ? new be(d)
            : new a5(d)
          : d;
      }
      function c() {
        return this.selectAll("stop");
      }
      function ac(d, i) {
        var j = aj("stop"),
          k = {
            offset: +i + "%",
          };
        return (
          (d = ag.color(d)),
          (k["stop-color"] = d.hex),
          d.opacity < 1 && (k["stop-opacity"] = d.opacity),
          aj(j, k),
          this.node.appendChild(j),
          this
        );
      }
      function ae() {
        if ("linearGradient" == this.type) {
          var d = aj(this.node, "x1") || 0,
            j = aj(this.node, "x2") || 1,
            k = aj(this.node, "y1") || 0,
            l = aj(this.node, "y2") || 0;
          return ag._.box(d, k, aM.abs(j - d), aM.abs(l - k));
        }
        var m = this.node.cx || 0.5,
          n = this.node.cy || 0.5,
          o = this.node.r || 0;
        return ag._.box(m - o, n - o, 2 * o, 2 * o);
      }
      function ah(n, o) {
        function p(i, j) {
          for (var k = (j - u) / (i - v), l = v; i > l; l++) {
            s[l].offset = +(+u + k * (l - v)).toFixed(2);
          }
          (v = i), (u = j);
        }
        var q,
          r = a7(f("snap.util.grad.parse", null, o));
        if (!r) {
          return null;
        }
        r.params.unshift(n),
          (q =
            "l" == r.type.toLowerCase()
              ? ak.apply(0, r.params)
              : an.apply(0, r.params)),
          r.type != r.type.toLowerCase() &&
            aj(q.node, {
              gradientUnits: "userSpaceOnUse",
            });
        var s = r.stops,
          t = s.length,
          u = 0,
          v = 0;
        t--;
        for (var w = 0; t > w; w++) {
          "offset" in s[w] && p(w, s[w].offset);
        }
        for (
          s[t].offset = s[t].offset || 100, p(t, s[t].offset), w = 0;
          t >= w;
          w++
        ) {
          var x = s[w];
          q.addStop(x.color, x.offset);
        }
        return q;
      }
      function ak(i, j, k, l, m) {
        var n = bc("linearGradient", i);
        return (
          (n.stops = c),
          (n.addStop = ac),
          (n.getBBox = ae),
          null != j &&
            aj(n.node, {
              x1: j,
              y1: k,
              x2: l,
              y2: m,
            }),
          n
        );
      }
      function an(i, j, k, l, m, n) {
        var o = bc("radialGradient", i);
        return (
          (o.stops = c),
          (o.addStop = ac),
          (o.getBBox = ae),
          null != j &&
            aj(o.node, {
              cx: j,
              cy: k,
              r: l,
            }),
          null != m &&
            null != n &&
            aj(o.node, {
              fx: m,
              fy: n,
            }),
          o
        );
      }
      function aq(d) {
        return function (i) {
          if (
            (f.stop(),
            i instanceof a9 &&
              1 == i.node.childNodes.length &&
              ("radialGradient" == i.node.firstChild.tagName ||
                "linearGradient" == i.node.firstChild.tagName ||
                "pattern" == i.node.firstChild.tagName) &&
              ((i = i.node.firstChild), aX(this).appendChild(i), (i = bg(i))),
            i instanceof a5)
          ) {
            if (
              "radialGradient" == i.type ||
              "linearGradient" == i.type ||
              "pattern" == i.type
            ) {
              i.node.id ||
                aj(i.node, {
                  id: i.id,
                });
              var j = "url(#" + i.node.id + ")";
            } else {
              j = i.attr(d);
            }
          } else {
            if (((j = ag.color(i)), j.error)) {
              var k = ah(aX(this), i);
              k
                ? (k.node.id ||
                    aj(k.node, {
                      id: k.id,
                    }),
                  (j = "url(#" + k.node.id + ")"))
                : (j = i);
            } else {
              j = aD(j);
            }
          }
          var l = {};
          (l[d] = j), aj(this.node, l), (this.node.style[d] = a1);
        };
      }
      function au(i) {
        for (var j = [], k = i.childNodes, l = 0, m = k.length; m > l; l++) {
          var n = k[l];
          3 == n.nodeType && j.push(n.nodeValue),
            "tspan" == n.tagName &&
              (1 == n.childNodes.length && 3 == n.firstChild.nodeType
                ? j.push(n.firstChild.nodeValue)
                : j.push(au(n)));
        }
        return j;
      }
      (ag.version = "0.1.0"),
        (ag.toString = function () {
          return "Snap v" + this.version;
        }),
        (ag._ = {});
      var ax = {
        win: e,
        doc: e.document,
      };
      ag._.glob = ax;
      var aA = "hasOwnProperty",
        aD = String,
        aG = parseFloat,
        aJ = parseInt,
        aM = Math,
        aP = aM.max,
        aS = aM.min,
        aV = aM.abs,
        aY = (aM.pow, aM.PI),
        a1 = (aM.round, ""),
        a4 = " ",
        a6 = Object.prototype.toString,
        a8 =
          /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
        ba = {
          NaN: 1,
          Infinity: 1,
          "-Infinity": 1,
        },
        bd = /^url\(#?([^)]+)\)$/,
        bf = "	\n\f\r                　\u2028\u2029",
        bh = new RegExp("[," + bf + "]+"),
        a =
          (new RegExp("[" + bf + "]", "g"),
          new RegExp("[" + bf + "]*,[" + bf + "]*")),
        b = {
          hs: 1,
          rg: 1,
        },
        aa = new RegExp(
          "([a-z])[" +
            bf +
            ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" +
            bf +
            "]*,?[" +
            bf +
            "]*)+)",
          "ig"
        ),
        ad = new RegExp(
          "([rstm])[" +
            bf +
            ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" +
            bf +
            "]*,?[" +
            bf +
            "]*)+)",
          "ig"
        ),
        af = new RegExp(
          "(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + bf + "]*,?[" + bf + "]*",
          "ig"
        ),
        ai = 0,
        al = "S" + (+new Date()).toString(36),
        ao = function () {
          return al + (ai++).toString(36);
        },
        ar = "http://www.w3.org/1999/xlink",
        av = {};
      (ag._.$ = aj),
        (ag._.id = ao),
        (ag.format = (function () {
          var d = /\{([^\}]+)\}/g,
            i = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            j = function (k, l, m) {
              var n = m;
              return (
                l.replace(i, function (o, p, q, r, s) {
                  (p = p || r),
                    n &&
                      (p in n && (n = n[p]),
                      "function" == typeof n && s && (n = n()));
                }),
                (n = (null == n || n == m ? k : n) + "")
              );
            };
          return function (k, l) {
            return aD(k).replace(d, function (m, n) {
              return j(m, n, l);
            });
          };
        })());
      var ay = (function () {
        function d() {
          this.parentNode.removeChild(this);
        }
        return function (i, j) {
          var k = ax.doc.createElement("img"),
            l = ax.doc.body;
          (k.style.cssText = "position:absolute;left:-9999em;top:-9999em"),
            (k.onload = function () {
              j.call(k), (k.onload = k.onerror = null), l.removeChild(k);
            }),
            (k.onerror = d),
            l.appendChild(k),
            (k.src = i);
        };
      })();
      (ag._.clone = ap),
        (ag._.cacher = aw),
        (ag.rad = aC),
        (ag.deg = aF),
        (ag.angle = az),
        (ag.is = am),
        (ag.snapTo = function (i, j, k) {
          if (((k = am(k, "finite") ? k : 10), am(i, "array"))) {
            for (var l = i.length; l--; ) {
              if (aV(i[l] - j) <= k) {
                return i[l];
              }
            }
          } else {
            i = +i;
            var m = j % i;
            if (k > m) {
              return j - m;
            }
            if (m > i - k) {
              return j - m + i;
            }
          }
          return j;
        }),
        (function (d) {
          function i(k) {
            return k[0] * k[0] + k[1] * k[1];
          }
          function j(k) {
            var l = aM.sqrt(i(k));
            k[0] && (k[0] /= l), k[1] && (k[1] /= l);
          }
          (d.add = function (n, o, p, q, r, s) {
            var t,
              u,
              v,
              w,
              x = [[], [], []],
              y = [
                [this.a, this.c, this.e],
                [this.b, this.d, this.f],
                [0, 0, 1],
              ],
              z = [
                [n, p, r],
                [o, q, s],
                [0, 0, 1],
              ];
            for (
              n &&
                n instanceof aL &&
                (z = [
                  [n.a, n.c, n.e],
                  [n.b, n.d, n.f],
                  [0, 0, 1],
                ]),
                t = 0;
              3 > t;
              t++
            ) {
              for (u = 0; 3 > u; u++) {
                for (w = 0, v = 0; 3 > v; v++) {
                  w += y[t][v] * z[v][u];
                }
                x[t][u] = w;
              }
            }
            return (
              (this.a = x[0][0]),
              (this.b = x[1][0]),
              (this.c = x[0][1]),
              (this.d = x[1][1]),
              (this.e = x[0][2]),
              (this.f = x[1][2]),
              this
            );
          }),
            (d.invert = function () {
              var k = this,
                l = k.a * k.d - k.b * k.c;
              return new aL(
                k.d / l,
                -k.b / l,
                -k.c / l,
                k.a / l,
                (k.c * k.f - k.d * k.e) / l,
                (k.b * k.e - k.a * k.f) / l
              );
            }),
            (d.clone = function () {
              return new aL(this.a, this.b, this.c, this.d, this.e, this.f);
            }),
            (d.translate = function (k, l) {
              return this.add(1, 0, 0, 1, k, l);
            }),
            (d.scale = function (k, l, m, n) {
              return (
                null == l && (l = k),
                (m || n) && this.add(1, 0, 0, 1, m, n),
                this.add(k, 0, 0, l, 0, 0),
                (m || n) && this.add(1, 0, 0, 1, -m, -n),
                this
              );
            }),
            (d.rotate = function (k, l, m) {
              (k = aC(k)), (l = l || 0), (m = m || 0);
              var n = +aM.cos(k).toFixed(9),
                o = +aM.sin(k).toFixed(9);
              return this.add(n, o, -o, n, l, m), this.add(1, 0, 0, 1, -l, -m);
            }),
            (d.x = function (k, l) {
              return k * this.a + l * this.c + this.e;
            }),
            (d.y = function (k, l) {
              return k * this.b + l * this.d + this.f;
            }),
            (d.get = function (k) {
              return +this[aD.fromCharCode(97 + k)].toFixed(4);
            }),
            (d.toString = function () {
              return (
                "matrix(" +
                [
                  this.get(0),
                  this.get(1),
                  this.get(2),
                  this.get(3),
                  this.get(4),
                  this.get(5),
                ].join() +
                ")"
              );
            }),
            (d.offset = function () {
              return [this.e.toFixed(4), this.f.toFixed(4)];
            }),
            (d.split = function () {
              var k = {};
              (k.dx = this.e), (k.dy = this.f);
              var l = [
                [this.a, this.c],
                [this.b, this.d],
              ];
              (k.scalex = aM.sqrt(i(l[0]))),
                j(l[0]),
                (k.shear = l[0][0] * l[1][0] + l[0][1] * l[1][1]),
                (l[1] = [
                  l[1][0] - l[0][0] * k.shear,
                  l[1][1] - l[0][1] * k.shear,
                ]),
                (k.scaley = aM.sqrt(i(l[1]))),
                j(l[1]),
                (k.shear /= k.scaley);
              var m = -l[0][1],
                n = l[1][1];
              return (
                0 > n
                  ? ((k.rotate = aF(aM.acos(n))),
                    0 > m && (k.rotate = 360 - k.rotate))
                  : (k.rotate = aF(aM.asin(m))),
                (k.isSimple = !(
                  +k.shear.toFixed(9) ||
                  (k.scalex.toFixed(9) != k.scaley.toFixed(9) && k.rotate)
                )),
                (k.isSuperSimple =
                  !+k.shear.toFixed(9) &&
                  k.scalex.toFixed(9) == k.scaley.toFixed(9) &&
                  !k.rotate),
                (k.noRotation = !+k.shear.toFixed(9) && !k.rotate),
                k
              );
            }),
            (d.toTransformString = function (k) {
              var l = k || this.split();
              return l.isSimple
                ? ((l.scalex = +l.scalex.toFixed(4)),
                  (l.scaley = +l.scaley.toFixed(4)),
                  (l.rotate = +l.rotate.toFixed(4)),
                  (l.dx || l.dy
                    ? "t" + [+l.dx.toFixed(4), +l.dy.toFixed(4)]
                    : a1) +
                    (1 != l.scalex || 1 != l.scaley
                      ? "s" + [l.scalex, l.scaley, 0, 0]
                      : a1) +
                    (l.rotate ? "r" + [+l.rotate.toFixed(4), 0, 0] : a1))
                : "m" +
                    [
                      this.get(0),
                      this.get(1),
                      this.get(2),
                      this.get(3),
                      this.get(4),
                      this.get(5),
                    ];
            });
        })(aL.prototype),
        (ag.Matrix = aL),
        (ag.getRGB = aw(function (d) {
          if (!d || (d = aD(d)).indexOf("-") + 1) {
            return {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              error: 1,
              toString: aK,
            };
          }
          if ("none" == d) {
            return {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              toString: aK,
            };
          }
          if (
            (!(b[aA](d.toLowerCase().substring(0, 2)) || "#" == d.charAt()) &&
              (d = aB(d)),
            !d)
          ) {
            return {
              r: -1,
              g: -1,
              b: -1,
              hex: "none",
              error: 1,
              toString: aK,
            };
          }
          var k,
            l,
            m,
            n,
            o,
            p,
            q = d.match(a8);
          return q
            ? (q[2] &&
                ((m = aJ(q[2].substring(5), 16)),
                (l = aJ(q[2].substring(3, 5), 16)),
                (k = aJ(q[2].substring(1, 3), 16))),
              q[3] &&
                ((m = aJ((o = q[3].charAt(3)) + o, 16)),
                (l = aJ((o = q[3].charAt(2)) + o, 16)),
                (k = aJ((o = q[3].charAt(1)) + o, 16))),
              q[4] &&
                ((p = q[4].split(a)),
                (k = aG(p[0])),
                "%" == p[0].slice(-1) && (k *= 2.55),
                (l = aG(p[1])),
                "%" == p[1].slice(-1) && (l *= 2.55),
                (m = aG(p[2])),
                "%" == p[2].slice(-1) && (m *= 2.55),
                "rgba" == q[1].toLowerCase().slice(0, 4) && (n = aG(p[3])),
                p[3] && "%" == p[3].slice(-1) && (n /= 100)),
              q[5]
                ? ((p = q[5].split(a)),
                  (k = aG(p[0])),
                  "%" == p[0].slice(-1) && (k /= 100),
                  (l = aG(p[1])),
                  "%" == p[1].slice(-1) && (l /= 100),
                  (m = aG(p[2])),
                  "%" == p[2].slice(-1) && (m /= 100),
                  ("deg" == p[0].slice(-3) || "°" == p[0].slice(-1)) &&
                    (k /= 360),
                  "hsba" == q[1].toLowerCase().slice(0, 4) && (n = aG(p[3])),
                  p[3] && "%" == p[3].slice(-1) && (n /= 100),
                  ag.hsb2rgb(k, l, m, n))
                : q[6]
                ? ((p = q[6].split(a)),
                  (k = aG(p[0])),
                  "%" == p[0].slice(-1) && (k /= 100),
                  (l = aG(p[1])),
                  "%" == p[1].slice(-1) && (l /= 100),
                  (m = aG(p[2])),
                  "%" == p[2].slice(-1) && (m /= 100),
                  ("deg" == p[0].slice(-3) || "°" == p[0].slice(-1)) &&
                    (k /= 360),
                  "hsla" == q[1].toLowerCase().slice(0, 4) && (n = aG(p[3])),
                  p[3] && "%" == p[3].slice(-1) && (n /= 100),
                  ag.hsl2rgb(k, l, m, n))
                : ((k = aS(aM.round(k), 255)),
                  (l = aS(aM.round(l), 255)),
                  (m = aS(aM.round(m), 255)),
                  (n = aS(aP(n, 0), 1)),
                  (q = {
                    r: k,
                    g: l,
                    b: m,
                    toString: aK,
                  }),
                  (q.hex =
                    "#" +
                    (16777216 | m | (l << 8) | (k << 16))
                      .toString(16)
                      .slice(1)),
                  (q.opacity = am(n, "finite") ? n : 1),
                  q))
            : {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: aK,
              };
        }, ag)),
        (ag.hsb = aw(function (d, i, j) {
          return ag.hsb2rgb(d, i, j).hex;
        })),
        (ag.hsl = aw(function (d, i, j) {
          return ag.hsl2rgb(d, i, j).hex;
        })),
        (ag.rgb = aw(function (i, j, k, l) {
          if (am(l, "finite")) {
            var m = aM.round;
            return "rgba(" + [m(i), m(j), m(k), +l.toFixed(2)] + ")";
          }
          return (
            "#" + (16777216 | k | (j << 8) | (i << 16)).toString(16).slice(1)
          );
        }));
      var aB = function (d) {
          var i = ax.doc.getElementsByTagName("head")[0],
            j = "rgb(255, 0, 0)";
          return (
            (aB = aw(function (k) {
              if ("red" == k.toLowerCase()) {
                return j;
              }
              (i.style.color = j), (i.style.color = k);
              var l = ax.doc.defaultView
                .getComputedStyle(i, a1)
                .getPropertyValue("color");
              return l == j ? null : l;
            })),
            aB(d)
          );
        },
        aE = function () {
          return "hsb(" + [this.h, this.s, this.b] + ")";
        },
        aH = function () {
          return "hsl(" + [this.h, this.s, this.l] + ")";
        },
        aK = function () {
          return 1 == this.opacity || null == this.opacity
            ? this.hex
            : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")";
        },
        aN = function (d, i, j) {
          if (
            (null == i &&
              am(d, "object") &&
              "r" in d &&
              "g" in d &&
              "b" in d &&
              ((j = d.b), (i = d.g), (d = d.r)),
            null == i && am(d, string))
          ) {
            var k = ag.getRGB(d);
            (d = k.r), (i = k.g), (j = k.b);
          }
          return (
            (d > 1 || i > 1 || j > 1) && ((d /= 255), (i /= 255), (j /= 255)),
            [d, i, j]
          );
        },
        aQ = function (d, i, j, k) {
          (d = aM.round(255 * d)),
            (i = aM.round(255 * i)),
            (j = aM.round(255 * j));
          var l = {
            r: d,
            g: i,
            b: j,
            opacity: am(k, "finite") ? k : 1,
            hex: ag.rgb(d, i, j),
            toString: aK,
          };
          return am(k, "finite") && (l.opacity = k), l;
        };
      (ag.color = function (d) {
        var i;
        return (
          am(d, "object") && "h" in d && "s" in d && "b" in d
            ? ((i = ag.hsb2rgb(d)),
              (d.r = i.r),
              (d.g = i.g),
              (d.b = i.b),
              (d.opacity = 1),
              (d.hex = i.hex))
            : am(d, "object") && "h" in d && "s" in d && "l" in d
            ? ((i = ag.hsl2rgb(d)),
              (d.r = i.r),
              (d.g = i.g),
              (d.b = i.b),
              (d.opacity = 1),
              (d.hex = i.hex))
            : (am(d, "string") && (d = ag.getRGB(d)),
              am(d, "object") &&
              "r" in d &&
              "g" in d &&
              "b" in d &&
              !("error" in d)
                ? ((i = ag.rgb2hsl(d)),
                  (d.h = i.h),
                  (d.s = i.s),
                  (d.l = i.l),
                  (i = ag.rgb2hsb(d)),
                  (d.v = i.b))
                : ((d = {
                    hex: "none",
                  }),
                  (d.r = d.g = d.b = d.h = d.s = d.v = d.l = -1),
                  (d.error = 1))),
          (d.toString = aK),
          d
        );
      }),
        (ag.hsb2rgb = function (k, l, m, n) {
          am(k, "object") &&
            "h" in k &&
            "s" in k &&
            "b" in k &&
            ((m = k.b), (l = k.s), (k = k.h), (n = k.o)),
            (k *= 360);
          var o, p, q, r, s;
          return (
            (k = (k % 360) / 60),
            (s = m * l),
            (r = s * (1 - aV((k % 2) - 1))),
            (o = p = q = m - s),
            (k = ~~k),
            (o += [s, r, 0, 0, r, s][k]),
            (p += [r, s, s, r, 0, 0][k]),
            (q += [0, 0, r, s, s, r][k]),
            aQ(o, p, q, n)
          );
        }),
        (ag.hsl2rgb = function (k, l, m, n) {
          am(k, "object") &&
            "h" in k &&
            "s" in k &&
            "l" in k &&
            ((m = k.l), (l = k.s), (k = k.h)),
            (k > 1 || l > 1 || m > 1) && ((k /= 360), (l /= 100), (m /= 100)),
            (k *= 360);
          var o, p, q, r, s;
          return (
            (k = (k % 360) / 60),
            (s = 2 * l * (0.5 > m ? m : 1 - m)),
            (r = s * (1 - aV((k % 2) - 1))),
            (o = p = q = m - s / 2),
            (k = ~~k),
            (o += [s, r, 0, 0, r, s][k]),
            (p += [r, s, s, r, 0, 0][k]),
            (q += [0, 0, r, s, s, r][k]),
            aQ(o, p, q, n)
          );
        }),
        (ag.rgb2hsb = function (i, j, k) {
          (k = aN(i, j, k)), (i = k[0]), (j = k[1]), (k = k[2]);
          var l, m, n, o;
          return (
            (n = aP(i, j, k)),
            (o = n - aS(i, j, k)),
            (l =
              0 == o
                ? null
                : n == i
                ? (j - k) / o
                : n == j
                ? (k - i) / o + 2
                : (i - j) / o + 4),
            (l = (60 * ((l + 360) % 6)) / 360),
            (m = 0 == o ? 0 : o / n),
            {
              h: l,
              s: m,
              b: n,
              toString: aE,
            }
          );
        }),
        (ag.rgb2hsl = function (j, k, l) {
          (l = aN(j, k, l)), (j = l[0]), (k = l[1]), (l = l[2]);
          var m, n, o, p, q, r;
          return (
            (p = aP(j, k, l)),
            (q = aS(j, k, l)),
            (r = p - q),
            (m =
              0 == r
                ? null
                : p == j
                ? (k - l) / r
                : p == k
                ? (l - j) / r + 2
                : (j - k) / r + 4),
            (m = (60 * ((m + 360) % 6)) / 360),
            (o = (p + q) / 2),
            (n = 0 == r ? 0 : 0.5 > o ? r / (2 * o) : r / (2 - 2 * o)),
            {
              h: m,
              s: n,
              l: o,
              toString: aH,
            }
          );
        }),
        (ag.parsePathString = function (d) {
          if (!d) {
            return null;
          }
          var i = ag.path(d);
          if (i.arr) {
            return ag.path.clone(i.arr);
          }
          var j = {
              a: 7,
              c: 6,
              o: 2,
              h: 1,
              l: 2,
              m: 2,
              r: 4,
              q: 4,
              s: 4,
              t: 2,
              v: 1,
              u: 3,
              z: 0,
            },
            k = [];
          return (
            am(d, "array") && am(d[0], "array") && (k = ag.path.clone(d)),
            k.length ||
              aD(d).replace(aa, function (l, m, n) {
                var o = [],
                  p = m.toLowerCase();
                if (
                  (n.replace(af, function (q, r) {
                    r && o.push(+r);
                  }),
                  "m" == p &&
                    o.length > 2 &&
                    (k.push([m].concat(o.splice(0, 2))),
                    (p = "l"),
                    (m = "m" == m ? "l" : "L")),
                  "o" == p && 1 == o.length && k.push([m, o[0]]),
                  "r" == p)
                ) {
                  k.push([m].concat(o));
                } else {
                  for (
                    ;
                    o.length >= j[p] &&
                    (k.push([m].concat(o.splice(0, j[p]))), j[p]);

                  ) {}
                }
              }),
            (k.toString = ag.path.toString),
            (i.arr = ag.path.clone(k)),
            k
          );
        });
      var aT = (ag.parseTransformString = function (d) {
          if (!d) {
            return null;
          }
          var i = [];
          return (
            am(d, "array") && am(d[0], "array") && (i = ag.path.clone(d)),
            i.length ||
              aD(d).replace(ad, function (j, k, l) {
                var m = [];
                k.toLowerCase(),
                  l.replace(af, function (n, o) {
                    o && m.push(+o);
                  }),
                  i.push([k].concat(m));
              }),
            (i.toString = ag.path.toString),
            i
          );
        }),
        aW = new RegExp("^[a-z][" + bf + "]*-?\\.?\\d");
      (ag._.transform2matrix = aR),
        (ag._unit2px = a0),
        (ag._.getSomeDefs = aX),
        (ag.select = function (d) {
          return bg(ax.doc.querySelector(d));
        }),
        (ag.selectAll = function (d) {
          for (
            var i = ax.doc.querySelectorAll(d), j = (ag.set || Array)(), k = 0;
            k < i.length;
            k++
          ) {
            j.push(bg(i[k]));
          }
          return j;
        }),
        (function (d) {
          function m(s) {
            function t(i, j) {
              var k = aj(i.node, j);
              (k = k && k.match(x)),
                (k = k && k[2]),
                k &&
                  "#" == k.charAt() &&
                  ((k = k.substring(1)),
                  k &&
                    (z[k] = (z[k] || []).concat(function (l) {
                      var G = {};
                      (G[j] = "url(#" + l + ")"), aj(i.node, G);
                    })));
            }
            function u(i) {
              var j = aj(i.node, "xlink:href");
              j &&
                "#" == j.charAt() &&
                ((j = j.substring(1)),
                j &&
                  (z[j] = (z[j] || []).concat(function (k) {
                    i.attr("xlink:href", "#" + k);
                  })));
            }
            for (
              var v,
                w = s.selectAll("*"),
                x = /^\s*url\(("|'|)(.*)\1\)\s*$/,
                y = [],
                z = {},
                A = 0,
                B = w.length;
              B > A;
              A++
            ) {
              (v = w[A]),
                t(v, "fill"),
                t(v, "stroke"),
                t(v, "filter"),
                t(v, "mask"),
                t(v, "clip-path"),
                u(v);
              var C = aj(v.node, "id");
              C &&
                (aj(v.node, {
                  id: v.id,
                }),
                y.push({
                  old: C,
                  id: v.id,
                }));
            }
            for (A = 0, B = y.length; B > A; A++) {
              var D = z[y[A].old];
              if (D) {
                for (var E = 0, F = D.length; F > E; E++) {
                  D[E](y[A].id);
                }
              }
            }
          }
          function n(i, j, k) {
            return function (l) {
              var s = l.slice(i, j);
              return 1 == s.length && (s = s[0]), k ? k(s) : s;
            };
          }
          function o(i) {
            return function () {
              var j = i ? "<" + this.type : "",
                k = this.node.attributes,
                l = this.node.childNodes;
              if (i) {
                for (var s = 0, t = k.length; t > s; s++) {
                  j +=
                    " " +
                    k[s].name +
                    '="' +
                    k[s].value.replace(/"/g, '\\"') +
                    '"';
                }
              }
              if (l.length) {
                for (i && (j += ">"), s = 0, t = l.length; t > s; s++) {
                  3 == l[s].nodeType
                    ? (j += l[s].nodeValue)
                    : 1 == l[s].nodeType && (j += bg(l[s]).toString());
                }
                i && (j += "</" + this.type + ">");
              } else {
                i && (j += "/>");
              }
              return j;
            };
          }
          (d.attr = function (i, j) {
            var k = this;
            if ((k.node, !i)) {
              return k;
            }
            if (am(i, "string")) {
              if (!(arguments.length > 1)) {
                return a7(f("snap.util.getattr." + i, k));
              }
              var l = {};
              (l[i] = j), (i = l);
            }
            for (var s in i) {
              i[aA](s) && f("snap.util.attr." + s, k, i[s]);
            }
            return k;
          }),
            (d.getBBox = function (i) {
              var j = this;
              if (("use" == j.type && (j = j.original), j.removed)) {
                return {};
              }
              var k = j._;
              return i
                ? ((k.dirty || !k.bboxwt) &&
                    ((j.realPath = ag.path.get[j.type](j)),
                    (k.bboxwt = ag.path.getBBox(j.realPath)),
                    (k.bboxwt.toString = aI),
                    (k.dirty = 0)),
                  ag._.box(k.bboxwt))
                : ((k.dirty || k.dirtyT || !k.bbox) &&
                    ((k.dirty || !j.realPath) &&
                      ((k.bboxwt = 0), (j.realPath = ag.path.get[j.type](j))),
                    (k.bbox = ag.path.getBBox(
                      ag.path.map(j.realPath, j.matrix)
                    )),
                    (k.bbox.toString = aI),
                    (k.dirty = k.dirtyT = 0)),
                  ag._.box(k.bbox));
            });
          var p = function () {
            return this.string;
          };
          (d.transform = function (i) {
            var j = this._;
            if (null == i) {
              var k = new aL(this.node.getCTM()),
                l = aU(this),
                s = l.toTransformString(),
                t = aD(l) == aD(this.matrix) ? j.transform : s;
              return {
                string: t,
                globalMatrix: k,
                localMatrix: l,
                diffMatrix: k.clone().add(l.invert()),
                global: k.toTransformString(),
                local: s,
                toString: p,
              };
            }
            return (
              i instanceof aL && (i = i.toTransformString()),
              aU(this, i),
              this.node &&
                ("linearGradient" == this.type || "radialGradient" == this.type
                  ? aj(this.node, {
                      gradientTransform: this.matrix,
                    })
                  : "pattern" == this.type
                  ? aj(this.node, {
                      patternTransform: this.matrix,
                    })
                  : aj(this.node, {
                      transform: this.matrix,
                    })),
              this
            );
          }),
            (d.parent = function () {
              return bg(this.node.parentNode);
            }),
            (d.append = d.add =
              function (i) {
                if ("set" == i.type) {
                  var j = this;
                  return (
                    i.forEach(function (k) {
                      j.append(k);
                    }),
                    this
                  );
                }
                return (
                  (i = bg(i)),
                  this.node.appendChild(i.node),
                  (i.paper = this.paper),
                  this
                );
              }),
            (d.prepend = function (i) {
              return (
                (i = bg(i)),
                this.node.insertBefore(i.node, this.node.firstChild),
                (i.paper = this.paper),
                this
              );
            }),
            (d.before = function (i) {
              return (
                (i = bg(i)),
                this.node.parentNode.insertBefore(i.node, this.node),
                (i.paper = this.paper),
                this
              );
            }),
            (d.after = function (i) {
              return (
                (i = bg(i)),
                this.node.parentNode.insertBefore(
                  i.node,
                  this.node.nextSibling
                ),
                (i.paper = this.paper),
                this
              );
            }),
            (d.insertBefore = function (i) {
              return (
                (i = bg(i)),
                i.node.parentNode.insertBefore(this.node, i.node),
                (this.paper = i.paper),
                this
              );
            }),
            (d.insertAfter = function (i) {
              return (
                (i = bg(i)),
                i.node.parentNode.insertBefore(this.node, i.node.nextSibling),
                (this.paper = i.paper),
                this
              );
            }),
            (d.remove = function () {
              return (
                this.node.parentNode &&
                  this.node.parentNode.removeChild(this.node),
                delete this.paper,
                (this.removed = !0),
                this
              );
            }),
            (d.select = function (i) {
              return bg(this.node.querySelector(i));
            }),
            (d.selectAll = function (i) {
              for (
                var j = this.node.querySelectorAll(i),
                  k = (ag.set || Array)(),
                  l = 0;
                l < j.length;
                l++
              ) {
                k.push(bg(j[l]));
              }
              return k;
            }),
            (d.asPX = function (i, j) {
              return null == j && (j = this.attr(i)), a0(this, i, j);
            }),
            (d.use = function () {
              var i,
                j = this.node.id;
              return (
                j ||
                  ((j = this.id),
                  aj(this.node, {
                    id: j,
                  })),
                (i =
                  "linearGradient" == this.type ||
                  "radialGradient" == this.type ||
                  "pattern" == this.type
                    ? bc(this.type, this.node.parentNode)
                    : bc("use", this.node.parentNode)),
                aj(i.node, {
                  "xlink:href": "#" + j,
                }),
                (i.original = this),
                i
              );
            }),
            (d.clone = function () {
              var i = bg(this.node.cloneNode(!0));
              return (
                aj(i.node, "id") &&
                  aj(i.node, {
                    id: i.id,
                  }),
                m(i),
                i.insertAfter(this),
                i
              );
            }),
            (d.toDefs = function () {
              var i = aX(this);
              return i.appendChild(this.node), this;
            }),
            (d.pattern = function (i, j, k, l) {
              var s = bc("pattern", aX(this));
              return (
                null == i && (i = this.getBBox()),
                i &&
                  "x" in i &&
                  ((j = i.y), (k = i.width), (l = i.height), (i = i.x)),
                aj(s.node, {
                  x: i,
                  y: j,
                  width: k,
                  height: l,
                  patternUnits: "userSpaceOnUse",
                  id: s.id,
                  viewBox: [i, j, k, l].join(" "),
                }),
                s.node.appendChild(this.node),
                s
              );
            }),
            (d.marker = function (i, j, k, l, s, t) {
              var u = bc("marker", aX(this));
              return (
                null == i && (i = this.getBBox()),
                i &&
                  "x" in i &&
                  ((j = i.y),
                  (k = i.width),
                  (l = i.height),
                  (s = i.refX || i.cx),
                  (t = i.refY || i.cy),
                  (i = i.x)),
                aj(u.node, {
                  viewBox: [i, j, k, l].join(a4),
                  markerWidth: k,
                  markerHeight: l,
                  orient: "auto",
                  refX: s || 0,
                  refY: t || 0,
                  id: u.id,
                }),
                u.node.appendChild(this.node),
                u
              );
            });
          var q = function (i, j, k, l) {
            "function" != typeof k || k.length || ((l = k), (k = g.linear)),
              (this.attr = i),
              (this.dur = j),
              k && (this.easing = k),
              l && (this.callback = l);
          };
          (ag.animation = function (i, j, k, l) {
            return new q(i, j, k, l);
          }),
            (d.inAnim = function () {
              var i = this,
                j = [];
              for (var k in i.anims) {
                i.anims[aA](k) &&
                  (function (l) {
                    j.push({
                      anim: new q(l._attrs, l.dur, l.easing, l._callback),
                      curStatus: l.status(),
                      status: function (s) {
                        return l.status(s);
                      },
                      stop: function () {
                        l.stop();
                      },
                    });
                  })(i.anims[k]);
              }
              return j;
            }),
            (ag.animate = function (k, l, s, t, u, v) {
              "function" != typeof u || u.length || ((v = u), (u = g.linear));
              var w = g.time(),
                x = g(k, l, w, w + t, g.time, s, u);
              return v && f.once("mina.finish." + x.id, v), x;
            }),
            (d.stop = function () {
              for (var i = this.inAnim(), j = 0, k = i.length; k > j; j++) {
                i[j].stop();
              }
              return this;
            }),
            (d.animate = function (k, v, w, x) {
              "function" != typeof w || w.length || ((x = w), (w = g.linear)),
                k instanceof q &&
                  ((x = k.callback), (w = k.easing), (v = w.dur), (k = k.attr));
              var y,
                z,
                A,
                B,
                C = [],
                D = [],
                E = {},
                F = this;
              for (var G in k) {
                if (k[aA](G)) {
                  F.equal
                    ? ((B = F.equal(G, aD(k[G]))),
                      (y = B.from),
                      (z = B.to),
                      (A = B.f))
                    : ((y = +F.attr(G)), (z = +k[G]));
                  var H = am(y, "array") ? y.length : 1;
                  (E[G] = n(C.length, C.length + H, A)),
                    (C = C.concat(y)),
                    (D = D.concat(z));
                }
              }
              var I = g.time(),
                J = g(
                  C,
                  D,
                  I,
                  I + v,
                  g.time,
                  function (i) {
                    var j = {};
                    for (var l in E) {
                      E[aA](l) && (j[l] = E[l](i));
                    }
                    F.attr(j);
                  },
                  w
                );
              return (
                (F.anims[J.id] = J),
                (J._attrs = k),
                (J._callback = x),
                f.once("mina.finish." + J.id, function () {
                  delete F.anims[J.id], x && x.call(F);
                }),
                f.once("mina.stop." + J.id, function () {
                  delete F.anims[J.id];
                }),
                F
              );
            });
          var r = {};
          (d.data = function (i, j) {
            var k = (r[this.id] = r[this.id] || {});
            if (1 == arguments.length) {
              if (ag.is(i, "object")) {
                for (var l in i) {
                  i[aA](l) && this.data(l, i[l]);
                }
                return this;
              }
              return f("snap.data.get." + this.id, this, k[i], i), k[i];
            }
            return (k[i] = j), f("snap.data.set." + this.id, this, j, i), this;
          }),
            (d.removeData = function (i) {
              return (
                null == i
                  ? (r[this.id] = {})
                  : r[this.id] && delete r[this.id][i],
                this
              );
            }),
            (d.toString = o(1)),
            (d.innerSVG = o());
        })(a5.prototype),
        (ag.parse = function (i) {
          var j = ax.doc.createDocumentFragment(),
            k = j;
          return (
            f.on("elemental.tag", function (d, l) {
              var m = aj(d);
              l && aj(m, l), k.appendChild(m), (k = m);
            }),
            f.on("elemental.text", function (d) {
              k.appendChild(ax.doc.createTextNode(d));
            }),
            f.on("elemental./tag", function () {
              k = k.parentNode;
            }),
            f.on("elemental.eof", function () {
              f.off("elemental.*"), f("snap.parsed", j);
            }),
            elemental().parse(i).end(),
            new a9(j)
          );
        }),
        (a9.prototype.select = a5.prototype.select),
        (a9.prototype.selectAll = a5.prototype.selectAll),
        (ag.fragment = function () {
          for (
            var d = Array.prototype.slice.call(arguments, 0),
              i = ax.doc.createDocumentFragment(),
              j = 0,
              k = d.length;
            k > j;
            j++
          ) {
            var l = d[j];
            l.node && l.node.nodeType && i.appendChild(l.node),
              l.nodeType && i.appendChild(l),
              "string" == typeof l && i.appendChild(ag.parse(l).node);
          }
          return new a9(i);
        }),
        (function (d) {
          (d.el = function (i, j) {
            return bc(i, this.node).attr(j);
          }),
            (d.rect = function (i, j, k, l, m, n) {
              var o = bc("rect", this.node);
              return (
                null == n && (n = m),
                am(i, "object") && "x" in i
                  ? o.attr(i)
                  : null != i &&
                    (o.attr({
                      x: i,
                      y: j,
                      width: k,
                      height: l,
                    }),
                    null != m &&
                      o.attr({
                        rx: m,
                        ry: n,
                      })),
                o
              );
            }),
            (d.circle = function (i, j, k) {
              var l = bc("circle", this.node);
              return (
                am(i, "object") && "cx" in i
                  ? l.attr(i)
                  : null != i &&
                    l.attr({
                      cx: i,
                      cy: j,
                      r: k,
                    }),
                l
              );
            }),
            (d.image = function (j, k, l, m, n) {
              var o = bc("image", this.node);
              if (am(j, "object") && "src" in j) {
                o.attr(j);
              } else {
                if (null != j) {
                  var p = {
                    "xlink:href": j,
                    preserveAspectRatio: "none",
                  };
                  null != k && null != l && ((p.x = k), (p.y = l)),
                    null != m && null != n
                      ? ((p.width = m), (p.height = n))
                      : ay(j, function () {
                          aj(o.node, {
                            width: this.offsetWidth,
                            height: this.offsetHeight,
                          });
                        }),
                    aj(o.node, p);
                }
              }
              return o;
            }),
            (d.ellipse = function (i, j, k, l) {
              var m = bc("ellipse", this.node);
              return (
                am(i, "object") && "cx" in i
                  ? m.attr(i)
                  : null != i &&
                    m.attr({
                      cx: i,
                      cy: j,
                      rx: k,
                      ry: l,
                    }),
                m
              );
            }),
            (d.path = function (i) {
              var j = bc("path", this.node);
              return (
                am(i, "object") && !am(i, "array")
                  ? j.attr(i)
                  : i &&
                    j.attr({
                      d: i,
                    }),
                j
              );
            }),
            (d.group = d.g =
              function (i) {
                var j = bc("g", this.node);
                j.add = a3;
                for (var k in d) {
                  d[aA](k) && (j[k] = d[k]);
                }
                return (
                  1 == arguments.length && i && !i.type
                    ? j.attr(i)
                    : arguments.length &&
                      j.add(Array.prototype.slice.call(arguments, 0)),
                  j
                );
              }),
            (d.text = function (i, j, k) {
              var l = bc("text", this.node);
              return (
                am(i, "object")
                  ? l.attr(i)
                  : null != i &&
                    l.attr({
                      x: i,
                      y: j,
                      text: k || "",
                    }),
                l
              );
            }),
            (d.line = function (i, j, k, l) {
              var m = bc("line", this.node);
              return (
                am(i, "object")
                  ? m.attr(i)
                  : null != i &&
                    m.attr({
                      x1: i,
                      x2: k,
                      y1: j,
                      y2: l,
                    }),
                m
              );
            }),
            (d.polyline = function (i) {
              arguments.length > 1 &&
                (i = Array.prototype.slice.call(arguments, 0));
              var j = bc("polyline", this.node);
              return (
                am(i, "object") && !am(i, "array")
                  ? j.attr(i)
                  : null != i &&
                    j.attr({
                      points: i,
                    }),
                j
              );
            }),
            (d.polygon = function (i) {
              arguments.length > 1 &&
                (i = Array.prototype.slice.call(arguments, 0));
              var j = bc("polygon", this.node);
              return (
                am(i, "object") && !am(i, "array")
                  ? j.attr(i)
                  : null != i &&
                    j.attr({
                      points: i,
                    }),
                j
              );
            }),
            (function () {
              (d.gradient = function (i) {
                return ah(this.defs, i);
              }),
                (d.gradientLinear = function (i, j, k, l) {
                  return ak(this.defs, i, j, k, l);
                }),
                (d.gradientRadial = function (i, j, k, l, m) {
                  return an(this.defs, i, j, k, l, m);
                }),
                (d.toString = function () {
                  var i,
                    j = ax.doc.createDocumentFragment(),
                    k = ax.doc.createElement("div"),
                    l = this.node.cloneNode(!0);
                  return (
                    j.appendChild(k),
                    k.appendChild(l),
                    aj(l, {
                      xmlns: "http://www.w3.org/2000/svg",
                    }),
                    (i = k.innerHTML),
                    j.removeChild(j.firstChild),
                    i
                  );
                }),
                (d.clear = function () {
                  for (var i, j = this.node.firstChild; j; ) {
                    (i = j.nextSibling),
                      "defs" != j.tagName && j.parentNode.removeChild(j),
                      (j = i);
                  }
                });
            })();
        })(be.prototype),
        (ag.ajax = function (k, l, m, n) {
          var o = new XMLHttpRequest(),
            p = ao();
          if (o) {
            if (am(l, "function")) {
              (n = m), (m = l), (l = null);
            } else {
              if (am(l, "object")) {
                var q = [];
                for (var r in l) {
                  l.hasOwnProperty(r) &&
                    q.push(
                      encodeURIComponent(r) + "=" + encodeURIComponent(l[r])
                    );
                }
                l = q.join("&");
              }
            }
            return (
              o.open(l ? "POST" : "GET", k, !0),
              o.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
              l &&
                o.setRequestHeader(
                  "Content-type",
                  "application/x-www-form-urlencoded"
                ),
              m &&
                (f.once("snap.ajax." + p + ".0", m),
                f.once("snap.ajax." + p + ".200", m),
                f.once("snap.ajax." + p + ".304", m)),
              (o.onreadystatechange = function () {
                4 == o.readyState && f("snap.ajax." + p + "." + o.status, n, o);
              }),
              4 == o.readyState ? o : (o.send(l), o)
            );
          }
        }),
        (ag.load = function (d, i, j) {
          ag.ajax(d, function (k) {
            var l = ag.parse(k.responseText);
            j ? i.call(j, l) : i(l);
          });
        }),
        f.on("snap.util.attr.mask", function (d) {
          if (d instanceof a5 || d instanceof a9) {
            if (
              (f.stop(),
              d instanceof a9 &&
                1 == d.node.childNodes.length &&
                ((d = d.node.firstChild), aX(this).appendChild(d), (d = bg(d))),
              "mask" == d.type)
            ) {
              var i = d;
            } else {
              (i = bc("mask", aX(this))),
                i.node.appendChild(d.node),
                !i.node.id &&
                  aj(i.node, {
                    id: i.id,
                  });
            }
            aj(this.node, {
              mask: "url(#" + i.id + ")",
            });
          }
        }),
        (function (d) {
          f.on("snap.util.attr.clip", d),
            f.on("snap.util.attr.clip-path", d),
            f.on("snap.util.attr.clipPath", d);
        })(function (d) {
          if (d instanceof a5 || d instanceof a9) {
            if ((f.stop(), "clipPath" == d.type)) {
              var i = d;
            } else {
              (i = bc("clipPath", aX(this))),
                i.node.appendChild(d.node),
                !i.node.id &&
                  aj(i.node, {
                    id: i.id,
                  });
            }
            aj(this.node, {
              "clip-path": "url(#" + i.id + ")",
            });
          }
        }),
        f.on("snap.util.attr.fill", aq("fill")),
        f.on("snap.util.attr.stroke", aq("stroke"));
      var aZ = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
      f.on("snap.util.grad.parse", function (i) {
        i = aD(i);
        var j = i.match(aZ);
        if (!j) {
          return null;
        }
        var k = j[1],
          l = j[2],
          m = j[3];
        return (
          (l = l.split(/\s*,\s*/).map(function (d) {
            return +d == d ? +d : d;
          })),
          1 == l.length && 0 == l[0] && (l = []),
          (m = m.split("-")),
          (m = m.map(function (d) {
            d = d.split(":");
            var n = {
              color: d[0],
            };
            return d[1] && (n.offset = d[1]), n;
          })),
          {
            type: k,
            params: l,
            stops: m,
          }
        );
      }),
        f.on("snap.util.attr.d", function (d) {
          f.stop(),
            am(d, "array") &&
              am(d[0], "array") &&
              (d = ag.path.toString.call(d)),
            (d = aD(d)),
            d.match(/[ruo]/i) && (d = ag.path.toAbsolute(d)),
            aj(this.node, {
              d: d,
            });
        })(-1),
        f.on("snap.util.attr.#text", function (d) {
          f.stop(), (d = aD(d));
          for (var i = ax.doc.createTextNode(d); this.node.firstChild; ) {
            this.node.removeChild(this.node.firstChild);
          }
          this.node.appendChild(i);
        })(-1),
        f.on("snap.util.attr.path", function (d) {
          f.stop(),
            this.attr({
              d: d,
            });
        })(-1),
        f.on("snap.util.attr.viewBox", function (d) {
          var i;
          (i =
            am(d, "object") && "x" in d
              ? [d.x, d.y, d.width, d.height].join(" ")
              : am(d, "array")
              ? d.join(" ")
              : d),
            aj(this.node, {
              viewBox: i,
            }),
            f.stop();
        })(-1),
        f.on("snap.util.attr.transform", function (d) {
          this.transform(d), f.stop();
        })(-1),
        f.on("snap.util.attr.r", function (d) {
          "rect" == this.type &&
            (f.stop(),
            aj(this.node, {
              rx: d,
              ry: d,
            }));
        })(-1),
        f.on("snap.util.attr.text", function (i) {
          if ("text" == this.type) {
            for (
              var j = this.node,
                k = function (d) {
                  var m = aj("tspan");
                  if (am(d, "array")) {
                    for (var n = 0; n < d.length; n++) {
                      m.appendChild(k(d[n]));
                    }
                  } else {
                    m.appendChild(ax.doc.createTextNode(d));
                  }
                  return m.normalize && m.normalize(), m;
                };
              j.firstChild;

            ) {
              j.removeChild(j.firstChild);
            }
            for (var l = k(i); l.firstChild; ) {
              j.appendChild(l.firstChild);
            }
          }
          f.stop();
        })(-1);
      var a2 = {
        rect: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rx: 0,
          ry: 0,
          class: 0,
        },
        circle: {
          cx: 0,
          cy: 0,
          r: 0,
          class: 0,
        },
        ellipse: {
          cx: 0,
          cy: 0,
          rx: 0,
          ry: 0,
          class: 0,
        },
        line: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
          class: 0,
        },
        polyline: {
          points: "",
          class: 0,
        },
        polygon: {
          points: "",
          class: 0,
        },
        text: {
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          rotate: 0,
          textLength: 0,
          lengthAdjust: 0,
          class: 0,
        },
        tspan: {
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          rotate: 0,
          textLength: 0,
          lengthAdjust: 0,
          class: 0,
        },
        textPath: {
          "xlink:href": 0,
          startOffset: 0,
          method: 0,
          spacing: 0,
          class: 0,
        },
        marker: {
          viewBox: 0,
          preserveAspectRatio: 0,
          refX: 0,
          refY: 0,
          markerUnits: 0,
          markerWidth: 0,
          markerHeight: 0,
          orient: 0,
          class: 0,
        },
        use: {
          class: 0,
          externalResourcesRequired: 0,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          "xlink:href": 0,
        },
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
          gradientUnits: 0,
          gradientTransform: 0,
          spreadMethod: 0,
          "xlink:href": 0,
          class: 0,
        },
        radialGradient: {
          cx: 0,
          cy: 0,
          r: 0,
          fx: 0,
          fy: 0,
          gradientUnits: 0,
          gradientTransform: 0,
          spreadMethod: 0,
          "xlink:href": 0,
          class: 0,
        },
        stop: {
          offset: 0,
          class: 0,
        },
        pattern: {
          viewBox: 0,
          preserveAspectRatio: 0,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          patternUnits: 0,
          patternContentUnits: 0,
          patternTransform: 0,
          "xlink:href": 0,
          class: 0,
        },
        clipPath: {
          transform: 0,
          clipPathUnits: 0,
          class: 0,
        },
        mask: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          maskUnits: 0,
          maskContentUnits: 0,
          class: 0,
        },
        image: {
          preserveAspectRatio: 0,
          transform: 0,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          "xlink:href": 0,
          class: 0,
        },
        path: {
          d: "",
          class: 0,
        },
        g: {
          class: 0,
        },
        feDistantLight: {
          azimuth: 0,
          elevation: 0,
        },
        fePointLight: {
          x: 0,
          y: 0,
          z: 0,
        },
        feSpotLight: {
          x: 0,
          y: 0,
          z: 0,
          pointsAtX: 0,
          pointsAtY: 0,
          pointsAtZ: 0,
          specularExponent: 0,
          limitingConeAngle: 0,
        },
        feBlend: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          in2: 0,
          mode: 0,
        },
        feColorMatrix: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          type: 0,
          values: 0,
        },
        feComponentTransfer: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
        },
        feComposite: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          in2: 0,
          operator: 0,
          k1: 0,
          k2: 0,
          k3: 0,
          k4: 0,
        },
        feConvolveMatrix: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          order: 0,
          kernelMatrix: 0,
          divisor: 0,
          bias: 0,
          targetX: 0,
          targetY: 0,
          edgeMode: 0,
          kernelUnitLength: 0,
          preserveAlpha: 0,
        },
        feDiffuseLighting: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          surfaceScale: 0,
          diffuseConstant: 0,
          kernelUnitLength: 0,
        },
        feDisplacementMap: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          in2: 0,
          scale: 0,
          xChannelSelector: 0,
          yChannelSelector: 0,
        },
        feFlood: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          "flood-color": 0,
          "flood-opacity": 0,
        },
        feGaussianBlur: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          stdDeviation: 0,
        },
        feImage: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          externalResourcesRequired: 0,
          preserveAspectRatio: 0,
          "xlink:href": 0,
        },
        feMerge: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
        },
        feMergeNode: {
          in: 0,
        },
        feMorphology: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          operator: 0,
          radius: 0,
        },
        feOffset: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          dx: 0,
          dy: 0,
        },
        feSpecularLighting: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
          surfaceScale: 0,
          specularConstant: 0,
          specularExponent: 0,
          kernelUnitLength: 0,
        },
        feTile: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          in: 0,
        },
        feTurbulence: {
          height: 0,
          result: 0,
          width: 0,
          x: 0,
          y: 0,
          class: 0,
          style: 0,
          baseFrequency: 0,
          numOctaves: 0,
          seed: 0,
          stitchTiles: 0,
          type: 0,
        },
      };
      return (
        (a2.feFuncR =
          a2.feFuncG =
          a2.feFuncB =
          a2.feFuncA =
            {
              type: 0,
              tableValues: 0,
              slope: 0,
              intercept: 0,
              amplitude: 0,
              exponent: 0,
              offset: 0,
            }),
        f.on("snap.util.attr", function (i) {
          var j = f.nt();
          j = j.substring(j.lastIndexOf(".") + 1);
          var k = j.replace(/-(\w)/gi, function (d, l) {
            return l.toUpperCase();
          });
          a2[aA](this.type) && a2[this.type][aA](j)
            ? null == i
              ? this.node.removeAttribute(j)
              : this.node.setAttribute(j, i)
            : (this.node.style[k] = null == i ? a1 : i);
        }),
        f.on("snap.util.getattr.transform", function () {
          return f.stop(), this.transform();
        })(-1),
        (function () {
          function d(j) {
            return function () {
              f.stop();
              var k = ax.doc.defaultView
                .getComputedStyle(this.node, null)
                .getPropertyValue("marker-" + j);
              return "none" == k
                ? k
                : ag(ax.doc.getElementById(k.match(bd)[1]));
            };
          }
          function i(j) {
            return function (k) {
              f.stop();
              var l = "marker" + j.charAt(0).toUpperCase() + j.substring(1);
              if ("" == k || !k) {
                return (this.node.style[l] = "none"), void 0;
              }
              if ("marker" == k.type) {
                var m = k.node.id;
                return (
                  m ||
                    aj(k.node, {
                      id: k.id,
                    }),
                  (this.node.style[l] = "url(#" + m + ")"),
                  void 0
                );
              }
            };
          }
          f.on("snap.util.getattr.marker-end", d("end"))(-1),
            f.on("snap.util.getattr.markerEnd", d("end"))(-1),
            f.on("snap.util.getattr.marker-start", d("start"))(-1),
            f.on("snap.util.getattr.markerStart", d("start"))(-1),
            f.on("snap.util.getattr.marker-mid", d("mid"))(-1),
            f.on("snap.util.getattr.markerMid", d("mid"))(-1),
            f.on("snap.util.attr.marker-end", i("end"))(-1),
            f.on("snap.util.attr.markerEnd", i("end"))(-1),
            f.on("snap.util.attr.marker-start", i("start"))(-1),
            f.on("snap.util.attr.markerStart", i("start"))(-1),
            f.on("snap.util.attr.marker-mid", i("mid"))(-1),
            f.on("snap.util.attr.markerMid", i("mid"))(-1);
        })(),
        f.on("snap.util.getattr.r", function () {
          return "rect" == this.type &&
            aj(this.node, "rx") == aj(this.node, "ry")
            ? (f.stop(), aj(this.node, "rx"))
            : void 0;
        })(-1),
        f.on("snap.util.getattr.text", function () {
          if ("text" == this.type || "tspan" == this.type) {
            f.stop();
            var d = au(this.node);
            return 1 == d.length ? d[0] : d;
          }
        })(-1),
        f.on("snap.util.getattr.#text", function () {
          return this.node.textContent;
        })(-1),
        f.on("snap.util.getattr.viewBox", function () {
          f.stop();
          var d = aj(this.node, "viewBox").split(bh);
          return ag._.box(+d[0], +d[1], +d[2], +d[3]);
        })(-1),
        f.on("snap.util.getattr.points", function () {
          var d = aj(this.node, "points");
          return f.stop(), d.split(bh);
        }),
        f.on("snap.util.getattr.path", function () {
          var d = aj(this.node, "d");
          return f.stop(), d;
        }),
        f.on("snap.util.getattr", function () {
          var d = f.nt();
          return (
            (d = d.substring(d.lastIndexOf(".") + 1)),
            a2[aA](this.type) && a2[this.type][aA](d)
              ? this.node.getAttribute(d)
              : ax.doc.defaultView
                  .getComputedStyle(this.node, null)
                  .getPropertyValue(d)
          );
        }),
        (ag.plugin = function (d) {
          d(ag, a5, be, ax);
        }),
        (ax.win.Snap = ag),
        ag
      );
    })();
    return (
      h.plugin(function (Z, ab) {
        function ad(c) {
          var d = (ad.ps = ad.ps || {});
          return (
            d[c]
              ? (d[c].sleep = 100)
              : (d[c] = {
                  sleep: 100,
                }),
            setTimeout(function () {
              for (var a in d) {
                d[ax](a) &&
                  a != c &&
                  (d[a].sleep--, !d[a].sleep && delete d[a]);
              }
            }),
            d[c]
          );
        }
        function af(i, j, k, l) {
          return (
            null == i && (i = j = k = l = 0),
            null == j && ((j = i.y), (k = i.width), (l = i.height), (i = i.x)),
            {
              x: i,
              y: j,
              width: k,
              w: k,
              height: l,
              h: l,
              x2: i + k,
              y2: j + l,
              cx: i + k / 2,
              cy: j + l / 2,
              r1: aD.min(k, l) / 2,
              r2: aD.max(k, l) / 2,
              r0: aD.sqrt(k * k + l * l) / 2,
              path: aS(i, j, k, l),
              vb: [i, j, k, l].join(" "),
            }
          );
        }
        function ah() {
          return this.join(",").replace(az, "$1");
        }
        function aj(c) {
          var d = av(c);
          return (d.toString = ah), d;
        }
        function al(i, k, l, m, n, o, p, q, r) {
          return null == r
            ? aA(i, k, l, m, n, o, p, q)
            : ap(i, k, l, m, n, o, p, q, aC(i, k, l, m, n, o, p, q, r));
        }
        function an(a, b) {
          function i(c) {
            return +(+c).toFixed(3);
          }
          return Z._.cacher(
            function (c, d, t) {
              c instanceof ab && (c = c.attr("d")), (c = ak(c));
              for (
                var u, v, w, x, y, z = "", A = {}, B = 0, C = 0, D = c.length;
                D > C;
                C++
              ) {
                if (((w = c[C]), "M" == w[0])) {
                  (u = +w[1]), (v = +w[2]);
                } else {
                  if (
                    ((x = al(u, v, w[1], w[2], w[3], w[4], w[5], w[6])),
                    B + x > d)
                  ) {
                    if (b && !A.start) {
                      if (
                        ((y = al(
                          u,
                          v,
                          w[1],
                          w[2],
                          w[3],
                          w[4],
                          w[5],
                          w[6],
                          d - B
                        )),
                        (z += [
                          "C" + i(y.start.x),
                          i(y.start.y),
                          i(y.m.x),
                          i(y.m.y),
                          i(y.x),
                          i(y.y),
                        ]),
                        t)
                      ) {
                        return z;
                      }
                      (A.start = z),
                        (z = [
                          "M" + i(y.x),
                          i(y.y) + "C" + i(y.n.x),
                          i(y.n.y),
                          i(y.end.x),
                          i(y.end.y),
                          i(w[5]),
                          i(w[6]),
                        ].join()),
                        (B += x),
                        (u = +w[5]),
                        (v = +w[6]);
                      continue;
                    }
                    if (!a && !b) {
                      return (y = al(
                        u,
                        v,
                        w[1],
                        w[2],
                        w[3],
                        w[4],
                        w[5],
                        w[6],
                        d - B
                      ));
                    }
                  }
                  (B += x), (u = +w[5]), (v = +w[6]);
                }
                z += w.shift() + w;
              }
              return (
                (A.end = z),
                (y = a
                  ? B
                  : b
                  ? A
                  : ap(u, v, w[0], w[1], w[2], w[3], w[4], w[5], 1))
              );
            },
            null,
            Z._.clone
          );
        }
        function ap(z, A, B, C, D, E, F, G, H) {
          var I = 1 - H,
            J = aL(I, 3),
            K = aL(I, 2),
            L = H * H,
            M = L * H,
            N = J * z + 3 * K * H * B + 3 * I * H * H * D + M * F,
            O = J * A + 3 * K * H * C + 3 * I * H * H * E + M * G,
            P = z + 2 * H * (B - z) + L * (D - 2 * B + z),
            Q = A + 2 * H * (C - A) + L * (E - 2 * C + A),
            R = B + 2 * H * (D - B) + L * (F - 2 * D + B),
            S = C + 2 * H * (E - C) + L * (G - 2 * E + C),
            T = I * z + H * B,
            U = I * A + H * C,
            V = I * D + H * F,
            W = I * E + H * G,
            X = 90 - (180 * aD.atan2(P - R, Q - S)) / aF;
          return {
            x: N,
            y: O,
            m: {
              x: P,
              y: Q,
            },
            n: {
              x: R,
              y: S,
            },
            start: {
              x: T,
              y: U,
            },
            end: {
              x: V,
              y: W,
            },
            alpha: X,
          };
        }
        function ar(a, d, l, m, n, o, p, q) {
          Z.is(a, "array") || (a = [a, d, l, m, n, o, p, q]);
          var r = ai.apply(null, a);
          return af(r.min.x, r.min.y, r.max.x - r.min.x, r.max.y - r.min.y);
        }
        function au(d, i, j) {
          return (
            i >= d.x && i <= d.x + d.width && j >= d.y && j <= d.y + d.height
          );
        }
        function aw(c, d) {
          return (
            (c = af(c)),
            (d = af(d)),
            au(d, c.x, c.y) ||
              au(d, c.x2, c.y) ||
              au(d, c.x, c.y2) ||
              au(d, c.x2, c.y2) ||
              au(c, d.x, d.y) ||
              au(c, d.x2, d.y) ||
              au(c, d.x, d.y2) ||
              au(c, d.x2, d.y2) ||
              (((c.x < d.x2 && c.x > d.x) || (d.x < c.x2 && d.x > c.x)) &&
                ((c.y < d.y2 && c.y > d.y) || (d.y < c.y2 && d.y > c.y)))
          );
        }
        function ay(i, j, k, l, m) {
          var n = -3 * j + 9 * k - 9 * l + 3 * m,
            o = i * n + 6 * j - 12 * k + 6 * l;
          return i * o - 3 * j + 3 * k;
        }
        function aA(m, u, v, w, x, y, z, A, B) {
          null == B && (B = 1), (B = B > 1 ? 1 : 0 > B ? 0 : B);
          for (
            var C = B / 2,
              D = 12,
              E = [
                -0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699,
                0.7699, -0.9041, 0.9041, -0.9816, 0.9816,
              ],
              F = [
                0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601,
                0.1069, 0.1069, 0.0472, 0.0472,
              ],
              G = 0,
              H = 0;
            D > H;
            H++
          ) {
            var I = C * E[H] + C,
              J = ay(I, m, v, x, z),
              K = ay(I, u, w, y, A),
              L = J * J + K * K;
            G += F[H] * aD.sqrt(L);
          }
          return C * G;
        }
        function aC(n, p, q, r, s, t, u, v, w) {
          if (!(0 > w || aA(n, p, q, r, s, t, u, v) < w)) {
            var x,
              y = 1,
              z = y / 2,
              A = y - z,
              B = 0.01;
            for (x = aA(n, p, q, r, s, t, u, v, A); aN(x - w) > B; ) {
              (z /= 2),
                (A += (w > x ? 1 : -1) * z),
                (x = aA(n, p, q, r, s, t, u, v, A));
            }
            return A;
          }
        }
        function aE(p, q, r, s, t, u, v, w) {
          if (
            !(
              aJ(p, r) < aH(t, v) ||
              aH(p, r) > aJ(t, v) ||
              aJ(q, s) < aH(u, w) ||
              aH(q, s) > aJ(u, w)
            )
          ) {
            var x = (p * s - q * r) * (t - v) - (p - r) * (t * w - u * v),
              y = (p * s - q * r) * (u - w) - (q - s) * (t * w - u * v),
              z = (p - r) * (u - w) - (q - s) * (t - v);
            if (z) {
              var A = x / z,
                B = y / z,
                C = +A.toFixed(2),
                D = +B.toFixed(2);
              if (
                !(
                  C < +aH(p, r).toFixed(2) ||
                  C > +aJ(p, r).toFixed(2) ||
                  C < +aH(t, v).toFixed(2) ||
                  C > +aJ(t, v).toFixed(2) ||
                  D < +aH(q, s).toFixed(2) ||
                  D > +aJ(q, s).toFixed(2) ||
                  D < +aH(u, w).toFixed(2) ||
                  D > +aJ(u, w).toFixed(2)
                )
              ) {
                return {
                  x: A,
                  y: B,
                };
              }
            }
          }
        }
        function aG(i, l, p) {
          var F = ar(i),
            H = ar(l);
          if (!aw(F, H)) {
            return p ? 0 : [];
          }
          for (
            var I = aA.apply(0, i),
              J = aA.apply(0, l),
              K = ~~(I / 5),
              L = ~~(J / 5),
              M = [],
              N = [],
              O = {},
              P = p ? 0 : [],
              Q = 0;
            K + 1 > Q;
            Q++
          ) {
            var R = ap.apply(0, i.concat(Q / K));
            M.push({
              x: R.x,
              y: R.y,
              t: Q / K,
            });
          }
          for (Q = 0; L + 1 > Q; Q++) {
            (R = ap.apply(0, l.concat(Q / L))),
              N.push({
                x: R.x,
                y: R.y,
                t: Q / L,
              });
          }
          for (Q = 0; K > Q; Q++) {
            for (var S = 0; L > S; S++) {
              var T = M[Q],
                U = M[Q + 1],
                V = N[S],
                W = N[S + 1],
                X = aN(U.x - T.x) < 0.001 ? "y" : "x",
                j = aN(W.x - V.x) < 0.001 ? "y" : "x",
                n = aE(T.x, T.y, U.x, U.y, V.x, V.y, W.x, W.y);
              if (n) {
                if (O[n.x.toFixed(4)] == n.y.toFixed(4)) {
                  continue;
                }
                O[n.x.toFixed(4)] = n.y.toFixed(4);
                var E = T.t + aN((n[X] - T[X]) / (U[X] - T[X])) * (U.t - T.t),
                  G = V.t + aN((n[j] - V[j]) / (W[j] - V[j])) * (W.t - V.t);
                E >= 0 &&
                  1 >= E &&
                  G >= 0 &&
                  1 >= G &&
                  (p
                    ? P++
                    : P.push({
                        x: n.x,
                        y: n.y,
                        t1: E,
                        t2: G,
                      }));
              }
            }
          }
          return P;
        }
        function aI(c, d) {
          return aM(c, d);
        }
        function aK(c, d) {
          return aM(c, d, 1);
        }
        function aM(q, y, z) {
          (q = ak(q)), (y = ak(y));
          for (
            var A,
              B,
              C,
              D,
              E,
              F,
              G,
              H,
              I,
              J,
              K = z ? 0 : [],
              L = 0,
              M = q.length;
            M > L;
            L++
          ) {
            var N = q[L];
            if ("M" == N[0]) {
              (A = E = N[1]), (B = F = N[2]);
            } else {
              "C" == N[0]
                ? ((I = [A, B].concat(N.slice(1))), (A = I[6]), (B = I[7]))
                : ((I = [A, B, A, B, E, F, E, F]), (A = E), (B = F));
              for (var O = 0, P = y.length; P > O; O++) {
                var Q = y[O];
                if ("M" == Q[0]) {
                  (C = G = Q[1]), (D = H = Q[2]);
                } else {
                  "C" == Q[0]
                    ? ((J = [C, D].concat(Q.slice(1))), (C = J[6]), (D = J[7]))
                    : ((J = [C, D, C, D, G, H, G, H]), (C = G), (D = H));
                  var R = aG(I, J, z);
                  if (z) {
                    K += R;
                  } else {
                    for (var S = 0, T = R.length; T > S; S++) {
                      (R[S].segment1 = L),
                        (R[S].segment2 = O),
                        (R[S].bez1 = I),
                        (R[S].bez2 = J);
                    }
                    K = K.concat(R);
                  }
                }
              }
            }
          }
          return K;
        }
        function aO(i, j, k) {
          var l = aQ(i);
          return (
            au(l, j, k) &&
            1 ==
              aM(
                i,
                [
                  ["M", j, k],
                  ["H", l.x2 + 10],
                ],
                1
              ) %
                2
          );
        }
        function aQ(c) {
          var d = ad(c);
          if (d.bbox) {
            return av(d.bbox);
          }
          if (!c) {
            return af();
          }
          c = ak(c);
          for (
            var r, s = 0, t = 0, u = [], v = [], w = 0, x = c.length;
            x > w;
            w++
          ) {
            if (((r = c[w]), "M" == r[0])) {
              (s = r[1]), (t = r[2]), u.push(s), v.push(t);
            } else {
              var y = ai(s, t, r[1], r[2], r[3], r[4], r[5], r[6]);
              (u = u.concat(y.min.x, y.max.x)),
                (v = v.concat(y.min.y, y.max.y)),
                (s = r[5]),
                (t = r[6]);
            }
          }
          var z = aH.apply(0, u),
            A = aH.apply(0, v),
            B = aJ.apply(0, u),
            C = aJ.apply(0, v),
            D = af(z, A, B - z, C - A);
          return (d.bbox = av(D)), D;
        }
        function aS(i, j, k, l, m) {
          if (m) {
            return [
              ["M", i + m, j],
              ["l", k - 2 * m, 0],
              ["a", m, m, 0, 0, 1, m, m],
              ["l", 0, l - 2 * m],
              ["a", m, m, 0, 0, 1, -m, m],
              ["l", 2 * m - k, 0],
              ["a", m, m, 0, 0, 1, -m, -m],
              ["l", 0, 2 * m - l],
              ["a", m, m, 0, 0, 1, m, -m],
              ["z"],
            ];
          }
          var n = [["M", i, j], ["l", k, 0], ["l", 0, l], ["l", -k, 0], ["z"]];
          return (n.toString = ah), n;
        }
        function aU(m, n, o, p, q) {
          if ((null == q && null == p && (p = o), null != q)) {
            var r = Math.PI / 180,
              s = m + o * Math.cos(-p * r),
              t = m + o * Math.cos(-q * r),
              u = n + o * Math.sin(-p * r),
              v = n + o * Math.sin(-q * r),
              w = [
                ["M", s, u],
                ["A", o, o, 0, +(q - p > 180), 0, t, v],
              ];
          } else {
            w = [
              ["M", m, n],
              ["m", 0, -p],
              ["a", o, p, 0, 1, 1, 0, 2 * p],
              ["a", o, p, 0, 1, 1, 0, -2 * p],
              ["z"],
            ];
          }
          return (w.toString = ah), w;
        }
        function aW(a) {
          var c = ad(a),
            w = String.prototype.toLowerCase;
          if (c.rel) {
            return aj(c.rel);
          }
          (Z.is(a, "array") && Z.is(a && a[0], "array")) ||
            (a = Z.parsePathString(a));
          var x = [],
            y = 0,
            z = 0,
            A = 0,
            B = 0,
            C = 0;
          "M" == a[0][0] &&
            ((y = a[0][1]),
            (z = a[0][2]),
            (A = y),
            (B = z),
            C++,
            x.push(["M", y, z]));
          for (var D = C, E = a.length; E > D; D++) {
            var F = (x[D] = []),
              G = a[D];
            if (G[0] != w.call(G[0])) {
              switch (((F[0] = w.call(G[0])), F[0])) {
                case "a":
                  (F[1] = G[1]),
                    (F[2] = G[2]),
                    (F[3] = G[3]),
                    (F[4] = G[4]),
                    (F[5] = G[5]),
                    (F[6] = +(G[6] - y).toFixed(3)),
                    (F[7] = +(G[7] - z).toFixed(3));
                  break;
                case "v":
                  F[1] = +(G[1] - z).toFixed(3);
                  break;
                case "m":
                  (A = G[1]), (B = G[2]);
                default:
                  for (var H = 1, I = G.length; I > H; H++) {
                    F[H] = +(G[H] - (H % 2 ? y : z)).toFixed(3);
                  }
              }
            } else {
              (F = x[D] = []), "m" == G[0] && ((A = G[1] + y), (B = G[2] + z));
              for (var J = 0, K = G.length; K > J; J++) {
                x[D][J] = G[J];
              }
            }
            var L = x[D].length;
            switch (x[D][0]) {
              case "z":
                (y = A), (z = B);
                break;
              case "h":
                y += +x[D][L - 1];
                break;
              case "v":
                z += +x[D][L - 1];
                break;
              default:
                (y += +x[D][L - 2]), (z += +x[D][L - 1]);
            }
          }
          return (x.toString = ah), (c.rel = aj(x)), x;
        }
        function aY(a) {
          var c = ad(a);
          if (c.abs) {
            return aj(c.abs);
          }
          if (
            ((at(a, "array") && at(a && a[0], "array")) ||
              (a = Z.parsePathString(a)),
            !a || !a.length)
          ) {
            return [["M", 0, 0]];
          }
          var x,
            y = [],
            z = 0,
            A = 0,
            B = 0,
            C = 0,
            D = 0;
          "M" == a[0][0] &&
            ((z = +a[0][1]),
            (A = +a[0][2]),
            (B = z),
            (C = A),
            D++,
            (y[0] = ["M", z, A]));
          for (
            var E,
              F,
              G =
                3 == a.length &&
                "M" == a[0][0] &&
                "R" == a[1][0].toUpperCase() &&
                "Z" == a[2][0].toUpperCase(),
              H = D,
              I = a.length;
            I > H;
            H++
          ) {
            if (
              (y.push((E = [])), (F = a[H]), (x = F[0]), x != x.toUpperCase())
            ) {
              switch (((E[0] = x.toUpperCase()), E[0])) {
                case "A":
                  (E[1] = F[1]),
                    (E[2] = F[2]),
                    (E[3] = F[3]),
                    (E[4] = F[4]),
                    (E[5] = F[5]),
                    (E[6] = +(F[6] + z)),
                    (E[7] = +(F[7] + A));
                  break;
                case "V":
                  E[1] = +F[1] + A;
                  break;
                case "H":
                  E[1] = +F[1] + z;
                  break;
                case "R":
                  for (
                    var J = [z, A].concat(F.slice(1)), K = 2, L = J.length;
                    L > K;
                    K++
                  ) {
                    (J[K] = +J[K] + z), (J[++K] = +J[K] + A);
                  }
                  y.pop(), (y = y.concat(ao(J, G)));
                  break;
                case "O":
                  y.pop(),
                    (J = aU(z, A, F[1], F[2])),
                    J.push(J[0]),
                    (y = y.concat(J));
                  break;
                case "U":
                  y.pop(),
                    (y = y.concat(aU(z, A, F[1], F[2], F[3]))),
                    (E = ["U"].concat(y[y.length - 1].slice(-2)));
                  break;
                case "M":
                  (B = +F[1] + z), (C = +F[2] + A);
                default:
                  for (K = 1, L = F.length; L > K; K++) {
                    E[K] = +F[K] + (K % 2 ? z : A);
                  }
              }
            } else {
              if ("R" == x) {
                (J = [z, A].concat(F.slice(1))),
                  y.pop(),
                  (y = y.concat(ao(J, G))),
                  (E = ["R"].concat(F.slice(-2)));
              } else {
                if ("O" == x) {
                  y.pop(),
                    (J = aU(z, A, F[1], F[2])),
                    J.push(J[0]),
                    (y = y.concat(J));
                } else {
                  if ("U" == x) {
                    y.pop(),
                      (y = y.concat(aU(z, A, F[1], F[2], F[3]))),
                      (E = ["U"].concat(y[y.length - 1].slice(-2)));
                  } else {
                    for (var M = 0, N = F.length; N > M; M++) {
                      E[M] = F[M];
                    }
                  }
                }
              }
            }
            if (((x = x.toUpperCase()), "O" != x)) {
              switch (E[0]) {
                case "Z":
                  (z = B), (A = C);
                  break;
                case "H":
                  z = E[1];
                  break;
                case "V":
                  A = E[1];
                  break;
                case "M":
                  (B = E[E.length - 2]), (C = E[E.length - 1]);
                default:
                  (z = E[E.length - 2]), (A = E[E.length - 1]);
              }
            }
          }
          return (y.toString = ah), (c.abs = aj(y)), y;
        }
        function aa(i, j, k, l) {
          return [i, j, k, l, k, l];
        }
        function ac(i, j, k, l, m, n) {
          var o = 1 / 3,
            p = 2 / 3;
          return [
            o * i + p * k,
            o * j + p * l,
            o * m + p * k,
            o * n + p * l,
            m,
            n,
          ];
        }
        function ae(C, P, T, X, aZ, a1, a3, a5, a7, a9) {
          var bb,
            bd = (120 * aF) / 180,
            bf = (aF / 180) * (+aZ || 0),
            bh = [],
            bi = Z._.cacher(function (i, j, k) {
              var l = i * aD.cos(k) - j * aD.sin(k),
                m = i * aD.sin(k) + j * aD.cos(k);
              return {
                x: l,
                y: m,
              };
            });
          if (a9) {
            (bw = a9[0]), (bx = a9[1]), (bu = a9[2]), (bv = a9[3]);
          } else {
            (bb = bi(C, P, -bf)),
              (C = bb.x),
              (P = bb.y),
              (bb = bi(a5, a7, -bf)),
              (a5 = bb.x),
              (a7 = bb.y);
            var bj =
                (aD.cos((aF / 180) * aZ),
                aD.sin((aF / 180) * aZ),
                (C - a5) / 2),
              bl = (P - a7) / 2,
              bn = (bj * bj) / (T * T) + (bl * bl) / (X * X);
            bn > 1 && ((bn = aD.sqrt(bn)), (T = bn * T), (X = bn * X));
            var bp = T * T,
              bq = X * X,
              bs =
                (a1 == a3 ? -1 : 1) *
                aD.sqrt(
                  aN(
                    (bp * bq - bp * bl * bl - bq * bj * bj) /
                      (bp * bl * bl + bq * bj * bj)
                  )
                ),
              bu = (bs * T * bl) / X + (C + a5) / 2,
              bv = (bs * -X * bj) / T + (P + a7) / 2,
              bw = aD.asin(((P - bv) / X).toFixed(9)),
              bx = aD.asin(((a7 - bv) / X).toFixed(9));
            (bw = bu > C ? aF - bw : bw),
              (bx = bu > a5 ? aF - bx : bx),
              0 > bw && (bw = 2 * aF + bw),
              0 > bx && (bx = 2 * aF + bx),
              a3 && bw > bx && (bw -= 2 * aF),
              !a3 && bx > bw && (bx -= 2 * aF);
          }
          var a = bx - bw;
          if (aN(a) > bd) {
            var O = bx,
              W = a5,
              Y = a7;
            (bx = bw + bd * (a3 && bx > bw ? 1 : -1)),
              (a5 = bu + T * aD.cos(bx)),
              (a7 = bv + X * aD.sin(bx)),
              (bh = ae(a5, a7, T, X, aZ, 0, a3, W, Y, [bx, O, bu, bv]));
          }
          a = bx - bw;
          var a0 = aD.cos(bw),
            a2 = aD.sin(bw),
            a4 = aD.cos(bx),
            a6 = aD.sin(bx),
            a8 = aD.tan(a / 4),
            ba = (4 / 3) * T * a8,
            bc = (4 / 3) * X * a8,
            be = [C, P],
            bg = [C + ba * a2, P - bc * a0],
            bk = [a5 + ba * a6, a7 - bc * a4],
            bm = [a5, a7];
          if (((bg[0] = 2 * be[0] - bg[0]), (bg[1] = 2 * be[1] - bg[1]), a9)) {
            return [bg, bk, bm].concat(bh);
          }
          bh = [bg, bk, bm].concat(bh).join().split(",");
          for (var bo = [], br = 0, bt = bh.length; bt > br; br++) {
            bo[br] =
              br % 2
                ? bi(bh[br - 1], bh[br], bf).y
                : bi(bh[br], bh[br + 1], bf).x;
          }
          return bo;
        }
        function ag(k, l, m, n, o, p, q, r, s) {
          var t = 1 - s;
          return {
            x:
              aL(t, 3) * k +
              3 * aL(t, 2) * s * m +
              3 * t * s * s * o +
              aL(s, 3) * q,
            y:
              aL(t, 3) * l +
              3 * aL(t, 2) * s * n +
              3 * t * s * s * p +
              aL(s, 3) * r,
          };
        }
        function ai(q, r, s, t, u, v, w, x) {
          var y,
            z = u - 2 * s + q - (w - 2 * u + s),
            A = 2 * (s - q) - 2 * (u - s),
            B = q - s,
            C = (-A + aD.sqrt(A * A - 4 * z * B)) / 2 / z,
            D = (-A - aD.sqrt(A * A - 4 * z * B)) / 2 / z,
            E = [r, x],
            F = [q, w];
          return (
            aN(C) > "1e12" && (C = 0.5),
            aN(D) > "1e12" && (D = 0.5),
            C > 0 &&
              1 > C &&
              ((y = ag(q, r, s, t, u, v, w, x, C)), F.push(y.x), E.push(y.y)),
            D > 0 &&
              1 > D &&
              ((y = ag(q, r, s, t, u, v, w, x, D)), F.push(y.x), E.push(y.y)),
            (z = v - 2 * t + r - (x - 2 * v + t)),
            (A = 2 * (t - r) - 2 * (v - t)),
            (B = r - t),
            (C = (-A + aD.sqrt(A * A - 4 * z * B)) / 2 / z),
            (D = (-A - aD.sqrt(A * A - 4 * z * B)) / 2 / z),
            aN(C) > "1e12" && (C = 0.5),
            aN(D) > "1e12" && (D = 0.5),
            C > 0 &&
              1 > C &&
              ((y = ag(q, r, s, t, u, v, w, x, C)), F.push(y.x), E.push(y.y)),
            D > 0 &&
              1 > D &&
              ((y = ag(q, r, s, t, u, v, w, x, D)), F.push(y.x), E.push(y.y)),
            {
              min: {
                x: aH.apply(0, F),
                y: aH.apply(0, E),
              },
              max: {
                x: aJ.apply(0, F),
                y: aJ.apply(0, E),
              },
            }
          );
        }
        function ak(c, s) {
          var t = !s && ad(c);
          if (!s && t.curve) {
            return aj(t.curve);
          }
          for (
            var u = aY(c),
              v = s && aY(s),
              w = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null,
                qy: null,
              },
              x = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null,
                qy: null,
              },
              y = function (i, j) {
                var k, l;
                if (!i) {
                  return ["C", j.x, j.y, j.x, j.y, j.x, j.y];
                }
                switch (
                  (!(
                    i[0] in
                    {
                      T: 1,
                      Q: 1,
                    }
                  ) && (j.qx = j.qy = null),
                  i[0])
                ) {
                  case "M":
                    (j.X = i[1]), (j.Y = i[2]);
                    break;
                  case "A":
                    i = ["C"].concat(
                      ae.apply(0, [j.x, j.y].concat(i.slice(1)))
                    );
                    break;
                  case "S":
                    (k = j.x + (j.x - (j.bx || j.x))),
                      (l = j.y + (j.y - (j.by || j.y))),
                      (i = ["C", k, l].concat(i.slice(1)));
                    break;
                  case "T":
                    (j.qx = j.x + (j.x - (j.qx || j.x))),
                      (j.qy = j.y + (j.y - (j.qy || j.y))),
                      (i = ["C"].concat(ac(j.x, j.y, j.qx, j.qy, i[1], i[2])));
                    break;
                  case "Q":
                    (j.qx = i[1]),
                      (j.qy = i[2]),
                      (i = ["C"].concat(ac(j.x, j.y, i[1], i[2], i[3], i[4])));
                    break;
                  case "L":
                    i = ["C"].concat(aa(j.x, j.y, i[1], i[2]));
                    break;
                  case "H":
                    i = ["C"].concat(aa(j.x, j.y, i[1], j.y));
                    break;
                  case "V":
                    i = ["C"].concat(aa(j.x, j.y, j.x, i[1]));
                    break;
                  case "Z":
                    i = ["C"].concat(aa(j.x, j.y, j.X, j.Y));
                }
                return i;
              },
              z = function (d, i) {
                if (d[i].length > 7) {
                  d[i].shift();
                  for (var j = d[i]; j.length; ) {
                    d.splice(i++, 0, ["C"].concat(j.splice(0, 6)));
                  }
                  d.splice(i, 1), (C = aJ(u.length, (v && v.length) || 0));
                }
              },
              A = function (i, j, k, l, m) {
                i &&
                  j &&
                  "M" == i[m][0] &&
                  "M" != j[m][0] &&
                  (j.splice(m, 0, ["M", l.x, l.y]),
                  (k.bx = 0),
                  (k.by = 0),
                  (k.x = i[m][1]),
                  (k.y = i[m][2]),
                  (C = aJ(u.length, (v && v.length) || 0)));
              },
              B = 0,
              C = aJ(u.length, (v && v.length) || 0);
            C > B;
            B++
          ) {
            (u[B] = y(u[B], w)),
              z(u, B),
              v && (v[B] = y(v[B], x)),
              v && z(v, B),
              A(u, v, w, x, B),
              A(v, u, x, w, B);
            var D = u[B],
              E = v && v[B],
              F = D.length,
              G = v && E.length;
            (w.x = D[F - 2]),
              (w.y = D[F - 1]),
              (w.bx = aB(D[F - 4]) || w.x),
              (w.by = aB(D[F - 3]) || w.y),
              (x.bx = v && (aB(E[G - 4]) || x.x)),
              (x.by = v && (aB(E[G - 3]) || x.y)),
              (x.x = v && E[G - 2]),
              (x.y = v && E[G - 1]);
          }
          return v || (t.curve = aj(u)), v ? [u, v] : u;
        }
        function am(j, k) {
          if (!k) {
            return j;
          }
          var l, m, n, o, p, q, r;
          for (j = ak(j), n = 0, p = j.length; p > n; n++) {
            for (r = j[n], o = 1, q = r.length; q > o; o += 2) {
              (l = k.x(r[o], r[o + 1])),
                (m = k.y(r[o], r[o + 1])),
                (r[o] = l),
                (r[o + 1] = m);
            }
          }
          return j;
        }
        function ao(i, j) {
          for (var k = [], l = 0, m = i.length; m - 2 * !j > l; l += 2) {
            var n = [
              {
                x: +i[l - 2],
                y: +i[l - 1],
              },
              {
                x: +i[l],
                y: +i[l + 1],
              },
              {
                x: +i[l + 2],
                y: +i[l + 3],
              },
              {
                x: +i[l + 4],
                y: +i[l + 5],
              },
            ];
            j
              ? l
                ? m - 4 == l
                  ? (n[3] = {
                      x: +i[0],
                      y: +i[1],
                    })
                  : m - 2 == l &&
                    ((n[2] = {
                      x: +i[0],
                      y: +i[1],
                    }),
                    (n[3] = {
                      x: +i[2],
                      y: +i[3],
                    }))
                : (n[0] = {
                    x: +i[m - 2],
                    y: +i[m - 1],
                  })
              : m - 4 == l
              ? (n[3] = n[2])
              : l ||
                (n[0] = {
                  x: +i[l],
                  y: +i[l + 1],
                }),
              k.push([
                "C",
                (-n[0].x + 6 * n[1].x + n[2].x) / 6,
                (-n[0].y + 6 * n[1].y + n[2].y) / 6,
                (n[1].x + 6 * n[2].x - n[3].x) / 6,
                (n[1].y + 6 * n[2].y - n[3].y) / 6,
                n[2].x,
                n[2].y,
              ]);
          }
          return k;
        }
        var aq = ab.prototype,
          at = Z.is,
          av = Z._.clone,
          ax = "hasOwnProperty",
          az = /,?([a-z]),?/gi,
          aB = parseFloat,
          aD = Math,
          aF = aD.PI,
          aH = aD.min,
          aJ = aD.max,
          aL = aD.pow,
          aN = aD.abs,
          aP = an(1),
          aR = an(),
          aT = an(0, 1),
          aV = Z._unit2px,
          aX = {
            path: function (b) {
              return b.attr("path");
            },
            circle: function (c) {
              var d = aV(c);
              return aU(d.cx, d.cy, d.r);
            },
            ellipse: function (c) {
              var d = aV(c);
              return aU(d.cx, d.cy, d.rx, d.ry);
            },
            rect: function (c) {
              var d = aV(c);
              return aS(d.x, d.y, d.width, d.height, d.rx, d.ry);
            },
            image: function (c) {
              var d = aV(c);
              return aS(d.x, d.y, d.width, d.height);
            },
            text: function (c) {
              var d = c.node.getBBox();
              return aS(d.x, d.y, d.width, d.height);
            },
            g: function (c) {
              var d = c.node.getBBox();
              return aS(d.x, d.y, d.width, d.height);
            },
            symbol: function (c) {
              var d = c.getBBox();
              return aS(d.x, d.y, d.width, d.height);
            },
            polyline: function (b) {
              return "M" + b.attr("points");
            },
            polygon: function (b) {
              return "M" + b.attr("points") + "z";
            },
          };
        (Z.path = ad),
          (Z.path.getTotalLength = aP),
          (Z.path.getPointAtLength = aR),
          (Z.path.getSubpath = function (i, j, k) {
            if (this.getTotalLength(i) - k < 1e-6) {
              return aT(i, j).end;
            }
            var l = aT(i, k, 1);
            return j ? aT(l, j).end : l;
          }),
          (aq.getTotalLength = function () {
            return this.node.getTotalLength
              ? this.node.getTotalLength()
              : void 0;
          }),
          (aq.getPointAtLength = function (b) {
            return aR(this.attr("d"), b);
          }),
          (aq.getSubpath = function (a, d) {
            return Z.path.getSubpath(this.attr("d"), a, d);
          }),
          (Z._.box = af),
          (Z.path.findDotsAtSegment = ap),
          (Z.path.bezierBBox = ar),
          (Z.path.isPointInsideBBox = au),
          (Z.path.isBBoxIntersect = aw),
          (Z.path.intersection = aI),
          (Z.path.intersectionNumber = aK),
          (Z.path.isPointInside = aO),
          (Z.path.getBBox = aQ),
          (Z.path.get = aX),
          (Z.path.toRelative = aW),
          (Z.path.toAbsolute = aY),
          (Z.path.toCubic = ak),
          (Z.path.map = am),
          (Z.path.toString = ah),
          (Z.path.clone = aj);
      }),
      h.plugin(function (i) {
        var j = Math.max,
          k = Math.min,
          l = function (d) {
            if (
              ((this.items = []), (this.length = 0), (this.type = "set"), d)
            ) {
              for (var n = 0, o = d.length; o > n; n++) {
                d[n] &&
                  ((this[this.items.length] = this.items[this.items.length] =
                    d[n]),
                  this.length++);
              }
            }
          },
          m = l.prototype;
        (m.push = function () {
          for (var n, o, p = 0, q = arguments.length; q > p; p++) {
            (n = arguments[p]),
              n &&
                ((o = this.items.length),
                (this[o] = this.items[o] = n),
                this.length++);
          }
          return this;
        }),
          (m.pop = function () {
            return this.length && delete this[this.length--], this.items.pop();
          }),
          (m.forEach = function (n, o) {
            for (var p = 0, q = this.items.length; q > p; p++) {
              if (n.call(o, this.items[p], p) === !1) {
                return this;
              }
            }
            return this;
          }),
          (m.attr = function (d) {
            for (var n = 0, o = this.items.length; o > n; n++) {
              this.items[n].attr(d);
            }
            return this;
          }),
          (m.clear = function () {
            for (; this.length; ) {
              this.pop();
            }
          }),
          (m.splice = function (b, c) {
            (b = 0 > b ? j(this.length + b, 0) : b),
              (c = j(0, k(this.length - b, c)));
            var d,
              n = [],
              o = [],
              p = [];
            for (d = 2; d < arguments.length; d++) {
              p.push(arguments[d]);
            }
            for (d = 0; c > d; d++) {
              o.push(this[b + d]);
            }
            for (; d < this.length - b; d++) {
              n.push(this[b + d]);
            }
            var q = p.length;
            for (d = 0; d < q + n.length; d++) {
              this.items[b + d] = this[b + d] = q > d ? p[d] : n[d - q];
            }
            for (d = this.items.length = this.length -= c - q; this[d]; ) {
              delete this[d++];
            }
            return new l(o);
          }),
          (m.exclude = function (d) {
            for (var n = 0, o = this.length; o > n; n++) {
              if (this[n] == d) {
                return this.splice(n, 1), !0;
              }
            }
            return !1;
          }),
          (m.insertAfter = function (c) {
            for (var d = this.items.length; d--; ) {
              this.items[d].insertAfter(c);
            }
            return this;
          }),
          (m.getBBox = function () {
            for (
              var b = [], c = [], n = [], o = [], p = this.items.length;
              p--;

            ) {
              if (!this.items[p].removed) {
                var q = this.items[p].getBBox();
                b.push(q.x),
                  c.push(q.y),
                  n.push(q.x + q.width),
                  o.push(q.y + q.height);
              }
            }
            return (
              (b = k.apply(0, b)),
              (c = k.apply(0, c)),
              (n = j.apply(0, n)),
              (o = j.apply(0, o)),
              {
                x: b,
                y: c,
                x2: n,
                y2: o,
                width: n - b,
                height: o - c,
                cx: b + (n - b) / 2,
                cy: c + (o - c) / 2,
              }
            );
          }),
          (m.clone = function (d) {
            d = new l();
            for (var n = 0, o = this.items.length; o > n; n++) {
              d.push(this.items[n].clone());
            }
            return d;
          }),
          (m.toString = function () {
            return "Snap‘s set";
          }),
          (m.type = "set"),
          (i.set = function () {
            var b = new l();
            return (
              arguments.length &&
                b.push.apply(b, Array.prototype.slice.call(arguments, 0)),
              b
            );
          });
      }),
      h.plugin(function (m, n) {
        function o(c) {
          var d = c[0];
          switch (d.toLowerCase()) {
            case "t":
              return [d, 0, 0];
            case "m":
              return [d, 1, 0, 0, 1, 0, 0];
            case "r":
              return 4 == c.length ? [d, 0, c[2], c[3]] : [d, 0];
            case "s":
              return 5 == c.length
                ? [d, 1, 1, c[3], c[4]]
                : 3 == c.length
                ? [d, 1, 1]
                : [d, 1];
          }
        }
        function p(a, c, i) {
          (c = x(c).replace(/\.{3}|\u2026/g, a)),
            (a = m.parseTransformString(a) || []),
            (c = m.parseTransformString(c) || []);
          for (
            var l,
              y,
              z,
              A,
              B = Math.max(a.length, c.length),
              C = [],
              D = [],
              E = 0;
            B > E;
            E++
          ) {
            if (
              ((z = a[E] || o(c[E])),
              (A = c[E] || o(z)),
              z[0] != A[0] ||
                ("r" == z[0].toLowerCase() && (z[2] != A[2] || z[3] != A[3])) ||
                ("s" == z[0].toLowerCase() && (z[3] != A[3] || z[4] != A[4])))
            ) {
              (a = m._.transform2matrix(a, i())),
                (c = m._.transform2matrix(c, i())),
                (C = [["m", a.a, a.b, a.c, a.d, a.e, a.f]]),
                (D = [["m", c.a, c.b, c.c, c.d, c.e, c.f]]);
              break;
            }
            for (
              C[E] = [], D[E] = [], l = 0, y = Math.max(z.length, A.length);
              y > l;
              l++
            ) {
              l in z && (C[E][l] = z[l]), l in A && (D[E][l] = A[l]);
            }
          }
          return {
            from: u(C),
            to: u(D),
            f: t(C),
          };
        }
        function q(b) {
          return b;
        }
        function r(b) {
          return function (a) {
            return +a.toFixed(3) + b;
          };
        }
        function s(a) {
          return m.rgb(a[0], a[1], a[2]);
        }
        function t(j) {
          var k,
            l,
            y,
            z,
            A,
            B,
            C = 0,
            D = [];
          for (k = 0, l = j.length; l > k; k++) {
            for (
              A = "[", B = ['"' + j[k][0] + '"'], y = 1, z = j[k].length;
              z > y;
              y++
            ) {
              B[y] = "val[" + C++ + "]";
            }
            (A += B + "]"), (D[k] = A);
          }
          return Function("val", "return Snap.path.toString.call([" + D + "])");
        }
        function u(i) {
          for (var j = [], k = 0, l = i.length; l > k; k++) {
            for (var y = 1, z = i[k].length; z > y; y++) {
              j.push(i[k][y]);
            }
          }
          return j;
        }
        var v = {},
          w = /[a-z]+$/i,
          x = String;
        (v.stroke = v.fill = "colour"),
          (n.prototype.equal = function (a, d) {
            var i,
              j,
              k = x(this.attr(a) || ""),
              l = this;
            if (k == +k && d == +d) {
              return {
                from: +k,
                to: +d,
                f: q,
              };
            }
            if ("colour" == v[a]) {
              return (
                (i = m.color(k)),
                (j = m.color(d)),
                {
                  from: [i.r, i.g, i.b, i.opacity],
                  to: [j.r, j.g, j.b, j.opacity],
                  f: s,
                }
              );
            }
            if (
              "transform" == a ||
              "gradientTransform" == a ||
              "patternTransform" == a
            ) {
              return p(k, d, function () {
                return l.getBBox(1);
              });
            }
            if ("d" == a || "path" == a) {
              return (
                (i = m.path.toCubic(k, d)),
                {
                  from: u(i[0]),
                  to: u(i[1]),
                  f: t(i[0]),
                }
              );
            }
            var y = k.match(w),
              z = d.match(w);
            return y && y == z
              ? {
                  from: parseFloat(k),
                  to: parseFloat(d),
                  f: r(y),
                }
              : {
                  from: this.asPX(a),
                  to: this.asPX(a, d),
                  f: q,
                };
          });
      }),
      h.plugin(function (b, v, w, x) {
        for (
          var y = v.prototype,
            z = "hasOwnProperty",
            A = ("createTouch" in x.doc),
            B = [
              "click",
              "dblclick",
              "mousedown",
              "mousemove",
              "mouseout",
              "mouseover",
              "mouseup",
              "touchstart",
              "touchmove",
              "touchend",
              "touchcancel",
            ],
            C = {
              mousedown: "touchstart",
              mousemove: "touchmove",
              mouseup: "touchend",
            },
            D = function (c) {
              var d = "y" == c ? "scrollTop" : "scrollLeft";
              return x.doc.documentElement[d] || x.doc.body[d];
            },
            E = function () {
              this.returnValue = !1;
            },
            F = function () {
              return this.originalEvent.preventDefault();
            },
            G = function () {
              this.cancelBubble = !0;
            },
            H = function () {
              return this.originalEvent.stopPropagation();
            },
            I = (function () {
              return x.doc.addEventListener
                ? function (i, j, k, l) {
                    var m = A && C[j] ? C[j] : j,
                      n = function (a) {
                        var c = D("y"),
                          d = D("x"),
                          o = a.clientX + d,
                          s = a.clientY + c;
                        if (A && C[z](j)) {
                          for (
                            var t = 0,
                              u = a.targetTouches && a.targetTouches.length;
                            u > t;
                            t++
                          ) {
                            if (a.targetTouches[t].target == i) {
                              var O = a;
                              (a = a.targetTouches[t]),
                                (a.originalEvent = O),
                                (a.preventDefault = F),
                                (a.stopPropagation = H);
                              break;
                            }
                          }
                        }
                        return k.call(l, a, o, s);
                      };
                    return (
                      i.addEventListener(m, n, !1),
                      function () {
                        return i.removeEventListener(m, n, !1), !0;
                      }
                    );
                  }
                : x.doc.attachEvent
                ? function (i, j, k, l) {
                    var m = function (c) {
                      c = c || x.win.event;
                      var d = D("y"),
                        o = D("x"),
                        p = c.clientX + o,
                        q = c.clientY + d;
                      return (
                        (c.preventDefault = c.preventDefault || E),
                        (c.stopPropagation = c.stopPropagation || G),
                        k.call(l, c, p, q)
                      );
                    };
                    i.attachEvent("on" + j, m);
                    var n = function () {
                      return i.detachEvent("on" + j, m), !0;
                    };
                    return n;
                  }
                : void 0;
            })(),
            J = [],
            K = function (a) {
              for (
                var k,
                  o = a.clientX,
                  p = a.clientY,
                  q = D("y"),
                  r = D("x"),
                  s = J.length;
                s--;

              ) {
                if (((k = J[s]), A)) {
                  for (var t, u = a.touches.length; u--; ) {
                    if (((t = a.touches[u]), t.identifier == k.el._drag.id)) {
                      (o = t.clientX),
                        (p = t.clientY),
                        (a.originalEvent
                          ? a.originalEvent
                          : a
                        ).preventDefault();
                      break;
                    }
                  }
                } else {
                  a.preventDefault();
                }
                var O = k.el.node;
                b._.glob,
                  O.nextSibling,
                  O.parentNode,
                  O.style.display,
                  (o += r),
                  (p += q),
                  f(
                    "snap.drag.move." + k.el.id,
                    k.move_scope || k.el,
                    o - k.el._drag.x,
                    p - k.el._drag.y,
                    o,
                    p,
                    a
                  );
              }
            },
            L = function (a) {
              b.unmousemove(K).unmouseup(L);
              for (var i, j = J.length; j--; ) {
                (i = J[j]),
                  (i.el._drag = {}),
                  f(
                    "snap.drag.end." + i.el.id,
                    i.end_scope || i.start_scope || i.move_scope || i.el,
                    a
                  );
              }
              J = [];
            },
            M = B.length;
          M--;

        ) {
          !(function (a) {
            (b[a] = y[a] =
              function (i, j) {
                return (
                  b.is(i, "function") &&
                    ((this.events = this.events || []),
                    this.events.push({
                      name: a,
                      f: i,
                      unbind: I(
                        this.shape || this.node || x.doc,
                        a,
                        i,
                        j || this
                      ),
                    })),
                  this
                );
              }),
              (b["un" + a] = y["un" + a] =
                function (i) {
                  for (var j = this.events || [], k = j.length; k--; ) {
                    if (j[k].name == a && (j[k].f == i || !i)) {
                      return (
                        j[k].unbind(),
                        j.splice(k, 1),
                        !j.length && delete this.events,
                        this
                      );
                    }
                  }
                  return this;
                });
          })(B[M]);
        }
        (y.hover = function (i, j, k, l) {
          return this.mouseover(i, k).mouseout(j, l || k);
        }),
          (y.unhover = function (c, d) {
            return this.unmouseover(c).unmouseout(d);
          });
        var N = [];
        (y.drag = function (a, k, l, m, n, o) {
          function p(c) {
            (c.originalEvent || c).preventDefault();
            var d = D("y"),
              r = D("x");
            (this._drag.x = c.clientX + r),
              (this._drag.y = c.clientY + d),
              (this._drag.id = c.identifier),
              !J.length && b.mousemove(K).mouseup(L),
              J.push({
                el: this,
                move_scope: m,
                start_scope: n,
                end_scope: o,
              }),
              k && f.on("snap.drag.start." + this.id, k),
              a && f.on("snap.drag.move." + this.id, a),
              l && f.on("snap.drag.end." + this.id, l),
              f(
                "snap.drag.start." + this.id,
                n || m || this,
                c.clientX + r,
                c.clientY + d,
                c
              );
          }
          if (!arguments.length) {
            var q;
            return this.drag(
              function (c, d) {
                this.attr({
                  transform: q + (q ? "T" : "t") + [c, d],
                });
              },
              function () {
                q = this.transform().local;
              }
            );
          }
          return (
            (this._drag = {}),
            N.push({
              el: this,
              start: p,
            }),
            this.mousedown(p),
            this
          );
        }),
          (y.undrag = function () {
            for (var a = N.length; a--; ) {
              N[a].el == this &&
                (this.unmousedown(N[a].start),
                N.splice(a, 1),
                f.unbind("snap.drag.*." + this.id));
            }
            return !N.length && b.unmousemove(K).unmouseup(L), this;
          });
      }),
      h.plugin(function (b, i, j) {
        var k = (i.prototype, j.prototype),
          l = /^\s*url\((.+)\)/,
          m = String,
          n = b._.$;
        (b.filter = {}),
          (k.filter = function (a) {
            var c = this;
            "svg" != c.type && (c = c.paper);
            var o = b.parse(m(a)),
              p = b._.id(),
              q = c.node.offsetWidth,
              r = c.node.offsetHeight,
              s = n("filter");
            return (
              n(s, {
                id: p,
                filterUnits: "userSpaceOnUse",
                x: 0,
                y: 0,
                width: q,
                height: r,
              }),
              s.appendChild(o.node),
              c.defs.appendChild(s),
              new i(s)
            );
          }),
          f.on("snap.util.getattr.filter", function () {
            f.stop();
            var a = n(this.node, "filter");
            if (a) {
              var o = m(a).match(l);
              return o && b.select(o[1]);
            }
          }),
          f.on("snap.util.attr.filter", function (c) {
            if (c instanceof i && "filter" == c.type) {
              f.stop();
              var o = c.node.id;
              o ||
                (n(c.node, {
                  id: c.id,
                }),
                (o = c.id)),
                n(this.node, {
                  filter: "url(#" + o + ")",
                });
            }
            (c && "none" != c) ||
              (f.stop(), this.node.removeAttribute("filter"));
          }),
          (b.filter.blur = function (a, o) {
            null == a && (a = 2);
            var p = null == o ? a : [a, o];
            return b.format('<feGaussianBlur stdDeviation="{def}"/>', {
              def: p,
            });
          }),
          (b.filter.blur.toString = function () {
            return this();
          }),
          (b.filter.shadow = function (a, o, p, q) {
            return (
              (q = q || "#000"),
              null == p && (p = 4),
              "string" == typeof p && ((q = p), (p = 4)),
              null == a && ((a = 0), (o = 2)),
              null == o && (o = a),
              (q = b.color(q)),
              b.format(
                '<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',
                {
                  color: q,
                  dx: a,
                  dy: o,
                  blur: p,
                }
              )
            );
          }),
          (b.filter.shadow.toString = function () {
            return this();
          }),
          (b.filter.grayscale = function (a) {
            return (
              null == a && (a = 1),
              b.format(
                '<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',
                {
                  a: 0.2126 + 0.7874 * (1 - a),
                  b: 0.7152 - 0.7152 * (1 - a),
                  c: 0.0722 - 0.0722 * (1 - a),
                  d: 0.2126 - 0.2126 * (1 - a),
                  e: 0.7152 + 0.2848 * (1 - a),
                  f: 0.0722 - 0.0722 * (1 - a),
                  g: 0.2126 - 0.2126 * (1 - a),
                  h: 0.0722 + 0.9278 * (1 - a),
                }
              )
            );
          }),
          (b.filter.grayscale.toString = function () {
            return this();
          }),
          (b.filter.sepia = function (a) {
            return (
              null == a && (a = 1),
              b.format(
                '<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',
                {
                  a: 0.393 + 0.607 * (1 - a),
                  b: 0.769 - 0.769 * (1 - a),
                  c: 0.189 - 0.189 * (1 - a),
                  d: 0.349 - 0.349 * (1 - a),
                  e: 0.6860000000000001 + 0.314 * (1 - a),
                  f: 0.168 - 0.168 * (1 - a),
                  g: 0.272 - 0.272 * (1 - a),
                  h: 0.534 - 0.534 * (1 - a),
                  i: 0.131 + 0.869 * (1 - a),
                }
              )
            );
          }),
          (b.filter.sepia.toString = function () {
            return this();
          }),
          (b.filter.saturate = function (a) {
            return (
              null == a && (a = 1),
              b.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                amount: 1 - a,
              })
            );
          }),
          (b.filter.saturate.toString = function () {
            return this();
          }),
          (b.filter.hueRotate = function (a) {
            return (
              (a = a || 0),
              b.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                angle: a,
              })
            );
          }),
          (b.filter.hueRotate.toString = function () {
            return this();
          }),
          (b.filter.invert = function (a) {
            return (
              null == a && (a = 1),
              b.format(
                '<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',
                {
                  amount: a,
                  amount2: 1 - a,
                }
              )
            );
          }),
          (b.filter.invert.toString = function () {
            return this();
          }),
          (b.filter.brightness = function (a) {
            return (
              null == a && (a = 1),
              b.format(
                '<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',
                {
                  amount: a,
                }
              )
            );
          }),
          (b.filter.brightness.toString = function () {
            return this();
          }),
          (b.filter.contrast = function (a) {
            return (
              null == a && (a = 1),
              b.format(
                '<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',
                {
                  amount: a,
                  amount2: 0.5 - a / 2,
                }
              )
            );
          }),
          (b.filter.contrast.toString = function () {
            return this();
          });
      }),
      h
    );
  });
