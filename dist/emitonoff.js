!(function (e) { if (typeof exports === 'object' && typeof module !== 'undefined')module.exports = e(); else if (typeof define === 'function' && define.amd)define([], e); else { var f; typeof window !== 'undefined' ? f = window : typeof global !== 'undefined' ? f = global : typeof self !== 'undefined' && (f = self), f.emitonoff = e() } }(function () {
  var define, module, exports; return (function e (t, n, r) { function s (o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require === 'function' && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = 'MODULE_NOT_FOUND', f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n || e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require === 'function' && require; for (var o = 0; o < r.length; o++)s(r[o]); return s })({ 1: [function (require, module, exports) {
    var EmitOnOff = module.exports = function (thing) {
      if (!thing) thing = {}

      thing._subs = []
      thing._paused = false
      thing._pending = []

      /**
   * Sub of pubsub
   * @param  {String}   name name of event
   * @param  {Function} cb   your callback
   */
      thing.on = function (name, cb) {
        thing._subs[name] = thing._subs[name] || []
        thing._subs[name].push(cb)
      }

      /**
   * remove sub of pubsub
   * @param  {String}   name name of event
   * @param  {Function} cb   your callback
   */
      thing.off = function (name, cb) {
        if (!thing._subs[name]) return
        for (var i in thing._subs[name]) {
          if (thing._subs[name][i] === cb) {
            thing._subs[name].splice(i)
            break
          }
        }
      }

      /**
   * Pub of pubsub
   * @param  {String}   name name of event
   * @param  {Mixed}    data the data to publish
   */
      thing.emit = function (name) {
        if (!thing._subs[name]) return

        var args = Array.prototype.slice.call(arguments, 1)

        if (thing._paused) {
          thing._pending[name] = thing._pending[name] || []
          thing._pending[name].push(args)
          return
        }

        for (var i in thing._subs[name]) {
          thing._subs[name][i].apply(thing, args)
        }
      }

      thing.pause = function () {
        thing._paused = true
      }

      thing.resume = function () {
        thing._paused = false

        for (var name in thing._pending) {
          for (var i = 0; i < thing._pending[name].length; i++) {
            thing.emit(name, thing._pending[name][i])
          }
        }
      }

      return thing
    }
  }, {}] }, {}, [1])(1)
}))
