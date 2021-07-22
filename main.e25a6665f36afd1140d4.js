(self.webpackChunkwedding = self.webpackChunkwedding || []).push([[179], {
    255: t => {
        function e(t) {
            return Promise.resolve().then(() => {
                var e = new Error("Cannot find module '" + t + "'");
                throw e.code = "MODULE_NOT_FOUND", e
            })
        }

        e.keys = () => [], e.resolve = e, e.id = 255, t.exports = e
    }, 101: (t, e, n) => {
        "use strict";

        function r(t) {
            return "function" == typeof t
        }

        let s = !1;
        const i = {
            Promise: void 0, set useDeprecatedSynchronousErrorHandling(t) {
                if (t) {
                    const t = new Error;
                    console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + t.stack)
                } else s && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                s = t
            }, get useDeprecatedSynchronousErrorHandling() {
                return s
            }
        };

        function o(t) {
            setTimeout(() => {
                throw t
            }, 0)
        }

        const a = {
            closed: !0, next(t) {
            }, error(t) {
                if (i.useDeprecatedSynchronousErrorHandling) throw t;
                o(t)
            }, complete() {
            }
        }, l = (() => Array.isArray || (t => t && "number" == typeof t.length))();

        function c(t) {
            return null !== t && "object" == typeof t
        }

        const u = (() => {
            function t(t) {
                return Error.call(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((t, e) => `${e + 1}) ${t.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t, this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();
        let h = (() => {
            class t {
                constructor(t) {
                    this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._ctorUnsubscribe = !0, this._unsubscribe = t)
                }

                unsubscribe() {
                    let e;
                    if (this.closed) return;
                    let {_parentOrParents: n, _ctorUnsubscribe: s, _unsubscribe: i, _subscriptions: o} = this;
                    if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, n instanceof t) n.remove(this); else if (null !== n) for (let t = 0; t < n.length; ++t) n[t].remove(this);
                    if (r(i)) {
                        s && (this._unsubscribe = void 0);
                        try {
                            i.call(this)
                        } catch (a) {
                            e = a instanceof u ? d(a.errors) : [a]
                        }
                    }
                    if (l(o)) {
                        let t = -1, n = o.length;
                        for (; ++t < n;) {
                            const n = o[t];
                            if (c(n)) try {
                                n.unsubscribe()
                            } catch (a) {
                                e = e || [], a instanceof u ? e = e.concat(d(a.errors)) : e.push(a)
                            }
                        }
                    }
                    if (e) throw new u(e)
                }

                add(e) {
                    let n = e;
                    if (!e) return t.EMPTY;
                    switch (typeof e) {
                        case"function":
                            n = new t(e);
                        case"object":
                            if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
                            if (this.closed) return n.unsubscribe(), n;
                            if (!(n instanceof t)) {
                                const e = n;
                                n = new t, n._subscriptions = [e]
                            }
                            break;
                        default:
                            throw new Error("unrecognized teardown " + e + " added to Subscription.")
                    }
                    let {_parentOrParents: r} = n;
                    if (null === r) n._parentOrParents = this; else if (r instanceof t) {
                        if (r === this) return n;
                        n._parentOrParents = [r, this]
                    } else {
                        if (-1 !== r.indexOf(this)) return n;
                        r.push(this)
                    }
                    const s = this._subscriptions;
                    return null === s ? this._subscriptions = [n] : s.push(n), n
                }

                remove(t) {
                    const e = this._subscriptions;
                    if (e) {
                        const n = e.indexOf(t);
                        -1 !== n && e.splice(n, 1)
                    }
                }
            }

            return t.EMPTY = function (t) {
                return t.closed = !0, t
            }(new t), t
        })();

        function d(t) {
            return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), [])
        }

        const p = (() => "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random())();

        class f extends h {
            constructor(t, e, n) {
                switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
                    case 0:
                        this.destination = a;
                        break;
                    case 1:
                        if (!t) {
                            this.destination = a;
                            break
                        }
                        if ("object" == typeof t) {
                            t instanceof f ? (this.syncErrorThrowable = t.syncErrorThrowable, this.destination = t, t.add(this)) : (this.syncErrorThrowable = !0, this.destination = new m(this, t));
                            break
                        }
                    default:
                        this.syncErrorThrowable = !0, this.destination = new m(this, t, e, n)
                }
            }

            [p]() {
                return this
            }

            static create(t, e, n) {
                const r = new f(t, e, n);
                return r.syncErrorThrowable = !1, r
            }

            next(t) {
                this.isStopped || this._next(t)
            }

            error(t) {
                this.isStopped || (this.isStopped = !0, this._error(t))
            }

            complete() {
                this.isStopped || (this.isStopped = !0, this._complete())
            }

            unsubscribe() {
                this.closed || (this.isStopped = !0, super.unsubscribe())
            }

            _next(t) {
                this.destination.next(t)
            }

            _error(t) {
                this.destination.error(t), this.unsubscribe()
            }

            _complete() {
                this.destination.complete(), this.unsubscribe()
            }

            _unsubscribeAndRecycle() {
                const {_parentOrParents: t} = this;
                return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
            }
        }

        class m extends f {
            constructor(t, e, n, s) {
                let i;
                super(), this._parentSubscriber = t;
                let o = this;
                r(e) ? i = e : e && (i = e.next, n = e.error, s = e.complete, e !== a && (o = Object.create(e), r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)), o.unsubscribe = this.unsubscribe.bind(this))), this._context = o, this._next = i, this._error = n, this._complete = s
            }

            next(t) {
                if (!this.isStopped && this._next) {
                    const {_parentSubscriber: e} = this;
                    i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
                }
            }

            error(t) {
                if (!this.isStopped) {
                    const {_parentSubscriber: e} = this, {useDeprecatedSynchronousErrorHandling: n} = i;
                    if (this._error) n && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe()); else if (e.syncErrorThrowable) n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : o(t), this.unsubscribe(); else {
                        if (this.unsubscribe(), n) throw t;
                        o(t)
                    }
                }
            }

            complete() {
                if (!this.isStopped) {
                    const {_parentSubscriber: t} = this;
                    if (this._complete) {
                        const e = () => this._complete.call(this._context);
                        i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, e), this.unsubscribe()) : (this.__tryOrUnsub(e), this.unsubscribe())
                    } else this.unsubscribe()
                }
            }

            __tryOrUnsub(t, e) {
                try {
                    t.call(this._context, e)
                } catch (n) {
                    if (this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling) throw n;
                    o(n)
                }
            }

            __tryOrSetError(t, e, n) {
                if (!i.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                try {
                    e.call(this._context, n)
                } catch (r) {
                    return i.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = r, t.syncErrorThrown = !0, !0) : (o(r), !0)
                }
                return !1
            }

            _unsubscribe() {
                const {_parentSubscriber: t} = this;
                this._context = null, this._parentSubscriber = null, t.unsubscribe()
            }
        }

        const g = (() => "function" == typeof Symbol && Symbol.observable || "@@observable")();

        function y(t) {
            return t
        }

        let _ = (() => {
            class t {
                constructor(t) {
                    this._isScalar = !1, t && (this._subscribe = t)
                }

                lift(e) {
                    const n = new t;
                    return n.source = this, n.operator = e, n
                }

                subscribe(t, e, n) {
                    const {operator: r} = this, s = function (t, e, n) {
                        if (t) {
                            if (t instanceof f) return t;
                            if (t[p]) return t[p]()
                        }
                        return t || e || n ? new f(t, e, n) : new f(a)
                    }(t, e, n);
                    if (s.add(r ? r.call(s, this.source) : this.source || i.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)), i.useDeprecatedSynchronousErrorHandling && s.syncErrorThrowable && (s.syncErrorThrowable = !1, s.syncErrorThrown)) throw s.syncErrorValue;
                    return s
                }

                _trySubscribe(t) {
                    try {
                        return this._subscribe(t)
                    } catch (e) {
                        i.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e), function (t) {
                            for (; t;) {
                                const {closed: e, destination: n, isStopped: r} = t;
                                if (e || r) return !1;
                                t = n && n instanceof f ? n : null
                            }
                            return !0
                        }(t) ? t.error(e) : console.warn(e)
                    }
                }

                forEach(t, e) {
                    return new (e = v(e))((e, n) => {
                        let r;
                        r = this.subscribe(e => {
                            try {
                                t(e)
                            } catch (s) {
                                n(s), r && r.unsubscribe()
                            }
                        }, n, e)
                    })
                }

                _subscribe(t) {
                    const {source: e} = this;
                    return e && e.subscribe(t)
                }

                [g]() {
                    return this
                }

                pipe(...t) {
                    return 0 === t.length ? this : (0 === (e = t).length ? y : 1 === e.length ? e[0] : function (t) {
                        return e.reduce((t, e) => e(t), t)
                    })(this);
                    var e
                }

                toPromise(t) {
                    return new (t = v(t))((t, e) => {
                        let n;
                        this.subscribe(t => n = t, t => e(t), () => t(n))
                    })
                }
            }

            return t.create = e => new t(e), t
        })();

        function v(t) {
            if (t || (t = i.Promise || Promise), !t) throw new Error("no Promise impl found");
            return t
        }

        const b = (() => {
            function t() {
                return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();

        class w extends h {
            constructor(t, e) {
                super(), this.subject = t, this.subscriber = e, this.closed = !1
            }

            unsubscribe() {
                if (this.closed) return;
                this.closed = !0;
                const t = this.subject, e = t.observers;
                if (this.subject = null, !e || 0 === e.length || t.isStopped || t.closed) return;
                const n = e.indexOf(this.subscriber);
                -1 !== n && e.splice(n, 1)
            }
        }

        class S extends f {
            constructor(t) {
                super(t), this.destination = t
            }
        }

        let C = (() => {
            class t extends _ {
                constructor() {
                    super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null
                }

                [p]() {
                    return new S(this)
                }

                lift(t) {
                    const e = new E(this, this);
                    return e.operator = t, e
                }

                next(t) {
                    if (this.closed) throw new b;
                    if (!this.isStopped) {
                        const {observers: e} = this, n = e.length, r = e.slice();
                        for (let s = 0; s < n; s++) r[s].next(t)
                    }
                }

                error(t) {
                    if (this.closed) throw new b;
                    this.hasError = !0, this.thrownError = t, this.isStopped = !0;
                    const {observers: e} = this, n = e.length, r = e.slice();
                    for (let s = 0; s < n; s++) r[s].error(t);
                    this.observers.length = 0
                }

                complete() {
                    if (this.closed) throw new b;
                    this.isStopped = !0;
                    const {observers: t} = this, e = t.length, n = t.slice();
                    for (let r = 0; r < e; r++) n[r].complete();
                    this.observers.length = 0
                }

                unsubscribe() {
                    this.isStopped = !0, this.closed = !0, this.observers = null
                }

                _trySubscribe(t) {
                    if (this.closed) throw new b;
                    return super._trySubscribe(t)
                }

                _subscribe(t) {
                    if (this.closed) throw new b;
                    return this.hasError ? (t.error(this.thrownError), h.EMPTY) : this.isStopped ? (t.complete(), h.EMPTY) : (this.observers.push(t), new w(this, t))
                }

                asObservable() {
                    const t = new _;
                    return t.source = this, t
                }
            }

            return t.create = (t, e) => new E(t, e), t
        })();

        class E extends C {
            constructor(t, e) {
                super(), this.destination = t, this.source = e
            }

            next(t) {
                const {destination: e} = this;
                e && e.next && e.next(t)
            }

            error(t) {
                const {destination: e} = this;
                e && e.error && this.destination.error(t)
            }

            complete() {
                const {destination: t} = this;
                t && t.complete && this.destination.complete()
            }

            _subscribe(t) {
                const {source: e} = this;
                return e ? this.source.subscribe(t) : h.EMPTY
            }
        }

        function x(t) {
            return t && "function" == typeof t.schedule
        }

        function k(t, e) {
            return function (n) {
                if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                return n.lift(new T(t, e))
            }
        }

        class T {
            constructor(t, e) {
                this.project = t, this.thisArg = e
            }

            call(t, e) {
                return e.subscribe(new O(t, this.project, this.thisArg))
            }
        }

        class O extends f {
            constructor(t, e, n) {
                super(t), this.project = e, this.count = 0, this.thisArg = n || this
            }

            _next(t) {
                let e;
                try {
                    e = this.project.call(this.thisArg, t, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(e)
            }
        }

        const A = t => e => {
            for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
            e.complete()
        };

        function P() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }

        const I = P(), R = t => t && "number" == typeof t.length && "function" != typeof t;

        function N(t) {
            return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        }

        const D = t => {
            if (t && "function" == typeof t[g]) return n = t, t => {
                const e = n[g]();
                if ("function" != typeof e.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                return e.subscribe(t)
            };
            if (R(t)) return A(t);
            if (N(t)) return (t => e => (t.then(t => {
                e.closed || (e.next(t), e.complete())
            }, t => e.error(t)).then(null, o), e))(t);
            if (t && "function" == typeof t[I]) return e = t, t => {
                const n = e[I]();
                for (; ;) {
                    let e;
                    try {
                        e = n.next()
                    } catch (r) {
                        return t.error(r), t
                    }
                    if (e.done) {
                        t.complete();
                        break
                    }
                    if (t.next(e.value), t.closed) break
                }
                return "function" == typeof n.return && t.add(() => {
                    n.return && n.return()
                }), t
            };
            {
                const e = c(t) ? "an invalid object" : `'${t}'`;
                throw new TypeError(`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)
            }
            var e, n
        };

        function j(t, e) {
            return new _(n => {
                const r = new h;
                let s = 0;
                return r.add(e.schedule(function () {
                    s !== t.length ? (n.next(t[s++]), n.closed || r.add(this.schedule())) : n.complete()
                })), r
            })
        }

        function M(t, e) {
            return e ? function (t, e) {
                if (null != t) {
                    if (function (t) {
                        return t && "function" == typeof t[g]
                    }(t)) return function (t, e) {
                        return new _(n => {
                            const r = new h;
                            return r.add(e.schedule(() => {
                                const s = t[g]();
                                r.add(s.subscribe({
                                    next(t) {
                                        r.add(e.schedule(() => n.next(t)))
                                    }, error(t) {
                                        r.add(e.schedule(() => n.error(t)))
                                    }, complete() {
                                        r.add(e.schedule(() => n.complete()))
                                    }
                                }))
                            })), r
                        })
                    }(t, e);
                    if (N(t)) return function (t, e) {
                        return new _(n => {
                            const r = new h;
                            return r.add(e.schedule(() => t.then(t => {
                                r.add(e.schedule(() => {
                                    n.next(t), r.add(e.schedule(() => n.complete()))
                                }))
                            }, t => {
                                r.add(e.schedule(() => n.error(t)))
                            }))), r
                        })
                    }(t, e);
                    if (R(t)) return j(t, e);
                    if (function (t) {
                        return t && "function" == typeof t[I]
                    }(t) || "string" == typeof t) return function (t, e) {
                        if (!t) throw new Error("Iterable cannot be null");
                        return new _(n => {
                            const r = new h;
                            let s;
                            return r.add(() => {
                                s && "function" == typeof s.return && s.return()
                            }), r.add(e.schedule(() => {
                                s = t[I](), r.add(e.schedule(function () {
                                    if (n.closed) return;
                                    let t, e;
                                    try {
                                        const n = s.next();
                                        t = n.value, e = n.done
                                    } catch (r) {
                                        return void n.error(r)
                                    }
                                    e ? n.complete() : (n.next(t), this.schedule())
                                }))
                            })), r
                        })
                    }(t, e)
                }
                throw new TypeError((null !== t && typeof t || t) + " is not observable")
            }(t, e) : t instanceof _ ? t : new _(D(t))
        }

        class F extends f {
            constructor(t) {
                super(), this.parent = t
            }

            _next(t) {
                this.parent.notifyNext(t)
            }

            _error(t) {
                this.parent.notifyError(t), this.unsubscribe()
            }

            _complete() {
                this.parent.notifyComplete(), this.unsubscribe()
            }
        }

        class L extends f {
            notifyNext(t) {
                this.destination.next(t)
            }

            notifyError(t) {
                this.destination.error(t)
            }

            notifyComplete() {
                this.destination.complete()
            }
        }

        function U(t, e) {
            if (e.closed) return;
            if (t instanceof _) return t.subscribe(e);
            let n;
            try {
                n = D(t)(e)
            } catch (r) {
                e.error(r)
            }
            return n
        }

        function H(t, e, n = Number.POSITIVE_INFINITY) {
            return "function" == typeof e ? r => r.pipe(H((n, r) => M(t(n, r)).pipe(k((t, s) => e(n, t, r, s))), n)) : ("number" == typeof e && (n = e), e => e.lift(new $(t, n)))
        }

        class ${constructor(t,e=Number.POSITIVE_INFINITY){this.project=t,this.concurrent=e}
        call

        (t, e)
        {
            return e.subscribe(new z(t, this.project, this.concurrent))
        }
    }class z extends L{
    constructor(t, e, n = Number.POSITIVE_INFINITY) {
        super(t), this.project = e, this.concurrent = n, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0
    }_next(t) {
        this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
    }_tryNext(t) {
        let e;
        const n = this.index++;
        try {
            e = this.project(t, n)
        } catch (r) {
            return void this.destination.error(r)
        }
        this.active++, this._innerSub(e)
    }_innerSub(t) {
        const e = new F(this), n = this.destination;
        n.add(e);
        const r = U(t, e);
        r !== e && n.add(r)
    }_complete() {
        this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
    }notifyNext(t) {
        this.destination.next(t)
    }notifyComplete() {
        const t = this.buffer;
        this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
    }
}function V(t = Number.POSITIVE_INFINITY) {
    return H(y, t)
}function B(t, e) {
    return e ? j(t, e) : new _(A(t))
}function q() {
    return function (t) {
        return t.lift(new Q(t))
    }
}class Q {
    constructor(t) {
        this.connectable = t
    }

    call(t, e) {
        const {connectable: n} = this;
        n._refCount++;
        const r = new K(t, n), s = e.subscribe(r);
        return r.closed || (r.connection = n.connect()), s
    }
}class K extends f {
    constructor(t, e) {
        super(t), this.connectable = e
    }

    _unsubscribe() {
        const {connectable: t} = this;
        if (!t) return void (this.connection = null);
        this.connectable = null;
        const e = t._refCount;
        if (e <= 0) return void (this.connection = null);
        if (t._refCount = e - 1, e > 1) return void (this.connection = null);
        const {connection: n} = this, r = t._connection;
        this.connection = null, !r || n && r !== n || r.unsubscribe()
    }
}class W extends _ {
    constructor(t, e) {
        super(), this.source = t, this.subjectFactory = e, this._refCount = 0, this._isComplete = !1
    }

    _subscribe(t) {
        return this.getSubject().subscribe(t)
    }

    getSubject() {
        const t = this._subject;
        return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
    }

    connect() {
        let t = this._connection;
        return t || (this._isComplete = !1, t = this._connection = new h, t.add(this.source.subscribe(new Z(this.getSubject(), this))), t.closed && (this._connection = null, t = h.EMPTY)), t
    }

    refCount() {
        return q()(this)
    }
}
const G = (() => {
    const t = W.prototype;
    return {
        operator: {value: null},
        _refCount: {value: 0, writable: !0},
        _subject: {value: null, writable: !0},
        _connection: {value: null, writable: !0},
        _subscribe: {value: t._subscribe},
        _isComplete: {value: t._isComplete, writable: !0},
        getSubject: {value: t.getSubject},
        connect: {value: t.connect},
        refCount: {value: t.refCount}
    }
})();

class Z extends S {
    constructor(t, e) {
        super(t), this.connectable = e
    }

    _error(t) {
        this._unsubscribe(), super._error(t)
    }

    _complete() {
        this.connectable._isComplete = !0, this._unsubscribe(), super._complete()
    }

    _unsubscribe() {
        const t = this.connectable;
        if (t) {
            this.connectable = null;
            const e = t._connection;
            t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe()
        }
    }
}

function Y() {
    return new C
}

function J(t) {
    for (let e in t) if (t[e] === J) return e;
    throw Error("Could not find renamed property on target object.")
}

function X(t) {
    if ("string" == typeof t) return t;
    if (Array.isArray(t)) return "[" + t.map(X).join(", ") + "]";
    if (null == t) return "" + t;
    if (t.overriddenName) return `${t.overriddenName}`;
    if (t.name) return `${t.name}`;
    const e = t.toString();
    if (null == e) return "" + e;
    const n = e.indexOf("\n");
    return -1 === n ? e : e.substring(0, n)
}

function tt(t, e) {
    return null == t || "" === t ? null === e ? "" : e : null == e || "" === e ? t : t + " " + e
}

const et = J({__forward_ref__: J});

function nt(t) {
    return t.__forward_ref__ = nt, t.toString = function () {
        return X(this())
    }, t
}

function rt(t) {
    return "function" == typeof (e = t) && e.hasOwnProperty(et) && e.__forward_ref__ === nt ? t() : t;
    var e
}

class st extends Error {
    constructor(t, e) {
        super(function (t, e) {
            return `${t ? `NG0${t}: ` : ""}${e}`
        }(t, e)), this.code = t
    }
}

function it(t) {
    return "function" == typeof t ? t.name || t.toString() : "object" == typeof t && null != t && "function" == typeof t.type ? t.type.name || t.type.toString() : function (t) {
        return "string" == typeof t ? t : null == t ? "" : String(t)
    }(t)
}

function ot(t, e) {
    const n = e ? ` in ${e}` : "";
    throw new st("201", `No provider for ${it(t)} found${n}`)
}

function at(t) {
    return {token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0}
}

function lt(t) {
    return {providers: t.providers || [], imports: t.imports || []}
}

function ct(t) {
    return ut(t, dt) || ut(t, ft)
}

function ut(t, e) {
    return t.hasOwnProperty(e) ? t[e] : null
}

function ht(t) {
    return t && (t.hasOwnProperty(pt) || t.hasOwnProperty(mt)) ? t[pt] : null
}

const dt = J({"\u0275prov": J}), pt = J({"\u0275inj": J}), ft = J({ngInjectableDef: J}), mt = J({ngInjectorDef: J});
var gt = function (t) {
    return t[t.Default = 0] = "Default", t[t.Host = 1] = "Host", t[t.Self = 2] = "Self", t[t.SkipSelf = 4] = "SkipSelf", t[t.Optional = 8] = "Optional", t
}({});
let yt;

function _t(t) {
    const e = yt;
    return yt = t, e
}

function vt(t, e, n) {
    const r = ct(t);
    return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & gt.Optional ? null : void 0 !== e ? e : void ot(X(t), "Injector")
}

function bt(t) {
    return {toString: t}.toString()
}

var wt = function (t) {
    return t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default", t
}({}), St = function (t) {
    return t[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom", t
}({});
const Ct = "undefined" != typeof globalThis && globalThis, Et = "undefined" != typeof window && window,
    xt = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
    kt = "undefined" != typeof global && global, Tt = Ct || kt || Et || xt, Ot = {}, At = [], Pt = J({"\u0275cmp": J}),
    It = J({"\u0275dir": J}), Rt = J({"\u0275pipe": J}), Nt = J({"\u0275mod": J}), Dt = J({"\u0275loc": J}),
    jt = J({"\u0275fac": J}), Mt = J({__NG_ELEMENT_ID__: J});
let Ft = 0;

function Lt(t) {
    return bt(() => {
        const e = {}, n = {
            type: t.type,
            providersResolver: null,
            decls: t.decls,
            vars: t.vars,
            factory: null,
            template: t.template || null,
            consts: t.consts || null,
            ngContentSelectors: t.ngContentSelectors,
            hostBindings: t.hostBindings || null,
            hostVars: t.hostVars || 0,
            hostAttrs: t.hostAttrs || null,
            contentQueries: t.contentQueries || null,
            declaredInputs: e,
            inputs: null,
            outputs: null,
            exportAs: t.exportAs || null,
            onPush: t.changeDetection === wt.OnPush,
            directiveDefs: null,
            pipeDefs: null,
            selectors: t.selectors || At,
            viewQuery: t.viewQuery || null,
            features: t.features || null,
            data: t.data || {},
            encapsulation: t.encapsulation || St.Emulated,
            id: "c",
            styles: t.styles || At,
            _: null,
            setInput: null,
            schemas: t.schemas || null,
            tView: null
        }, r = t.directives, s = t.features, i = t.pipes;
        return n.id += Ft++, n.inputs = Vt(t.inputs, e), n.outputs = Vt(t.outputs), s && s.forEach(t => t(n)), n.directiveDefs = r ? () => ("function" == typeof r ? r() : r).map(Ut) : null, n.pipeDefs = i ? () => ("function" == typeof i ? i() : i).map(Ht) : null, n
    })
}

function Ut(t) {
    return qt(t) || function (t) {
        return t[It] || null
    }(t)
}

function Ht(t) {
    return function (t) {
        return t[Rt] || null
    }(t)
}

const $t = {};

function zt(t) {
    const e = {
        type: t.type,
        bootstrap: t.bootstrap || At,
        declarations: t.declarations || At,
        imports: t.imports || At,
        exports: t.exports || At,
        transitiveCompileScopes: null,
        schemas: t.schemas || null,
        id: t.id || null
    };
    return null != t.id && bt(() => {
        $t[t.id] = t.type
    }), e
}

function Vt(t, e) {
    if (null == t) return Ot;
    const n = {};
    for (const r in t) if (t.hasOwnProperty(r)) {
        let s = t[r], i = s;
        Array.isArray(s) && (i = s[1], s = s[0]), n[s] = r, e && (e[s] = i)
    }
    return n
}

const Bt = Lt;

function qt(t) {
    return t[Pt] || null
}

function Qt(t, e) {
    const n = t[Nt] || null;
    if (!n && !0 === e) throw new Error(`Type ${X(t)} does not have '\u0275mod' property.`);
    return n
}

const Kt = 20, Wt = 10;

function Gt(t) {
    return Array.isArray(t) && "object" == typeof t[1]
}

function Zt(t) {
    return Array.isArray(t) && !0 === t[1]
}

function Yt(t) {
    return 0 != (8 & t.flags)
}

function Jt(t) {
    return 2 == (2 & t.flags)
}

function Xt(t) {
    return 1 == (1 & t.flags)
}

function te(t) {
    return null !== t.template
}

function ee(t, e) {
    return t.hasOwnProperty(jt) ? t[jt] : null
}

class ne {
    constructor(t, e, n) {
        this.previousValue = t, this.currentValue = e, this.firstChange = n
    }

    isFirstChange() {
        return this.firstChange
    }
}

function re() {
    const t = ie(this), e = null == t ? void 0 : t.current;
    if (e) {
        const n = t.previous;
        if (n === Ot) t.previous = e; else for (let t in e) n[t] = e[t];
        t.current = null, this.ngOnChanges(e)
    }
}

function se(t, e, n, r) {
    const s = ie(t) || function (t, e) {
            return t.__ngSimpleChanges__ = e
        }(t, {previous: Ot, current: null}), i = s.current || (s.current = {}), o = s.previous, a = this.declaredInputs[n],
        l = o[a];
    i[a] = new ne(l && l.currentValue, e, o === Ot), t[r] = e
}

function ie(t) {
    return t.__ngSimpleChanges__ || null
}

let oe;

function ae(t) {
    return !!t.listen
}

const le = {createRenderer: (t, e) => void 0 !== oe ? oe : "undefined" != typeof document ? document : void 0};

function ce(t) {
    for (; Array.isArray(t);) t = t[0];
    return t
}

function ue(t, e) {
    return ce(e[t.index])
}

function he(t, e) {
    return t.data[e]
}

function de(t, e) {
    const n = e[t];
    return Gt(n) ? n : n[0]
}

function pe(t) {
    return 128 == (128 & t[2])
}

function fe(t, e) {
    return null == e ? null : t[e]
}

function me(t) {
    t[18] = 0
}

function ge(t, e) {
    t[5] += e;
    let n = t, r = t[3];
    for (; null !== r && (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);) r[5] += e, n = r, r = r[3]
}

const ye = {lFrame: je(null), bindingsEnabled: !0, isInCheckNoChangesMode: !1};

function _e() {
    return ye.bindingsEnabled
}

function ve() {
    return ye.lFrame.lView
}

function be() {
    return ye.lFrame.tView
}

function we(t) {
    return ye.lFrame.contextLView = t, t[8]
}

function Se() {
    let t = Ce();
    for (; null !== t && 64 === t.type;) t = t.parent;
    return t
}

function Ce() {
    return ye.lFrame.currentTNode
}

function Ee(t, e) {
    const n = ye.lFrame;
    n.currentTNode = t, n.isParent = e
}

function xe() {
    return ye.lFrame.isParent
}

function ke() {
    return ye.isInCheckNoChangesMode
}

function Te(t) {
    ye.isInCheckNoChangesMode = t
}

function Oe(t, e) {
    const n = ye.lFrame;
    n.bindingIndex = n.bindingRootIndex = t, Ae(e)
}

function Ae(t) {
    ye.lFrame.currentDirectiveIndex = t
}

function Pe(t) {
    ye.lFrame.currentQueryIndex = t
}

function Ie(t) {
    const e = t[1];
    return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null
}

function Re(t, e, n) {
    if (n & gt.SkipSelf) {
        let r = e, s = t;
        for (; r = r.parent, !(null !== r || n & gt.Host || (r = Ie(s), null === r) || (s = s[15], 10 & r.type));) ;
        if (null === r) return !1;
        e = r, t = s
    }
    const r = ye.lFrame = De();
    return r.currentTNode = e, r.lView = t, !0
}

function Ne(t) {
    const e = De(), n = t[1];
    ye.lFrame = e, e.currentTNode = n.firstChild, e.lView = t, e.tView = n, e.contextLView = t, e.bindingIndex = n.bindingStartIndex, e.inI18n = !1
}

function De() {
    const t = ye.lFrame, e = null === t ? null : t.child;
    return null === e ? je(t) : e
}

function je(t) {
    const e = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: t,
        child: null,
        inI18n: !1
    };
    return null !== t && (t.child = e), e
}

function Me() {
    const t = ye.lFrame;
    return ye.lFrame = t.parent, t.currentTNode = null, t.lView = null, t
}

const Fe = Me;

function Le() {
    const t = Me();
    t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0
}

function Ue() {
    return ye.lFrame.selectedIndex
}

function He(t) {
    ye.lFrame.selectedIndex = t
}

function $e(t, e) {
    for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
        const e = t.data[n].type.prototype, {
            ngAfterContentInit: r,
            ngAfterContentChecked: s,
            ngAfterViewInit: i,
            ngAfterViewChecked: o,
            ngOnDestroy: a
        } = e;
        r && (t.contentHooks || (t.contentHooks = [])).push(-n, r), s && ((t.contentHooks || (t.contentHooks = [])).push(n, s), (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)), i && (t.viewHooks || (t.viewHooks = [])).push(-n, i), o && ((t.viewHooks || (t.viewHooks = [])).push(n, o), (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)), null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
    }
}

function ze(t, e, n) {
    qe(t, e, 3, n)
}

function Ve(t, e, n, r) {
    (3 & t[2]) === n && qe(t, e, n, r)
}

function Be(t, e) {
    let n = t[2];
    (3 & n) === e && (n &= 2047, n += 1, t[2] = n)
}

function qe(t, e, n, r) {
    const s = null != r ? r : -1, i = e.length - 1;
    let o = 0;
    for (let a = void 0 !== r ? 65535 & t[18] : 0; a < i; a++) if ("number" == typeof e[a + 1]) {
        if (o = e[a], null != r && o >= r) break
    } else e[a] < 0 && (t[18] += 65536), (o < s || -1 == s) && (Qe(t, n, e, a), t[18] = (4294901760 & t[18]) + a + 2), a++
}

function Qe(t, e, n, r) {
    const s = n[r] < 0, i = n[r + 1], o = t[s ? -n[r] : n[r]];
    if (s) {
        if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
                i.call(o)
            } finally {
            }
        }
    } else try {
        i.call(o)
    } finally {
    }
}

const Ke = -1;

class We {
    constructor(t, e, n) {
        this.factory = t, this.resolving = !1, this.canSeeViewProviders = e, this.injectImpl = n
    }
}

function Ge(t, e, n) {
    const r = ae(t);
    let s = 0;
    for (; s < n.length;) {
        const i = n[s];
        if ("number" == typeof i) {
            if (0 !== i) break;
            s++;
            const o = n[s++], a = n[s++], l = n[s++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
        } else {
            const o = i, a = n[++s];
            Ye(o) ? r && t.setProperty(e, o, a) : r ? t.setAttribute(e, o, a) : e.setAttribute(o, a), s++
        }
    }
    return s
}

function Ze(t) {
    return 3 === t || 4 === t || 6 === t
}

function Ye(t) {
    return 64 === t.charCodeAt(0)
}

function Je(t, e) {
    if (null === e || 0 === e.length) ; else if (null === t || 0 === t.length) t = e.slice(); else {
        let n = -1;
        for (let r = 0; r < e.length; r++) {
            const s = e[r];
            "number" == typeof s ? n = s : 0 === n || Xe(t, n, s, null, -1 === n || 2 === n ? e[++r] : null)
        }
    }
    return t
}

function Xe(t, e, n, r, s) {
    let i = 0, o = t.length;
    if (-1 === e) o = -1; else for (; i < t.length;) {
        const n = t[i++];
        if ("number" == typeof n) {
            if (n === e) {
                o = -1;
                break
            }
            if (n > e) {
                o = i - 1;
                break
            }
        }
    }
    for (; i < t.length;) {
        const e = t[i];
        if ("number" == typeof e) break;
        if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s));
            if (r === t[i + 1]) return void (t[i + 2] = s)
        }
        i++, null !== r && i++, null !== s && i++
    }
    -1 !== o && (t.splice(o, 0, e), i = o + 1), t.splice(i++, 0, n), null !== r && t.splice(i++, 0, r), null !== s && t.splice(i++, 0, s)
}

function tn(t) {
    return t !== Ke
}

function en(t) {
    return 32767 & t
}

function nn(t, e) {
    let n = t >> 16, r = e;
    for (; n > 0;) r = r[15], n--;
    return r
}

let rn = !0;

function sn(t) {
    const e = rn;
    return rn = t, e
}

let on = 0;

function an(t, e) {
    const n = cn(t, e);
    if (-1 !== n) return n;
    const r = e[1];
    r.firstCreatePass && (t.injectorIndex = e.length, ln(r.data, t), ln(e, null), ln(r.blueprint, null));
    const s = un(t, e), i = t.injectorIndex;
    if (tn(s)) {
        const t = en(s), n = nn(s, e), r = n[1].data;
        for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s]
    }
    return e[i + 8] = s, i
}

function ln(t, e) {
    t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
}

function cn(t, e) {
    return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === e[t.injectorIndex + 8] ? -1 : t.injectorIndex
}

function un(t, e) {
    if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
    let n = 0, r = null, s = e;
    for (; null !== s;) {
        const t = s[1], e = t.type;
        if (r = 2 === e ? t.declTNode : 1 === e ? s[6] : null, null === r) return Ke;
        if (n++, s = s[15], -1 !== r.injectorIndex) return r.injectorIndex | n << 16
    }
    return Ke
}

function hn(t, e, n) {
    !function (t, e, n) {
        let r;
        "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Mt) && (r = n[Mt]), null == r && (r = n[Mt] = on++);
        const s = 255 & r;
        e.data[t + (s >> 5)] |= 1 << s
    }(t, e, n)
}

function dn(t, e, n) {
    if (n & gt.Optional) return t;
    ot(e, "NodeInjector")
}

function pn(t, e, n, r) {
    if (n & gt.Optional && void 0 === r && (r = null), 0 == (n & (gt.Self | gt.Host))) {
        const s = t[9], i = _t(void 0);
        try {
            return s ? s.get(e, r, n & gt.Optional) : vt(e, r, n & gt.Optional)
        } finally {
            _t(i)
        }
    }
    return dn(r, e, n)
}

function fn(t, e, n, r = gt.Default, s) {
    if (null !== t) {
        const i = function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Mt) ? t[Mt] : void 0;
            return "number" == typeof e ? e >= 0 ? 255 & e : gn : e
        }(n);
        if ("function" == typeof i) {
            if (!Re(e, t, r)) return r & gt.Host ? dn(s, n, r) : pn(e, n, r, s);
            try {
                const t = i(r);
                if (null != t || r & gt.Optional) return t;
                ot(n)
            } finally {
                Fe()
            }
        } else if ("number" == typeof i) {
            let s = null, o = cn(t, e), a = Ke, l = r & gt.Host ? e[16][6] : null;
            for ((-1 === o || r & gt.SkipSelf) && (a = -1 === o ? un(t, e) : e[o + 8], a !== Ke && bn(r, !1) ? (s = e[1], o = en(a), e = nn(a, e)) : o = -1); -1 !== o;) {
                const t = e[1];
                if (vn(i, o, t.data)) {
                    const t = yn(o, e, n, s, r, l);
                    if (t !== mn) return t
                }
                a = e[o + 8], a !== Ke && bn(r, e[1].data[o + 8] === l) && vn(i, o, e) ? (s = t, o = en(a), e = nn(a, e)) : o = -1
            }
        }
    }
    return pn(e, n, r, s)
}

const mn = {};

function gn() {
    return new wn(Se(), ve())
}

function yn(t, e, n, r, s, i) {
    const o = e[1], a = o.data[t + 8], l = function (t, e, n, r, s) {
        const i = t.providerIndexes, o = e.data, a = 1048575 & i, l = t.directiveStart, c = i >> 20,
            u = s ? a + c : t.directiveEnd;
        for (let h = r ? a : a + c; h < u; h++) {
            const t = o[h];
            if (h < l && n === t || h >= l && t.type === n) return h
        }
        if (s) {
            const t = o[l];
            if (t && te(t) && t.type === n) return l
        }
        return null
    }(a, o, n, null == r ? Jt(a) && rn : r != o && 0 != (3 & a.type), s & gt.Host && i === a);
    return null !== l ? _n(e, o, l, a) : mn
}

function _n(t, e, n, r) {
    let s = t[n];
    const i = e.data;
    if (s instanceof We) {
        const o = s;
        o.resolving && function (t, e) {
            throw new st("200", `Circular dependency in DI detected for ${t}`)
        }(it(i[n]));
        const a = sn(o.canSeeViewProviders);
        o.resolving = !0;
        const l = o.injectImpl ? _t(o.injectImpl) : null;
        Re(t, r, gt.Default);
        try {
            s = t[n] = o.factory(void 0, i, t, r), e.firstCreatePass && n >= r.directiveStart && function (t, e, n) {
                const {ngOnChanges: r, ngOnInit: s, ngDoCheck: i} = e.type.prototype;
                if (r) {
                    const r = ((o = e).type.prototype.ngOnChanges && (o.setInput = se), re);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r)
                }
                var o;
                s && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s), i && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, i))
            }(n, i[n], e)
        } finally {
            null !== l && _t(l), sn(a), o.resolving = !1, Fe()
        }
    }
    return s
}

function vn(t, e, n) {
    return !!(n[e + (t >> 5)] & 1 << t)
}

function bn(t, e) {
    return !(t & gt.Self || t & gt.Host && e)
}

class wn {
    constructor(t, e) {
        this._tNode = t, this._lView = e
    }

    get(t, e) {
        return fn(this._tNode, this._lView, t, void 0, e)
    }
}

const Sn = "__parameters__";

function Cn(t, e, n) {
    return bt(() => {
        const r = function (t) {
            return function (...e) {
                if (t) {
                    const n = t(...e);
                    for (const t in n) this[t] = n[t]
                }
            }
        }(e);

        function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return n.annotation = e, n;

            function n(t, n, r) {
                const s = t.hasOwnProperty(Sn) ? t[Sn] : Object.defineProperty(t, Sn, {value: []})[Sn];
                for (; s.length <= r;) s.push(null);
                return (s[r] = s[r] || []).push(e), t
            }
        }

        return n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = t, s.annotationCls = s, s
    })
}

class En {
    constructor(t, e) {
        this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof e ? this.__NG_ELEMENT_ID__ = e : void 0 !== e && (this.\u0275prov = at({
            token: this,
            providedIn: e.providedIn || "root",
            factory: e.factory
        }))
    }

    toString() {
        return `InjectionToken ${this._desc}`
    }
}

const xn = new En("AnalyzeForEntryComponents"), kn = Function;

function Tn(t, e) {
    t.forEach(t => Array.isArray(t) ? Tn(t, e) : e(t))
}

function On(t, e, n) {
    e >= t.length ? t.push(n) : t.splice(e, 0, n)
}

function An(t, e) {
    return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
}

const Pn = {}, In = /\n/gm, Rn = "__source", Nn = J({provide: String, useValue: J});
let Dn;

function jn(t) {
    const e = Dn;
    return Dn = t, e
}

function Mn(t, e = gt.Default) {
    if (void 0 === Dn) throw new Error("inject() must be called from an injection context");
    return null === Dn ? vt(t, void 0, e) : Dn.get(t, e & gt.Optional ? null : void 0, e)
}

function Fn(t, e = gt.Default) {
    return (yt || Mn)(rt(t), e)
}

function Ln(t) {
    const e = [];
    for (let n = 0; n < t.length; n++) {
        const r = rt(t[n]);
        if (Array.isArray(r)) {
            if (0 === r.length) throw new Error("Arguments array must have arguments.");
            let t, n = gt.Default;
            for (let e = 0; e < r.length; e++) {
                const s = r[e], i = s.__NG_DI_FLAG__;
                "number" == typeof i ? -1 === i ? t = s.token : n |= i : t = s
            }
            e.push(Fn(t, n))
        } else e.push(Fn(r))
    }
    return e
}

function Un(t, e) {
    return t.__NG_DI_FLAG__ = e, t.prototype.__NG_DI_FLAG__ = e, t
}

const Hn = Un(Cn("Inject", t => ({token: t})), -1), $n = Un(Cn("Optional"), 8), zn = Un(Cn("SkipSelf"), 4);

function Vn(t, e) {
    t.__ngContext__ = e
}

function Bn(t) {
    const e = function (t) {
        return t.__ngContext__ || null
    }(t);
    return e ? Array.isArray(e) ? e : e.lView : null
}

function qn(t) {
    return t.ngDebugContext
}

function Qn(t) {
    return t.ngOriginalError
}

function Kn(t, ...e) {
    t.error(...e)
}

class Wn {
    constructor() {
        this._console = console
    }

    handleError(t) {
        const e = this._findOriginalError(t), n = this._findContext(t), r = function (t) {
            return t.ngErrorLogger || Kn
        }(t);
        r(this._console, "ERROR", t), e && r(this._console, "ORIGINAL ERROR", e), n && r(this._console, "ERROR CONTEXT", n)
    }

    _findContext(t) {
        return t ? qn(t) ? qn(t) : this._findContext(Qn(t)) : null
    }

    _findOriginalError(t) {
        let e = Qn(t);
        for (; e && Qn(e);) e = Qn(e);
        return e
    }
}

const Gn = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(Tt))();

function Zn(t) {
    return t instanceof Function ? t() : t
}

var Yn = function (t) {
    return t[t.Important = 1] = "Important", t[t.DashCase = 2] = "DashCase", t
}({});

function Jn(t, e) {
    return (void 0)(t, e)
}

function Xn(t) {
    const e = t[3];
    return Zt(e) ? e[3] : e
}

function tr(t) {
    return nr(t[13])
}

function er(t) {
    return nr(t[4])
}

function nr(t) {
    for (; null !== t && !Zt(t);) t = t[4];
    return t
}

function rr(t, e, n, r, s) {
    if (null != r) {
        let i, o = !1;
        Zt(r) ? i = r : Gt(r) && (o = !0, r = r[0]);
        const a = ce(r);
        0 === t && null !== n ? null == s ? ur(e, n, a) : cr(e, n, a, s || null, !0) : 1 === t && null !== n ? cr(e, n, a, s || null, !0) : 2 === t ? function (t, e, n) {
            const r = dr(t, e);
            r && function (t, e, n, r) {
                ae(t) ? t.removeChild(e, n, r) : e.removeChild(n)
            }(t, r, e, n)
        }(e, a, o) : 3 === t && e.destroyNode(a), null != i && function (t, e, n, r, s) {
            const i = n[7];
            i !== ce(n) && rr(e, t, r, i, s);
            for (let o = Wt; o < n.length; o++) {
                const s = n[o];
                _r(s[1], s, t, e, r, i)
            }
        }(e, t, i, n, s)
    }
}

function sr(t, e, n) {
    return ae(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e)
}

function ir(t, e) {
    const n = t[9], r = n.indexOf(e), s = e[3];
    1024 & e[2] && (e[2] &= -1025, ge(s, -1)), n.splice(r, 1)
}

function or(t, e) {
    if (t.length <= Wt) return;
    const n = Wt + e, r = t[n];
    if (r) {
        const i = r[17];
        null !== i && i !== t && ir(i, r), e > 0 && (t[n - 1][4] = r[4]);
        const o = An(t, Wt + e);
        _r(r[1], s = r, s[11], 2, null, null), s[0] = null, s[6] = null;
        const a = o[19];
        null !== a && a.detachView(o[1]), r[3] = null, r[4] = null, r[2] &= -129
    }
    var s;
    return r
}

function ar(t, e) {
    if (!(256 & e[2])) {
        const n = e[11];
        ae(n) && n.destroyNode && _r(t, e, n, 3, null, null), function (t) {
            let e = t[13];
            if (!e) return lr(t[1], t);
            for (; e;) {
                let n = null;
                if (Gt(e)) n = e[13]; else {
                    const t = e[10];
                    t && (n = t)
                }
                if (!n) {
                    for (; e && !e[4] && e !== t;) Gt(e) && lr(e[1], e), e = e[3];
                    null === e && (e = t), Gt(e) && lr(e[1], e), n = e && e[4]
                }
                e = n
            }
        }(e)
    }
}

function lr(t, e) {
    if (!(256 & e[2])) {
        e[2] &= -129, e[2] |= 256, function (t, e) {
            let n;
            if (null != t && null != (n = t.destroyHooks)) for (let r = 0; r < n.length; r += 2) {
                const t = e[n[r]];
                if (!(t instanceof We)) {
                    const e = n[r + 1];
                    if (Array.isArray(e)) for (let n = 0; n < e.length; n += 2) {
                        const r = t[e[n]], s = e[n + 1];
                        try {
                            s.call(r)
                        } finally {
                        }
                    } else try {
                        e.call(t)
                    } finally {
                    }
                }
            }
        }(t, e), function (t, e) {
            const n = t.cleanup, r = e[7];
            let s = -1;
            if (null !== n) for (let i = 0; i < n.length - 1; i += 2) if ("string" == typeof n[i]) {
                const t = n[i + 1], o = "function" == typeof t ? t(e) : ce(e[t]), a = r[s = n[i + 2]], l = n[i + 3];
                "boolean" == typeof l ? o.removeEventListener(n[i], a, l) : l >= 0 ? r[s = l]() : r[s = -l].unsubscribe(), i += 2
            } else {
                const t = r[s = n[i + 1]];
                n[i].call(t)
            }
            if (null !== r) {
                for (let t = s + 1; t < r.length; t++) (0, r[t])();
                e[7] = null
            }
        }(t, e), 1 === e[1].type && ae(e[11]) && e[11].destroy();
        const n = e[17];
        if (null !== n && Zt(e[3])) {
            n !== e[3] && ir(n, e);
            const r = e[19];
            null !== r && r.detachView(t)
        }
    }
}

function cr(t, e, n, r, s) {
    ae(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s)
}

function ur(t, e, n) {
    ae(t) ? t.appendChild(e, n) : e.appendChild(n)
}

function hr(t, e, n, r, s) {
    null !== r ? cr(t, e, n, r, s) : ur(t, e, n)
}

function dr(t, e) {
    return ae(t) ? t.parentNode(e) : e.parentNode
}

function pr(t, e, n, r) {
    const s = function (t, e, n) {
        return function (t, e, n) {
            let r = e;
            for (; null !== r && 40 & r.type;) r = (e = r).parent;
            if (null === r) return n[0];
            if (2 & r.flags) {
                const e = t.data[r.directiveStart].encapsulation;
                if (e === St.None || e === St.Emulated) return null
            }
            return ue(r, n)
        }(t, e.parent, n)
    }(t, r, e), i = e[11], o = function (t, e, n) {
        return function (t, e, n) {
            return 40 & t.type ? ue(t, n) : null
        }(t, 0, n)
    }(r.parent || e[6], 0, e);
    if (null != s) if (Array.isArray(n)) for (let a = 0; a < n.length; a++) hr(i, s, n[a], o, !1); else hr(i, s, n, o, !1)
}

function fr(t, e) {
    if (null !== e) {
        const n = e.type;
        if (3 & n) return ue(e, t);
        if (4 & n) return gr(-1, t[e.index]);
        if (8 & n) {
            const n = e.child;
            if (null !== n) return fr(t, n);
            {
                const n = t[e.index];
                return Zt(n) ? gr(-1, n) : ce(n)
            }
        }
        if (32 & n) return Jn(e, t)() || ce(t[e.index]);
        {
            const n = mr(t, e);
            return null !== n ? Array.isArray(n) ? n[0] : fr(Xn(t[16]), n) : fr(t, e.next)
        }
    }
    return null
}

function mr(t, e) {
    return null !== e ? t[16][6].projection[e.projection] : null
}

function gr(t, e) {
    const n = Wt + t + 1;
    if (n < e.length) {
        const t = e[n], r = t[1].firstChild;
        if (null !== r) return fr(t, r)
    }
    return e[7]
}

function yr(t, e, n, r, s, i, o) {
    for (; null != n;) {
        const a = r[n.index], l = n.type;
        if (o && 0 === e && (a && Vn(ce(a), r), n.flags |= 4), 64 != (64 & n.flags)) if (8 & l) yr(t, e, n.child, r, s, i, !1), rr(e, t, s, a, i); else if (32 & l) {
            const o = Jn(n, r);
            let l;
            for (; l = o();) rr(e, t, s, l, i);
            rr(e, t, s, a, i)
        } else 16 & l ? vr(t, e, r, n, s, i) : rr(e, t, s, a, i);
        n = o ? n.projectionNext : n.next
    }
}

function _r(t, e, n, r, s, i) {
    yr(n, r, t.firstChild, e, s, i, !1)
}

function vr(t, e, n, r, s, i) {
    const o = n[16], a = o[6].projection[r.projection];
    if (Array.isArray(a)) for (let l = 0; l < a.length; l++) rr(e, t, s, a[l], i); else yr(t, e, a, o[3], s, i, !0)
}

function br(t, e, n) {
    ae(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n
}

function wr(t, e, n) {
    ae(t) ? "" === n ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n) : e.className = n
}

function Sr(t, e, n) {
    let r = t.length;
    for (; ;) {
        const s = t.indexOf(e, n);
        if (-1 === s) return s;
        if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s
        }
        n = s + 1
    }
}

const Cr = "ng-template";

function Er(t, e, n) {
    let r = 0;
    for (; r < t.length;) {
        let s = t[r++];
        if (n && "class" === s) {
            if (s = t[r], -1 !== Sr(s.toLowerCase(), e, 0)) return !0
        } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]);) if (s.toLowerCase() === e) return !0;
            return !1
        }
    }
    return !1
}

function xr(t) {
    return 4 === t.type && t.value !== Cr
}

function kr(t, e, n) {
    return e === (4 !== t.type || n ? t.value : Cr)
}

function Tr(t, e, n) {
    let r = 4;
    const s = t.attrs || [], i = function (t) {
        for (let e = 0; e < t.length; e++) if (Ze(t[e])) return e;
        return t.length
    }(s);
    let o = !1;
    for (let a = 0; a < e.length; a++) {
        const l = e[a];
        if ("number" != typeof l) {
            if (!o) if (4 & r) {
                if (r = 2 | 1 & r, "" !== l && !kr(t, l, n) || "" === l && 1 === e.length) {
                    if (Or(r)) return !1;
                    o = !0
                }
            } else {
                const c = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                    if (!Er(t.attrs, c, n)) {
                        if (Or(r)) return !1;
                        o = !0
                    }
                    continue
                }
                const u = Ar(8 & r ? "class" : l, s, xr(t), n);
                if (-1 === u) {
                    if (Or(r)) return !1;
                    o = !0;
                    continue
                }
                if ("" !== c) {
                    let t;
                    t = u > i ? "" : s[u + 1].toLowerCase();
                    const e = 8 & r ? t : null;
                    if (e && -1 !== Sr(e, c, 0) || 2 & r && c !== t) {
                        if (Or(r)) return !1;
                        o = !0
                    }
                }
            }
        } else {
            if (!o && !Or(r) && !Or(l)) return !1;
            if (o && Or(l)) continue;
            o = !1, r = l | 1 & r
        }
    }
    return Or(r) || o
}

function Or(t) {
    return 0 == (1 & t)
}

function Ar(t, e, n, r) {
    if (null === e) return -1;
    let s = 0;
    if (r || !n) {
        let n = !1;
        for (; s < e.length;) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0; else {
                if (1 === r || 2 === r) {
                    let t = e[++s];
                    for (; "string" == typeof t;) t = e[++s];
                    continue
                }
                if (4 === r) break;
                if (0 === r) {
                    s += 4;
                    continue
                }
            }
            s += n ? 1 : 2
        }
        return -1
    }
    return function (t, e) {
        let n = t.indexOf(4);
        if (n > -1) for (n++; n < t.length;) {
            const r = t[n];
            if ("number" == typeof r) return -1;
            if (r === e) return n;
            n++
        }
        return -1
    }(e, t)
}

function Pr(t, e, n = !1) {
    for (let r = 0; r < e.length; r++) if (Tr(t, e[r], n)) return !0;
    return !1
}

function Ir(t, e) {
    return t ? ":not(" + e.trim() + ")" : e
}

function Rr(t) {
    let e = t[0], n = 1, r = 2, s = "", i = !1;
    for (; n < t.length;) {
        let o = t[n];
        if ("string" == typeof o) if (2 & r) {
            const e = t[++n];
            s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
        } else 8 & r ? s += "." + o : 4 & r && (s += " " + o); else "" === s || Or(o) || (e += Ir(i, s), s = ""), r = o, i = i || !Or(r);
        n++
    }
    return "" !== s && (e += Ir(i, s)), e
}

const Nr = {};

function Dr(t) {
    jr(be(), ve(), Ue() + t, ke())
}

function jr(t, e, n, r) {
    if (!r) if (3 == (3 & e[2])) {
        const r = t.preOrderCheckHooks;
        null !== r && ze(e, r, n)
    } else {
        const r = t.preOrderHooks;
        null !== r && Ve(e, r, 0, n)
    }
    He(n)
}

function Mr(t, e) {
    const n = t.contentQueries;
    if (null !== n) for (let r = 0; r < n.length; r += 2) {
        const s = n[r], i = n[r + 1];
        if (-1 !== i) {
            const n = t.data[i];
            Pe(s), n.contentQueries(2, e[i], i)
        }
    }
}

function Fr(t, e, n, r, s, i, o, a, l, c) {
    const u = e.blueprint.slice();
    return u[0] = s, u[2] = 140 | r, me(u), u[3] = u[15] = t, u[8] = n, u[10] = o || t && t[10], u[11] = a || t && t[11], u[12] = l || t && t[12] || null, u[9] = c || t && t[9] || null, u[6] = i, u[16] = 2 == e.type ? t[16] : u, u
}

function Lr(t, e, n, r, s) {
    let i = t.data[e];
    if (null === i) i = function (t, e, n, r, s) {
        const i = Ce(), o = xe(), a = t.data[e] = function (t, e, n, r, s, i) {
            return {
                type: n,
                index: r,
                insertBeforeIndex: null,
                injectorIndex: e ? e.injectorIndex : -1,
                directiveStart: -1,
                directiveEnd: -1,
                directiveStylingLast: -1,
                propertyBindings: null,
                flags: 0,
                providerIndexes: 0,
                value: s,
                attrs: i,
                mergedAttrs: null,
                localNames: null,
                initialInputs: void 0,
                inputs: null,
                outputs: null,
                tViews: null,
                next: null,
                projectionNext: null,
                child: null,
                parent: e,
                projection: null,
                styles: null,
                stylesWithoutHost: null,
                residualStyles: void 0,
                classes: null,
                classesWithoutHost: null,
                residualClasses: void 0,
                classBindings: 0,
                styleBindings: 0
            }
        }(0, o ? i : i && i.parent, n, e, r, s);
        return null === t.firstChild && (t.firstChild = a), null !== i && (o ? null == i.child && null !== a.parent && (i.child = a) : null === i.next && (i.next = a)), a
    }(t, e, n, r, s), ye.lFrame.inI18n && (i.flags |= 64); else if (64 & i.type) {
        i.type = n, i.value = r, i.attrs = s;
        const t = function () {
            const t = ye.lFrame, e = t.currentTNode;
            return t.isParent ? e : e.parent
        }();
        i.injectorIndex = null === t ? -1 : t.injectorIndex
    }
    return Ee(i, !0), i
}

function Ur(t, e, n, r) {
    if (0 === n) return -1;
    const s = e.length;
    for (let i = 0; i < n; i++) e.push(r), t.blueprint.push(r), t.data.push(null);
    return s
}

function Hr(t, e, n) {
    Ne(e);
    try {
        const r = t.viewQuery;
        null !== r && ps(1, r, n);
        const s = t.template;
        null !== s && Vr(t, e, s, 1, n), t.firstCreatePass && (t.firstCreatePass = !1), t.staticContentQueries && Mr(t, e), t.staticViewQueries && ps(2, t.viewQuery, n);
        const i = t.components;
        null !== i && function (t, e) {
            for (let n = 0; n < e.length; n++) ls(t, e[n])
        }(e, i)
    } catch (r) {
        throw t.firstCreatePass && (t.incompleteFirstPass = !0), r
    } finally {
        e[2] &= -5, Le()
    }
}

function $r(t, e, n, r) {
    const s = e[2];
    if (256 == (256 & s)) return;
    Ne(e);
    const i = ke();
    try {
        me(e), ye.lFrame.bindingIndex = t.bindingStartIndex, null !== n && Vr(t, e, n, 2, r);
        const o = 3 == (3 & s);
        if (!i) if (o) {
            const n = t.preOrderCheckHooks;
            null !== n && ze(e, n, null)
        } else {
            const n = t.preOrderHooks;
            null !== n && Ve(e, n, 0, null), Be(e, 0)
        }
        if (function (t) {
            for (let e = tr(t); null !== e; e = er(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                    const n = t[e], r = n[3];
                    0 == (1024 & n[2]) && ge(r, 1), n[2] |= 1024
                }
            }
        }(e), function (t) {
            for (let e = tr(t); null !== e; e = er(e)) for (let t = Wt; t < e.length; t++) {
                const n = e[t], r = n[1];
                pe(n) && $r(r, n, r.template, n[8])
            }
        }(e), null !== t.contentQueries && Mr(t, e), !i) if (o) {
            const n = t.contentCheckHooks;
            null !== n && ze(e, n)
        } else {
            const n = t.contentHooks;
            null !== n && Ve(e, n, 1), Be(e, 1)
        }
        !function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n) try {
                for (let t = 0; t < n.length; t++) {
                    const r = n[t];
                    if (r < 0) He(~r); else {
                        const s = r, i = n[++t], o = n[++t];
                        Oe(i, s), o(2, e[s])
                    }
                }
            } finally {
                He(-1)
            }
        }(t, e);
        const a = t.components;
        null !== a && function (t, e) {
            for (let n = 0; n < e.length; n++) os(t, e[n])
        }(e, a);
        const l = t.viewQuery;
        if (null !== l && ps(2, l, r), !i) if (o) {
            const n = t.viewCheckHooks;
            null !== n && ze(e, n)
        } else {
            const n = t.viewHooks;
            null !== n && Ve(e, n, 2), Be(e, 2)
        }
        !0 === t.firstUpdatePass && (t.firstUpdatePass = !1), i || (e[2] &= -73), 1024 & e[2] && (e[2] &= -1025, ge(e[3], -1))
    } finally {
        Le()
    }
}

function zr(t, e, n, r) {
    const s = e[10], i = !ke(), o = 4 == (4 & e[2]);
    try {
        i && !o && s.begin && s.begin(), o && Hr(t, e, r), $r(t, e, n, r)
    } finally {
        i && !o && s.end && s.end()
    }
}

function Vr(t, e, n, r, s) {
    const i = Ue(), o = 2 & r;
    try {
        He(-1), o && e.length > Kt && jr(t, e, Kt, ke()), n(r, s)
    } finally {
        He(i)
    }
}

function Br(t, e, n) {
    _e() && (function (t, e, n, r) {
        const s = n.directiveStart, i = n.directiveEnd;
        t.firstCreatePass || an(n, e), Vn(r, e);
        const o = n.initialInputs;
        for (let a = s; a < i; a++) {
            const r = t.data[a], i = te(r);
            i && ns(e, n, r);
            const l = _n(e, t, a, n);
            Vn(l, e), null !== o && rs(0, a - s, l, r, 0, o), i && (de(n.index, e)[8] = l)
        }
    }(t, e, n, ue(n, e)), 128 == (128 & n.flags) && function (t, e, n) {
        const r = n.directiveStart, s = n.directiveEnd, i = n.index, o = ye.lFrame.currentDirectiveIndex;
        try {
            He(i);
            for (let n = r; n < s; n++) {
                const r = t.data[n], s = e[n];
                Ae(n), null === r.hostBindings && 0 === r.hostVars && null === r.hostAttrs || Yr(r, s)
            }
        } finally {
            He(-1), Ae(o)
        }
    }(t, e, n))
}

function qr(t, e, n = ue) {
    const r = e.localNames;
    if (null !== r) {
        let s = e.index + 1;
        for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1], a = -1 === o ? n(e, t) : t[o];
            t[s++] = a
        }
    }
}

function Qr(t) {
    const e = t.tView;
    return null === e || e.incompleteFirstPass ? t.tView = Kr(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : e
}

function Kr(t, e, n, r, s, i, o, a, l, c) {
    const u = Kt + r, h = u + s, d = function (t, e) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(r < t ? null : Nr);
        return n
    }(u, h), p = "function" == typeof c ? c() : c;
    return d[1] = {
        type: t,
        blueprint: d,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: e,
        data: d.slice().fill(null, u),
        bindingStartIndex: u,
        expandoStartIndex: h,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: "function" == typeof i ? i() : i,
        pipeRegistry: "function" == typeof o ? o() : o,
        firstChild: null,
        schemas: l,
        consts: p,
        incompleteFirstPass: !1
    }
}

function Wr(t, e, n) {
    for (let r in t) if (t.hasOwnProperty(r)) {
        const s = t[r];
        (n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(e, s) : n[r] = [e, s]
    }
    return n
}

function Gr(t, e, n, r) {
    let s = !1;
    if (_e()) {
        const i = function (t, e, n) {
            const r = t.directiveRegistry;
            let s = null;
            if (r) for (let i = 0; i < r.length; i++) {
                const o = r[i];
                Pr(n, o.selectors, !1) && (s || (s = []), hn(an(n, e), t, o.type), te(o) ? (Jr(t, n), s.unshift(o)) : s.push(o))
            }
            return s
        }(t, e, n), o = null === r ? null : {"": -1};
        if (null !== i) {
            s = !0, ts(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
                const e = i[t];
                e.providersResolver && e.providersResolver(e)
            }
            let r = !1, a = !1, l = Ur(t, e, i.length, null);
            for (let s = 0; s < i.length; s++) {
                const c = i[s];
                n.mergedAttrs = Je(n.mergedAttrs, c.hostAttrs), es(t, n, e, l, c), Xr(l, c, o), null !== c.contentQueries && (n.flags |= 8), null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars || (n.flags |= 128);
                const u = c.type.prototype;
                !r && (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), r = !0), a || !u.ngOnChanges && !u.ngDoCheck || ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), a = !0), l++
            }
            !function (t, e) {
                const n = e.directiveEnd, r = t.data, s = e.attrs, i = [];
                let o = null, a = null;
                for (let l = e.directiveStart; l < n; l++) {
                    const t = r[l], n = t.inputs, c = null === s || xr(e) ? null : ss(n, s);
                    i.push(c), o = Wr(n, l, o), a = Wr(t.outputs, l, a)
                }
                null !== o && (o.hasOwnProperty("class") && (e.flags |= 16), o.hasOwnProperty("style") && (e.flags |= 32)), e.initialInputs = i, e.inputs = o, e.outputs = a
            }(t, n)
        }
        o && function (t, e, n) {
            if (e) {
                const r = t.localNames = [];
                for (let t = 0; t < e.length; t += 2) {
                    const s = n[e[t + 1]];
                    if (null == s) throw new st("301", `Export of name '${e[t + 1]}' not found!`);
                    r.push(e[t], s)
                }
            }
        }(n, r, o)
    }
    return n.mergedAttrs = Je(n.mergedAttrs, n.attrs), s
}

function Zr(t, e, n, r, s, i) {
    const o = i.hostBindings;
    if (o) {
        let n = t.hostBindingOpCodes;
        null === n && (n = t.hostBindingOpCodes = []);
        const i = ~e.index;
        (function (t) {
            let e = t.length;
            for (; e > 0;) {
                const n = t[--e];
                if ("number" == typeof n && n < 0) return n
            }
            return 0
        })(n) != i && n.push(i), n.push(r, s, o)
    }
}

function Yr(t, e) {
    null !== t.hostBindings && t.hostBindings(1, e)
}

function Jr(t, e) {
    e.flags |= 2, (t.components || (t.components = [])).push(e.index)
}

function Xr(t, e, n) {
    if (n) {
        if (e.exportAs) for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
        te(e) && (n[""] = t)
    }
}

function ts(t, e, n) {
    t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n, t.providerIndexes = e
}

function es(t, e, n, r, s) {
    t.data[r] = s;
    const i = s.factory || (s.factory = ee(s.type)), o = new We(i, te(s), null);
    t.blueprint[r] = o, n[r] = o, Zr(t, e, 0, r, Ur(t, n, s.hostVars, Nr), s)
}

function ns(t, e, n) {
    const r = ue(e, t), s = Qr(n), i = t[10],
        o = cs(t, Fr(t, s, null, n.onPush ? 64 : 16, r, e, i, i.createRenderer(r, n), null, null));
    t[e.index] = o
}

function rs(t, e, n, r, s, i) {
    const o = i[e];
    if (null !== o) {
        const t = r.setInput;
        for (let e = 0; e < o.length;) {
            const s = o[e++], i = o[e++], a = o[e++];
            null !== t ? r.setInput(n, a, s, i) : n[i] = a
        }
    }
}

function ss(t, e) {
    let n = null, r = 0;
    for (; r < e.length;) {
        const s = e[r];
        if (0 !== s) if (5 !== s) {
            if ("number" == typeof s) break;
            t.hasOwnProperty(s) && (null === n && (n = []), n.push(s, t[s], e[r + 1])), r += 2
        } else r += 2; else r += 4
    }
    return n
}

function is(t, e, n, r) {
    return new Array(t, !0, !1, e, null, 0, r, n, null, null)
}

function os(t, e) {
    const n = de(e, t);
    if (pe(n)) {
        const t = n[1];
        80 & n[2] ? $r(t, n, t.template, n[8]) : n[5] > 0 && as(n)
    }
}

function as(t) {
    for (let n = tr(t); null !== n; n = er(n)) for (let t = Wt; t < n.length; t++) {
        const e = n[t];
        if (1024 & e[2]) {
            const t = e[1];
            $r(t, e, t.template, e[8])
        } else e[5] > 0 && as(e)
    }
    const e = t[1].components;
    if (null !== e) for (let n = 0; n < e.length; n++) {
        const r = de(e[n], t);
        pe(r) && r[5] > 0 && as(r)
    }
}

function ls(t, e) {
    const n = de(e, t), r = n[1];
    !function (t, e) {
        for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n])
    }(r, n), Hr(r, n, n[8])
}

function cs(t, e) {
    return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e
}

function us(t) {
    for (; t;) {
        t[2] |= 64;
        const e = Xn(t);
        if (0 != (512 & t[2]) && !e) return t;
        t = e
    }
    return null
}

function hs(t, e, n) {
    const r = e[10];
    r.begin && r.begin();
    try {
        $r(t, e, t.template, n)
    } catch (s) {
        throw ys(e, s), s
    } finally {
        r.end && r.end()
    }
}

function ds(t) {
    !function (t) {
        for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e], r = Bn(n), s = r[1];
            zr(s, r, s.template, n)
        }
    }(t[8])
}

function ps(t, e, n) {
    Pe(0), e(t, n)
}

const fs = (() => Promise.resolve(null))();

function ms(t) {
    return t[7] || (t[7] = [])
}

function gs(t) {
    return t.cleanup || (t.cleanup = [])
}

function ys(t, e) {
    const n = t[9], r = n ? n.get(Wn, null) : null;
    r && r.handleError(e)
}

function _s(t, e, n, r, s) {
    for (let i = 0; i < n.length;) {
        const o = n[i++], a = n[i++], l = e[o], c = t.data[o];
        null !== c.setInput ? c.setInput(l, s, r, a) : l[a] = s
    }
}

function vs(t, e, n) {
    let r = n ? t.styles : null, s = n ? t.classes : null, i = 0;
    if (null !== e) for (let o = 0; o < e.length; o++) {
        const t = e[o];
        "number" == typeof t ? i = t : 1 == i ? s = tt(s, t) : 2 == i && (r = tt(r, t + ": " + e[++o] + ";"))
    }
    n ? t.styles = r : t.stylesWithoutHost = r, n ? t.classes = s : t.classesWithoutHost = s
}

const bs = new En("INJECTOR", -1);

class ws {
    get(t, e = Pn) {
        if (e === Pn) {
            const e = new Error(`NullInjectorError: No provider for ${X(t)}!`);
            throw e.name = "NullInjectorError", e
        }
        return e
    }
}

const Ss = new En("Set Injector scope."), Cs = {}, Es = {};
let xs;

function ks() {
    return void 0 === xs && (xs = new ws), xs
}

function Ts(t, e = null, n = null, r) {
    return new Os(t, n, e || ks(), r)
}

class Os {
    constructor(t, e, n, r = null) {
        this.parent = n, this.records = new Map, this.injectorDefTypes = new Set, this.onDestroy = new Set, this._destroyed = !1;
        const s = [];
        e && Tn(e, n => this.processProvider(n, t, e)), Tn([t], t => this.processInjectorType(t, [], s)), this.records.set(bs, Ps(void 0, this));
        const i = this.records.get(Ss);
        this.scope = null != i ? i.value : null, this.source = r || ("object" == typeof t ? null : X(t))
    }

    get destroyed() {
        return this._destroyed
    }

    destroy() {
        this.assertNotDestroyed(), this._destroyed = !0;
        try {
            this.onDestroy.forEach(t => t.ngOnDestroy())
        } finally {
            this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear()
        }
    }

    get(t, e = Pn, n = gt.Default) {
        this.assertNotDestroyed();
        const r = jn(this);
        try {
            if (!(n & gt.SkipSelf)) {
                let e = this.records.get(t);
                if (void 0 === e) {
                    const n = ("function" == typeof (s = t) || "object" == typeof s && s instanceof En) && ct(t);
                    e = n && this.injectableDefInScope(n) ? Ps(As(t), Cs) : null, this.records.set(t, e)
                }
                if (null != e) return this.hydrate(t, e)
            }
            return (n & gt.Self ? ks() : this.parent).get(t, e = n & gt.Optional && e === Pn ? null : e)
        } catch (i) {
            if ("NullInjectorError" === i.name) {
                if ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(X(t)), r) throw i;
                return function (t, e, n, r) {
                    const s = t.ngTempTokenPath;
                    throw e[Rn] && s.unshift(e[Rn]), t.message = function (t, e, n, r = null) {
                        t = t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1) ? t.substr(2) : t;
                        let s = X(e);
                        if (Array.isArray(e)) s = e.map(X).join(" -> "); else if ("object" == typeof e) {
                            let t = [];
                            for (let n in e) if (e.hasOwnProperty(n)) {
                                let r = e[n];
                                t.push(n + ":" + ("string" == typeof r ? JSON.stringify(r) : X(r)))
                            }
                            s = `{${t.join(", ")}}`
                        }
                        return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(In, "\n  ")}`
                    }("\n" + t.message, s, n, r), t.ngTokenPath = s, t.ngTempTokenPath = null, t
                }(i, t, "R3InjectorError", this.source)
            }
            throw i
        } finally {
            jn(r)
        }
        var s
    }

    _resolveInjectorDefTypes() {
        this.injectorDefTypes.forEach(t => this.get(t))
    }

    toString() {
        const t = [];
        return this.records.forEach((e, n) => t.push(X(n))), `R3Injector[${t.join(", ")}]`
    }

    assertNotDestroyed() {
        if (this._destroyed) throw new Error("Injector has already been destroyed.")
    }

    processInjectorType(t, e, n) {
        if (!(t = rt(t))) return !1;
        let r = ht(t);
        const s = null == r && t.ngModule || void 0, i = void 0 === s ? t : s, o = -1 !== n.indexOf(i);
        if (void 0 !== s && (r = ht(s)), null == r) return !1;
        if (null != r.imports && !o) {
            let t;
            n.push(i);
            try {
                Tn(r.imports, r => {
                    this.processInjectorType(r, e, n) && (void 0 === t && (t = []), t.push(r))
                })
            } finally {
            }
            if (void 0 !== t) for (let e = 0; e < t.length; e++) {
                const {ngModule: n, providers: r} = t[e];
                Tn(r, t => this.processProvider(t, n, r || At))
            }
        }
        this.injectorDefTypes.add(i);
        const a = ee(i) || (() => new i);
        this.records.set(i, Ps(a, Cs));
        const l = r.providers;
        if (null != l && !o) {
            const e = t;
            Tn(l, t => this.processProvider(t, e, l))
        }
        return void 0 !== s && void 0 !== t.providers
    }

    processProvider(t, e, n) {
        let r = Rs(t = rt(t)) ? t : rt(t && t.provide);
        const s = function (t, e, n) {
            return Is(t) ? Ps(void 0, t.useValue) : Ps(function (t, e, n) {
                let r;
                if (Rs(t)) {
                    const e = rt(t);
                    return ee(e) || As(e)
                }
                if (Is(t)) r = () => rt(t.useValue); else if ((s = t) && s.useFactory) r = () => t.useFactory(...Ln(t.deps || [])); else if (function (t) {
                    return !(!t || !t.useExisting)
                }(t)) r = () => Fn(rt(t.useExisting)); else {
                    const e = rt(t && (t.useClass || t.provide));
                    if (!function (t) {
                        return !!t.deps
                    }(t)) return ee(e) || As(e);
                    r = () => new e(...Ln(t.deps))
                }
                var s;
                return r
            }(t), Cs)
        }(t);
        if (Rs(t) || !0 !== t.multi) this.records.get(r); else {
            let e = this.records.get(r);
            e || (e = Ps(void 0, Cs, !0), e.factory = () => Ln(e.multi), this.records.set(r, e)), r = t, e.multi.push(t)
        }
        this.records.set(r, s)
    }

    hydrate(t, e) {
        var n;
        return e.value === Cs && (e.value = Es, e.value = e.factory()), "object" == typeof e.value && e.value && null !== (n = e.value) && "object" == typeof n && "function" == typeof n.ngOnDestroy && this.onDestroy.add(e.value), e.value
    }

    injectableDefInScope(t) {
        if (!t.providedIn) return !1;
        const e = rt(t.providedIn);
        return "string" == typeof e ? "any" === e || e === this.scope : this.injectorDefTypes.has(e)
    }
}

function As(t) {
    const e = ct(t), n = null !== e ? e.factory : ee(t);
    if (null !== n) return n;
    if (t instanceof En) throw new Error(`Token ${X(t)} is missing a \u0275prov definition.`);
    if (t instanceof Function) return function (t) {
        const e = t.length;
        if (e > 0) {
            const n = function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push("?");
                return n
            }(e);
            throw new Error(`Can't resolve all parameters for ${X(t)}: (${n.join(", ")}).`)
        }
        const n = function (t) {
            const e = t && (t[dt] || t[ft]);
            if (e) {
                const n = function (t) {
                    if (t.hasOwnProperty("name")) return t.name;
                    const e = ("" + t).match(/^function\s*([^\s(]+)/);
                    return null === e ? "" : e[1]
                }(t);
                return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), e
            }
            return null
        }(t);
        return null !== n ? () => n.factory(t) : () => new t
    }(t);
    throw new Error("unreachable")
}

function Ps(t, e, n = !1) {
    return {factory: t, value: e, multi: n ? [] : void 0}
}

function Is(t) {
    return null !== t && "object" == typeof t && Nn in t
}

function Rs(t) {
    return "function" == typeof t
}

const Ns = function (t, e, n) {
    return function (t, e = null, n = null, r) {
        const s = Ts(t, e, n, r);
        return s._resolveInjectorDefTypes(), s
    }({name: n}, e, t, n)
};
let Ds = (() => {
    class t {
        static create(t, e) {
            return Array.isArray(t) ? Ns(t, e, "") : Ns(t.providers, t.parent, t.name || "")
        }
    }

    return t.THROW_IF_NOT_FOUND = Pn, t.NULL = new ws, t.\u0275prov = at({
        token: t,
        providedIn: "any",
        factory: () => Fn(bs)
    }), t.__NG_ELEMENT_ID__ = -1, t
})();

function js(t, e) {
    $e(Bn(t)[1], Se())
}

let Ms = null;

function Fs() {
    if (!Ms) {
        const t = Tt.Symbol;
        if (t && t.iterator) Ms = t.iterator; else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
                const n = t[e];
                "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (Ms = n)
            }
        }
    }
    return Ms
}

function Ls(t) {
    return !!Us(t) && (Array.isArray(t) || !(t instanceof Map) && Fs() in t)
}

function Us(t) {
    return null !== t && ("function" == typeof t || "object" == typeof t)
}

function Hs(t, e, n, r, s, i, o, a) {
    const l = ve(), c = be(), u = t + Kt, h = c.firstCreatePass ? function (t, e, n, r, s, i, o, a, l) {
        const c = e.consts, u = Lr(e, t, 4, o || null, fe(c, a));
        Gr(e, n, u, fe(c, l)), $e(e, u);
        const h = u.tViews = Kr(2, u, r, s, i, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c);
        return null !== e.queries && (e.queries.template(e, u), h.queries = e.queries.embeddedTView(u)), u
    }(u, c, l, e, n, r, s, i, o) : c.data[u];
    Ee(h, !1);
    const d = l[11].createComment("");
    pr(c, l, d, h), Vn(d, l), cs(l, l[u] = is(d, l, d, h)), Xt(h) && Br(c, l, h), null != o && qr(l, h, a)
}

function $s(t, e = gt.Default) {
    const n = ve();
    return null === n ? Fn(t, e) : fn(Se(), n, rt(t), e)
}

function zs(t, e, n) {
    const r = ve();
    return function (t, e, n) {
        return !Object.is(t[e], n) && (t[e] = n, !0)
    }(r, ye.lFrame.bindingIndex++, e) && function (t, e, n, r, s, i, o, a) {
        const l = ue(e, n);
        let c, u = e.inputs;
        var h;
        null != u && (c = u[r]) ? (_s(t, n, c, r, s), Jt(e) && function (t, e) {
            const n = de(e, t);
            16 & n[2] || (n[2] |= 64)
        }(n, e.index)) : 3 & e.type && (r = "class" === (h = r) ? "className" : "for" === h ? "htmlFor" : "formaction" === h ? "formAction" : "innerHtml" === h ? "innerHTML" : "readonly" === h ? "readOnly" : "tabindex" === h ? "tabIndex" : h, s = null != o ? o(s, e.value || "", r) : s, ae(i) ? i.setProperty(l, r, s) : Ye(r) || (l.setProperty ? l.setProperty(r, s) : l[r] = s))
    }(be(), function () {
        const t = ye.lFrame;
        return he(t.tView, t.selectedIndex)
    }(), r, t, e, r[11], n), zs
}

function Vs(t, e, n, r, s) {
    const i = s ? "class" : "style";
    _s(t, n, e.inputs[i], i, r)
}

function Bs(t, e, n, r) {
    const s = ve(), i = be(), o = Kt + t, a = s[11], l = s[o] = sr(a, e, ye.lFrame.currentNamespace),
        c = i.firstCreatePass ? function (t, e, n, r, s, i, o) {
            const a = e.consts, l = Lr(e, t, 2, s, fe(a, i));
            return Gr(e, n, l, fe(a, o)), null !== l.attrs && vs(l, l.attrs, !1), null !== l.mergedAttrs && vs(l, l.mergedAttrs, !0), null !== e.queries && e.queries.elementStart(e, l), l
        }(o, i, s, 0, e, n, r) : i.data[o];
    Ee(c, !0);
    const u = c.mergedAttrs;
    null !== u && Ge(a, l, u);
    const h = c.classes;
    null !== h && wr(a, l, h);
    const d = c.styles;
    null !== d && br(a, l, d), 64 != (64 & c.flags) && pr(i, s, l, c), 0 === ye.lFrame.elementDepthCount && Vn(l, s), ye.lFrame.elementDepthCount++, Xt(c) && (Br(i, s, c), function (t, e, n) {
        if (Yt(e)) {
            const r = e.directiveEnd;
            for (let s = e.directiveStart; s < r; s++) {
                const e = t.data[s];
                e.contentQueries && e.contentQueries(1, n[s], s)
            }
        }
    }(i, c, s)), null !== r && qr(s, c)
}

function qs() {
    let t = Se();
    xe() ? ye.lFrame.isParent = !1 : (t = t.parent, Ee(t, !1));
    const e = t;
    ye.lFrame.elementDepthCount--;
    const n = be();
    n.firstCreatePass && ($e(n, t), Yt(t) && n.queries.elementEnd(t)), null != e.classesWithoutHost && function (t) {
        return 0 != (16 & t.flags)
    }(e) && Vs(n, e, ve(), e.classesWithoutHost, !0), null != e.stylesWithoutHost && function (t) {
        return 0 != (32 & t.flags)
    }(e) && Vs(n, e, ve(), e.stylesWithoutHost, !1)
}

function Qs(t, e, n, r) {
    Bs(t, e, n, r), qs()
}

function Ks() {
    return ve()
}

function Ws(t) {
    return !!t && "function" == typeof t.then
}

const Gs = function (t) {
    return !!t && "function" == typeof t.subscribe
};

function Zs(t, e, n, r) {
    const s = ve(), i = be(), o = Se();
    return function (t, e, n, r, s, i, o, a) {
        const l = Xt(r), c = t.firstCreatePass && gs(t), u = ms(e);
        let h = !0;
        if (3 & r.type || a) {
            const d = ue(r, e), p = a ? a(d) : d, f = u.length, m = a ? t => a(ce(t[r.index])) : r.index;
            if (ae(n)) {
                let o = null;
                if (!a && l && (o = function (t, e, n, r) {
                    const s = t.cleanup;
                    if (null != s) for (let i = 0; i < s.length - 1; i += 2) {
                        const t = s[i];
                        if (t === n && s[i + 1] === r) {
                            const t = e[7], n = s[i + 2];
                            return t.length > n ? t[n] : null
                        }
                        "string" == typeof t && (i += 2)
                    }
                    return null
                }(t, e, s, r.index)), null !== o) (o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i, o.__ngLastListenerFn__ = i, h = !1; else {
                    i = Js(r, e, 0, i, !1);
                    const t = n.listen(p, s, i);
                    u.push(i, t), c && c.push(s, m, f, f + 1)
                }
            } else i = Js(r, e, 0, i, !0), p.addEventListener(s, i, o), u.push(i), c && c.push(s, m, f, o)
        } else i = Js(r, e, 0, i, !1);
        const d = r.outputs;
        let p;
        if (h && null !== d && (p = d[s])) {
            const t = p.length;
            if (t) for (let n = 0; n < t; n += 2) {
                const t = e[p[n]][p[n + 1]].subscribe(i), o = u.length;
                u.push(i, t), c && c.push(s, r.index, o, -(o + 1))
            }
        }
    }(i, s, s[11], o, t, e, !!n, r), Zs
}

function Ys(t, e, n, r) {
    try {
        return !1 !== n(r)
    } catch (s) {
        return ys(t, s), !1
    }
}

function Js(t, e, n, r, s) {
    return function n(i) {
        if (i === Function) return r;
        const o = 2 & t.flags ? de(t.index, e) : e;
        0 == (32 & e[2]) && us(o);
        let a = Ys(e, 0, r, i), l = n.__ngNextListenerFn__;
        for (; l;) a = Ys(e, 0, l, i) && a, l = l.__ngNextListenerFn__;
        return s && !1 === a && (i.preventDefault(), i.returnValue = !1), a
    }
}

function Xs(t = 1) {
    return function (t) {
        return (ye.lFrame.contextLView = function (t, e) {
            for (; t > 0;) e = e[15], t--;
            return e
        }(t, ye.lFrame.contextLView))[8]
    }(t)
}

function ti(t, e = "") {
    const n = ve(), r = be(), s = t + Kt, i = r.firstCreatePass ? Lr(r, s, 1, e, null) : r.data[s],
        o = n[s] = function (t, e) {
            return ae(t) ? t.createText(e) : t.createTextNode(e)
        }(n[11], e);
    pr(r, n, o, i), Ee(i, !1)
}

const ei = void 0;
var ni = ["en", [["a", "p"], ["AM", "PM"], ei], [["AM", "PM"], ei, ei], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], ei, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], ei, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", ei, "{1} 'at' {0}", ei], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", function (t) {
    let e = Math.floor(Math.abs(t)), n = t.toString().replace(/^[^.]*\.?/, "").length;
    return 1 === e && 0 === n ? 1 : 5
}];
let ri = {};

function si(t) {
    return t in ri || (ri[t] = Tt.ng && Tt.ng.common && Tt.ng.common.locales && Tt.ng.common.locales[t]), ri[t]
}

var ii = function (t) {
    return t[t.LocaleId = 0] = "LocaleId", t[t.DayPeriodsFormat = 1] = "DayPeriodsFormat", t[t.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", t[t.DaysFormat = 3] = "DaysFormat", t[t.DaysStandalone = 4] = "DaysStandalone", t[t.MonthsFormat = 5] = "MonthsFormat", t[t.MonthsStandalone = 6] = "MonthsStandalone", t[t.Eras = 7] = "Eras", t[t.FirstDayOfWeek = 8] = "FirstDayOfWeek", t[t.WeekendRange = 9] = "WeekendRange", t[t.DateFormat = 10] = "DateFormat", t[t.TimeFormat = 11] = "TimeFormat", t[t.DateTimeFormat = 12] = "DateTimeFormat", t[t.NumberSymbols = 13] = "NumberSymbols", t[t.NumberFormats = 14] = "NumberFormats", t[t.CurrencyCode = 15] = "CurrencyCode", t[t.CurrencySymbol = 16] = "CurrencySymbol", t[t.CurrencyName = 17] = "CurrencyName", t[t.Currencies = 18] = "Currencies", t[t.Directionality = 19] = "Directionality", t[t.PluralCase = 20] = "PluralCase", t[t.ExtraData = 21] = "ExtraData", t
}({});
const oi = "en-US";
let ai = oi;

function li(t) {
    var e, n;
    n = "Expected localeId to be defined", null == (e = t) && function (t, e, n, r) {
        throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`)
    }(n, e), "string" == typeof t && (ai = t.toLowerCase().replace(/_/g, "-"))
}

class ci {
}

class ui {
    resolveComponentFactory(t) {
        throw function (t) {
            const e = Error(`No component factory found for ${X(t)}. Did you add it to @NgModule.entryComponents?`);
            return e.ngComponent = t, e
        }(t)
    }
}

let hi = (() => {
    class t {
    }

    return t.NULL = new ui, t
})();

function di(...t) {
}

function pi(t, e) {
    return new mi(ue(t, e))
}

const fi = function () {
    return pi(Se(), ve())
};
let mi = (() => {
    class t {
        constructor(t) {
            this.nativeElement = t
        }
    }

    return t.__NG_ELEMENT_ID__ = fi, t
})();

class gi {
}

let yi = (() => {
    class t {
    }

    return t.\u0275prov = at({token: t, providedIn: "root", factory: () => null}), t
})();

class _i {
    constructor(t) {
        this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".")
    }
}

const vi = new _i("12.0.2");

class bi {
    constructor() {
    }

    supports(t) {
        return Ls(t)
    }

    create(t) {
        return new Si(t)
    }
}

const wi = (t, e) => e;

class Si {
    constructor(t) {
        this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || wi
    }

    forEachItem(t) {
        let e;
        for (e = this._itHead; null !== e; e = e._next) t(e)
    }

    forEachOperation(t) {
        let e = this._itHead, n = this._removalsHead, r = 0, s = null;
        for (; e || n;) {
            const i = !n || e && e.currentIndex < ki(n, r, s) ? e : n, o = ki(i, r, s), a = i.currentIndex;
            if (i === n) r--, n = n._nextRemoved; else if (e = e._next, null == i.previousIndex) r++; else {
                s || (s = []);
                const t = o - r, e = a - r;
                if (t != e) {
                    for (let n = 0; n < t; n++) {
                        const r = n < s.length ? s[n] : s[n] = 0, i = r + n;
                        e <= i && i < t && (s[n] = r + 1)
                    }
                    s[i.previousIndex] = e - t
                }
            }
            o !== a && t(i, o, a)
        }
    }

    forEachPreviousItem(t) {
        let e;
        for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e)
    }

    forEachAddedItem(t) {
        let e;
        for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
    }

    forEachMovedItem(t) {
        let e;
        for (e = this._movesHead; null !== e; e = e._nextMoved) t(e)
    }

    forEachRemovedItem(t) {
        let e;
        for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
    }

    forEachIdentityChange(t) {
        let e;
        for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e)
    }

    diff(t) {
        if (null == t && (t = []), !Ls(t)) throw new Error(`Error trying to diff '${X(t)}'. Only arrays and iterables are allowed`);
        return this.check(t) ? this : null
    }

    onDestroy() {
    }

    check(t) {
        this._reset();
        let e, n, r, s = this._itHead, i = !1;
        if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++) n = t[e], r = this._trackByFn(e, n), null !== s && Object.is(s.trackById, r) ? (i && (s = this._verifyReinsertion(s, n, r, e)), Object.is(s.item, n) || this._addIdentityChange(s, n)) : (s = this._mismatch(s, n, r, e), i = !0), s = s._next
        } else e = 0, function (t, e) {
            if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n]); else {
                const n = t[Fs()]();
                let r;
                for (; !(r = n.next()).done;) e(r.value)
            }
        }(t, t => {
            r = this._trackByFn(e, t), null !== s && Object.is(s.trackById, r) ? (i && (s = this._verifyReinsertion(s, t, r, e)), Object.is(s.item, t) || this._addIdentityChange(s, t)) : (s = this._mismatch(s, t, r, e), i = !0), s = s._next, e++
        }), this.length = e;
        return this._truncate(s), this.collection = t, this.isDirty
    }

    get isDirty() {
        return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
    }

    _reset() {
        if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
            for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved) t.previousIndex = t.currentIndex;
            this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
        }
    }

    _mismatch(t, e, n, r) {
        let s;
        return null === t ? s = this._itTail : (s = t._prev, this._remove(t)), null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, s, r)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, r)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, s, r)) : t = this._addAfter(new Ci(e, n), s, r), t
    }

    _verifyReinsertion(t, e, n, r) {
        let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
        return null !== s ? t = this._reinsertAfter(s, t._prev, r) : t.currentIndex != r && (t.currentIndex = r, this._addToMoves(t, r)), t
    }

    _truncate(t) {
        for (; null !== t;) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), t = e
        }
        null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
    }

    _reinsertAfter(t, e, n) {
        null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
        const r = t._prevRemoved, s = t._nextRemoved;
        return null === r ? this._removalsHead = s : r._nextRemoved = s, null === s ? this._removalsTail = r : s._prevRemoved = r, this._insertAfter(t, e, n), this._addToMoves(t, n), t
    }

    _moveAfter(t, e, n) {
        return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t
    }

    _addAfter(t, e, n) {
        return this._insertAfter(t, e, n), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t
    }

    _insertAfter(t, e, n) {
        const r = null === e ? this._itHead : e._next;
        return t._next = r, t._prev = e, null === r ? this._itTail = t : r._prev = t, null === e ? this._itHead = t : e._next = t, null === this._linkedRecords && (this._linkedRecords = new xi), this._linkedRecords.put(t), t.currentIndex = n, t
    }

    _remove(t) {
        return this._addToRemovals(this._unlink(t))
    }

    _unlink(t) {
        null !== this._linkedRecords && this._linkedRecords.remove(t);
        const e = t._prev, n = t._next;
        return null === e ? this._itHead = n : e._next = n, null === n ? this._itTail = e : n._prev = e, t
    }

    _addToMoves(t, e) {
        return t.previousIndex === e || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t
    }

    _addToRemovals(t) {
        return null === this._unlinkedRecords && (this._unlinkedRecords = new xi), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
    }

    _addIdentityChange(t, e) {
        return t.item = e, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t
    }
}

class Ci {
    constructor(t, e) {
        this.item = t, this.trackById = e, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
    }
}

class Ei {
    constructor() {
        this._head = null, this._tail = null
    }

    add(t) {
        null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
    }

    get(t, e) {
        let n;
        for (n = this._head; null !== n; n = n._nextDup) if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
        return null
    }

    remove(t) {
        const e = t._prevDup, n = t._nextDup;
        return null === e ? this._head = n : e._nextDup = n, null === n ? this._tail = e : n._prevDup = e, null === this._head
    }
}

class xi {
    constructor() {
        this.map = new Map
    }

    put(t) {
        const e = t.trackById;
        let n = this.map.get(e);
        n || (n = new Ei, this.map.set(e, n)), n.add(t)
    }

    get(t, e) {
        const n = this.map.get(t);
        return n ? n.get(t, e) : null
    }

    remove(t) {
        const e = t.trackById;
        return this.map.get(e).remove(t) && this.map.delete(e), t
    }

    get isEmpty() {
        return 0 === this.map.size
    }

    clear() {
        this.map.clear()
    }
}

function ki(t, e, n) {
    const r = t.previousIndex;
    if (null === r) return r;
    let s = 0;
    return n && r < n.length && (s = n[r]), r + e + s
}

class Ti {
    constructor() {
    }

    supports(t) {
        return t instanceof Map || Us(t)
    }

    create() {
        return new Oi
    }
}

class Oi {
    constructor() {
        this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
    }

    get isDirty() {
        return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
    }

    forEachItem(t) {
        let e;
        for (e = this._mapHead; null !== e; e = e._next) t(e)
    }

    forEachPreviousItem(t) {
        let e;
        for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e)
    }

    forEachChangedItem(t) {
        let e;
        for (e = this._changesHead; null !== e; e = e._nextChanged) t(e)
    }

    forEachAddedItem(t) {
        let e;
        for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
    }

    forEachRemovedItem(t) {
        let e;
        for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
    }

    diff(t) {
        if (t) {
            if (!(t instanceof Map || Us(t))) throw new Error(`Error trying to diff '${X(t)}'. Only maps and objects are allowed`)
        } else t = new Map;
        return this.check(t) ? this : null
    }

    onDestroy() {
    }

    check(t) {
        this._reset();
        let e = this._mapHead;
        if (this._appendAfter = null, this._forEach(t, (t, n) => {
            if (e && e.key === n) this._maybeAddToChanges(e, t), this._appendAfter = e, e = e._next; else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r)
            }
        }), e) {
            e._prev && (e._prev._next = null), this._removalsHead = e;
            for (let t = e; null !== t; t = t._nextRemoved) t === this._mapHead && (this._mapHead = null), this._records.delete(t.key), t._nextRemoved = t._next, t.previousValue = t.currentValue, t.currentValue = null, t._prev = null, t._next = null
        }
        return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
    }

    _insertBeforeOrAppend(t, e) {
        if (t) {
            const n = t._prev;
            return e._next = t, e._prev = n, t._prev = e, n && (n._next = e), t === this._mapHead && (this._mapHead = e), this._appendAfter = t, t
        }
        return this._appendAfter ? (this._appendAfter._next = e, e._prev = this._appendAfter) : this._mapHead = e, this._appendAfter = e, null
    }

    _getOrCreateRecordForKey(t, e) {
        if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev, s = n._next;
            return r && (r._next = s), s && (s._prev = r), n._next = null, n._prev = null, n
        }
        const n = new Ai(t);
        return this._records.set(t, n), n.currentValue = e, this._addToAdditions(n), n
    }

    _reset() {
        if (this.isDirty) {
            let t;
            for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next) t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
            this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
        }
    }

    _maybeAddToChanges(t, e) {
        Object.is(e, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = e, this._addToChanges(t))
    }

    _addToAdditions(t) {
        null === this._additionsHead ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
    }

    _addToChanges(t) {
        null === this._changesHead ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
    }

    _forEach(t, e) {
        t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(n => e(t[n], n))
    }
}

class Ai {
    constructor(t) {
        this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
    }
}

function Pi() {
    return new Ii([new bi])
}

let Ii = (() => {
    class t {
        constructor(t) {
            this.factories = t
        }

        static create(e, n) {
            if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t)
            }
            return new t(e)
        }

        static extend(e) {
            return {provide: t, useFactory: n => t.create(e, n || Pi()), deps: [[t, new zn, new $n]]}
        }

        find(t) {
            const e = this.factories.find(e => e.supports(t));
            if (null != e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}' of type '${n = t, n.name || typeof n}'`);
            var n
        }
    }

    return t.\u0275prov = at({token: t, providedIn: "root", factory: Pi}), t
})();

function Ri() {
    return new Ni([new Ti])
}

let Ni = (() => {
    class t {
        constructor(t) {
            this.factories = t
        }

        static create(e, n) {
            if (n) {
                const t = n.factories.slice();
                e = e.concat(t)
            }
            return new t(e)
        }

        static extend(e) {
            return {provide: t, useFactory: n => t.create(e, n || Ri()), deps: [[t, new zn, new $n]]}
        }

        find(t) {
            const e = this.factories.find(e => e.supports(t));
            if (e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}'`)
        }
    }

    return t.\u0275prov = at({token: t, providedIn: "root", factory: Ri}), t
})();

function Di(t, e, n, r, s = !1) {
    for (; null !== n;) {
        const i = e[n.index];
        if (null !== i && r.push(ce(i)), Zt(i)) for (let t = Wt; t < i.length; t++) {
            const e = i[t], n = e[1].firstChild;
            null !== n && Di(e[1], e, n, r)
        }
        const o = n.type;
        if (8 & o) Di(t, e, n.child, r); else if (32 & o) {
            const t = Jn(n, e);
            let s;
            for (; s = t();) r.push(s)
        } else if (16 & o) {
            const t = mr(e, n);
            if (Array.isArray(t)) r.push(...t); else {
                const n = Xn(e[16]);
                Di(n[1], n, t, r, !0)
            }
        }
        n = s ? n.projectionNext : n.next
    }
    return r
}

class ji {
    constructor(t, e) {
        this._lView = t, this._cdRefInjectingView = e, this._appRef = null, this._attachedToViewContainer = !1
    }

    get rootNodes() {
        const t = this._lView, e = t[1];
        return Di(e, t, e.firstChild, [])
    }

    get context() {
        return this._lView[8]
    }

    set context(t) {
        this._lView[8] = t
    }

    get destroyed() {
        return 256 == (256 & this._lView[2])
    }

    destroy() {
        if (this._appRef) this._appRef.detachView(this); else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Zt(t)) {
                const e = t[8], n = e ? e.indexOf(this) : -1;
                n > -1 && (or(t, n), An(e, n))
            }
            this._attachedToViewContainer = !1
        }
        ar(this._lView[1], this._lView)
    }

    onDestroy(t) {
        !function (t, e, n, r) {
            const s = ms(e);
            s.push(r)
        }(0, this._lView, 0, t)
    }

    markForCheck() {
        us(this._cdRefInjectingView || this._lView)
    }

    detach() {
        this._lView[2] &= -129
    }

    reattach() {
        this._lView[2] |= 128
    }

    detectChanges() {
        hs(this._lView[1], this._lView, this.context)
    }

    checkNoChanges() {
        !function (t, e, n) {
            Te(!0);
            try {
                hs(t, e, n)
            } finally {
                Te(!1)
            }
        }(this._lView[1], this._lView, this.context)
    }

    attachToViewContainerRef() {
        if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
        this._attachedToViewContainer = !0
    }

    detachFromAppRef() {
        var t;
        this._appRef = null, _r(this._lView[1], t = this._lView, t[11], 2, null, null)
    }

    attachToAppRef(t) {
        if (this._attachedToViewContainer) throw new Error("This view is already attached to a ViewContainer!");
        this._appRef = t
    }
}

class Mi extends ji {
    constructor(t) {
        super(t), this._view = t
    }

    detectChanges() {
        ds(this._view)
    }

    checkNoChanges() {
        !function (t) {
            Te(!0);
            try {
                ds(t)
            } finally {
                Te(!1)
            }
        }(this._view)
    }

    get context() {
        return null
    }
}

const Fi = function (t) {
    return function (t, e, n) {
        if (Jt(t) && !n) {
            const n = de(t.index, e);
            return new ji(n, n)
        }
        return 47 & t.type ? new ji(e[16], e) : null
    }(Se(), ve(), 16 == (16 & t))
};
let Li = (() => {
    class t {
    }

    return t.__NG_ELEMENT_ID__ = Fi, t
})();
const Ui = [new Ti], Hi = new Ii([new bi]), $i = new Ni(Ui), zi = function () {
    return t = Se(), e = ve(), 4 & t.type ? new qi(e, t, pi(t, e)) : null;
    var t, e
};
let Vi = (() => {
    class t {
    }

    return t.__NG_ELEMENT_ID__ = zi, t
})();
const Bi = Vi, qi = class extends Bi {
    constructor(t, e, n) {
        super(), this._declarationLView = t, this._declarationTContainer = e, this.elementRef = n
    }

    createEmbeddedView(t) {
        const e = this._declarationTContainer.tViews,
            n = Fr(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null);
        n[17] = this._declarationLView[this._declarationTContainer.index];
        const r = this._declarationLView[19];
        return null !== r && (n[19] = r.createEmbeddedView(e)), Hr(e, n, t), new ji(n)
    }
};

class Qi {
}

class Ki {
}

const Wi = function () {
    return function (t, e) {
        let n;
        const r = e[t.index];
        if (Zt(r)) n = r; else {
            let s;
            if (8 & t.type) s = ce(r); else {
                const n = e[11];
                s = n.createComment("");
                const r = ue(t, e);
                cr(n, dr(n, r), s, function (t, e) {
                    return ae(t) ? t.nextSibling(e) : e.nextSibling
                }(n, r), !1)
            }
            e[t.index] = n = is(r, e, s, t), cs(e, n)
        }
        return new Yi(n, t, e)
    }(Se(), ve())
};
let Gi = (() => {
    class t {
    }

    return t.__NG_ELEMENT_ID__ = Wi, t
})();
const Zi = Gi, Yi = class extends Zi {
    constructor(t, e, n) {
        super(), this._lContainer = t, this._hostTNode = e, this._hostLView = n
    }

    get element() {
        return pi(this._hostTNode, this._hostLView)
    }

    get injector() {
        return new wn(this._hostTNode, this._hostLView)
    }

    get parentInjector() {
        const t = un(this._hostTNode, this._hostLView);
        if (tn(t)) {
            const e = nn(t, this._hostLView), n = en(t);
            return new wn(e[1].data[n + 8], e)
        }
        return new wn(null, this._hostLView)
    }

    clear() {
        for (; this.length > 0;) this.remove(this.length - 1)
    }

    get(t) {
        const e = Ji(this._lContainer);
        return null !== e && e[t] || null
    }

    get length() {
        return this._lContainer.length - Wt
    }

    createEmbeddedView(t, e, n) {
        const r = t.createEmbeddedView(e || {});
        return this.insert(r, n), r
    }

    createComponent(t, e, n, r, s) {
        const i = n || this.parentInjector;
        if (!s && null == t.ngModule && i) {
            const t = i.get(Qi, null);
            t && (s = t)
        }
        const o = t.create(i, r, void 0, s);
        return this.insert(o.hostView, e), o
    }

    insert(t, e) {
        const n = t._lView, r = n[1];
        if (Zt(n[3])) {
            const e = this.indexOf(t);
            if (-1 !== e) this.detach(e); else {
                const e = n[3], r = new Yi(e, e[6], e[3]);
                r.detach(r.indexOf(t))
            }
        }
        const s = this._adjustIndex(e), i = this._lContainer;
        !function (t, e, n, r) {
            const s = Wt + r, i = n.length;
            r > 0 && (n[s - 1][4] = e), r < i - Wt ? (e[4] = n[s], On(n, Wt + r, e)) : (n.push(e), e[4] = null), e[3] = n;
            const o = e[17];
            null !== o && n !== o && function (t, e) {
                const n = t[9];
                e[16] !== e[3][3][16] && (t[2] = !0), null === n ? t[9] = [e] : n.push(e)
            }(o, e);
            const a = e[19];
            null !== a && a.insertView(t), e[2] |= 128
        }(r, n, i, s);
        const o = gr(s, i), a = n[11], l = dr(a, i[7]);
        return null !== l && function (t, e, n, r, s, i) {
            r[0] = s, r[6] = e, _r(t, r, n, 1, s, i)
        }(r, i[6], a, n, l, o), t.attachToViewContainerRef(), On(Xi(i), s, t), t
    }

    move(t, e) {
        return this.insert(t, e)
    }

    indexOf(t) {
        const e = Ji(this._lContainer);
        return null !== e ? e.indexOf(t) : -1
    }

    remove(t) {
        const e = this._adjustIndex(t, -1), n = or(this._lContainer, e);
        n && (An(Xi(this._lContainer), e), ar(n[1], n))
    }

    detach(t) {
        const e = this._adjustIndex(t, -1), n = or(this._lContainer, e);
        return n && null != An(Xi(this._lContainer), e) ? new ji(n) : null
    }

    _adjustIndex(t, e = 0) {
        return null == t ? this.length + e : t
    }
};

function Ji(t) {
    return t[8]
}

function Xi(t) {
    return t[8] || (t[8] = [])
}

const to = {};

class eo extends hi {
    constructor(t) {
        super(), this.ngModule = t
    }

    resolveComponentFactory(t) {
        const e = qt(t);
        return new so(e, this.ngModule)
    }
}

function no(t) {
    const e = [];
    for (let n in t) t.hasOwnProperty(n) && e.push({propName: t[n], templateName: n});
    return e
}

const ro = new En("SCHEDULER_TOKEN", {providedIn: "root", factory: () => Gn});

class so extends ci {
    constructor(t, e) {
        super(), this.componentDef = t, this.ngModule = e, this.componentType = t.type, this.selector = t.selectors.map(Rr).join(","), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!e
    }

    get inputs() {
        return no(this.componentDef.inputs)
    }

    get outputs() {
        return no(this.componentDef.outputs)
    }

    create(t, e, n, r) {
        const s = (r = r || this.ngModule) ? function (t, e) {
                return {
                    get: (n, r, s) => {
                        const i = t.get(n, to, s);
                        return i !== to || r === to ? i : e.get(n, r, s)
                    }
                }
            }(t, r.injector) : t, i = s.get(gi, le), o = s.get(yi, null), a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div", c = n ? function (t, e, n) {
                if (ae(t)) return t.selectRootElement(e, n === St.ShadowDom);
                let r = "string" == typeof e ? t.querySelector(e) : e;
                return r.textContent = "", r
            }(a, n, this.componentDef.encapsulation) : sr(i.createRenderer(null, this.componentDef), l, function (t) {
                const e = t.toLowerCase();
                return "svg" === e ? "http://www.w3.org/2000/svg" : "math" === e ? "http://www.w3.org/1998/MathML/" : null
            }(l)), u = this.componentDef.onPush ? 576 : 528,
            h = {components: [], scheduler: Gn, clean: fs, playerHandler: null, flags: 0},
            d = Kr(0, null, null, 1, 0, null, null, null, null, null), p = Fr(null, d, h, u, null, null, i, a, o, s);
        let f, m;
        Ne(p);
        try {
            const t = function (t, e, n, r, s, i) {
                const o = n[1];
                n[20] = t;
                const a = Lr(o, 20, 2, "#host", null), l = a.mergedAttrs = e.hostAttrs;
                null !== l && (vs(a, l, !0), null !== t && (Ge(s, t, l), null !== a.classes && wr(s, t, a.classes), null !== a.styles && br(s, t, a.styles)));
                const c = r.createRenderer(t, e),
                    u = Fr(n, Qr(e), null, e.onPush ? 64 : 16, n[20], a, r, c, null, null);
                return o.firstCreatePass && (hn(an(a, n), o, e.type), Jr(o, a), ts(a, n.length, 1)), cs(n, u), n[20] = u
            }(c, this.componentDef, p, i, a);
            if (c) if (n) Ge(a, c, ["ng-version", vi.full]); else {
                const {attrs: t, classes: e} = function (t) {
                    const e = [], n = [];
                    let r = 1, s = 2;
                    for (; r < t.length;) {
                        let i = t[r];
                        if ("string" == typeof i) 2 === s ? "" !== i && e.push(i, t[++r]) : 8 === s && n.push(i); else {
                            if (!Or(s)) break;
                            s = i
                        }
                        r++
                    }
                    return {attrs: e, classes: n}
                }(this.componentDef.selectors[0]);
                t && Ge(a, c, t), e && e.length > 0 && wr(a, c, e.join(" "))
            }
            if (m = he(d, Kt), void 0 !== e) {
                const t = m.projection = [];
                for (let n = 0; n < this.ngContentSelectors.length; n++) {
                    const r = e[n];
                    t.push(null != r ? Array.from(r) : null)
                }
            }
            f = function (t, e, n, r, s) {
                const i = n[1], o = function (t, e, n) {
                    const r = Se();
                    t.firstCreatePass && (n.providersResolver && n.providersResolver(n), es(t, r, e, Ur(t, e, 1, null), n));
                    const s = _n(e, t, r.directiveStart, r);
                    Vn(s, e);
                    const i = ue(r, e);
                    return i && Vn(i, e), s
                }(i, n, e);
                if (r.components.push(o), t[8] = o, s && s.forEach(t => t(o, e)), e.contentQueries) {
                    const t = Se();
                    e.contentQueries(1, o, t.directiveStart)
                }
                const a = Se();
                return !i.firstCreatePass || null === e.hostBindings && null === e.hostAttrs || (He(a.index), Zr(n[1], a, 0, a.directiveStart, a.directiveEnd, e), Yr(e, o)), o
            }(t, this.componentDef, p, h, [js]), Hr(d, p, null)
        } finally {
            Le()
        }
        return new io(this.componentType, f, pi(m, p), p, m)
    }
}

class io extends class {
} {
    constructor(t, e, n, r, s) {
        super(), this.location = n, this._rootLView = r, this._tNode = s, this.instance = e, this.hostView = this.changeDetectorRef = new Mi(r), this.componentType = t
    }

    get injector() {
        return new wn(this._tNode, this._rootLView)
    }

    destroy() {
        this.hostView.destroy()
    }

    onDestroy(t) {
        this.hostView.onDestroy(t)
    }
}

const oo = new Map;

class ao extends Qi {
    constructor(t, e) {
        super(), this._parent = e, this._bootstrapComponents = [], this.injector = this, this.destroyCbs = [], this.componentFactoryResolver = new eo(this);
        const n = Qt(t), r = t[Dt] || null;
        r && li(r), this._bootstrapComponents = Zn(n.bootstrap), this._r3Injector = Ts(t, e, [{
            provide: Qi,
            useValue: this
        }, {
            provide: hi,
            useValue: this.componentFactoryResolver
        }], X(t)), this._r3Injector._resolveInjectorDefTypes(), this.instance = this.get(t)
    }

    get(t, e = Ds.THROW_IF_NOT_FOUND, n = gt.Default) {
        return t === Ds || t === Qi || t === bs ? this : this._r3Injector.get(t, e, n)
    }

    destroy() {
        const t = this._r3Injector;
        !t.destroyed && t.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
    }

    onDestroy(t) {
        this.destroyCbs.push(t)
    }
}

class lo extends Ki {
    constructor(t) {
        super(), this.moduleType = t, null !== Qt(t) && function (t) {
            const e = new Set;
            !function t(n) {
                const r = Qt(n, !0), s = r.id;
                null !== s && (function (t, e, n) {
                    if (e && e !== n) throw new Error(`Duplicate module registered for ${t} - ${X(e)} vs ${X(e.name)}`)
                }(s, oo.get(s), n), oo.set(s, n));
                const i = Zn(r.imports);
                for (const o of i) e.has(o) || (e.add(o), t(o))
            }(t)
        }(t)
    }

    create(t) {
        return new ao(this.moduleType, t)
    }
}

function co(t) {
    return e => {
        setTimeout(t, void 0, e)
    }
}

const uo = class extends C {
    constructor(t = !1) {
        super(), this.__isAsync = t
    }

    emit(t) {
        super.next(t)
    }

    subscribe(t, e, n) {
        var r, s, i;
        let o = t, a = e || (() => null), l = n;
        if (t && "object" == typeof t) {
            const e = t;
            o = null === (r = e.next) || void 0 === r ? void 0 : r.bind(e), a = null === (s = e.error) || void 0 === s ? void 0 : s.bind(e), l = null === (i = e.complete) || void 0 === i ? void 0 : i.bind(e)
        }
        this.__isAsync && (a = co(a), o && (o = co(o)), l && (l = co(l)));
        const c = super.subscribe({next: o, error: a, complete: l});
        return t instanceof h && t.add(c), c
    }
}, ho = new En("Application Initializer");
let po = (() => {
    class t {
        constructor(t) {
            this.appInits = t, this.resolve = di, this.reject = di, this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, e) => {
                this.resolve = t, this.reject = e
            })
        }

        runInitializers() {
            if (this.initialized) return;
            const t = [], e = () => {
                this.done = !0, this.resolve()
            };
            if (this.appInits) for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                if (Ws(e)) t.push(e); else if (Gs(e)) {
                    const n = new Promise((t, n) => {
                        e.subscribe({complete: t, error: n})
                    });
                    t.push(n)
                }
            }
            Promise.all(t).then(() => {
                e()
            }).catch(t => {
                this.reject(t)
            }), 0 === t.length && e(), this.initialized = !0
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(ho, 8))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();
const fo = new En("AppId"), mo = {
    provide: fo, useFactory: function () {
        return `${go()}${go()}${go()}`
    }, deps: []
};

function go() {
    return String.fromCharCode(97 + Math.floor(25 * Math.random()))
}

const yo = new En("Platform Initializer"), _o = new En("Platform ID"), vo = new En("appBootstrapListener");
let bo = (() => {
    class t {
        log(t) {
            console.log(t)
        }

        warn(t) {
            console.warn(t)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();
const wo = new En("LocaleId"), So = new En("DefaultCurrencyCode");

class Co {
    constructor(t, e) {
        this.ngModuleFactory = t, this.componentFactories = e
    }
}

const Eo = function (t) {
    return new lo(t)
}, xo = Eo, ko = function (t) {
    return Promise.resolve(Eo(t))
}, To = function (t) {
    const e = Eo(t), n = Zn(Qt(t).declarations).reduce((t, e) => {
        const n = qt(e);
        return n && t.push(new so(n)), t
    }, []);
    return new Co(e, n)
}, Oo = To, Ao = function (t) {
    return Promise.resolve(To(t))
};
let Po = (() => {
    class t {
        constructor() {
            this.compileModuleSync = xo, this.compileModuleAsync = ko, this.compileModuleAndAllComponentsSync = Oo, this.compileModuleAndAllComponentsAsync = Ao
        }

        clearCache() {
        }

        clearCacheFor(t) {
        }

        getModuleId(t) {
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();
const Io = (() => Promise.resolve(0))();

function Ro(t) {
    "undefined" == typeof Zone ? Io.then(() => {
        t && t.apply(null, null)
    }) : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
}

class No {
    constructor({
                    enableLongStackTrace: t = !1,
                    shouldCoalesceEventChangeDetection: e = !1,
                    shouldCoalesceRunChangeDetection: n = !1
                }) {
        if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new uo(!1), this.onMicrotaskEmpty = new uo(!1), this.onStable = new uo(!1), this.onError = new uo(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
        Zone.assertZonePatched();
        const r = this;
        r._nesting = 0, r._outer = r._inner = Zone.current, Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)), r.shouldCoalesceEventChangeDetection = !n && e, r.shouldCoalesceRunChangeDetection = n, r.lastRequestAnimationFrameId = -1, r.nativeRequestAnimationFrame = function () {
            let t = Tt.requestAnimationFrame, e = Tt.cancelAnimationFrame;
            if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r)
            }
            return {nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e}
        }().nativeRequestAnimationFrame, function (t) {
            const e = () => {
                !function (t) {
                    t.isCheckStableRunning || -1 !== t.lastRequestAnimationFrameId || (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(Tt, () => {
                        t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                            t.lastRequestAnimationFrameId = -1, Mo(t), t.isCheckStableRunning = !0, jo(t), t.isCheckStableRunning = !1
                        }, void 0, () => {
                        }, () => {
                        })), t.fakeTopEventTask.invoke()
                    }), Mo(t))
                }(t)
            };
            t._inner = t._inner.fork({
                name: "angular",
                properties: {isAngularZone: !0},
                onInvokeTask: (n, r, s, i, o, a) => {
                    try {
                        return Fo(t), n.invokeTask(s, i, o, a)
                    } finally {
                        (t.shouldCoalesceEventChangeDetection && "eventTask" === i.type || t.shouldCoalesceRunChangeDetection) && e(), Lo(t)
                    }
                },
                onInvoke: (n, r, s, i, o, a, l) => {
                    try {
                        return Fo(t), n.invoke(s, i, o, a, l)
                    } finally {
                        t.shouldCoalesceRunChangeDetection && e(), Lo(t)
                    }
                },
                onHasTask: (e, n, r, s) => {
                    e.hasTask(r, s), n === r && ("microTask" == s.change ? (t._hasPendingMicrotasks = s.microTask, Mo(t), jo(t)) : "macroTask" == s.change && (t.hasPendingMacrotasks = s.macroTask))
                },
                onHandleError: (e, n, r, s) => (e.handleError(r, s), t.runOutsideAngular(() => t.onError.emit(s)), !1)
            })
        }(r)
    }

    static isInAngularZone() {
        return !0 === Zone.current.get("isAngularZone")
    }

    static assertInAngularZone() {
        if (!No.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
    }

    static assertNotInAngularZone() {
        if (No.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
    }

    run(t, e, n) {
        return this._inner.run(t, e, n)
    }

    runTask(t, e, n, r) {
        const s = this._inner, i = s.scheduleEventTask("NgZoneEvent: " + r, t, Do, di, di);
        try {
            return s.runTask(i, e, n)
        } finally {
            s.cancelTask(i)
        }
    }

    runGuarded(t, e, n) {
        return this._inner.runGuarded(t, e, n)
    }

    runOutsideAngular(t) {
        return this._outer.run(t)
    }
}

const Do = {};

function jo(t) {
    if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable) try {
        t._nesting++, t.onMicrotaskEmpty.emit(null)
    } finally {
        if (t._nesting--, !t.hasPendingMicrotasks) try {
            t.runOutsideAngular(() => t.onStable.emit(null))
        } finally {
            t.isStable = !0
        }
    }
}

function Mo(t) {
    t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && -1 !== t.lastRequestAnimationFrameId)
}

function Fo(t) {
    t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
}

function Lo(t) {
    t._nesting--, jo(t)
}

class Uo {
    constructor() {
        this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new uo, this.onMicrotaskEmpty = new uo, this.onStable = new uo, this.onError = new uo
    }

    run(t, e, n) {
        return t.apply(e, n)
    }

    runGuarded(t, e, n) {
        return t.apply(e, n)
    }

    runOutsideAngular(t) {
        return t()
    }

    runTask(t, e, n, r) {
        return t.apply(e, n)
    }
}

let Ho = (() => {
    class t {
        constructor(t) {
            this._ngZone = t, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), t.run(() => {
                this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
            })
        }

        _watchAngularEvents() {
            this._ngZone.onUnstable.subscribe({
                next: () => {
                    this._didWork = !0, this._isZoneStable = !1
                }
            }), this._ngZone.runOutsideAngular(() => {
                this._ngZone.onStable.subscribe({
                    next: () => {
                        No.assertNotInAngularZone(), Ro(() => {
                            this._isZoneStable = !0, this._runCallbacksIfReady()
                        })
                    }
                })
            })
        }

        increasePendingRequestCount() {
            return this._pendingCount += 1, this._didWork = !0, this._pendingCount
        }

        decreasePendingRequestCount() {
            if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
            return this._runCallbacksIfReady(), this._pendingCount
        }

        isStable() {
            return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
        }

        _runCallbacksIfReady() {
            if (this.isStable()) Ro(() => {
                for (; 0 !== this._callbacks.length;) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                }
                this._didWork = !1
            }); else {
                let t = this.getPendingTasks();
                this._callbacks = this._callbacks.filter(e => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)), this._didWork = !0
            }
        }

        getPendingTasks() {
            return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                source: t.source,
                creationLocation: t.creationLocation,
                data: t.data
            })) : []
        }

        addCallback(t, e, n) {
            let r = -1;
            e && e > 0 && (r = setTimeout(() => {
                this._callbacks = this._callbacks.filter(t => t.timeoutId !== r), t(this._didWork, this.getPendingTasks())
            }, e)), this._callbacks.push({doneCb: t, timeoutId: r, updateCb: n})
        }

        whenStable(t, e, n) {
            if (n && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
            this.addCallback(t, e, n), this._runCallbacksIfReady()
        }

        getPendingRequestCount() {
            return this._pendingCount
        }

        findProviders(t, e, n) {
            return []
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(No))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})(), $o = (() => {
    class t {
        constructor() {
            this._applications = new Map, Bo.addToWindow(this)
        }

        registerApplication(t, e) {
            this._applications.set(t, e)
        }

        unregisterApplication(t) {
            this._applications.delete(t)
        }

        unregisterAllApplications() {
            this._applications.clear()
        }

        getTestability(t) {
            return this._applications.get(t) || null
        }

        getAllTestabilities() {
            return Array.from(this._applications.values())
        }

        getAllRootElements() {
            return Array.from(this._applications.keys())
        }

        findTestabilityInTree(t, e = !0) {
            return Bo.findTestabilityInTree(this, t, e)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

class zo {
    addToWindow(t) {
    }

    findTestabilityInTree(t, e, n) {
        return null
    }
}

let Vo, Bo = new zo, qo = !0, Qo = !1;
const Ko = new En("AllowMultipleToken");

class Wo {
    constructor(t, e) {
        this.name = t, this.token = e
    }
}

function Go(t, e, n = []) {
    const r = `Platform: ${e}`, s = new En(r);
    return (e = []) => {
        let i = Zo();
        if (!i || i.injector.get(Ko, !1)) if (t) t(n.concat(e).concat({provide: s, useValue: !0})); else {
            const t = n.concat(e).concat({provide: s, useValue: !0}, {provide: Ss, useValue: "platform"});
            !function (t) {
                if (Vo && !Vo.destroyed && !Vo.injector.get(Ko, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                Vo = t.get(Yo);
                const e = t.get(yo, null);
                e && e.forEach(t => t())
            }(Ds.create({providers: t, name: r}))
        }
        return function (t) {
            const e = Zo();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
            return e
        }(s)
    }
}

function Zo() {
    return Vo && !Vo.destroyed ? Vo : null
}

let Yo = (() => {
    class t {
        constructor(t) {
            this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
        }

        bootstrapModuleFactory(t, e) {
            const n = function (t, e) {
                let n;
                return n = "noop" === t ? new Uo : ("zone.js" === t ? void 0 : t) || new No({
                    enableLongStackTrace: (Qo = !0, qo),
                    shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                    shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing)
                }), n
            }(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: e && e.ngZoneEventCoalescing || !1,
                ngZoneRunCoalescing: e && e.ngZoneRunCoalescing || !1
            }), r = [{provide: No, useValue: n}];
            return n.run(() => {
                const e = Ds.create({providers: r, parent: this.injector, name: t.moduleType.name}), s = t.create(e),
                    i = s.injector.get(Wn, null);
                if (!i) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                return n.runOutsideAngular(() => {
                    const t = n.onError.subscribe({
                        next: t => {
                            i.handleError(t)
                        }
                    });
                    s.onDestroy(() => {
                        ta(this._modules, s), t.unsubscribe()
                    })
                }), function (t, e, n) {
                    try {
                        const r = n();
                        return Ws(r) ? r.catch(n => {
                            throw e.runOutsideAngular(() => t.handleError(n)), n
                        }) : r
                    } catch (r) {
                        throw e.runOutsideAngular(() => t.handleError(r)), r
                    }
                }(i, n, () => {
                    const t = s.injector.get(po);
                    return t.runInitializers(), t.donePromise.then(() => (li(s.injector.get(wo, oi) || oi), this._moduleDoBootstrap(s), s))
                })
            })
        }

        bootstrapModule(t, e = []) {
            const n = Jo({}, e);
            return function (t, e, n) {
                const r = new lo(n);
                return Promise.resolve(r)
            }(0, 0, t).then(t => this.bootstrapModuleFactory(t, n))
        }

        _moduleDoBootstrap(t) {
            const e = t.injector.get(Xo);
            if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(t => e.bootstrap(t)); else {
                if (!t.instance.ngDoBootstrap) throw new Error(`The module ${X(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
                t.instance.ngDoBootstrap(e)
            }
            this._modules.push(t)
        }

        onDestroy(t) {
            this._destroyListeners.push(t)
        }

        get injector() {
            return this._injector
        }

        destroy() {
            if (this._destroyed) throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach(t => t.destroy()), this._destroyListeners.forEach(t => t()), this._destroyed = !0
        }

        get destroyed() {
            return this._destroyed
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Ds))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

function Jo(t, e) {
    return Array.isArray(e) ? e.reduce(Jo, t) : Object.assign(Object.assign({}, t), e)
}

let Xo = (() => {
    class t {
        constructor(t, e, n, r, s) {
            this._zone = t, this._injector = e, this._exceptionHandler = n, this._componentFactoryResolver = r, this._initStatus = s, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    this._zone.run(() => {
                        this.tick()
                    })
                }
            });
            const i = new _(t => {
                this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete()
                })
            }), o = new _(t => {
                let e;
                this._zone.runOutsideAngular(() => {
                    e = this._zone.onStable.subscribe(() => {
                        No.assertNotInAngularZone(), Ro(() => {
                            this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, t.next(!0))
                        })
                    })
                });
                const n = this._zone.onUnstable.subscribe(() => {
                    No.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                        t.next(!1)
                    }))
                });
                return () => {
                    e.unsubscribe(), n.unsubscribe()
                }
            });
            this.isStable = function (...t) {
                let e = Number.POSITIVE_INFINITY, n = null, r = t[t.length - 1];
                return x(r) ? (n = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (e = t.pop())) : "number" == typeof r && (e = t.pop()), null === n && 1 === t.length && t[0] instanceof _ ? t[0] : V(e)(B(t, n))
            }(i, o.pipe(t => {
                return q()((e = Y, function (t) {
                    let n;
                    n = "function" == typeof e ? e : function () {
                        return e
                    };
                    const r = Object.create(t, G);
                    return r.source = t, r.subjectFactory = n, r
                })(t));
                var e
            }))
        }

        bootstrap(t, e) {
            if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
            let n;
            n = t instanceof ci ? t : this._componentFactoryResolver.resolveComponentFactory(t), this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(Qi),
                s = n.create(Ds.NULL, [], e || n.selector, r), i = s.location.nativeElement,
                o = s.injector.get(Ho, null), a = o && s.injector.get($o);
            return o && a && a.registerApplication(i, o), s.onDestroy(() => {
                this.detachView(s.hostView), ta(this.components, s), a && a.unregisterApplication(i)
            }), this._loadComponent(s), s
        }

        tick() {
            if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
            try {
                this._runningTick = !0;
                for (let t of this._views) t.detectChanges()
            } catch (t) {
                this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
            } finally {
                this._runningTick = !1
            }
        }

        attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this)
        }

        detachView(t) {
            const e = t;
            ta(this._views, e), e.detachFromAppRef()
        }

        _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t), this._injector.get(vo, []).concat(this._bootstrapListeners).forEach(e => e(t))
        }

        ngOnDestroy() {
            this._views.slice().forEach(t => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
        }

        get viewCount() {
            return this._views.length
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(No), Fn(Ds), Fn(Wn), Fn(hi), Fn(po))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

function ta(t, e) {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1)
}

class ea {
}

class na {
}

const ra = {factoryPathPrefix: "", factoryPathSuffix: ".ngfactory"};
let sa = (() => {
    class t {
        constructor(t, e) {
            this._compiler = t, this._config = e || ra
        }

        load(t) {
            return this.loadAndCompile(t)
        }

        loadAndCompile(t) {
            let [e, r] = t.split("#");
            return void 0 === r && (r = "default"), n(255)(e).then(t => t[r]).then(t => ia(t, e, r)).then(t => this._compiler.compileModuleAsync(t))
        }

        loadFactory(t) {
            let [e, r] = t.split("#"), s = "NgFactory";
            return void 0 === r && (r = "default", s = ""), n(255)(this._config.factoryPathPrefix + e + this._config.factoryPathSuffix).then(t => t[r + s]).then(t => ia(t, e, r))
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Po), Fn(na, 8))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

function ia(t, e, n) {
    if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
    return t
}

const oa = Go(null, "core", [{provide: _o, useValue: "unknown"}, {provide: Yo, deps: [Ds]}, {
    provide: $o,
    deps: []
}, {provide: bo, deps: []}]), aa = [{provide: Xo, useClass: Xo, deps: [No, Ds, Wn, hi, po]}, {
    provide: ro, deps: [No], useFactory: function (t) {
        let e = [];
        return t.onStable.subscribe(() => {
            for (; e.length;) e.pop()()
        }), function (t) {
            e.push(t)
        }
    }
}, {provide: po, useClass: po, deps: [[new $n, ho]]}, {provide: Po, useClass: Po, deps: []}, mo, {
    provide: Ii,
    useFactory: function () {
        return Hi
    },
    deps: []
}, {
    provide: Ni, useFactory: function () {
        return $i
    }, deps: []
}, {
    provide: wo, useFactory: function (t) {
        return li(t = t || "undefined" != typeof $localize && $localize.locale || oi), t
    }, deps: [[new Hn(wo), new $n, new zn]]
}, {provide: So, useValue: "USD"}];
let la = (() => {
    class t {
        constructor(t) {
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Xo))
    }, t.\u0275mod = zt({type: t}), t.\u0275inj = lt({providers: aa}), t
})(), ca = null;

function ua() {
    return ca
}

const ha = new En("DocumentToken");
let da = (() => {
    class t {
        historyGo(t) {
            throw new Error("Not implemented")
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275prov = at({factory: pa, token: t, providedIn: "platform"}), t
})();

function pa() {
    return Fn(ma)
}

const fa = new En("Location Initialized");
let ma = (() => {
    class t extends da {
        constructor(t) {
            super(), this._doc = t, this._init()
        }

        _init() {
            this.location = window.location, this._history = window.history
        }

        getBaseHrefFromDOM() {
            return ua().getBaseHref(this._doc)
        }

        onPopState(t) {
            const e = ua().getGlobalEventTarget(this._doc, "window");
            return e.addEventListener("popstate", t, !1), () => e.removeEventListener("popstate", t)
        }

        onHashChange(t) {
            const e = ua().getGlobalEventTarget(this._doc, "window");
            return e.addEventListener("hashchange", t, !1), () => e.removeEventListener("hashchange", t)
        }

        get href() {
            return this.location.href
        }

        get protocol() {
            return this.location.protocol
        }

        get hostname() {
            return this.location.hostname
        }

        get port() {
            return this.location.port
        }

        get pathname() {
            return this.location.pathname
        }

        get search() {
            return this.location.search
        }

        get hash() {
            return this.location.hash
        }

        set pathname(t) {
            this.location.pathname = t
        }

        pushState(t, e, n) {
            ga() ? this._history.pushState(t, e, n) : this.location.hash = n
        }

        replaceState(t, e, n) {
            ga() ? this._history.replaceState(t, e, n) : this.location.hash = n
        }

        forward() {
            this._history.forward()
        }

        back() {
            this._history.back()
        }

        historyGo(t = 0) {
            this._history.go(t)
        }

        getState() {
            return this._history.state
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(ha))
    }, t.\u0275prov = at({factory: ya, token: t, providedIn: "platform"}), t
})();

function ga() {
    return !!window.history.pushState
}

function ya() {
    return new ma(Fn(ha))
}

function _a(t, e) {
    if (0 == t.length) return e;
    if (0 == e.length) return t;
    let n = 0;
    return t.endsWith("/") && n++, e.startsWith("/") && n++, 2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
}

function va(t) {
    const e = t.match(/#|\?|$/), n = e && e.index || t.length;
    return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
}

function ba(t) {
    return t && "?" !== t[0] ? "?" + t : t
}

let wa = (() => {
    class t {
        historyGo(t) {
            throw new Error("Not implemented")
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275prov = at({factory: Sa, token: t, providedIn: "root"}), t
})();

function Sa(t) {
    const e = Fn(ha).location;
    return new Ea(Fn(da), e && e.origin || "")
}

const Ca = new En("appBaseHref");
let Ea = (() => {
    class t extends wa {
        constructor(t, e) {
            if (super(), this._platformLocation = t, this._removeListenerFns = [], null == e && (e = this._platformLocation.getBaseHrefFromDOM()), null == e) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
            this._baseHref = e
        }

        ngOnDestroy() {
            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
        }

        onPopState(t) {
            this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
        }

        getBaseHref() {
            return this._baseHref
        }

        prepareExternalUrl(t) {
            return _a(this._baseHref, t)
        }

        path(t = !1) {
            const e = this._platformLocation.pathname + ba(this._platformLocation.search),
                n = this._platformLocation.hash;
            return n && t ? `${e}${n}` : e
        }

        pushState(t, e, n, r) {
            const s = this.prepareExternalUrl(n + ba(r));
            this._platformLocation.pushState(t, e, s)
        }

        replaceState(t, e, n, r) {
            const s = this.prepareExternalUrl(n + ba(r));
            this._platformLocation.replaceState(t, e, s)
        }

        forward() {
            this._platformLocation.forward()
        }

        back() {
            this._platformLocation.back()
        }

        historyGo(t = 0) {
            var e, n;
            null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(da), Fn(Ca, 8))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})(), xa = (() => {
    class t extends wa {
        constructor(t, e) {
            super(), this._platformLocation = t, this._baseHref = "", this._removeListenerFns = [], null != e && (this._baseHref = e)
        }

        ngOnDestroy() {
            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
        }

        onPopState(t) {
            this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
        }

        getBaseHref() {
            return this._baseHref
        }

        path(t = !1) {
            let e = this._platformLocation.hash;
            return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e
        }

        prepareExternalUrl(t) {
            const e = _a(this._baseHref, t);
            return e.length > 0 ? "#" + e : e
        }

        pushState(t, e, n, r) {
            let s = this.prepareExternalUrl(n + ba(r));
            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, e, s)
        }

        replaceState(t, e, n, r) {
            let s = this.prepareExternalUrl(n + ba(r));
            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, e, s)
        }

        forward() {
            this._platformLocation.forward()
        }

        back() {
            this._platformLocation.back()
        }

        historyGo(t = 0) {
            var e, n;
            null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(da), Fn(Ca, 8))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})(), ka = (() => {
    class t {
        constructor(t, e) {
            this._subject = new uo, this._urlChangeListeners = [], this._platformStrategy = t;
            const n = this._platformStrategy.getBaseHref();
            this._platformLocation = e, this._baseHref = va(Oa(n)), this._platformStrategy.onPopState(t => {
                this._subject.emit({url: this.path(!0), pop: !0, state: t.state, type: t.type})
            })
        }

        path(t = !1) {
            return this.normalize(this._platformStrategy.path(t))
        }

        getState() {
            return this._platformLocation.getState()
        }

        isCurrentPathEqualTo(t, e = "") {
            return this.path() == this.normalize(t + ba(e))
        }

        normalize(e) {
            return t.stripTrailingSlash(function (t, e) {
                return t && e.startsWith(t) ? e.substring(t.length) : e
            }(this._baseHref, Oa(e)))
        }

        prepareExternalUrl(t) {
            return t && "/" !== t[0] && (t = "/" + t), this._platformStrategy.prepareExternalUrl(t)
        }

        go(t, e = "", n = null) {
            this._platformStrategy.pushState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + ba(e)), n)
        }

        replaceState(t, e = "", n = null) {
            this._platformStrategy.replaceState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + ba(e)), n)
        }

        forward() {
            this._platformStrategy.forward()
        }

        back() {
            this._platformStrategy.back()
        }

        historyGo(t = 0) {
            var e, n;
            null === (n = (e = this._platformStrategy).historyGo) || void 0 === n || n.call(e, t)
        }

        onUrlChange(t) {
            this._urlChangeListeners.push(t), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(t => {
                this._notifyUrlChangeListeners(t.url, t.state)
            }))
        }

        _notifyUrlChangeListeners(t = "", e) {
            this._urlChangeListeners.forEach(n => n(t, e))
        }

        subscribe(t, e, n) {
            return this._subject.subscribe({next: t, error: e, complete: n})
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(wa), Fn(da))
    }, t.normalizeQueryParams = ba, t.joinWithSlash = _a, t.stripTrailingSlash = va, t.\u0275prov = at({
        factory: Ta,
        token: t,
        providedIn: "root"
    }), t
})();

function Ta() {
    return new ka(Fn(wa), Fn(da))
}

function Oa(t) {
    return t.replace(/\/index.html$/, "")
}

var Aa = function (t) {
    return t[t.Zero = 0] = "Zero", t[t.One = 1] = "One", t[t.Two = 2] = "Two", t[t.Few = 3] = "Few", t[t.Many = 4] = "Many", t[t.Other = 5] = "Other", t
}({});

class Pa {
}

let Ia = (() => {
    class t extends Pa {
        constructor(t) {
            super(), this.locale = t
        }

        getPluralCategory(t, e) {
            switch (function (t) {
                return function (t) {
                    const e = function (t) {
                        return t.toLowerCase().replace(/_/g, "-")
                    }(t);
                    let n = si(e);
                    if (n) return n;
                    const r = e.split("-")[0];
                    if (n = si(r), n) return n;
                    if ("en" === r) return ni;
                    throw new Error(`Missing locale data for the locale "${t}".`)
                }(t)[ii.PluralCase]
            }(e || this.locale)(t)) {
                case Aa.Zero:
                    return "zero";
                case Aa.One:
                    return "one";
                case Aa.Two:
                    return "two";
                case Aa.Few:
                    return "few";
                case Aa.Many:
                    return "many";
                default:
                    return "other"
            }
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(wo))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})(), Ra = (() => {
    class t {
        constructor(t, e) {
            this._viewContainer = t, this._context = new Na, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = e
        }

        set ngIf(t) {
            this._context.$implicit = this._context.ngIf = t, this._updateView()
        }

        set ngIfThen(t) {
            Da("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
        }

        set ngIfElse(t) {
            Da("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
        }

        _updateView() {
            this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
        }

        static ngTemplateContextGuard(t, e) {
            return !0
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)($s(Gi), $s(Vi))
    }, t.\u0275dir = Bt({
        type: t,
        selectors: [["", "ngIf", ""]],
        inputs: {ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse"}
    }), t
})();

class Na {
    constructor() {
        this.$implicit = null, this.ngIf = null
    }
}

function Da(t, e) {
    if (e && !e.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${X(e)}'.`)
}

let ja = (() => {
    class t {
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275mod = zt({type: t}), t.\u0275inj = lt({providers: [{provide: Pa, useClass: Ia}]}), t
})(), Ma = (() => {
    class t {
    }

    return t.\u0275prov = at({token: t, providedIn: "root", factory: () => new Fa(Fn(ha), window)}), t
})();

class Fa {
    constructor(t, e) {
        this.document = t, this.window = e, this.offset = () => [0, 0]
    }

    setOffset(t) {
        this.offset = Array.isArray(t) ? () => t : t
    }

    getScrollPosition() {
        return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
    }

    scrollToPosition(t) {
        this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
    }

    scrollToAnchor(t) {
        if (!this.supportsScrolling()) return;
        const e = function (t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0];
            if (n) return n;
            if ("function" == typeof t.createTreeWalker && t.body && (t.body.createShadowRoot || t.body.attachShadow)) {
                const n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
                let r = n.currentNode;
                for (; r;) {
                    const t = r.shadowRoot;
                    if (t) {
                        const n = t.getElementById(e) || t.querySelector(`[name="${e}"]`);
                        if (n) return n
                    }
                    r = n.nextNode()
                }
            }
            return null
        }(this.document, t);
        e && (this.scrollToElement(e), this.attemptFocus(e))
    }

    setHistoryScrollRestoration(t) {
        if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t)
        }
    }

    scrollToElement(t) {
        const e = t.getBoundingClientRect(), n = e.left + this.window.pageXOffset, r = e.top + this.window.pageYOffset,
            s = this.offset();
        this.window.scrollTo(n - s[0], r - s[1])
    }

    attemptFocus(t) {
        return t.focus(), this.document.activeElement === t
    }

    supportScrollRestoration() {
        try {
            if (!this.supportsScrolling()) return !1;
            const t = La(this.window.history) || La(Object.getPrototypeOf(this.window.history));
            return !(!t || !t.writable && !t.set)
        } catch (t) {
            return !1
        }
    }

    supportsScrolling() {
        try {
            return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
        } catch (t) {
            return !1
        }
    }
}

function La(t) {
    return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
}

class Ua extends class extends class {
} {
    constructor() {
        super(...arguments), this.supportsDOMEvents = !0
    }
} {
    static makeCurrent() {
        var t;
        t = new Ua, ca || (ca = t)
    }

    onAndCancel(t, e, n) {
        return t.addEventListener(e, n, !1), () => {
            t.removeEventListener(e, n, !1)
        }
    }

    dispatchEvent(t, e) {
        t.dispatchEvent(e)
    }

    remove(t) {
        t.parentNode && t.parentNode.removeChild(t)
    }

    createElement(t, e) {
        return (e = e || this.getDefaultDocument()).createElement(t)
    }

    createHtmlDocument() {
        return document.implementation.createHTMLDocument("fakeTitle")
    }

    getDefaultDocument() {
        return document
    }

    isElementNode(t) {
        return t.nodeType === Node.ELEMENT_NODE
    }

    isShadowRoot(t) {
        return t instanceof DocumentFragment
    }

    getGlobalEventTarget(t, e) {
        return "window" === e ? window : "document" === e ? t : "body" === e ? t.body : null
    }

    getBaseHref(t) {
        const e = ($a = $a || document.querySelector("base"), $a ? $a.getAttribute("href") : null);
        return null == e ? null : function (t) {
            Ha = Ha || document.createElement("a"), Ha.setAttribute("href", t);
            const e = Ha.pathname;
            return "/" === e.charAt(0) ? e : `/${e}`
        }(e)
    }

    resetBaseElement() {
        $a = null
    }

    getUserAgent() {
        return window.navigator.userAgent
    }

    getCookie(t) {
        return function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
                const t = n.indexOf("="), [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
                if (r.trim() === e) return decodeURIComponent(s)
            }
            return null
        }(document.cookie, t)
    }
}

let Ha, $a = null;
const za = new En("TRANSITION_ID"), Va = [{
    provide: ho, useFactory: function (t, e, n) {
        return () => {
            n.get(po).donePromise.then(() => {
                const n = ua();
                Array.prototype.slice.apply(e.querySelectorAll("style[ng-transition]")).filter(e => e.getAttribute("ng-transition") === t).forEach(t => n.remove(t))
            })
        }
    }, deps: [za, ha, Ds], multi: !0
}];

class Ba {
    static init() {
        var t;
        t = new Ba, Bo = t
    }

    addToWindow(t) {
        Tt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r) throw new Error("Could not find testability for element.");
            return r
        }, Tt.getAllAngularTestabilities = () => t.getAllTestabilities(), Tt.getAllAngularRootElements = () => t.getAllRootElements(), Tt.frameworkStabilizers || (Tt.frameworkStabilizers = []), Tt.frameworkStabilizers.push(t => {
            const e = Tt.getAllAngularTestabilities();
            let n = e.length, r = !1;
            const s = function (e) {
                r = r || e, n--, 0 == n && t(r)
            };
            e.forEach(function (t) {
                t.whenStable(s)
            })
        })
    }

    findTestabilityInTree(t, e, n) {
        if (null == e) return null;
        const r = t.getTestability(e);
        return null != r ? r : n ? ua().isShadowRoot(e) ? this.findTestabilityInTree(t, e.host, !0) : this.findTestabilityInTree(t, e.parentElement, !0) : null
    }
}

let qa = (() => {
    class t {
        build() {
            return new XMLHttpRequest
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();
const Qa = new En("EventManagerPlugins");
let Ka = (() => {
    class t {
        constructor(t, e) {
            this._zone = e, this._eventNameToPlugin = new Map, t.forEach(t => t.manager = this), this._plugins = t.slice().reverse()
        }

        addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n)
        }

        addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n)
        }

        getZone() {
            return this._zone
        }

        _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
                const e = n[r];
                if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e
            }
            throw new Error(`No event manager plugin found for event ${t}`)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Qa), Fn(No))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

class Wa {
    constructor(t) {
        this._doc = t
    }

    addGlobalEventListener(t, e, n) {
        const r = ua().getGlobalEventTarget(this._doc, t);
        if (!r) throw new Error(`Unsupported event target ${r} for event ${e}`);
        return this.addEventListener(r, e, n)
    }
}

let Ga = (() => {
    class t {
        constructor() {
            this._stylesSet = new Set
        }

        addStyles(t) {
            const e = new Set;
            t.forEach(t => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t))
            }), this.onStylesAdded(e)
        }

        onStylesAdded(t) {
        }

        getAllStyles() {
            return Array.from(this._stylesSet)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})(), Za = (() => {
    class t extends Ga {
        constructor(t) {
            super(), this._doc = t, this._hostNodes = new Map, this._hostNodes.set(t.head, [])
        }

        _addStylesToHost(t, e, n) {
            t.forEach(t => {
                const r = this._doc.createElement("style");
                r.textContent = t, n.push(e.appendChild(r))
            })
        }

        addHost(t) {
            const e = [];
            this._addStylesToHost(this._stylesSet, t, e), this._hostNodes.set(t, e)
        }

        removeHost(t) {
            const e = this._hostNodes.get(t);
            e && e.forEach(Ya), this._hostNodes.delete(t)
        }

        onStylesAdded(t) {
            this._hostNodes.forEach((e, n) => {
                this._addStylesToHost(t, n, e)
            })
        }

        ngOnDestroy() {
            this._hostNodes.forEach(t => t.forEach(Ya))
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(ha))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

function Ya(t) {
    ua().remove(t)
}

const Ja = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
}, Xa = /%COMP%/g;

function tl(t, e, n) {
    for (let r = 0; r < e.length; r++) {
        let s = e[r];
        Array.isArray(s) ? tl(t, s, n) : (s = s.replace(Xa, t), n.push(s))
    }
    return n
}

function el(t) {
    return e => {
        if ("__ngUnwrap__" === e) return t;
        !1 === t(e) && (e.preventDefault(), e.returnValue = !1)
    }
}

let nl = (() => {
    class t {
        constructor(t, e, n) {
            this.eventManager = t, this.sharedStylesHost = e, this.appId = n, this.rendererByCompId = new Map, this.defaultRenderer = new rl(t)
        }

        createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
                case St.Emulated: {
                    let n = this.rendererByCompId.get(e.id);
                    return n || (n = new sl(this.eventManager, this.sharedStylesHost, e, this.appId), this.rendererByCompId.set(e.id, n)), n.applyToHost(t), n
                }
                case 1:
                case St.ShadowDom:
                    return new il(this.eventManager, this.sharedStylesHost, t, e);
                default:
                    if (!this.rendererByCompId.has(e.id)) {
                        const t = tl(e.id, e.styles, []);
                        this.sharedStylesHost.addStyles(t), this.rendererByCompId.set(e.id, this.defaultRenderer)
                    }
                    return this.defaultRenderer
            }
        }

        begin() {
        }

        end() {
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Ka), Fn(Za), Fn(fo))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

class rl {
    constructor(t) {
        this.eventManager = t, this.data = Object.create(null)
    }

    destroy() {
    }

    createElement(t, e) {
        return e ? document.createElementNS(Ja[e] || e, t) : document.createElement(t)
    }

    createComment(t) {
        return document.createComment(t)
    }

    createText(t) {
        return document.createTextNode(t)
    }

    appendChild(t, e) {
        t.appendChild(e)
    }

    insertBefore(t, e, n) {
        t && t.insertBefore(e, n)
    }

    removeChild(t, e) {
        t && t.removeChild(e)
    }

    selectRootElement(t, e) {
        let n = "string" == typeof t ? document.querySelector(t) : t;
        if (!n) throw new Error(`The selector "${t}" did not match any elements`);
        return e || (n.textContent = ""), n
    }

    parentNode(t) {
        return t.parentNode
    }

    nextSibling(t) {
        return t.nextSibling
    }

    setAttribute(t, e, n, r) {
        if (r) {
            e = r + ":" + e;
            const s = Ja[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n)
        } else t.setAttribute(e, n)
    }

    removeAttribute(t, e, n) {
        if (n) {
            const r = Ja[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`)
        } else t.removeAttribute(e)
    }

    addClass(t, e) {
        t.classList.add(e)
    }

    removeClass(t, e) {
        t.classList.remove(e)
    }

    setStyle(t, e, n, r) {
        r & (Yn.DashCase | Yn.Important) ? t.style.setProperty(e, n, r & Yn.Important ? "important" : "") : t.style[e] = n
    }

    removeStyle(t, e, n) {
        n & Yn.DashCase ? t.style.removeProperty(e) : t.style[e] = ""
    }

    setProperty(t, e, n) {
        t[e] = n
    }

    setValue(t, e) {
        t.nodeValue = e
    }

    listen(t, e, n) {
        return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, e, el(n)) : this.eventManager.addEventListener(t, e, el(n))
    }
}

class sl extends rl {
    constructor(t, e, n, r) {
        super(t), this.component = n;
        const s = tl(r + "-" + n.id, n.styles, []);
        e.addStyles(s), this.contentAttr = "_ngcontent-%COMP%".replace(Xa, r + "-" + n.id), this.hostAttr = "_nghost-%COMP%".replace(Xa, r + "-" + n.id)
    }

    applyToHost(t) {
        super.setAttribute(t, this.hostAttr, "")
    }

    createElement(t, e) {
        const n = super.createElement(t, e);
        return super.setAttribute(n, this.contentAttr, ""), n
    }
}

class il extends rl {
    constructor(t, e, n, r) {
        super(t), this.sharedStylesHost = e, this.hostEl = n, this.shadowRoot = n.attachShadow({mode: "open"}), this.sharedStylesHost.addHost(this.shadowRoot);
        const s = tl(r.id, r.styles, []);
        for (let i = 0; i < s.length; i++) {
            const t = document.createElement("style");
            t.textContent = s[i], this.shadowRoot.appendChild(t)
        }
    }

    nodeOrShadowRoot(t) {
        return t === this.hostEl ? this.shadowRoot : t
    }

    destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot)
    }

    appendChild(t, e) {
        return super.appendChild(this.nodeOrShadowRoot(t), e)
    }

    insertBefore(t, e, n) {
        return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
    }

    removeChild(t, e) {
        return super.removeChild(this.nodeOrShadowRoot(t), e)
    }

    parentNode(t) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
    }
}

let ol = (() => {
    class t extends Wa {
        constructor(t) {
            super(t)
        }

        supports(t) {
            return !0
        }

        addEventListener(t, e, n) {
            return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n)
        }

        removeEventListener(t, e, n) {
            return t.removeEventListener(e, n)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(ha))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();
const al = ["alt", "control", "meta", "shift"], ll = {
    "\b": "Backspace",
    "\t": "Tab",
    "\x7f": "Delete",
    "\x1b": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS"
}, cl = {
    A: "1",
    B: "2",
    C: "3",
    D: "4",
    E: "5",
    F: "6",
    G: "7",
    H: "8",
    I: "9",
    J: "*",
    K: "+",
    M: "-",
    N: ".",
    O: "/",
    "`": "0",
    "\x90": "NumLock"
}, ul = {alt: t => t.altKey, control: t => t.ctrlKey, meta: t => t.metaKey, shift: t => t.shiftKey};
let hl = (() => {
    class t extends Wa {
        constructor(t) {
            super(t)
        }

        supports(e) {
            return null != t.parseEventName(e)
        }

        addEventListener(e, n, r) {
            const s = t.parseEventName(n), i = t.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => ua().onAndCancel(e, s.domEventName, i))
        }

        static parseEventName(e) {
            const n = e.toLowerCase().split("."), r = n.shift();
            if (0 === n.length || "keydown" !== r && "keyup" !== r) return null;
            const s = t._normalizeKey(n.pop());
            let i = "";
            if (al.forEach(t => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), i += t + ".")
            }), i += s, 0 != n.length || 0 === s.length) return null;
            const o = {};
            return o.domEventName = r, o.fullKey = i, o
        }

        static getEventFullKey(t) {
            let e = "", n = function (t) {
                let e = t.key;
                if (null == e) {
                    if (e = t.keyIdentifier, null == e) return "Unidentified";
                    e.startsWith("U+") && (e = String.fromCharCode(parseInt(e.substring(2), 16)), 3 === t.location && cl.hasOwnProperty(e) && (e = cl[e]))
                }
                return ll[e] || e
            }(t);
            return n = n.toLowerCase(), " " === n ? n = "space" : "." === n && (n = "dot"), al.forEach(r => {
                r != n && (0, ul[r])(t) && (e += r + ".")
            }), e += n, e
        }

        static eventCallback(e, n, r) {
            return s => {
                t.getEventFullKey(s) === e && r.runGuarded(() => n(s))
            }
        }

        static _normalizeKey(t) {
            switch (t) {
                case"esc":
                    return "escape";
                default:
                    return t
            }
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(ha))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();
const dl = Go(oa, "browser", [{provide: _o, useValue: "browser"}, {
    provide: yo, useValue: function () {
        Ua.makeCurrent(), Ba.init()
    }, multi: !0
}, {
    provide: ha, useFactory: function () {
        return function (t) {
            oe = t
        }(document), document
    }, deps: []
}]), pl = [[], {provide: Ss, useValue: "root"}, {
    provide: Wn, useFactory: function () {
        return new Wn
    }, deps: []
}, {provide: Qa, useClass: ol, multi: !0, deps: [ha, No, _o]}, {
    provide: Qa,
    useClass: hl,
    multi: !0,
    deps: [ha]
}, [], {provide: nl, useClass: nl, deps: [Ka, Za, fo]}, {provide: gi, useExisting: nl}, {
    provide: Ga,
    useExisting: Za
}, {provide: Za, useClass: Za, deps: [ha]}, {provide: Ho, useClass: Ho, deps: [No]}, {
    provide: Ka,
    useClass: Ka,
    deps: [Qa, No]
}, {
    provide: class {
    }, useClass: qa, deps: []
}, []];
let fl = (() => {
    class t {
        constructor(t) {
            if (t) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
        }

        static withServerTransition(e) {
            return {ngModule: t, providers: [{provide: fo, useValue: e.appId}, {provide: za, useExisting: fo}, Va]}
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(t, 12))
    }, t.\u0275mod = zt({type: t}), t.\u0275inj = lt({providers: pl, imports: [ja, la]}), t
})();
"undefined" != typeof window && window;

class ml {
}

const gl = "*";

function yl(t, e) {
    return {type: 7, name: t, definitions: e, options: {}}
}

function _l(t, e = null) {
    return {type: 4, styles: e, timings: t}
}

function vl(t, e = null) {
    return {type: 2, steps: t, options: e}
}

function bl(t) {
    return {type: 6, styles: t, offset: null}
}

function wl(t, e, n = null) {
    return {type: 1, expr: t, animation: e, options: n}
}

function Sl(t) {
    Promise.resolve(null).then(t)
}

class Cl {
    constructor(t = 0, e = 0) {
        this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = t + e
    }

    _onFinish() {
        this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
    }

    onStart(t) {
        this._onStartFns.push(t)
    }

    onDone(t) {
        this._onDoneFns.push(t)
    }

    onDestroy(t) {
        this._onDestroyFns.push(t)
    }

    hasStarted() {
        return this._started
    }

    init() {
    }

    play() {
        this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
    }

    triggerMicrotask() {
        Sl(() => this._onFinish())
    }

    _onStart() {
        this._onStartFns.forEach(t => t()), this._onStartFns = []
    }

    pause() {
    }

    restart() {
    }

    finish() {
        this._onFinish()
    }

    destroy() {
        this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
    }

    reset() {
        this._started = !1
    }

    setPosition(t) {
        this._position = this.totalTime ? t * this.totalTime : 1
    }

    getPosition() {
        return this.totalTime ? this._position / this.totalTime : 1
    }

    triggerCallback(t) {
        const e = "start" == t ? this._onStartFns : this._onDoneFns;
        e.forEach(t => t()), e.length = 0
    }
}

class El {
    constructor(t) {
        this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = t;
        let e = 0, n = 0, r = 0;
        const s = this.players.length;
        0 == s ? Sl(() => this._onFinish()) : this.players.forEach(t => {
            t.onDone(() => {
                ++e == s && this._onFinish()
            }), t.onDestroy(() => {
                ++n == s && this._onDestroy()
            }), t.onStart(() => {
                ++r == s && this._onStart()
            })
        }), this.totalTime = this.players.reduce((t, e) => Math.max(t, e.totalTime), 0)
    }

    _onFinish() {
        this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
    }

    init() {
        this.players.forEach(t => t.init())
    }

    onStart(t) {
        this._onStartFns.push(t)
    }

    _onStart() {
        this.hasStarted() || (this._started = !0, this._onStartFns.forEach(t => t()), this._onStartFns = [])
    }

    onDone(t) {
        this._onDoneFns.push(t)
    }

    onDestroy(t) {
        this._onDestroyFns.push(t)
    }

    hasStarted() {
        return this._started
    }

    play() {
        this.parentPlayer || this.init(), this._onStart(), this.players.forEach(t => t.play())
    }

    pause() {
        this.players.forEach(t => t.pause())
    }

    restart() {
        this.players.forEach(t => t.restart())
    }

    finish() {
        this._onFinish(), this.players.forEach(t => t.finish())
    }

    destroy() {
        this._onDestroy()
    }

    _onDestroy() {
        this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(t => t.destroy()), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
    }

    reset() {
        this.players.forEach(t => t.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
    }

    setPosition(t) {
        const e = t * this.totalTime;
        this.players.forEach(t => {
            const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
            t.setPosition(n)
        })
    }

    getPosition() {
        const t = this.players.reduce((t, e) => null === t || e.totalTime > t.totalTime ? e : t, null);
        return null != t ? t.getPosition() : 0
    }

    beforeDestroy() {
        this.players.forEach(t => {
            t.beforeDestroy && t.beforeDestroy()
        })
    }

    triggerCallback(t) {
        const e = "start" == t ? this._onStartFns : this._onDoneFns;
        e.forEach(t => t()), e.length = 0
    }
}

const xl = [yl("fadeInOut", [wl(":enter", [bl({opacity: "0"}), _l(1500, bl({opacity: "1"}))]), wl(":leave", [bl({
    opacity: "1",
    display: "block"
}), _l(0, bl({opacity: "0", display: "block"}))])]), yl("listAnimation", [wl("* <=> *", [function (t, e, n = null) {
    return {type: 11, selector: t, animation: e, options: n}
}(":enter", [bl({opacity: 0}), (kl = _l("300ms ease-out", bl({opacity: 1})), {
    type: 12,
    timings: "60ms",
    animation: kl
})], {optional: !0})])])];
var kl;

function Tl(...t) {
    let e = t[t.length - 1];
    return x(e) ? (t.pop(), j(t, e)) : B(t)
}

class Ol extends C {
    constructor(t) {
        super(), this._value = t
    }

    get value() {
        return this.getValue()
    }

    _subscribe(t) {
        const e = super._subscribe(t);
        return e && !e.closed && t.next(this._value), e
    }

    getValue() {
        if (this.hasError) throw this.thrownError;
        if (this.closed) throw new b;
        return this._value
    }

    next(t) {
        super.next(this._value = t)
    }
}

class Al extends f {
    notifyNext(t, e, n, r, s) {
        this.destination.next(e)
    }

    notifyError(t, e) {
        this.destination.error(t)
    }

    notifyComplete(t) {
        this.destination.complete()
    }
}

class Pl extends f {
    constructor(t, e, n) {
        super(), this.parent = t, this.outerValue = e, this.outerIndex = n, this.index = 0
    }

    _next(t) {
        this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this)
    }

    _error(t) {
        this.parent.notifyError(t, this), this.unsubscribe()
    }

    _complete() {
        this.parent.notifyComplete(this), this.unsubscribe()
    }
}

function Il(t, e, n, r, s = new Pl(t, n, r)) {
    if (!s.closed) return e instanceof _ ? e.subscribe(s) : D(e)(s)
}

const Rl = {};

function Nl(...t) {
    let e, n;
    return x(t[t.length - 1]) && (n = t.pop()), "function" == typeof t[t.length - 1] && (e = t.pop()), 1 === t.length && l(t[0]) && (t = t[0]), B(t, n).lift(new Dl(e))
}

class Dl {
    constructor(t) {
        this.resultSelector = t
    }

    call(t, e) {
        return e.subscribe(new jl(t, this.resultSelector))
    }
}

class jl extends Al {
    constructor(t, e) {
        super(t), this.resultSelector = e, this.active = 0, this.values = [], this.observables = []
    }

    _next(t) {
        this.values.push(Rl), this.observables.push(t)
    }

    _complete() {
        const t = this.observables, e = t.length;
        if (0 === e) this.destination.complete(); else {
            this.active = e, this.toRespond = e;
            for (let n = 0; n < e; n++) this.add(Il(this, t[n], void 0, n))
        }
    }

    notifyComplete(t) {
        0 == (this.active -= 1) && this.destination.complete()
    }

    notifyNext(t, e, n) {
        const r = this.values, s = this.toRespond ? r[n] === Rl ? --this.toRespond : this.toRespond : 0;
        r[n] = e, 0 === s && (this.resultSelector ? this._tryResultSelector(r) : this.destination.next(r.slice()))
    }

    _tryResultSelector(t) {
        let e;
        try {
            e = this.resultSelector.apply(this, t)
        } catch (n) {
            return void this.destination.error(n)
        }
        this.destination.next(e)
    }
}

const Ml = (() => {
    function t() {
        return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
    }

    return t.prototype = Object.create(Error.prototype), t
})();

function Fl(...t) {
    return V(1)(Tl(...t))
}

const Ll = new _(t => t.complete());

function Ul(t) {
    return t ? function (t) {
        return new _(e => t.schedule(() => e.complete()))
    }(t) : Ll
}

function Hl(t) {
    return new _(e => {
        let n;
        try {
            n = t()
        } catch (r) {
            return void e.error(r)
        }
        return (n ? M(n) : Ul()).subscribe(e)
    })
}

function $l(t, e) {
    return "function" == typeof e ? n => n.pipe($l((n, r) => M(t(n, r)).pipe(k((t, s) => e(n, t, r, s))))) : e => e.lift(new zl(t))
}

class zl {
    constructor(t) {
        this.project = t
    }

    call(t, e) {
        return e.subscribe(new Vl(t, this.project))
    }
}

class Vl extends L {
    constructor(t, e) {
        super(t), this.project = e, this.index = 0
    }

    _next(t) {
        let e;
        const n = this.index++;
        try {
            e = this.project(t, n)
        } catch (r) {
            return void this.destination.error(r)
        }
        this._innerSub(e)
    }

    _innerSub(t) {
        const e = this.innerSubscription;
        e && e.unsubscribe();
        const n = new F(this), r = this.destination;
        r.add(n), this.innerSubscription = U(t, n), this.innerSubscription !== n && r.add(this.innerSubscription)
    }

    _complete() {
        const {innerSubscription: t} = this;
        t && !t.closed || super._complete(), this.unsubscribe()
    }

    _unsubscribe() {
        this.innerSubscription = void 0
    }

    notifyComplete() {
        this.innerSubscription = void 0, this.isStopped && super._complete()
    }

    notifyNext(t) {
        this.destination.next(t)
    }
}

const Bl = (() => {
    function t() {
        return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
    }

    return t.prototype = Object.create(Error.prototype), t
})();

function ql(t) {
    return e => 0 === t ? Ul() : e.lift(new Ql(t))
}

class Ql {
    constructor(t) {
        if (this.total = t, this.total < 0) throw new Bl
    }

    call(t, e) {
        return e.subscribe(new Kl(t, this.total))
    }
}

class Kl extends f {
    constructor(t, e) {
        super(t), this.total = e, this.count = 0
    }

    _next(t) {
        const e = this.total, n = ++this.count;
        n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()))
    }
}

function Wl(...t) {
    const e = t[t.length - 1];
    return x(e) ? (t.pop(), n => Fl(t, n, e)) : e => Fl(t, e)
}

function Gl(t, e) {
    let n = !1;
    return arguments.length >= 2 && (n = !0), function (r) {
        return r.lift(new Zl(t, e, n))
    }
}

class Zl {
    constructor(t, e, n = !1) {
        this.accumulator = t, this.seed = e, this.hasSeed = n
    }

    call(t, e) {
        return e.subscribe(new Yl(t, this.accumulator, this.seed, this.hasSeed))
    }
}

class Yl extends f {
    constructor(t, e, n, r) {
        super(t), this.accumulator = e, this._seed = n, this.hasSeed = r, this.index = 0
    }

    get seed() {
        return this._seed
    }

    set seed(t) {
        this.hasSeed = !0, this._seed = t
    }

    _next(t) {
        if (this.hasSeed) return this._tryNext(t);
        this.seed = t, this.destination.next(t)
    }

    _tryNext(t) {
        const e = this.index++;
        let n;
        try {
            n = this.accumulator(this.seed, t, e)
        } catch (r) {
            this.destination.error(r)
        }
        this.seed = n, this.destination.next(n)
    }
}

function Jl(t, e) {
    return function (n) {
        return n.lift(new Xl(t, e))
    }
}

class Xl {
    constructor(t, e) {
        this.predicate = t, this.thisArg = e
    }

    call(t, e) {
        return e.subscribe(new tc(t, this.predicate, this.thisArg))
    }
}

class tc extends f {
    constructor(t, e, n) {
        super(t), this.predicate = e, this.thisArg = n, this.count = 0
    }

    _next(t) {
        let e;
        try {
            e = this.predicate.call(this.thisArg, t, this.count++)
        } catch (n) {
            return void this.destination.error(n)
        }
        e && this.destination.next(t)
    }
}

function ec(t) {
    return function (e) {
        const n = new nc(t), r = e.lift(n);
        return n.caught = r
    }
}

class nc {
    constructor(t) {
        this.selector = t
    }

    call(t, e) {
        return e.subscribe(new rc(t, this.selector, this.caught))
    }
}

class rc extends L {
    constructor(t, e, n) {
        super(t), this.selector = e, this.caught = n
    }

    error(t) {
        if (!this.isStopped) {
            let n;
            try {
                n = this.selector(t, this.caught)
            } catch (e) {
                return void super.error(e)
            }
            this._unsubscribeAndRecycle();
            const r = new F(this);
            this.add(r);
            const s = U(n, r);
            s !== r && this.add(s)
        }
    }
}

function sc(t, e) {
    return H(t, e, 1)
}

function ic(t) {
    return function (e) {
        return 0 === t ? Ul() : e.lift(new oc(t))
    }
}

class oc {
    constructor(t) {
        if (this.total = t, this.total < 0) throw new Bl
    }

    call(t, e) {
        return e.subscribe(new ac(t, this.total))
    }
}

class ac extends f {
    constructor(t, e) {
        super(t), this.total = e, this.ring = new Array, this.count = 0
    }

    _next(t) {
        const e = this.ring, n = this.total, r = this.count++;
        e.length < n ? e.push(t) : e[r % n] = t
    }

    _complete() {
        const t = this.destination;
        let e = this.count;
        if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count, r = this.ring;
            for (let s = 0; s < n; s++) {
                const s = e++ % n;
                t.next(r[s])
            }
        }
        t.complete()
    }
}

function lc(t = hc) {
    return e => e.lift(new cc(t))
}

class cc {
    constructor(t) {
        this.errorFactory = t
    }

    call(t, e) {
        return e.subscribe(new uc(t, this.errorFactory))
    }
}

class uc extends f {
    constructor(t, e) {
        super(t), this.errorFactory = e, this.hasValue = !1
    }

    _next(t) {
        this.hasValue = !0, this.destination.next(t)
    }

    _complete() {
        if (this.hasValue) return this.destination.complete();
        {
            let e;
            try {
                e = this.errorFactory()
            } catch (t) {
                e = t
            }
            this.destination.error(e)
        }
    }
}

function hc() {
    return new Ml
}

function dc(t = null) {
    return e => e.lift(new pc(t))
}

class pc {
    constructor(t) {
        this.defaultValue = t
    }

    call(t, e) {
        return e.subscribe(new fc(t, this.defaultValue))
    }
}

class fc extends f {
    constructor(t, e) {
        super(t), this.defaultValue = e, this.isEmpty = !0
    }

    _next(t) {
        this.isEmpty = !1, this.destination.next(t)
    }

    _complete() {
        this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
    }
}

function mc(t, e) {
    const n = arguments.length >= 2;
    return r => r.pipe(t ? Jl((e, n) => t(e, n, r)) : y, ql(1), n ? dc(e) : lc(() => new Ml))
}

function gc() {
}

function yc(t, e, n) {
    return function (r) {
        return r.lift(new _c(t, e, n))
    }
}

class _c {
    constructor(t, e, n) {
        this.nextOrObserver = t, this.error = e, this.complete = n
    }

    call(t, e) {
        return e.subscribe(new vc(t, this.nextOrObserver, this.error, this.complete))
    }
}

class vc extends f {
    constructor(t, e, n, s) {
        super(t), this._tapNext = gc, this._tapError = gc, this._tapComplete = gc, this._tapError = n || gc, this._tapComplete = s || gc, r(e) ? (this._context = this, this._tapNext = e) : e && (this._context = e, this._tapNext = e.next || gc, this._tapError = e.error || gc, this._tapComplete = e.complete || gc)
    }

    _next(t) {
        try {
            this._tapNext.call(this._context, t)
        } catch (e) {
            return void this.destination.error(e)
        }
        this.destination.next(t)
    }

    _error(t) {
        try {
            this._tapError.call(this._context, t)
        } catch (t) {
            return void this.destination.error(t)
        }
        this.destination.error(t)
    }

    _complete() {
        try {
            this._tapComplete.call(this._context)
        } catch (t) {
            return void this.destination.error(t)
        }
        return this.destination.complete()
    }
}

class bc {
    constructor(t) {
        this.callback = t
    }

    call(t, e) {
        return e.subscribe(new wc(t, this.callback))
    }
}

class wc extends f {
    constructor(t, e) {
        super(t), this.add(new h(e))
    }
}

class Sc {
    constructor(t, e) {
        this.id = t, this.url = e
    }
}

class Cc extends Sc {
    constructor(t, e, n = "imperative", r = null) {
        super(t, e), this.navigationTrigger = n, this.restoredState = r
    }

    toString() {
        return `NavigationStart(id: ${this.id}, url: '${this.url}')`
    }
}

class Ec extends Sc {
    constructor(t, e, n) {
        super(t, e), this.urlAfterRedirects = n
    }

    toString() {
        return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
    }
}

class xc extends Sc {
    constructor(t, e, n) {
        super(t, e), this.reason = n
    }

    toString() {
        return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
    }
}

class kc extends Sc {
    constructor(t, e, n) {
        super(t, e), this.error = n
    }

    toString() {
        return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
    }
}

class Tc extends Sc {
    constructor(t, e, n, r) {
        super(t, e), this.urlAfterRedirects = n, this.state = r
    }

    toString() {
        return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
    }
}

class Oc extends Sc {
    constructor(t, e, n, r) {
        super(t, e), this.urlAfterRedirects = n, this.state = r
    }

    toString() {
        return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
    }
}

class Ac extends Sc {
    constructor(t, e, n, r, s) {
        super(t, e), this.urlAfterRedirects = n, this.state = r, this.shouldActivate = s
    }

    toString() {
        return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
    }
}

class Pc extends Sc {
    constructor(t, e, n, r) {
        super(t, e), this.urlAfterRedirects = n, this.state = r
    }

    toString() {
        return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
    }
}

class Ic extends Sc {
    constructor(t, e, n, r) {
        super(t, e), this.urlAfterRedirects = n, this.state = r
    }

    toString() {
        return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
    }
}

class Rc {
    constructor(t) {
        this.route = t
    }

    toString() {
        return `RouteConfigLoadStart(path: ${this.route.path})`
    }
}

class Nc {
    constructor(t) {
        this.route = t
    }

    toString() {
        return `RouteConfigLoadEnd(path: ${this.route.path})`
    }
}

class Dc {
    constructor(t) {
        this.snapshot = t
    }

    toString() {
        return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
    }
}

class jc {
    constructor(t) {
        this.snapshot = t
    }

    toString() {
        return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
    }
}

class Mc {
    constructor(t) {
        this.snapshot = t
    }

    toString() {
        return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
    }
}

class Fc {
    constructor(t) {
        this.snapshot = t
    }

    toString() {
        return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
    }
}

class Lc {
    constructor(t, e, n) {
        this.routerEvent = t, this.position = e, this.anchor = n
    }

    toString() {
        return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
    }
}

const Uc = "primary";

class Hc {
    constructor(t) {
        this.params = t || {}
    }

    has(t) {
        return Object.prototype.hasOwnProperty.call(this.params, t)
    }

    get(t) {
        if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e
        }
        return null
    }

    getAll(t) {
        if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e]
        }
        return []
    }

    get keys() {
        return Object.keys(this.params)
    }
}

function $c(t) {
    return new Hc(t)
}

function zc(t) {
    const e = Error("NavigationCancelingError: " + t);
    return e.ngNavigationCancelingError = !0, e
}

function Vc(t, e, n) {
    const r = n.path.split("/");
    if (r.length > t.length) return null;
    if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length)) return null;
    const s = {};
    for (let i = 0; i < r.length; i++) {
        const e = r[i], n = t[i];
        if (e.startsWith(":")) s[e.substring(1)] = n; else if (e !== n.path) return null
    }
    return {consumed: t.slice(0, r.length), posParams: s}
}

function Bc(t, e) {
    const n = t ? Object.keys(t) : void 0, r = e ? Object.keys(e) : void 0;
    if (!n || !r || n.length != r.length) return !1;
    let s;
    for (let i = 0; i < n.length; i++) if (s = n[i], !qc(t[s], e[s])) return !1;
    return !0
}

function qc(t, e) {
    if (Array.isArray(t) && Array.isArray(e)) {
        if (t.length !== e.length) return !1;
        const n = [...t].sort(), r = [...e].sort();
        return n.every((t, e) => r[e] === t)
    }
    return t === e
}

function Qc(t) {
    return Array.prototype.concat.apply([], t)
}

function Kc(t) {
    return t.length > 0 ? t[t.length - 1] : null
}

function Wc(t, e) {
    for (const n in t) t.hasOwnProperty(n) && e(t[n], n)
}

function Gc(t) {
    return Gs(t) ? t : Ws(t) ? M(Promise.resolve(t)) : Tl(t)
}

const Zc = {
    exact: function t(e, n, r) {
        if (!iu(e.segments, n.segments)) return !1;
        if (!eu(e.segments, n.segments, r)) return !1;
        if (e.numberOfChildren !== n.numberOfChildren) return !1;
        for (const s in n.children) {
            if (!e.children[s]) return !1;
            if (!t(e.children[s], n.children[s], r)) return !1
        }
        return !0
    }, subset: Xc
}, Yc = {
    exact: function (t, e) {
        return Bc(t, e)
    }, subset: function (t, e) {
        return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every(n => qc(t[n], e[n]))
    }, ignored: () => !0
};

function Jc(t, e, n) {
    return Zc[n.paths](t.root, e.root, n.matrixParams) && Yc[n.queryParams](t.queryParams, e.queryParams) && !("exact" === n.fragment && t.fragment !== e.fragment)
}

function Xc(t, e, n) {
    return tu(t, e, e.segments, n)
}

function tu(t, e, n, r) {
    if (t.segments.length > n.length) {
        const s = t.segments.slice(0, n.length);
        return !!iu(s, n) && !e.hasChildren() && !!eu(s, n, r)
    }
    if (t.segments.length === n.length) {
        if (!iu(t.segments, n)) return !1;
        if (!eu(t.segments, n, r)) return !1;
        for (const n in e.children) {
            if (!t.children[n]) return !1;
            if (!Xc(t.children[n], e.children[n], r)) return !1
        }
        return !0
    }
    {
        const s = n.slice(0, t.segments.length), i = n.slice(t.segments.length);
        return !!iu(t.segments, s) && !!eu(t.segments, s, r) && !!t.children.primary && tu(t.children.primary, e, i, r)
    }
}

function eu(t, e, n) {
    return e.every((e, r) => Yc[n](t[r].parameters, e.parameters))
}

class nu {
    constructor(t, e, n) {
        this.root = t, this.queryParams = e, this.fragment = n
    }

    get queryParamMap() {
        return this._queryParamMap || (this._queryParamMap = $c(this.queryParams)), this._queryParamMap
    }

    toString() {
        return lu.serialize(this)
    }
}

class ru {
    constructor(t, e) {
        this.segments = t, this.children = e, this.parent = null, Wc(e, (t, e) => t.parent = this)
    }

    hasChildren() {
        return this.numberOfChildren > 0
    }

    get numberOfChildren() {
        return Object.keys(this.children).length
    }

    toString() {
        return cu(this)
    }
}

class su {
    constructor(t, e) {
        this.path = t, this.parameters = e
    }

    get parameterMap() {
        return this._parameterMap || (this._parameterMap = $c(this.parameters)), this._parameterMap
    }

    toString() {
        return gu(this)
    }
}

function iu(t, e) {
    return t.length === e.length && t.every((t, n) => t.path === e[n].path)
}

class ou {
}

class au {
    parse(t) {
        const e = new wu(t);
        return new nu(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment())
    }

    serialize(t) {
        var e;
        return `/${uu(t.root, !0)}${function (t) {
            const e = Object.keys(t).map(e => {
                const n = t[e];
                return Array.isArray(n) ? n.map(t => `${du(e)}=${du(t)}`).join("&") : `${du(e)}=${du(n)}`
            });
            return e.length ? `?${e.join("&")}` : ""
        }(t.queryParams)}${"string" == typeof t.fragment ? `#${e = t.fragment, encodeURI(e)}` : ""}`
    }
}

const lu = new au;

function cu(t) {
    return t.segments.map(t => gu(t)).join("/")
}

function uu(t, e) {
    if (!t.hasChildren()) return cu(t);
    if (e) {
        const e = t.children.primary ? uu(t.children.primary, !1) : "", n = [];
        return Wc(t.children, (t, e) => {
            e !== Uc && n.push(`${e}:${uu(t, !1)}`)
        }), n.length > 0 ? `${e}(${n.join("//")})` : e
    }
    {
        const e = function (t, e) {
            let n = [];
            return Wc(t.children, (t, r) => {
                r === Uc && (n = n.concat(e(t, r)))
            }), Wc(t.children, (t, r) => {
                r !== Uc && (n = n.concat(e(t, r)))
            }), n
        }(t, (e, n) => n === Uc ? [uu(t.children.primary, !1)] : [`${n}:${uu(e, !1)}`]);
        return 1 === Object.keys(t.children).length && null != t.children.primary ? `${cu(t)}/${e[0]}` : `${cu(t)}/(${e.join("//")})`
    }
}

function hu(t) {
    return encodeURIComponent(t).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
}

function du(t) {
    return hu(t).replace(/%3B/gi, ";")
}

function pu(t) {
    return hu(t).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
}

function fu(t) {
    return decodeURIComponent(t)
}

function mu(t) {
    return fu(t.replace(/\+/g, "%20"))
}

function gu(t) {
    return `${pu(t.path)}${e = t.parameters, Object.keys(e).map(t => `;${pu(t)}=${pu(e[t])}`).join("")}`;
    var e
}

const yu = /^[^\/()?;=#]+/;

function _u(t) {
    const e = t.match(yu);
    return e ? e[0] : ""
}

const vu = /^[^=?&#]+/, bu = /^[^?&#]+/;

class wu {
    constructor(t) {
        this.url = t, this.remaining = t
    }

    parseRootSegment() {
        return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new ru([], {}) : new ru([], this.parseChildren())
    }

    parseQueryParams() {
        const t = {};
        if (this.consumeOptional("?")) do {
            this.parseQueryParam(t)
        } while (this.consumeOptional("&"));
        return t
    }

    parseFragment() {
        return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
    }

    parseChildren() {
        if ("" === this.remaining) return {};
        this.consumeOptional("/");
        const t = [];
        for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
        let e = {};
        this.peekStartsWith("/(") && (this.capture("/"), e = this.parseParens(!0));
        let n = {};
        return this.peekStartsWith("(") && (n = this.parseParens(!1)), (t.length > 0 || Object.keys(e).length > 0) && (n.primary = new ru(t, e)), n
    }

    parseSegment() {
        const t = _u(this.remaining);
        if ("" === t && this.peekStartsWith(";")) throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
        return this.capture(t), new su(fu(t), this.parseMatrixParams())
    }

    parseMatrixParams() {
        const t = {};
        for (; this.consumeOptional(";");) this.parseParam(t);
        return t
    }

    parseParam(t) {
        const e = _u(this.remaining);
        if (!e) return;
        this.capture(e);
        let n = "";
        if (this.consumeOptional("=")) {
            const t = _u(this.remaining);
            t && (n = t, this.capture(n))
        }
        t[fu(e)] = fu(n)
    }

    parseQueryParam(t) {
        const e = function (t) {
            const e = t.match(vu);
            return e ? e[0] : ""
        }(this.remaining);
        if (!e) return;
        this.capture(e);
        let n = "";
        if (this.consumeOptional("=")) {
            const t = function (t) {
                const e = t.match(bu);
                return e ? e[0] : ""
            }(this.remaining);
            t && (n = t, this.capture(n))
        }
        const r = mu(e), s = mu(n);
        if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || (e = [e], t[r] = e), e.push(s)
        } else t[r] = s
    }

    parseParens(t) {
        const e = {};
        for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
            const n = _u(this.remaining), r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r) throw new Error(`Cannot parse url '${this.url}'`);
            let s;
            n.indexOf(":") > -1 ? (s = n.substr(0, n.indexOf(":")), this.capture(s), this.capture(":")) : t && (s = Uc);
            const i = this.parseChildren();
            e[s] = 1 === Object.keys(i).length ? i.primary : new ru([], i), this.consumeOptional("//")
        }
        return e
    }

    peekStartsWith(t) {
        return this.remaining.startsWith(t)
    }

    consumeOptional(t) {
        return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length), !0)
    }

    capture(t) {
        if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`)
    }
}

class Su {
    constructor(t) {
        this._root = t
    }

    get root() {
        return this._root.value
    }

    parent(t) {
        const e = this.pathFromRoot(t);
        return e.length > 1 ? e[e.length - 2] : null
    }

    children(t) {
        const e = Cu(t, this._root);
        return e ? e.children.map(t => t.value) : []
    }

    firstChild(t) {
        const e = Cu(t, this._root);
        return e && e.children.length > 0 ? e.children[0].value : null
    }

    siblings(t) {
        const e = Eu(t, this._root);
        return e.length < 2 ? [] : e[e.length - 2].children.map(t => t.value).filter(e => e !== t)
    }

    pathFromRoot(t) {
        return Eu(t, this._root).map(t => t.value)
    }
}

function Cu(t, e) {
    if (t === e.value) return e;
    for (const n of e.children) {
        const e = Cu(t, n);
        if (e) return e
    }
    return null
}

function Eu(t, e) {
    if (t === e.value) return [e];
    for (const n of e.children) {
        const r = Eu(t, n);
        if (r.length) return r.unshift(e), r
    }
    return []
}

class xu {
    constructor(t, e) {
        this.value = t, this.children = e
    }

    toString() {
        return `TreeNode(${this.value})`
    }
}

function ku(t) {
    const e = {};
    return t && t.children.forEach(t => e[t.value.outlet] = t), e
}

class Tu extends Su {
    constructor(t, e) {
        super(t), this.snapshot = e, Nu(this, t)
    }

    toString() {
        return this.snapshot.toString()
    }
}

function Ou(t, e) {
    const n = function (t, e) {
            const n = new Iu([], {}, {}, "", {}, Uc, e, null, t.root, -1, {});
            return new Ru("", new xu(n, []))
        }(t, e), r = new Ol([new su("", {})]), s = new Ol({}), i = new Ol({}), o = new Ol({}), a = new Ol(""),
        l = new Au(r, s, o, a, i, Uc, e, n.root);
    return l.snapshot = n.root, new Tu(new xu(l, []), n)
}

class Au {
    constructor(t, e, n, r, s, i, o, a) {
        this.url = t, this.params = e, this.queryParams = n, this.fragment = r, this.data = s, this.outlet = i, this.component = o, this._futureSnapshot = a
    }

    get routeConfig() {
        return this._futureSnapshot.routeConfig
    }

    get root() {
        return this._routerState.root
    }

    get parent() {
        return this._routerState.parent(this)
    }

    get firstChild() {
        return this._routerState.firstChild(this)
    }

    get children() {
        return this._routerState.children(this)
    }

    get pathFromRoot() {
        return this._routerState.pathFromRoot(this)
    }

    get paramMap() {
        return this._paramMap || (this._paramMap = this.params.pipe(k(t => $c(t)))), this._paramMap
    }

    get queryParamMap() {
        return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(k(t => $c(t)))), this._queryParamMap
    }

    toString() {
        return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
    }
}

function Pu(t, e = "emptyOnly") {
    const n = t.pathFromRoot;
    let r = 0;
    if ("always" !== e) for (r = n.length - 1; r >= 1;) {
        const t = n[r], e = n[r - 1];
        if (t.routeConfig && "" === t.routeConfig.path) r--; else {
            if (e.component) break;
            r--
        }
    }
    return function (t) {
        return t.reduce((t, e) => ({
            params: Object.assign(Object.assign({}, t.params), e.params),
            data: Object.assign(Object.assign({}, t.data), e.data),
            resolve: Object.assign(Object.assign({}, t.resolve), e._resolvedData)
        }), {params: {}, data: {}, resolve: {}})
    }(n.slice(r))
}

class Iu {
    constructor(t, e, n, r, s, i, o, a, l, c, u) {
        this.url = t, this.params = e, this.queryParams = n, this.fragment = r, this.data = s, this.outlet = i, this.component = o, this.routeConfig = a, this._urlSegment = l, this._lastPathIndex = c, this._resolve = u
    }

    get root() {
        return this._routerState.root
    }

    get parent() {
        return this._routerState.parent(this)
    }

    get firstChild() {
        return this._routerState.firstChild(this)
    }

    get children() {
        return this._routerState.children(this)
    }

    get pathFromRoot() {
        return this._routerState.pathFromRoot(this)
    }

    get paramMap() {
        return this._paramMap || (this._paramMap = $c(this.params)), this._paramMap
    }

    get queryParamMap() {
        return this._queryParamMap || (this._queryParamMap = $c(this.queryParams)), this._queryParamMap
    }

    toString() {
        return `Route(url:'${this.url.map(t => t.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`
    }
}

class Ru extends Su {
    constructor(t, e) {
        super(e), this.url = t, Nu(this, e)
    }

    toString() {
        return Du(this._root)
    }
}

function Nu(t, e) {
    e.value._routerState = t, e.children.forEach(e => Nu(t, e))
}

function Du(t) {
    const e = t.children.length > 0 ? ` { ${t.children.map(Du).join(", ")} } ` : "";
    return `${t.value}${e}`
}

function ju(t) {
    if (t.snapshot) {
        const e = t.snapshot, n = t._futureSnapshot;
        t.snapshot = n, Bc(e.queryParams, n.queryParams) || t.queryParams.next(n.queryParams), e.fragment !== n.fragment && t.fragment.next(n.fragment), Bc(e.params, n.params) || t.params.next(n.params), function (t, e) {
            if (t.length !== e.length) return !1;
            for (let n = 0; n < t.length; ++n) if (!Bc(t[n], e[n])) return !1;
            return !0
        }(e.url, n.url) || t.url.next(n.url), Bc(e.data, n.data) || t.data.next(n.data)
    } else t.snapshot = t._futureSnapshot, t.data.next(t._futureSnapshot.data)
}

function Mu(t, e) {
    var n, r;
    return Bc(t.params, e.params) && iu(n = t.url, r = e.url) && n.every((t, e) => Bc(t.parameters, r[e].parameters)) && !(!t.parent != !e.parent) && (!t.parent || Mu(t.parent, e.parent))
}

function Fu(t, e, n) {
    if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
        const r = n.value;
        r._futureSnapshot = e.value;
        const s = function (t, e, n) {
            return e.children.map(e => {
                for (const r of n.children) if (t.shouldReuseRoute(e.value, r.value.snapshot)) return Fu(t, e, r);
                return Fu(t, e)
            })
        }(t, e, n);
        return new xu(r, s)
    }
    {
        if (t.shouldAttach(e.value)) {
            const n = t.retrieve(e.value);
            if (null !== n) {
                const t = n.route;
                return Lu(e, t), t
            }
        }
        const n = new Au(new Ol((r = e.value).url), new Ol(r.params), new Ol(r.queryParams), new Ol(r.fragment), new Ol(r.data), r.outlet, r.component, r),
            s = e.children.map(e => Fu(t, e));
        return new xu(n, s)
    }
    var r
}

function Lu(t, e) {
    if (t.value.routeConfig !== e.value.routeConfig) throw new Error("Cannot reattach ActivatedRouteSnapshot created from a different route");
    if (t.children.length !== e.children.length) throw new Error("Cannot reattach ActivatedRouteSnapshot with a different number of children");
    e.value._futureSnapshot = t.value;
    for (let n = 0; n < t.children.length; ++n) Lu(t.children[n], e.children[n])
}

function Uu(t) {
    return "object" == typeof t && null != t && !t.outlets && !t.segmentPath
}

function Hu(t) {
    return "object" == typeof t && null != t && t.outlets
}

function $u(t, e, n, r, s) {
    let i = {};
    return r && Wc(r, (t, e) => {
        i[e] = Array.isArray(t) ? t.map(t => `${t}`) : `${t}`
    }), new nu(n.root === t ? e : zu(n.root, t, e), i, s)
}

function zu(t, e, n) {
    const r = {};
    return Wc(t.children, (t, s) => {
        r[s] = t === e ? n : zu(t, e, n)
    }), new ru(t.segments, r)
}

class Vu {
    constructor(t, e, n) {
        if (this.isAbsolute = t, this.numberOfDoubleDots = e, this.commands = n, t && n.length > 0 && Uu(n[0])) throw new Error("Root segment cannot have matrix parameters");
        const r = n.find(Hu);
        if (r && r !== Kc(n)) throw new Error("{outlets:{}} has to be the last command")
    }

    toRoot() {
        return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
    }
}

class Bu {
    constructor(t, e, n) {
        this.segmentGroup = t, this.processChildren = e, this.index = n
    }
}

function qu(t, e, n) {
    if (t || (t = new ru([], {})), 0 === t.segments.length && t.hasChildren()) return Qu(t, e, n);
    const r = function (t, e, n) {
        let r = 0, s = e;
        const i = {match: !1, pathIndex: 0, commandIndex: 0};
        for (; s < t.segments.length;) {
            if (r >= n.length) return i;
            const e = t.segments[s], o = n[r];
            if (Hu(o)) break;
            const a = `${o}`, l = r < n.length - 1 ? n[r + 1] : null;
            if (s > 0 && void 0 === a) break;
            if (a && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Zu(a, l, e)) return i;
                r += 2
            } else {
                if (!Zu(a, {}, e)) return i;
                r++
            }
            s++
        }
        return {match: !0, pathIndex: s, commandIndex: r}
    }(t, e, n), s = n.slice(r.commandIndex);
    if (r.match && r.pathIndex < t.segments.length) {
        const e = new ru(t.segments.slice(0, r.pathIndex), {});
        return e.children.primary = new ru(t.segments.slice(r.pathIndex), t.children), Qu(e, 0, s)
    }
    return r.match && 0 === s.length ? new ru(t.segments, {}) : r.match && !t.hasChildren() ? Ku(t, e, n) : r.match ? Qu(t, 0, s) : Ku(t, e, n)
}

function Qu(t, e, n) {
    if (0 === n.length) return new ru(t.segments, {});
    {
        const r = function (t) {
            return Hu(t[0]) ? t[0].outlets : {[Uc]: t}
        }(n), s = {};
        return Wc(r, (n, r) => {
            "string" == typeof n && (n = [n]), null !== n && (s[r] = qu(t.children[r], e, n))
        }), Wc(t.children, (t, e) => {
            void 0 === r[e] && (s[e] = t)
        }), new ru(t.segments, s)
    }
}

function Ku(t, e, n) {
    const r = t.segments.slice(0, e);
    let s = 0;
    for (; s < n.length;) {
        const i = n[s];
        if (Hu(i)) {
            const t = Wu(i.outlets);
            return new ru(r, t)
        }
        if (0 === s && Uu(n[0])) {
            r.push(new su(t.segments[e].path, Gu(n[0]))), s++;
            continue
        }
        const o = Hu(i) ? i.outlets.primary : `${i}`, a = s < n.length - 1 ? n[s + 1] : null;
        o && a && Uu(a) ? (r.push(new su(o, Gu(a))), s += 2) : (r.push(new su(o, {})), s++)
    }
    return new ru(r, {})
}

function Wu(t) {
    const e = {};
    return Wc(t, (t, n) => {
        "string" == typeof t && (t = [t]), null !== t && (e[n] = Ku(new ru([], {}), 0, t))
    }), e
}

function Gu(t) {
    const e = {};
    return Wc(t, (t, n) => e[n] = `${t}`), e
}

function Zu(t, e, n) {
    return t == n.path && Bc(e, n.parameters)
}

class Yu {
    constructor(t, e, n, r) {
        this.routeReuseStrategy = t, this.futureState = e, this.currState = n, this.forwardEvent = r
    }

    activate(t) {
        const e = this.futureState._root, n = this.currState ? this.currState._root : null;
        this.deactivateChildRoutes(e, n, t), ju(this.futureState.root), this.activateChildRoutes(e, n, t)
    }

    deactivateChildRoutes(t, e, n) {
        const r = ku(e);
        t.children.forEach(t => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e]
        }), Wc(r, (t, e) => {
            this.deactivateRouteAndItsChildren(t, n)
        })
    }

    deactivateRoutes(t, e, n) {
        const r = t.value, s = e ? e.value : null;
        if (r === s) if (r.component) {
            const s = n.getContext(r.outlet);
            s && this.deactivateChildRoutes(t, e, s.children)
        } else this.deactivateChildRoutes(t, e, n); else s && this.deactivateRouteAndItsChildren(e, n)
    }

    deactivateRouteAndItsChildren(t, e) {
        this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, e) : this.deactivateRouteAndOutlet(t, e)
    }

    detachAndStoreRouteSubtree(t, e) {
        const n = e.getContext(t.value.outlet);
        if (n && n.outlet) {
            const e = n.outlet.detach(), r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {componentRef: e, route: t, contexts: r})
        }
    }

    deactivateRouteAndOutlet(t, e) {
        const n = e.getContext(t.value.outlet), r = n && t.value.component ? n.children : e, s = ku(t);
        for (const i of Object.keys(s)) this.deactivateRouteAndItsChildren(s[i], r);
        n && n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated(), n.attachRef = null, n.resolver = null, n.route = null)
    }

    activateChildRoutes(t, e, n) {
        const r = ku(e);
        t.children.forEach(t => {
            this.activateRoutes(t, r[t.value.outlet], n), this.forwardEvent(new Fc(t.value.snapshot))
        }), t.children.length && this.forwardEvent(new jc(t.value.snapshot))
    }

    activateRoutes(t, e, n) {
        const r = t.value, s = e ? e.value : null;
        if (ju(r), r === s) if (r.component) {
            const s = n.getOrCreateContext(r.outlet);
            this.activateChildRoutes(t, e, s.children)
        } else this.activateChildRoutes(t, e, n); else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
                const t = this.routeReuseStrategy.retrieve(r.snapshot);
                this.routeReuseStrategy.store(r.snapshot, null), e.children.onOutletReAttached(t.contexts), e.attachRef = t.componentRef, e.route = t.route.value, e.outlet && e.outlet.attach(t.componentRef, t.route.value), Ju(t.route)
            } else {
                const n = function (t) {
                    for (let e = t.parent; e; e = e.parent) {
                        const t = e.routeConfig;
                        if (t && t._loadedConfig) return t._loadedConfig;
                        if (t && t.component) return null
                    }
                    return null
                }(r.snapshot), s = n ? n.module.componentFactoryResolver : null;
                e.attachRef = null, e.route = r, e.resolver = s, e.outlet && e.outlet.activateWith(r, s), this.activateChildRoutes(t, null, e.children)
            }
        } else this.activateChildRoutes(t, null, n)
    }
}

function Ju(t) {
    ju(t.value), t.children.forEach(Ju)
}

class Xu {
    constructor(t, e) {
        this.routes = t, this.module = e
    }
}

function th(t) {
    return "function" == typeof t
}

function eh(t) {
    return t instanceof nu
}

const nh = Symbol("INITIAL_VALUE");

function rh() {
    return $l(t => Nl(t.map(t => t.pipe(ql(1), Wl(nh)))).pipe(Gl((t, e) => {
        let n = !1;
        return e.reduce((t, r, s) => {
            if (t !== nh) return t;
            if (r === nh && (n = !0), !n) {
                if (!1 === r) return r;
                if (s === e.length - 1 || eh(r)) return r
            }
            return t
        }, t)
    }, nh), Jl(t => t !== nh), k(t => eh(t) ? t : !0 === t), ql(1)))
}

let sh = (() => {
    class t {
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275cmp = Lt({
        type: t, selectors: [["ng-component"]], decls: 1, vars: 0, template: function (t, e) {
            1 & t && Qs(0, "router-outlet")
        }, directives: function () {
            return [Jh]
        }, encapsulation: 2
    }), t
})();

function ih(t, e = "") {
    for (let n = 0; n < t.length; n++) {
        const r = t[n];
        oh(r, ah(e, r))
    }
}

function oh(t, e) {
    t.children && ih(t.children, e)
}

function ah(t, e) {
    return e ? t || e.path ? t && !e.path ? `${t}/` : !t && e.path ? e.path : `${t}/${e.path}` : "" : t
}

function lh(t) {
    const e = t.children && t.children.map(lh),
        n = e ? Object.assign(Object.assign({}, t), {children: e}) : Object.assign({}, t);
    return !n.component && (e || n.loadChildren) && n.outlet && n.outlet !== Uc && (n.component = sh), n
}

function ch(t) {
    return t.outlet || Uc
}

function uh(t, e) {
    const n = t.filter(t => ch(t) === e);
    return n.push(...t.filter(t => ch(t) !== e)), n
}

const hh = {matched: !1, consumedSegments: [], lastChild: 0, parameters: {}, positionalParamSegments: {}};

function dh(t, e, n) {
    var r;
    if ("" === e.path) return "full" === e.pathMatch && (t.hasChildren() || n.length > 0) ? Object.assign({}, hh) : {
        matched: !0,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {}
    };
    const s = (e.matcher || Vc)(n, t, e);
    if (!s) return Object.assign({}, hh);
    const i = {};
    Wc(s.posParams, (t, e) => {
        i[e] = t.path
    });
    const o = s.consumed.length > 0 ? Object.assign(Object.assign({}, i), s.consumed[s.consumed.length - 1].parameters) : i;
    return {
        matched: !0,
        consumedSegments: s.consumed,
        lastChild: s.consumed.length,
        parameters: o,
        positionalParamSegments: null !== (r = s.posParams) && void 0 !== r ? r : {}
    }
}

function ph(t, e, n, r, s = "corrected") {
    if (n.length > 0 && function (t, e, n) {
        return n.some(n => fh(t, e, n) && ch(n) !== Uc)
    }(t, n, r)) {
        const s = new ru(e, function (t, e, n, r) {
            const s = {};
            s.primary = r, r._sourceSegment = t, r._segmentIndexShift = e.length;
            for (const i of n) if ("" === i.path && ch(i) !== Uc) {
                const n = new ru([], {});
                n._sourceSegment = t, n._segmentIndexShift = e.length, s[ch(i)] = n
            }
            return s
        }(t, e, r, new ru(n, t.children)));
        return s._sourceSegment = t, s._segmentIndexShift = e.length, {segmentGroup: s, slicedSegments: []}
    }
    if (0 === n.length && function (t, e, n) {
        return n.some(n => fh(t, e, n))
    }(t, n, r)) {
        const i = new ru(t.segments, function (t, e, n, r, s, i) {
            const o = {};
            for (const a of r) if (fh(t, n, a) && !s[ch(a)]) {
                const n = new ru([], {});
                n._sourceSegment = t, n._segmentIndexShift = "legacy" === i ? t.segments.length : e.length, o[ch(a)] = n
            }
            return Object.assign(Object.assign({}, s), o)
        }(t, e, n, r, t.children, s));
        return i._sourceSegment = t, i._segmentIndexShift = e.length, {segmentGroup: i, slicedSegments: n}
    }
    const i = new ru(t.segments, t.children);
    return i._sourceSegment = t, i._segmentIndexShift = e.length, {segmentGroup: i, slicedSegments: n}
}

function fh(t, e, n) {
    return (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) && "" === n.path
}

function mh(t, e, n, r) {
    return !!(ch(t) === r || r !== Uc && fh(e, n, t)) && ("**" === t.path || dh(e, t, n).matched)
}

function gh(t, e, n) {
    return 0 === e.length && !t.children[n]
}

class yh {
    constructor(t) {
        this.segmentGroup = t || null
    }
}

class _h {
    constructor(t) {
        this.urlTree = t
    }
}

function vh(t) {
    return new _(e => e.error(new yh(t)))
}

function bh(t) {
    return new _(e => e.error(new _h(t)))
}

function wh(t) {
    return new _(e => e.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${t}'`)))
}

class Sh {
    constructor(t, e, n, r, s) {
        this.configLoader = e, this.urlSerializer = n, this.urlTree = r, this.config = s, this.allowRedirects = !0, this.ngModule = t.get(Qi)
    }

    apply() {
        const t = ph(this.urlTree.root, [], [], this.config).segmentGroup, e = new ru(t.segments, t.children);
        return this.expandSegmentGroup(this.ngModule, this.config, e, Uc).pipe(k(t => this.createUrlTree(Ch(t), this.urlTree.queryParams, this.urlTree.fragment))).pipe(ec(t => {
            if (t instanceof _h) return this.allowRedirects = !1, this.match(t.urlTree);
            if (t instanceof yh) throw this.noMatchError(t);
            throw t
        }))
    }

    match(t) {
        return this.expandSegmentGroup(this.ngModule, this.config, t.root, Uc).pipe(k(e => this.createUrlTree(Ch(e), t.queryParams, t.fragment))).pipe(ec(t => {
            if (t instanceof yh) throw this.noMatchError(t);
            throw t
        }))
    }

    noMatchError(t) {
        return new Error(`Cannot match any routes. URL Segment: '${t.segmentGroup}'`)
    }

    createUrlTree(t, e, n) {
        const r = t.segments.length > 0 ? new ru([], {[Uc]: t}) : t;
        return new nu(r, e, n)
    }

    expandSegmentGroup(t, e, n, r) {
        return 0 === n.segments.length && n.hasChildren() ? this.expandChildren(t, e, n).pipe(k(t => new ru([], t))) : this.expandSegment(t, n, e, n.segments, r, !0)
    }

    expandChildren(t, e, n) {
        const r = [];
        for (const s of Object.keys(n.children)) "primary" === s ? r.unshift(s) : r.push(s);
        return M(r).pipe(sc(r => {
            const s = n.children[r], i = uh(e, r);
            return this.expandSegmentGroup(t, i, s, r).pipe(k(t => ({segment: t, outlet: r})))
        }), Gl((t, e) => (t[e.outlet] = e.segment, t), {}), function (t, e) {
            const n = arguments.length >= 2;
            return r => r.pipe(t ? Jl((e, n) => t(e, n, r)) : y, ic(1), n ? dc(e) : lc(() => new Ml))
        }())
    }

    expandSegment(t, e, n, r, s, i) {
        return M(n).pipe(sc(o => this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(ec(t => {
            if (t instanceof yh) return Tl(null);
            throw t
        }))), mc(t => !!t), ec((t, n) => {
            if (t instanceof Ml || "EmptyError" === t.name) {
                if (gh(e, r, s)) return Tl(new ru([], {}));
                throw new yh(e)
            }
            throw t
        }))
    }

    expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
        return mh(r, e, s, i) ? void 0 === r.redirectTo ? this.matchSegmentAgainstRoute(t, e, r, s, i) : o && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) : vh(e) : vh(e)
    }

    expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
        return "**" === r.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
    }

    expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
        const s = this.applyRedirectCommands([], n.redirectTo, {});
        return n.redirectTo.startsWith("/") ? bh(s) : this.lineralizeSegments(n, s).pipe(H(n => {
            const s = new ru(n, {});
            return this.expandSegment(t, s, e, n, r, !1)
        }))
    }

    expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
        const {matched: o, consumedSegments: a, lastChild: l, positionalParamSegments: c} = dh(e, r, s);
        if (!o) return vh(e);
        const u = this.applyRedirectCommands(a, r.redirectTo, c);
        return r.redirectTo.startsWith("/") ? bh(u) : this.lineralizeSegments(r, u).pipe(H(r => this.expandSegment(t, e, n, r.concat(s.slice(l)), i, !1)))
    }

    matchSegmentAgainstRoute(t, e, n, r, s) {
        if ("**" === n.path) return n.loadChildren ? (n._loadedConfig ? Tl(n._loadedConfig) : this.configLoader.load(t.injector, n)).pipe(k(t => (n._loadedConfig = t, new ru(r, {})))) : Tl(new ru(r, {}));
        const {matched: i, consumedSegments: o, lastChild: a} = dh(e, n, r);
        if (!i) return vh(e);
        const l = r.slice(a);
        return this.getChildConfig(t, n, r).pipe(H(t => {
            const r = t.module, i = t.routes, {segmentGroup: a, slicedSegments: c} = ph(e, o, l, i),
                u = new ru(a.segments, a.children);
            if (0 === c.length && u.hasChildren()) return this.expandChildren(r, i, u).pipe(k(t => new ru(o, t)));
            if (0 === i.length && 0 === c.length) return Tl(new ru(o, {}));
            const h = ch(n) === s;
            return this.expandSegment(r, u, i, c, h ? Uc : s, !0).pipe(k(t => new ru(o.concat(t.segments), t.children)))
        }))
    }

    getChildConfig(t, e, n) {
        return e.children ? Tl(new Xu(e.children, t)) : e.loadChildren ? void 0 !== e._loadedConfig ? Tl(e._loadedConfig) : this.runCanLoadGuards(t.injector, e, n).pipe(H(n => n ? this.configLoader.load(t.injector, e).pipe(k(t => (e._loadedConfig = t, t))) : function (t) {
            return new _(e => e.error(zc(`Cannot load children because the guard of the route "path: '${t.path}'" returned false`)))
        }(e))) : Tl(new Xu([], t))
    }

    runCanLoadGuards(t, e, n) {
        const r = e.canLoad;
        return r && 0 !== r.length ? Tl(r.map(r => {
            const s = t.get(r);
            let i;
            if (function (t) {
                return t && th(t.canLoad)
            }(s)) i = s.canLoad(e, n); else {
                if (!th(s)) throw new Error("Invalid CanLoad guard");
                i = s(e, n)
            }
            return Gc(i)
        })).pipe(rh(), yc(t => {
            if (!eh(t)) return;
            const e = zc(`Redirecting to "${this.urlSerializer.serialize(t)}"`);
            throw e.url = t, e
        }), k(t => !0 === t)) : Tl(!0)
    }

    lineralizeSegments(t, e) {
        let n = [], r = e.root;
        for (; ;) {
            if (n = n.concat(r.segments), 0 === r.numberOfChildren) return Tl(n);
            if (r.numberOfChildren > 1 || !r.children.primary) return wh(t.redirectTo);
            r = r.children.primary
        }
    }

    applyRedirectCommands(t, e, n) {
        return this.applyRedirectCreatreUrlTree(e, this.urlSerializer.parse(e), t, n)
    }

    applyRedirectCreatreUrlTree(t, e, n, r) {
        const s = this.createSegmentGroup(t, e.root, n, r);
        return new nu(s, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment)
    }

    createQueryParams(t, e) {
        const n = {};
        return Wc(t, (t, r) => {
            if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s]
            } else n[r] = t
        }), n
    }

    createSegmentGroup(t, e, n, r) {
        const s = this.createSegments(t, e.segments, n, r);
        let i = {};
        return Wc(e.children, (e, s) => {
            i[s] = this.createSegmentGroup(t, e, n, r)
        }), new ru(s, i)
    }

    createSegments(t, e, n, r) {
        return e.map(e => e.path.startsWith(":") ? this.findPosParam(t, e, r) : this.findOrReturn(e, n))
    }

    findPosParam(t, e, n) {
        const r = n[e.path.substring(1)];
        if (!r) throw new Error(`Cannot redirect to '${t}'. Cannot find '${e.path}'.`);
        return r
    }

    findOrReturn(t, e) {
        let n = 0;
        for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++
        }
        return t
    }
}

function Ch(t) {
    const e = {};
    for (const n of Object.keys(t.children)) {
        const r = Ch(t.children[n]);
        (r.segments.length > 0 || r.hasChildren()) && (e[n] = r)
    }
    return function (t) {
        if (1 === t.numberOfChildren && t.children.primary) {
            const e = t.children.primary;
            return new ru(t.segments.concat(e.segments), e.children)
        }
        return t
    }(new ru(t.segments, e))
}

class Eh {
    constructor(t) {
        this.path = t, this.route = this.path[this.path.length - 1]
    }
}

class xh {
    constructor(t, e) {
        this.component = t, this.route = e
    }
}

function kh(t, e, n) {
    const r = t._root;
    return Oh(r, e ? e._root : null, n, [r.value])
}

function Th(t, e, n) {
    const r = function (t) {
        if (!t) return null;
        for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig
        }
        return null
    }(e);
    return (r ? r.module.injector : n).get(t)
}

function Oh(t, e, n, r, s = {canDeactivateChecks: [], canActivateChecks: []}) {
    const i = ku(e);
    return t.children.forEach(t => {
        !function (t, e, n, r, s = {canDeactivateChecks: [], canActivateChecks: []}) {
            const i = t.value, o = e ? e.value : null, a = n ? n.getContext(t.value.outlet) : null;
            if (o && i.routeConfig === o.routeConfig) {
                const l = function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                        case"pathParamsChange":
                            return !iu(t.url, e.url);
                        case"pathParamsOrQueryParamsChange":
                            return !iu(t.url, e.url) || !Bc(t.queryParams, e.queryParams);
                        case"always":
                            return !0;
                        case"paramsOrQueryParamsChange":
                            return !Mu(t, e) || !Bc(t.queryParams, e.queryParams);
                        case"paramsChange":
                        default:
                            return !Mu(t, e)
                    }
                }(o, i, i.routeConfig.runGuardsAndResolvers);
                l ? s.canActivateChecks.push(new Eh(r)) : (i.data = o.data, i._resolvedData = o._resolvedData), Oh(t, e, i.component ? a ? a.children : null : n, r, s), l && a && a.outlet && a.outlet.isActivated && s.canDeactivateChecks.push(new xh(a.outlet.component, o))
            } else o && Ah(e, a, s), s.canActivateChecks.push(new Eh(r)), Oh(t, null, i.component ? a ? a.children : null : n, r, s)
        }(t, i[t.value.outlet], n, r.concat([t.value]), s), delete i[t.value.outlet]
    }), Wc(i, (t, e) => Ah(t, n.getContext(e), s)), s
}

function Ah(t, e, n) {
    const r = ku(t), s = t.value;
    Wc(r, (t, r) => {
        Ah(t, s.component ? e ? e.children.getContext(r) : null : e, n)
    }), n.canDeactivateChecks.push(new xh(s.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null, s))
}

class Ph {
}

function Ih(t) {
    return new _(e => e.error(t))
}

class Rh {
    constructor(t, e, n, r, s, i) {
        this.rootComponentType = t, this.config = e, this.urlTree = n, this.url = r, this.paramsInheritanceStrategy = s, this.relativeLinkResolution = i
    }

    recognize() {
        const t = ph(this.urlTree.root, [], [], this.config.filter(t => void 0 === t.redirectTo), this.relativeLinkResolution).segmentGroup,
            e = this.processSegmentGroup(this.config, t, Uc);
        if (null === e) return null;
        const n = new Iu([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, Uc, this.rootComponentType, null, this.urlTree.root, -1, {}),
            r = new xu(n, e), s = new Ru(this.url, r);
        return this.inheritParamsAndData(s._root), s
    }

    inheritParamsAndData(t) {
        const e = t.value, n = Pu(e, this.paramsInheritanceStrategy);
        e.params = Object.freeze(n.params), e.data = Object.freeze(n.data), t.children.forEach(t => this.inheritParamsAndData(t))
    }

    processSegmentGroup(t, e, n) {
        return 0 === e.segments.length && e.hasChildren() ? this.processChildren(t, e) : this.processSegment(t, e, e.segments, n)
    }

    processChildren(t, e) {
        const n = [];
        for (const s of Object.keys(e.children)) {
            const r = e.children[s], i = uh(t, s), o = this.processSegmentGroup(i, r, s);
            if (null === o) return null;
            n.push(...o)
        }
        const r = Dh(n);
        return r.sort((t, e) => t.value.outlet === Uc ? -1 : e.value.outlet === Uc ? 1 : t.value.outlet.localeCompare(e.value.outlet)), r
    }

    processSegment(t, e, n, r) {
        for (const s of t) {
            const t = this.processSegmentAgainstRoute(s, e, n, r);
            if (null !== t) return t
        }
        return gh(e, n, r) ? [] : null
    }

    processSegmentAgainstRoute(t, e, n, r) {
        if (t.redirectTo || !mh(t, e, n, r)) return null;
        let s, i = [], o = [];
        if ("**" === t.path) {
            const r = n.length > 0 ? Kc(n).parameters : {};
            s = new Iu(n, r, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, Fh(t), ch(t), t.component, t, jh(e), Mh(e) + n.length, Lh(t))
        } else {
            const r = dh(e, t, n);
            if (!r.matched) return null;
            i = r.consumedSegments, o = n.slice(r.lastChild), s = new Iu(i, r.parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, Fh(t), ch(t), t.component, t, jh(e), Mh(e) + i.length, Lh(t))
        }
        const a = function (t) {
            return t.children ? t.children : t.loadChildren ? t._loadedConfig.routes : []
        }(t), {
            segmentGroup: l,
            slicedSegments: c
        } = ph(e, i, o, a.filter(t => void 0 === t.redirectTo), this.relativeLinkResolution);
        if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return null === t ? null : [new xu(s, t)]
        }
        if (0 === a.length && 0 === c.length) return [new xu(s, [])];
        const u = ch(t) === r, h = this.processSegment(a, l, c, u ? Uc : r);
        return null === h ? null : [new xu(s, h)]
    }
}

function Nh(t) {
    const e = t.value.routeConfig;
    return e && "" === e.path && void 0 === e.redirectTo
}

function Dh(t) {
    const e = [], n = new Set;
    for (const r of t) {
        if (!Nh(r)) {
            e.push(r);
            continue
        }
        const t = e.find(t => r.value.routeConfig === t.value.routeConfig);
        void 0 !== t ? (t.children.push(...r.children), n.add(t)) : e.push(r)
    }
    for (const r of n) {
        const t = Dh(r.children);
        e.push(new xu(r.value, t))
    }
    return e.filter(t => !n.has(t))
}

function jh(t) {
    let e = t;
    for (; e._sourceSegment;) e = e._sourceSegment;
    return e
}

function Mh(t) {
    let e = t, n = e._segmentIndexShift ? e._segmentIndexShift : 0;
    for (; e._sourceSegment;) e = e._sourceSegment, n += e._segmentIndexShift ? e._segmentIndexShift : 0;
    return n - 1
}

function Fh(t) {
    return t.data || {}
}

function Lh(t) {
    return t.resolve || {}
}

function Uh(t) {
    return $l(e => {
        const n = t(e);
        return n ? M(n).pipe(k(() => e)) : Tl(e)
    })
}

class Hh extends class {
    shouldDetach(t) {
        return !1
    }

    store(t, e) {
    }

    shouldAttach(t) {
        return !1
    }

    retrieve(t) {
        return null
    }

    shouldReuseRoute(t, e) {
        return t.routeConfig === e.routeConfig
    }
} {
}

const $h = new En("ROUTES");

class zh {
    constructor(t, e, n, r) {
        this.loader = t, this.compiler = e, this.onLoadStartListener = n, this.onLoadEndListener = r
    }

    load(t, e) {
        if (e._loader$) return e._loader$;
        this.onLoadStartListener && this.onLoadStartListener(e);
        const n = this.loadModuleFactory(e.loadChildren).pipe(k(n => {
            this.onLoadEndListener && this.onLoadEndListener(e);
            const r = n.create(t);
            return new Xu(Qc(r.injector.get($h, void 0, gt.Self | gt.Optional)).map(lh), r)
        }), ec(t => {
            throw e._loader$ = void 0, t
        }));
        return e._loader$ = new W(n, () => new C).pipe(q()), e._loader$
    }

    loadModuleFactory(t) {
        return "string" == typeof t ? M(this.loader.load(t)) : Gc(t()).pipe(H(t => t instanceof Ki ? Tl(t) : M(this.compiler.compileModuleAsync(t))))
    }
}

class Vh {
    constructor() {
        this.outlet = null, this.route = null, this.resolver = null, this.children = new Bh, this.attachRef = null
    }
}

class Bh {
    constructor() {
        this.contexts = new Map
    }

    onChildOutletCreated(t, e) {
        const n = this.getOrCreateContext(t);
        n.outlet = e, this.contexts.set(t, n)
    }

    onChildOutletDestroyed(t) {
        const e = this.getContext(t);
        e && (e.outlet = null)
    }

    onOutletDeactivated() {
        const t = this.contexts;
        return this.contexts = new Map, t
    }

    onOutletReAttached(t) {
        this.contexts = t
    }

    getOrCreateContext(t) {
        let e = this.getContext(t);
        return e || (e = new Vh, this.contexts.set(t, e)), e
    }

    getContext(t) {
        return this.contexts.get(t) || null
    }
}

class qh {
    shouldProcessUrl(t) {
        return !0
    }

    extract(t) {
        return t
    }

    merge(t, e) {
        return t
    }
}

function Qh(t) {
    throw t
}

function Kh(t, e, n) {
    return e.parse("/")
}

function Wh(t, e) {
    return Tl(null)
}

const Gh = {paths: "exact", fragment: "ignored", matrixParams: "ignored", queryParams: "exact"},
    Zh = {paths: "subset", fragment: "ignored", matrixParams: "ignored", queryParams: "subset"};
let Yh = (() => {
    class t {
        constructor(t, e, n, r, s, i, o, a) {
            this.rootComponentType = t, this.urlSerializer = e, this.rootContexts = n, this.location = r, this.config = a, this.lastSuccessfulNavigation = null, this.currentNavigation = null, this.disposed = !1, this.lastLocationChangeInfo = null, this.navigationId = 0, this.isNgZoneEnabled = !1, this.events = new C, this.errorHandler = Qh, this.malformedUriErrorHandler = Kh, this.navigated = !1, this.lastSuccessfulId = -1, this.hooks = {
                beforePreactivation: Wh,
                afterPreactivation: Wh
            }, this.urlHandlingStrategy = new qh, this.routeReuseStrategy = new Hh, this.onSameUrlNavigation = "ignore", this.paramsInheritanceStrategy = "emptyOnly", this.urlUpdateStrategy = "deferred", this.relativeLinkResolution = "corrected", this.ngModule = s.get(Qi), this.console = s.get(bo);
            const l = s.get(No);
            this.isNgZoneEnabled = l instanceof No && No.isInAngularZone(), this.resetConfig(a), this.currentUrlTree = new nu(new ru([], {}), {}, null), this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.configLoader = new zh(i, o, t => this.triggerEvent(new Rc(t)), t => this.triggerEvent(new Nc(t))), this.routerState = Ou(this.currentUrlTree, this.rootComponentType), this.transitions = new Ol({
                id: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: {canActivateChecks: [], canDeactivateChecks: []},
                guardsResult: null
            }), this.navigations = this.setupNavigations(this.transitions), this.processNavigations()
        }

        setupNavigations(t) {
            const e = this.events;
            return t.pipe(Jl(t => 0 !== t.id), k(t => Object.assign(Object.assign({}, t), {extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl)})), $l(t => {
                let n = !1, r = !1;
                return Tl(t).pipe(yc(t => {
                    this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation ? Object.assign(Object.assign({}, this.lastSuccessfulNavigation), {previousNavigation: null}) : null
                    }
                }), $l(t => {
                    const n = !this.navigated || t.extractedUrl.toString() !== this.browserUrlTree.toString();
                    if (("reload" === this.onSameUrlNavigation || n) && this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) return Tl(t).pipe($l(t => {
                        const n = this.transitions.getValue();
                        return e.next(new Cc(t.id, this.serializeUrl(t.extractedUrl), t.source, t.restoredState)), n !== this.transitions.getValue() ? Ll : Promise.resolve(t)
                    }), function (t, e, n, r) {
                        return $l(s => function (t, e, n, r, s) {
                            return new Sh(t, e, n, r, s).apply()
                        }(t, e, n, s.extractedUrl, r).pipe(k(t => Object.assign(Object.assign({}, s), {urlAfterRedirects: t}))))
                    }(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config), yc(t => {
                        this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), {finalUrl: t.urlAfterRedirects})
                    }), function (t, e, n, r, s) {
                        return H(i => function (t, e, n, r, s = "emptyOnly", i = "legacy") {
                            try {
                                const o = new Rh(t, e, n, r, s, i).recognize();
                                return null === o ? Ih(new Ph) : Tl(o)
                            } catch (o) {
                                return Ih(o)
                            }
                        }(t, e, i.urlAfterRedirects, n(i.urlAfterRedirects), r, s).pipe(k(t => Object.assign(Object.assign({}, i), {targetSnapshot: t}))))
                    }(this.rootComponentType, this.config, t => this.serializeUrl(t), this.paramsInheritanceStrategy, this.relativeLinkResolution), yc(t => {
                        "eager" === this.urlUpdateStrategy && (t.extras.skipLocationChange || this.setBrowserUrl(t.urlAfterRedirects, !!t.extras.replaceUrl, t.id, t.extras.state), this.browserUrlTree = t.urlAfterRedirects);
                        const n = new Tc(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                        e.next(n)
                    }));
                    if (n && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                        const {id: n, extractedUrl: r, source: s, restoredState: i, extras: o} = t,
                            a = new Cc(n, this.serializeUrl(r), s, i);
                        e.next(a);
                        const l = Ou(r, this.rootComponentType).snapshot;
                        return Tl(Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, o), {skipLocationChange: !1, replaceUrl: !1})
                        }))
                    }
                    return this.rawUrlTree = t.rawUrl, this.browserUrlTree = t.urlAfterRedirects, t.resolve(null), Ll
                }), Uh(t => {
                    const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: {skipLocationChange: i, replaceUrl: o}
                    } = t;
                    return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o
                    })
                }), yc(t => {
                    const e = new Oc(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                    this.triggerEvent(e)
                }), k(t => Object.assign(Object.assign({}, t), {guards: kh(t.targetSnapshot, t.currentSnapshot, this.rootContexts)})), function (t, e) {
                    return H(n => {
                        const {
                            targetSnapshot: r,
                            currentSnapshot: s,
                            guards: {canActivateChecks: i, canDeactivateChecks: o}
                        } = n;
                        return 0 === o.length && 0 === i.length ? Tl(Object.assign(Object.assign({}, n), {guardsResult: !0})) : function (t, e, n, r) {
                            return M(t).pipe(H(t => function (t, e, n, r, s) {
                                const i = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
                                return i && 0 !== i.length ? Tl(i.map(i => {
                                    const o = Th(i, e, s);
                                    let a;
                                    if (function (t) {
                                        return t && th(t.canDeactivate)
                                    }(o)) a = Gc(o.canDeactivate(t, e, n, r)); else {
                                        if (!th(o)) throw new Error("Invalid CanDeactivate guard");
                                        a = Gc(o(t, e, n, r))
                                    }
                                    return a.pipe(mc())
                                })).pipe(rh()) : Tl(!0)
                            }(t.component, t.route, n, e, r)), mc(t => !0 !== t, !0))
                        }(o, r, s, t).pipe(H(n => n && "boolean" == typeof n ? function (t, e, n, r) {
                            return M(e).pipe(sc(e => Fl(function (t, e) {
                                return null !== t && e && e(new Dc(t)), Tl(!0)
                            }(e.route.parent, r), function (t, e) {
                                return null !== t && e && e(new Mc(t)), Tl(!0)
                            }(e.route, r), function (t, e, n) {
                                const r = e[e.length - 1],
                                    s = e.slice(0, e.length - 1).reverse().map(t => function (t) {
                                        const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                                        return e && 0 !== e.length ? {node: t, guards: e} : null
                                    }(t)).filter(t => null !== t).map(e => Hl(() => Tl(e.guards.map(s => {
                                        const i = Th(s, e.node, n);
                                        let o;
                                        if (function (t) {
                                            return t && th(t.canActivateChild)
                                        }(i)) o = Gc(i.canActivateChild(r, t)); else {
                                            if (!th(i)) throw new Error("Invalid CanActivateChild guard");
                                            o = Gc(i(r, t))
                                        }
                                        return o.pipe(mc())
                                    })).pipe(rh())));
                                return Tl(s).pipe(rh())
                            }(t, e.path, n), function (t, e, n) {
                                const r = e.routeConfig ? e.routeConfig.canActivate : null;
                                return r && 0 !== r.length ? Tl(r.map(r => Hl(() => {
                                    const s = Th(r, e, n);
                                    let i;
                                    if (function (t) {
                                        return t && th(t.canActivate)
                                    }(s)) i = Gc(s.canActivate(e, t)); else {
                                        if (!th(s)) throw new Error("Invalid CanActivate guard");
                                        i = Gc(s(e, t))
                                    }
                                    return i.pipe(mc())
                                }))).pipe(rh()) : Tl(!0)
                            }(t, e.route, n))), mc(t => !0 !== t, !0))
                        }(r, i, t, e) : Tl(n)), k(t => Object.assign(Object.assign({}, n), {guardsResult: t})))
                    })
                }(this.ngModule.injector, t => this.triggerEvent(t)), yc(t => {
                    if (eh(t.guardsResult)) {
                        const e = zc(`Redirecting to "${this.serializeUrl(t.guardsResult)}"`);
                        throw e.url = t.guardsResult, e
                    }
                    const e = new Ac(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                    this.triggerEvent(e)
                }), Jl(t => {
                    if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new xc(t.id, this.serializeUrl(t.extractedUrl), "");
                        return e.next(n), t.resolve(!1), !1
                    }
                    return !0
                }), Uh(t => {
                    if (t.guards.canActivateChecks.length) return Tl(t).pipe(yc(t => {
                        const e = new Pc(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                        this.triggerEvent(e)
                    }), $l(t => {
                        let n = !1;
                        return Tl(t).pipe((r = this.paramsInheritanceStrategy, s = this.ngModule.injector, H(t => {
                            const {targetSnapshot: e, guards: {canActivateChecks: n}} = t;
                            if (!n.length) return Tl(t);
                            let i = 0;
                            return M(n).pipe(sc(t => function (t, e, n, r) {
                                return function (t, e, n, r) {
                                    const s = Object.keys(t);
                                    if (0 === s.length) return Tl({});
                                    const i = {};
                                    return M(s).pipe(H(s => function (t, e, n, r) {
                                        const s = Th(t, e, r);
                                        return Gc(s.resolve ? s.resolve(e, n) : s(e, n))
                                    }(t[s], e, n, r).pipe(yc(t => {
                                        i[s] = t
                                    }))), ic(1), H(() => Object.keys(i).length === s.length ? Tl(i) : Ll))
                                }(t._resolve, t, e, r).pipe(k(e => (t._resolvedData = e, t.data = Object.assign(Object.assign({}, t.data), Pu(t, n).resolve), null)))
                            }(t.route, e, r, s)), yc(() => i++), ic(1), H(e => i === n.length ? Tl(t) : Ll))
                        })), yc({
                            next: () => n = !0, complete: () => {
                                if (!n) {
                                    const n = new xc(t.id, this.serializeUrl(t.extractedUrl), "At least one route resolver didn't emit any value.");
                                    e.next(n), t.resolve(!1)
                                }
                            }
                        }));
                        var r, s
                    }), yc(t => {
                        const e = new Ic(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                        this.triggerEvent(e)
                    }))
                }), Uh(t => {
                    const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: {skipLocationChange: i, replaceUrl: o}
                    } = t;
                    return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o
                    })
                }), k(t => {
                    const e = function (t, e, n) {
                        const r = Fu(t, e._root, n ? n._root : void 0);
                        return new Tu(r, e)
                    }(this.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                    return Object.assign(Object.assign({}, t), {targetRouterState: e})
                }), yc(t => {
                    this.currentUrlTree = t.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl), this.routerState = t.targetRouterState, "deferred" === this.urlUpdateStrategy && (t.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, !!t.extras.replaceUrl, t.id, t.extras.state), this.browserUrlTree = t.urlAfterRedirects)
                }), (i = this.rootContexts, o = this.routeReuseStrategy, a = t => this.triggerEvent(t), k(t => (new Yu(o, t.targetRouterState, t.currentRouterState, a).activate(i), t))), yc({
                    next() {
                        n = !0
                    }, complete() {
                        n = !0
                    }
                }), (s = () => {
                    if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new xc(t.id, this.serializeUrl(t.extractedUrl), `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`);
                        e.next(n), t.resolve(!1)
                    }
                    this.currentNavigation = null
                }, t => t.lift(new bc(s))), ec(n => {
                    if (r = !0, (s = n) && s.ngNavigationCancelingError) {
                        const r = eh(n.url);
                        r || (this.navigated = !0, this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl));
                        const s = new xc(t.id, this.serializeUrl(t.extractedUrl), n.message);
                        e.next(s), r ? setTimeout(() => {
                            const e = this.urlHandlingStrategy.merge(n.url, this.rawUrlTree);
                            this.scheduleNavigation(e, "imperative", null, {
                                skipLocationChange: t.extras.skipLocationChange,
                                replaceUrl: "eager" === this.urlUpdateStrategy
                            }, {resolve: t.resolve, reject: t.reject, promise: t.promise})
                        }, 0) : t.resolve(!1)
                    } else {
                        this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                        const r = new kc(t.id, this.serializeUrl(t.extractedUrl), n);
                        e.next(r);
                        try {
                            t.resolve(this.errorHandler(n))
                        } catch (i) {
                            t.reject(i)
                        }
                    }
                    var s;
                    return Ll
                }));
                var s, i, o, a
            }))
        }

        resetRootComponentType(t) {
            this.rootComponentType = t, this.routerState.root.component = this.rootComponentType
        }

        getTransition() {
            const t = this.transitions.value;
            return t.urlAfterRedirects = this.browserUrlTree, t
        }

        setTransition(t) {
            this.transitions.next(Object.assign(Object.assign({}, this.getTransition()), t))
        }

        initialNavigation() {
            this.setUpLocationChangeListener(), 0 === this.navigationId && this.navigateByUrl(this.location.path(!0), {replaceUrl: !0})
        }

        setUpLocationChangeListener() {
            this.locationSubscription || (this.locationSubscription = this.location.subscribe(t => {
                const e = this.extractLocationChangeInfoFromEvent(t);
                this.shouldScheduleNavigation(this.lastLocationChangeInfo, e) && setTimeout(() => {
                    const {source: t, state: n, urlTree: r} = e, s = {replaceUrl: !0};
                    if (n) {
                        const t = Object.assign({}, n);
                        delete t.navigationId, 0 !== Object.keys(t).length && (s.state = t)
                    }
                    this.scheduleNavigation(r, t, n, s)
                }, 0), this.lastLocationChangeInfo = e
            }))
        }

        extractLocationChangeInfoFromEvent(t) {
            var e;
            return {
                source: "popstate" === t.type ? "popstate" : "hashchange",
                urlTree: this.parseUrl(t.url),
                state: (null === (e = t.state) || void 0 === e ? void 0 : e.navigationId) ? t.state : null,
                transitionId: this.getTransition().id
            }
        }

        shouldScheduleNavigation(t, e) {
            if (!t) return !0;
            const n = e.urlTree.toString() === t.urlTree.toString();
            return !(e.transitionId === t.transitionId && n && ("hashchange" === e.source && "popstate" === t.source || "popstate" === e.source && "hashchange" === t.source))
        }

        get url() {
            return this.serializeUrl(this.currentUrlTree)
        }

        getCurrentNavigation() {
            return this.currentNavigation
        }

        triggerEvent(t) {
            this.events.next(t)
        }

        resetConfig(t) {
            ih(t), this.config = t.map(lh), this.navigated = !1, this.lastSuccessfulId = -1
        }

        ngOnDestroy() {
            this.dispose()
        }

        dispose() {
            this.transitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0
        }

        createUrlTree(t, e = {}) {
            const {relativeTo: n, queryParams: r, fragment: s, queryParamsHandling: i, preserveFragment: o} = e,
                a = n || this.routerState.root, l = o ? this.currentUrlTree.fragment : s;
            let c = null;
            switch (i) {
                case"merge":
                    c = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), r);
                    break;
                case"preserve":
                    c = this.currentUrlTree.queryParams;
                    break;
                default:
                    c = r || null
            }
            return null !== c && (c = this.removeEmptyProps(c)), function (t, e, n, r, s) {
                if (0 === n.length) return $u(e.root, e.root, e, r, s);
                const i = function (t) {
                    if ("string" == typeof t[0] && 1 === t.length && "/" === t[0]) return new Vu(!0, 0, t);
                    let e = 0, n = !1;
                    const r = t.reduce((t, r, s) => {
                        if ("object" == typeof r && null != r) {
                            if (r.outlets) {
                                const e = {};
                                return Wc(r.outlets, (t, n) => {
                                    e[n] = "string" == typeof t ? t.split("/") : t
                                }), [...t, {outlets: e}]
                            }
                            if (r.segmentPath) return [...t, r.segmentPath]
                        }
                        return "string" != typeof r ? [...t, r] : 0 === s ? (r.split("/").forEach((r, s) => {
                            0 == s && "." === r || (0 == s && "" === r ? n = !0 : ".." === r ? e++ : "" != r && t.push(r))
                        }), t) : [...t, r]
                    }, []);
                    return new Vu(n, e, r)
                }(n);
                if (i.toRoot()) return $u(e.root, new ru([], {}), e, r, s);
                const o = function (t, e, n) {
                        if (t.isAbsolute) return new Bu(e.root, !0, 0);
                        if (-1 === n.snapshot._lastPathIndex) {
                            const t = n.snapshot._urlSegment;
                            return new Bu(t, t === e.root, 0)
                        }
                        const r = Uu(t.commands[0]) ? 0 : 1;
                        return function (t, e, n) {
                            let r = t, s = e, i = n;
                            for (; i > s;) {
                                if (i -= s, r = r.parent, !r) throw new Error("Invalid number of '../'");
                                s = r.segments.length
                            }
                            return new Bu(r, !1, s - i)
                        }(n.snapshot._urlSegment, n.snapshot._lastPathIndex + r, t.numberOfDoubleDots)
                    }(i, e, t),
                    a = o.processChildren ? Qu(o.segmentGroup, o.index, i.commands) : qu(o.segmentGroup, o.index, i.commands);
                return $u(o.segmentGroup, a, e, r, s)
            }(a, this.currentUrlTree, t, c, null != l ? l : null)
        }

        navigateByUrl(t, e = {skipLocationChange: !1}) {
            const n = eh(t) ? t : this.parseUrl(t), r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
            return this.scheduleNavigation(r, "imperative", null, e)
        }

        navigate(t, e = {skipLocationChange: !1}) {
            return function (t) {
                for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n) throw new Error(`The requested path contains ${n} segment at index ${e}`)
                }
            }(t), this.navigateByUrl(this.createUrlTree(t, e), e)
        }

        serializeUrl(t) {
            return this.urlSerializer.serialize(t)
        }

        parseUrl(t) {
            let e;
            try {
                e = this.urlSerializer.parse(t)
            } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t)
            }
            return e
        }

        isActive(t, e) {
            let n;
            if (n = !0 === e ? Object.assign({}, Gh) : !1 === e ? Object.assign({}, Zh) : e, eh(t)) return Jc(this.currentUrlTree, t, n);
            const r = this.parseUrl(t);
            return Jc(this.currentUrlTree, r, n)
        }

        removeEmptyProps(t) {
            return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e
            }, {})
        }

        processNavigations() {
            this.navigations.subscribe(t => {
                this.navigated = !0, this.lastSuccessfulId = t.id, this.events.next(new Ec(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree))), this.lastSuccessfulNavigation = this.currentNavigation, t.resolve(!0)
            }, t => {
                this.console.warn("Unhandled Navigation Error: ")
            })
        }

        scheduleNavigation(t, e, n, r, s) {
            if (this.disposed) return Promise.resolve(!1);
            const i = this.getTransition(), o = "imperative" !== e && "imperative" === (null == i ? void 0 : i.source),
                a = (this.lastSuccessfulId === i.id || this.currentNavigation ? i.rawUrl : i.urlAfterRedirects).toString() === t.toString();
            if (o && a) return Promise.resolve(!0);
            let l, c, u;
            s ? (l = s.resolve, c = s.reject, u = s.promise) : u = new Promise((t, e) => {
                l = t, c = e
            });
            const h = ++this.navigationId;
            return this.setTransition({
                id: h,
                source: e,
                restoredState: n,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: t,
                extras: r,
                resolve: l,
                reject: c,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState
            }), u.catch(t => Promise.reject(t))
        }

        setBrowserUrl(t, e, n, r) {
            const s = this.urlSerializer.serialize(t);
            r = r || {}, this.location.isCurrentPathEqualTo(s) || e ? this.location.replaceState(s, "", Object.assign(Object.assign({}, r), {navigationId: n})) : this.location.go(s, "", Object.assign(Object.assign({}, r), {navigationId: n}))
        }

        resetStateAndUrl(t, e, n) {
            this.routerState = t, this.currentUrlTree = e, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n), this.resetUrlToCurrentUrlTree()
        }

        resetUrlToCurrentUrlTree() {
            this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", {navigationId: this.lastSuccessfulId})
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(kn), Fn(ou), Fn(Bh), Fn(ka), Fn(Ds), Fn(ea), Fn(Po), Fn(void 0))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})(), Jh = (() => {
    class t {
        constructor(t, e, n, r, s) {
            this.parentContexts = t, this.location = e, this.resolver = n, this.changeDetector = s, this.activated = null, this._activatedRoute = null, this.activateEvents = new uo, this.deactivateEvents = new uo, this.name = r || Uc, t.onChildOutletCreated(this.name, this)
        }

        ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name)
        }

        ngOnInit() {
            if (!this.activated) {
                const t = this.parentContexts.getContext(this.name);
                t && t.route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.resolver || null))
            }
        }

        get isActivated() {
            return !!this.activated
        }

        get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance
        }

        get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute
        }

        get activatedRouteData() {
            return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
        }

        detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const t = this.activated;
            return this.activated = null, this._activatedRoute = null, t
        }

        attach(t, e) {
            this.activated = t, this._activatedRoute = e, this.location.insert(t.hostView)
        }

        deactivate() {
            if (this.activated) {
                const t = this.component;
                this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(t)
            }
        }

        activateWith(t, e) {
            if (this.isActivated) throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const n = (e = e || this.resolver).resolveComponentFactory(t._futureSnapshot.routeConfig.component),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                s = new Xh(t, r, this.location.injector);
            this.activated = this.location.createComponent(n, this.location.length, s), this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)($s(Bh), $s(Gi), $s(hi), ("name", function (t, e) {
            const n = t.attrs;
            if (n) {
                const t = n.length;
                let r = 0;
                for (; r < t;) {
                    const s = n[r];
                    if (Ze(s)) break;
                    if (0 === s) r += 2; else if ("number" == typeof s) for (r++; r < t && "string" == typeof n[r];) r++; else {
                        if (s === e) return n[r + 1];
                        r += 2
                    }
                }
            }
            return null
        }(Se(), "name")), $s(Li))
    }, t.\u0275dir = Bt({
        type: t,
        selectors: [["router-outlet"]],
        outputs: {activateEvents: "activate", deactivateEvents: "deactivate"},
        exportAs: ["outlet"]
    }), t
})();

class Xh {
    constructor(t, e, n) {
        this.route = t, this.childContexts = e, this.parent = n
    }

    get(t, e) {
        return t === Au ? this.route : t === Bh ? this.childContexts : this.parent.get(t, e)
    }
}

class td {
}

class ed {
    preload(t, e) {
        return Tl(null)
    }
}

let nd = (() => {
    class t {
        constructor(t, e, n, r, s) {
            this.router = t, this.injector = r, this.preloadingStrategy = s, this.loader = new zh(e, n, e => t.triggerEvent(new Rc(e)), e => t.triggerEvent(new Nc(e)))
        }

        setUpPreloading() {
            this.subscription = this.router.events.pipe(Jl(t => t instanceof Ec), sc(() => this.preload())).subscribe(() => {
            })
        }

        preload() {
            const t = this.injector.get(Qi);
            return this.processRoutes(t, this.router.config)
        }

        ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe()
        }

        processRoutes(t, e) {
            const n = [];
            for (const r of e) if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                const t = r._loadedConfig;
                n.push(this.processRoutes(t.module, t.routes))
            } else r.loadChildren && !r.canLoad ? n.push(this.preloadConfig(t, r)) : r.children && n.push(this.processRoutes(t, r.children));
            return M(n).pipe(V(), k(t => {
            }))
        }

        preloadConfig(t, e) {
            return this.preloadingStrategy.preload(e, () => (e._loadedConfig ? Tl(e._loadedConfig) : this.loader.load(t.injector, e)).pipe(H(t => (e._loadedConfig = t, this.processRoutes(t.module, t.routes)))))
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Yh), Fn(ea), Fn(Po), Fn(Ds), Fn(td))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})(), rd = (() => {
    class t {
        constructor(t, e, n = {}) {
            this.router = t, this.viewportScroller = e, this.options = n, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, n.scrollPositionRestoration = n.scrollPositionRestoration || "disabled", n.anchorScrolling = n.anchorScrolling || "disabled"
        }

        init() {
            "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
        }

        createScrollEvents() {
            return this.router.events.subscribe(t => {
                t instanceof Cc ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = t.navigationTrigger, this.restoredId = t.restoredState ? t.restoredState.navigationId : 0) : t instanceof Ec && (this.lastId = t.id, this.scheduleScrollEvent(t, this.router.parseUrl(t.urlAfterRedirects).fragment))
            })
        }

        consumeScrollEvents() {
            return this.router.events.subscribe(t => {
                t instanceof Lc && (t.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position) : t.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(t.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
            })
        }

        scheduleScrollEvent(t, e) {
            this.router.triggerEvent(new Lc(t, "popstate" === this.lastSource ? this.store[this.restoredId] : null, e))
        }

        ngOnDestroy() {
            this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(), this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Yh), Fn(Ma), Fn(void 0))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();
const sd = new En("ROUTER_CONFIGURATION"), id = new En("ROUTER_FORROOT_GUARD"), od = [ka, {provide: ou, useClass: au}, {
    provide: Yh, useFactory: function (t, e, n, r, s, i, o, a = {}, l, c) {
        const u = new Yh(null, t, e, n, r, s, i, Qc(o));
        return l && (u.urlHandlingStrategy = l), c && (u.routeReuseStrategy = c), function (t, e) {
            t.errorHandler && (e.errorHandler = t.errorHandler), t.malformedUriErrorHandler && (e.malformedUriErrorHandler = t.malformedUriErrorHandler), t.onSameUrlNavigation && (e.onSameUrlNavigation = t.onSameUrlNavigation), t.paramsInheritanceStrategy && (e.paramsInheritanceStrategy = t.paramsInheritanceStrategy), t.relativeLinkResolution && (e.relativeLinkResolution = t.relativeLinkResolution), t.urlUpdateStrategy && (e.urlUpdateStrategy = t.urlUpdateStrategy)
        }(a, u), a.enableTracing && u.events.subscribe(t => {
            var e, n;
            null === (e = console.group) || void 0 === e || e.call(console, `Router Event: ${t.constructor.name}`), console.log(t.toString()), console.log(t), null === (n = console.groupEnd) || void 0 === n || n.call(console)
        }), u
    }, deps: [ou, Bh, ka, Ds, ea, Po, $h, sd, [class {
    }, new $n], [class {
    }, new $n]]
}, Bh, {
    provide: Au, useFactory: function (t) {
        return t.routerState.root
    }, deps: [Yh]
}, {provide: ea, useClass: sa}, nd, ed, class {
    preload(t, e) {
        return e().pipe(ec(() => Tl(null)))
    }
}, {provide: sd, useValue: {enableTracing: !1}}];

function ad() {
    return new Wo("Router", Yh)
}

let ld = (() => {
    class t {
        constructor(t, e) {
        }

        static forRoot(e, n) {
            return {
                ngModule: t,
                providers: [od, dd(e), {provide: id, useFactory: hd, deps: [[Yh, new $n, new zn]]}, {
                    provide: sd,
                    useValue: n || {}
                }, {provide: wa, useFactory: ud, deps: [da, [new Hn(Ca), new $n], sd]}, {
                    provide: rd,
                    useFactory: cd,
                    deps: [Yh, Ma, sd]
                }, {provide: td, useExisting: n && n.preloadingStrategy ? n.preloadingStrategy : ed}, {
                    provide: Wo,
                    multi: !0,
                    useFactory: ad
                }, [pd, {provide: ho, multi: !0, useFactory: fd, deps: [pd]}, {
                    provide: gd,
                    useFactory: md,
                    deps: [pd]
                }, {provide: vo, multi: !0, useExisting: gd}]]
            }
        }

        static forChild(e) {
            return {ngModule: t, providers: [dd(e)]}
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(id, 8), Fn(Yh, 8))
    }, t.\u0275mod = zt({type: t}), t.\u0275inj = lt({}), t
})();

function cd(t, e, n) {
    return n.scrollOffset && e.setOffset(n.scrollOffset), new rd(t, e, n)
}

function ud(t, e, n = {}) {
    return n.useHash ? new xa(t, e) : new Ea(t, e)
}

function hd(t) {
    return "guarded"
}

function dd(t) {
    return [{provide: xn, multi: !0, useValue: t}, {provide: $h, multi: !0, useValue: t}]
}

let pd = (() => {
    class t {
        constructor(t) {
            this.injector = t, this.initNavigation = !1, this.resultOfPreactivationDone = new C
        }

        appInitializer() {
            return this.injector.get(fa, Promise.resolve(null)).then(() => {
                let t = null;
                const e = new Promise(e => t = e), n = this.injector.get(Yh), r = this.injector.get(sd);
                return "disabled" === r.initialNavigation ? (n.setUpLocationChangeListener(), t(!0)) : "enabled" === r.initialNavigation || "enabledBlocking" === r.initialNavigation ? (n.hooks.afterPreactivation = () => this.initNavigation ? Tl(null) : (this.initNavigation = !0, t(!0), this.resultOfPreactivationDone), n.initialNavigation()) : t(!0), e
            })
        }

        bootstrapListener(t) {
            const e = this.injector.get(sd), n = this.injector.get(nd), r = this.injector.get(rd),
                s = this.injector.get(Yh), i = this.injector.get(Xo);
            t === i.components[0] && ("enabledNonBlocking" !== e.initialNavigation && void 0 !== e.initialNavigation || s.initialNavigation(), n.setUpPreloading(), r.init(), s.resetRootComponentType(i.componentTypes[0]), this.resultOfPreactivationDone.next(null), this.resultOfPreactivationDone.complete())
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Ds))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

function fd(t) {
    return t.appInitializer.bind(t)
}

function md(t) {
    return t.bootstrapListener.bind(t)
}

const gd = new En("Router Initializer");

function yd(t) {
    return Array.isArray(t) ? t : [t]
}

class _d {
    constructor(t) {
        this.total = t
    }

    call(t, e) {
        return e.subscribe(new vd(t, this.total))
    }
}

class vd extends f {
    constructor(t, e) {
        super(t), this.total = e, this.count = 0
    }

    _next(t) {
        ++this.count > this.total && this.destination.next(t)
    }
}

class bd extends h {
    constructor(t, e) {
        super()
    }

    schedule(t, e = 0) {
        return this
    }
}

class wd extends bd {
    constructor(t, e) {
        super(t, e), this.scheduler = t, this.work = e, this.pending = !1
    }

    schedule(t, e = 0) {
        if (this.closed) return this;
        this.state = t;
        const n = this.id, r = this.scheduler;
        return null != n && (this.id = this.recycleAsyncId(r, n, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(r, this.id, e), this
    }

    requestAsyncId(t, e, n = 0) {
        return setInterval(t.flush.bind(t, this), n)
    }

    recycleAsyncId(t, e, n = 0) {
        if (null !== n && this.delay === n && !1 === this.pending) return e;
        clearInterval(e)
    }

    execute(t, e) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        const n = this._execute(t, e);
        if (n) return n;
        !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
    }

    _execute(t, e) {
        let n, r = !1;
        try {
            this.work(t)
        } catch (s) {
            r = !0, n = !!s && s || new Error(s)
        }
        if (r) return this.unsubscribe(), n
    }

    _unsubscribe() {
        const t = this.id, e = this.scheduler, n = e.actions, r = n.indexOf(this);
        this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== r && n.splice(r, 1), null != t && (this.id = this.recycleAsyncId(e, t, null)), this.delay = null
    }
}

let Sd = (() => {
    class t {
        constructor(e, n = t.now) {
            this.SchedulerAction = e, this.now = n
        }

        schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e)
        }
    }

    return t.now = () => Date.now(), t
})();

class Cd extends Sd {
    constructor(t, e = Sd.now) {
        super(t, () => Cd.delegate && Cd.delegate !== this ? Cd.delegate.now() : e()), this.actions = [], this.active = !1, this.scheduled = void 0
    }

    schedule(t, e = 0, n) {
        return Cd.delegate && Cd.delegate !== this ? Cd.delegate.schedule(t, e, n) : super.schedule(t, e, n)
    }

    flush(t) {
        const {actions: e} = this;
        if (this.active) return void e.push(t);
        let n;
        this.active = !0;
        do {
            if (n = t.execute(t.state, t.delay)) break
        } while (t = e.shift());
        if (this.active = !1, n) {
            for (; t = e.shift();) t.unsubscribe();
            throw n
        }
    }
}

const Ed = new Cd(wd);

class xd {
    constructor(t, e) {
        this.dueTime = t, this.scheduler = e
    }

    call(t, e) {
        return e.subscribe(new kd(t, this.dueTime, this.scheduler))
    }
}

class kd extends f {
    constructor(t, e, n) {
        super(t), this.dueTime = e, this.scheduler = n, this.debouncedSubscription = null, this.lastValue = null, this.hasValue = !1
    }

    _next(t) {
        this.clearDebounce(), this.lastValue = t, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(Td, this.dueTime, this))
    }

    _complete() {
        this.debouncedNext(), this.destination.complete()
    }

    debouncedNext() {
        if (this.clearDebounce(), this.hasValue) {
            const {lastValue: t} = this;
            this.lastValue = null, this.hasValue = !1, this.destination.next(t)
        }
    }

    clearDebounce() {
        const t = this.debouncedSubscription;
        null !== t && (this.remove(t), t.unsubscribe(), this.debouncedSubscription = null)
    }
}

function Td(t) {
    t.debouncedNext()
}

class Od {
    constructor(t) {
        this.notifier = t
    }

    call(t, e) {
        const n = new Ad(t), r = U(this.notifier, new F(n));
        return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n
    }
}

class Ad extends L {
    constructor(t) {
        super(t), this.seenValue = !1
    }

    notifyNext() {
        this.seenValue = !0, this.complete()
    }

    notifyComplete() {
    }
}

let Pd;
try {
    Pd = "undefined" != typeof Intl && Intl.v8BreakIterator
} catch (Dm) {
    Pd = !1
}
let Id = (() => {
    class t {
        constructor(t) {
            this._platformId = t, this.isBrowser = this._platformId ? "browser" === this._platformId : "object" == typeof document && !!document, this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), this.BLINK = this.isBrowser && !(!window.chrome && !Pd) && "undefined" != typeof CSS && !this.EDGE && !this.TRIDENT, this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window), this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(_o))
    }, t.\u0275prov = at({
        factory: function () {
            return new t(Fn(_o))
        }, token: t, providedIn: "root"
    }), t
})();
const Rd = new Set;
let Nd, Dd = (() => {
    class t {
        constructor(t) {
            this._platform = t, this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : jd
        }

        matchMedia(t) {
            return this._platform.WEBKIT && function (t) {
                if (!Rd.has(t)) try {
                    Nd || (Nd = document.createElement("style"), Nd.setAttribute("type", "text/css"), document.head.appendChild(Nd)), Nd.sheet && (Nd.sheet.insertRule(`@media ${t} {.fx-query-test{ }}`, 0), Rd.add(t))
                } catch (e) {
                    console.error(e)
                }
            }(t), this._matchMedia(t)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Id))
    }, t.\u0275prov = at({
        factory: function () {
            return new t(Fn(Id))
        }, token: t, providedIn: "root"
    }), t
})();

function jd(t) {
    return {
        matches: "all" === t || "" === t, media: t, addListener: () => {
        }, removeListener: () => {
        }
    }
}

let Md = (() => {
    class t {
        constructor(t, e) {
            this._mediaMatcher = t, this._zone = e, this._queries = new Map, this._destroySubject = new C
        }

        ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete()
        }

        isMatched(t) {
            return Fd(yd(t)).some(t => this._registerQuery(t).mql.matches)
        }

        observe(t) {
            let e = Nl(Fd(yd(t)).map(t => this._registerQuery(t).observable));
            return e = Fl(e.pipe(ql(1)), e.pipe(t => t.lift(new _d(1)), function (t, e = Ed) {
                return n => n.lift(new xd(t, e))
            }(0))), e.pipe(k(t => {
                const e = {matches: !1, breakpoints: {}};
                return t.forEach(({matches: t, query: n}) => {
                    e.matches = e.matches || t, e.breakpoints[n] = t
                }), e
            }))
        }

        _registerQuery(t) {
            if (this._queries.has(t)) return this._queries.get(t);
            const e = this._mediaMatcher.matchMedia(t);
            var n;
            const r = {
                observable: new _(t => {
                    const n = e => this._zone.run(() => t.next(e));
                    return e.addListener(n), () => {
                        e.removeListener(n)
                    }
                }).pipe(Wl(e), k(({matches: e}) => ({
                    query: t,
                    matches: e
                })), (n = this._destroySubject, t => t.lift(new Od(n)))), mql: e
            };
            return this._queries.set(t, r), r
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(Dd), Fn(No))
    }, t.\u0275prov = at({
        factory: function () {
            return new t(Fn(Dd), Fn(No))
        }, token: t, providedIn: "root"
    }), t
})();

function Fd(t) {
    return t.map(t => t.split(",")).reduce((t, e) => t.concat(e)).map(t => t.trim())
}

function Ld(t, e) {
    if (1 & t) {
        const t = Ks();
        Bs(0, "div", 3), Bs(1, "h1", 4), ti(2, " K\xf6sz\xf6nj\xfck, hogy id\u0151t sz\xe1nt\xe1l r\xe1nk :) "), qs(), Qs(3, "img", 5), Bs(4, "button", 6), Zs("click", function () {
            return we(t), Xs().backToTheLanding()
        }), ti(5, " Vissza a programokhoz"), qs(), qs()
    }
    2 & t && zs("@fadeInOut", void 0)
}

function Ud(t, e) {
    1 & t && (Bs(0, "form", 7), Bs(1, "fieldset"), Bs(2, "h2"), ti(3, "Sz\xe1m\xedtunk r\xe1tok!"), Qs(4, "br"), Bs(5, "small"), ti(6, "K\xe9rj\xfck, hogy jelezzetek vissza nek\xfcnk az al\xe1bbi form seg\xedts\xe9g\xe9vel"), qs(), qs(), qs(), Bs(7, "fieldset"), Bs(8, "label", 8), ti(9, "\xcdrd le a neved \xe9s a veled egy\xfctt \xe9rkez\u0151k nev\xe9t is"), Bs(10, "sup"), ti(11, "*"), qs(), qs(), Bs(12, "div", 9), Qs(13, "input", 10), qs(), qs(), Bs(14, "fieldset"), Bs(15, "label", 8), ti(16, "Honnan \xe9rkezel az esk\xfcv\u0151re?"), Bs(17, "sup"), ti(18, "*"), qs(), qs(), Bs(19, "div", 9), Qs(20, "input", 11), qs(), qs(), Bs(21, "fieldset"), Bs(22, "label", 8), ti(23, "Mivel \xe9rkezel / \xe9rkeztek?"), qs(), Bs(24, "div", 9), Bs(25, "div", 12), Bs(26, "label", 13), Qs(27, "input", 14), ti(28, " Aut\xf3val "), Qs(29, "span", 15), qs(), qs(), Bs(30, "div", 12), Bs(31, "label", 13), Qs(32, "input", 16), ti(33, " Nincs aut\xf3m, keresek valakit akin\xe9l van szabad hely "), Qs(34, "span", 15), qs(), qs(), Bs(35, "div", 12), Bs(36, "label", 13), Qs(37, "input", 17), ti(38, " Nincs aut\xf3m, l\xe9gyszi keressetek nekem valakit, akin\xe9l van szabad hely "), Qs(39, "span", 15), qs(), qs(), Bs(40, "div", 12), Bs(41, "label", 13), Qs(42, "input", 18), ti(43, " Budapestt\u0151l laza 300 km, sim\xe1n legyaloglom/futom/bikciklizem "), Qs(44, "span", 15), qs(), qs(), Bs(45, "div", 12), Bs(46, "label", 13), Qs(47, "input", 19), ti(48, " Felfedezem a t\xf6megk\xf6zleked\xe9s csod\xe1it "), Qs(49, "span", 15), qs(), qs(), qs(), qs(), Bs(50, "fieldset"), Bs(51, "label", 8), ti(52, "Amennyiben aut\xf3val \xe9rkezel: Van az aut\xf3dban szabad hely?"), qs(), Bs(53, "div", 9), Bs(54, "div", 12), Bs(55, "label", 13), Qs(56, "input", 20), ti(57, " Igen "), Qs(58, "span", 15), qs(), qs(), Bs(59, "div", 12), Bs(60, "label", 13), Qs(61, "input", 21), ti(62, " Nem "), Qs(63, "span", 15), qs(), qs(), qs(), qs(), Bs(64, "fieldset"), Bs(65, "label", 8), ti(66, "Amennyiben van speci\xe1lis \xe9telig\xe9nyed, k\xe9rlek itt \xedrd le:"), qs(), Bs(67, "div", 9), Qs(68, "input", 22),qs(),qs(),Bs(69, "fieldset"),Bs(70, "label", 8),ti(71, "A h\xe1zi p\xe1linka behozatala ingyenes. Hozz\xe1j\xe1ruln\xe1l egy-k\xe9t \xfcveg p\xe1link\xe1val az esk\xfcv\u0151nkh\xf6z? "),qs(),Bs(72, "div", 9),Bs(73, "div", 12),Bs(74, "label", 13),Qs(75, "input", 23),ti(76, " Nan\xe1 "),Qs(77, "span", 15),qs(),qs(),Bs(78, "div", 12),Bs(79, "label", 13),Qs(80, "input", 24),ti(81, " Sajnos nem tudok "),Qs(82, "span", 15),qs(),qs(),qs(),qs(),Bs(83, "fieldset"),Bs(84, "label", 8),ti(85, "V\xe1lassz egy sz\xe1mot, amit mindenk\xe9pp meghallgatn\xe1l az esk\xfcv\u0151nk\xf6n:"),qs(),Bs(86, "div", 9),Qs(87, "input", 25),qs(),qs(),Bs(88, "fieldset"),Bs(89, "label", 8),ti(90, "Pap\xedr alap\xfa megh\xedv\xf3kat k\xf6rnyezettudatos szempontok miatt minim\xe1lis darabsz\xe1mban rendel\xfcnk, \xedgy nem osztunk ki mindenkinek. Ha szeretn\xe9l eml\xe9kbe egy megh\xedv\xf3t eltenni, azt itt tudod jelezni sz\xe1munkra:"),qs(),Bs(91, "div", 9),Bs(92, "div", 12),Bs(93, "label", 13),Qs(94, "input", 26),ti(95, " Igen "),Qs(96, "span", 15),qs(),qs(),Bs(97, "div", 12),Bs(98, "label", 13),Qs(99, "input", 27),ti(100, " Nem "),Qs(101, "span", 15),qs(),qs(),qs(),qs(),Bs(102, "fieldset"),Bs(103, "label", 8),ti(104, "Szabolcsiaknak plusz egy k\xe9rd\xe9s: Ig\xe9nyelsz sz\xe1ll\xe1st az esk\xfcv\u0151 helysz\xedn\xe9n? (K\xe9rj\xfcnk itt vedd figyelembe, hogy a sz\xe1ll\xe1s kapacit\xe1sa a l\xe9tsz\xe1mhoz k\xe9pest kevesebb, \xedgy megk\xf6sz\xf6nn\xe9nk, ha rendelkezn\xe9l alternat\xedv megold\xe1ssal \xe9s meg tudn\xe1d oldani a hazautat)"),qs(),Bs(105, "div", 9),Bs(106, "div", 12),Bs(107, "label", 13),Qs(108, "input", 28),ti(109, " Igen "),Qs(110, "span", 15),qs(),qs(),Bs(111, "div", 12),Bs(112, "label", 13),Qs(113, "input", 29),ti(114, " Nem "),Qs(115, "span", 15),qs(),qs(),qs(),qs(),Qs(116, "input", 30),Qs(117, "input", 31),Qs(118, "input", 32),Qs(119, "input", 33),qs()), 2 & t && (Dr(8), zs("for", 378441827), Dr(7), zs("for", 1927969389), Dr(7), zs("for", 951309296), Dr(29), zs("for", 774502284), Dr(14), zs("for", 704372609), Dr(5), zs("for", 587243965), Dr(14), zs("for", 183658251), Dr(5), zs("for", 1787430190), Dr(14), zs("for", 2073618451))
}

let Hd = (() => {
    class t {
        constructor(t) {
            this.router = t
        }

        backToTheLanding() {
            this.router.navigate(["/"])
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)($s(Yh))
    }, t.\u0275cmp = Lt({
        type: t,
        selectors: [["app-google-form"]],
        decls: 3,
        vars: 2,
        consts: [["name", "hidden_iframe", "id", "hidden_iframe", "onload", "{if (typeof submitted !== 'undefined'){if(submitted) {window.location='#thankyou';}}}", 2, "display", "none"], ["class", "thank-you", "id", "thankyou", 4, "ngIf"], ["action", "https://docs.google.com/forms/d/e/1FAIpQLScldxetYddRw7QNxY04qN88hzNpTFO0aFAhCGDt2f5G2RJYSQ/formResponse", "target", "hidden_iframe", "onsubmit", "submitted=true;", "id", "bootstrapForm", "method", "POST", 4, "ngIf"], ["id", "thankyou", 1, "thank-you"], [1, "thank-you__title"], ["src", "assets/images/thanks.svg", "alt", "Koszi", 1, "thank-you__img"], [1, "thank-you__button", 3, "click"], ["action", "https://docs.google.com/forms/d/e/1FAIpQLScldxetYddRw7QNxY04qN88hzNpTFO0aFAhCGDt2f5G2RJYSQ/formResponse", "target", "hidden_iframe", "onsubmit", "submitted=true;", "id", "bootstrapForm", "method", "POST"], [1, "header-label", 3, "for"], [1, "form-group"], ["id", "1930976824", "type", "text", "name", "entry.1930976824", "required", "", 1, "form-control"], ["id", "390300488", "type", "text", "name", "entry.390300488", "required", "", 1, "form-control"], [1, "radio"], [1, "container"], ["type", "radio", "name", "entry.1523517196", "value", "Aut\xf3val"], [1, "checkmark"], ["type", "radio", "name", "entry.1523517196", "value", "Nincs aut\xf3m, keresek valakit akin\xe9l van szabad hely"], ["type", "radio", "name", "entry.1523517196", "value", "Nincs aut\xf3m, l\xe9gyszi keressetek nekem valakit, akin\xe9l van szabad hely"], ["type", "radio", "name", "entry.1523517196", "value", "Budapestt\u0151l laza 300 km, sim\xe1n legyaloglom/futom/bikciklizem"], ["type", "radio", "name", "entry.1523517196", "value", "Felfedezem a t\xf6megk\xf6zleked\xe9s csod\xe1it"], ["type", "radio", "name", "entry.1569097364", "value", "igen"], ["type", "radio", "name", "entry.1569097364", "value", "nem"], ["id", "2078567203", "type", "text", "name", "entry.2078567203", 1, "form-control"], ["type", "radio", "name", "entry.1051315124", "value", "Nan\xe1"], ["type", "radio", "name", "entry.1051315124", "value", "Sajnos nem tudok"], ["id", "974939417", "type", "text", "name", "entry.974939417", 1, "form-control"], ["type", "radio", "name", "entry.838352833", "value", "igen"], ["type", "radio", "name", "entry.838352833", "value", "nem"], ["type", "radio", "name", "entry.1526719921", "value", "Igen"], ["type", "radio", "name", "entry.1526719921", "value", "Nem"], ["type", "hidden", "name", "fvv", "value", "1"], ["type", "hidden", "name", "fbzx", "value", "-1110460967025701524"], ["type", "hidden", "name", "pageHistory", "value", "0"], ["type", "submit", "value", "K\xfcld\xe9s", 1, "btn", "btn-primary"]],
        template: function (t, e) {
            1 & t && (Qs(0, "iframe", 0), Hs(1, Ld, 6, 1, "div", 1), Hs(2, Ud, 120, 9, "form", 2)), 2 & t && (Dr(1), zs("ngIf", e.router.url.includes("thankyou")), Dr(1), zs("ngIf", !e.router.url.includes("thankyou")))
        },
        directives: [Ra],
        styles: ['[_nghost-%COMP%]{display:flex;justify-content:center}form[_ngcontent-%COMP%]{color:#fff;max-width:900px;width:100%}fieldset[_ngcontent-%COMP%], input[_ngcontent-%COMP%]{border:none}input[_ngcontent-%COMP%]{width:100%;padding:10px 0;margin:.5rem 0;box-shadow:2px 4px 6px #000;color:#000}.checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .radio[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:auto}.btn.btn-primary[_ngcontent-%COMP%]{border-radius:6px;border:none;margin-bottom:1rem;color:#000;background-color:#fff}.container[_ngcontent-%COMP%]{display:block;position:relative;padding-left:2rem;cursor:pointer;-webkit-user-select:none;user-select:none}.container[_ngcontent-%COMP%]:hover{font-weight:700}.container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;opacity:0;cursor:pointer}.checkmark[_ngcontent-%COMP%]{position:absolute;top:25%;left:0;height:17px;width:17px;border-radius:50%}.checkmark[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked ~ .checkmark[_ngcontent-%COMP%]{background-color:#fff}.checkmark[_ngcontent-%COMP%]:after{content:"";position:absolute;display:none}.container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked ~ .checkmark[_ngcontent-%COMP%]:after{display:block}.container[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]:after{top:4px;left:4px;width:9px;height:9px;border-radius:50%;background:#472f26}.header-label[_ngcontent-%COMP%]{background-color:#fff;color:#000;font-weight:700;padding:0 .2rem;box-shadow:2px 4px 6px #000;display:inline-block}.thank-you[_ngcontent-%COMP%]{flex-direction:column;display:flex;padding:1rem}.thank-you__title[_ngcontent-%COMP%]{font-size:3rem;text-align:center}.thank-you__img[_ngcontent-%COMP%]{max-width:700px;width:100%;align-self:center;border-radius:12px;margin:1rem 0}.thank-you__button[_ngcontent-%COMP%]{max-width:300px;align-self:center;padding:1rem}'],
        data: {animation: [xl]}
    }), t
})(), $d = (() => {
    class t {
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275cmp = Lt({
        type: t,
        selectors: [["app-timeline"]],
        decls: 39,
        vars: 0,
        consts: [[1, "timeline"], [1, "container", "left"], [1, "content"], [1, "container", "right"]],
        template: function (t, e) {
            1 & t && (Bs(0, "h2"), ti(1, " Menetrend"), qs(), Bs(2, "div", 0), Bs(3, "div", 1), Bs(4, "div", 2), Bs(5, "p"), ti(6, "14:00 Vend\xe9gv\xe1r\xe1s \xe9s szob\xe1k elfoglal\xe1sa"), qs(), qs(), qs(), Bs(7, "div", 3), Bs(8, "div", 2), Bs(9, "p"), ti(10, "16:00 Polg\xe1ri szertart\xe1s"), qs(), qs(), qs(), Bs(11, "div", 1), Bs(12, "div", 2), Bs(13, "p"), ti(14, "16:30 Gratul\xe1ci\xf3, csoportk\xe9pek"), qs(), qs(), qs(), Bs(15, "div", 3), Bs(16, "div", 2), Bs(17, "p"), ti(18, "17:30 Mi elmegy\xfcnk fot\xf3zkodni, addig is igyatok"), qs(), qs(), qs(), Bs(19, "div", 1), Bs(20, "div", 2), Bs(21, "p"), ti(22, "19:00 Vacsora"), qs(), qs(), qs(), Bs(23, "div", 3), Bs(24, "div", 2), Bs(25, "p"), ti(26, "21:30 Nyit\xf3t\xe1nc"), qs(), qs(), qs(), Bs(27, "div", 1), Bs(28, "div", 2), Bs(29, "p"), ti(30, "22:30 Pitev\xe1g\xe1s"), qs(), qs(), qs(), Bs(31, "div", 3), Bs(32, "div", 2), Bs(33, "p"), ti(34, '23:30 "J\xf6n a buli, buli szombat este"'), qs(), qs(), qs(), Bs(35, "div", 1), Bs(36, "div", 2), Bs(37, "p"), ti(38, "00:00 T\xf6lt\xf6tt k\xe1poszta"), qs(), qs(), qs(), qs())
        },
        styles: ['*[_ngcontent-%COMP%]{box-sizing:border-box}.timeline[_ngcontent-%COMP%]{position:relative}.timeline[_ngcontent-%COMP%]:after{content:"";position:absolute;width:3px;background-color:#f3d8b3;top:0;bottom:0;left:50%;margin-left:-3px}.container[_ngcontent-%COMP%]{padding:10px 40px;position:relative;background-color:inherit;width:50%}.container[_ngcontent-%COMP%]:after{content:"";position:absolute;width:25px;height:25px;right:-14px;background-color:#f3d8b3;border:3px solid #f3d8b3;top:15px;border-radius:50%;z-index:1}.left[_ngcontent-%COMP%]{left:0}.right[_ngcontent-%COMP%]{left:50%}.left[_ngcontent-%COMP%]:before{right:30px;border:solid #0000;border-left:solid #f3d8b3;border-width:10px 0 10px 10px}.left[_ngcontent-%COMP%]:before, .right[_ngcontent-%COMP%]:before{content:" ";height:0;position:absolute;top:22px;width:0;z-index:1}.right[_ngcontent-%COMP%]:before{left:30px;border:solid #0000;border-right:solid #f3d8b3;border-width:10px 10px 10px 0}.right[_ngcontent-%COMP%]:after{left:-16px}.content[_ngcontent-%COMP%]{padding:.5rem;position:relative;border-radius:6px;background-color:#f3d8b3}.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#000}@media screen and (max-width:600px){.timeline[_ngcontent-%COMP%]:after{left:31px}.container[_ngcontent-%COMP%]{width:100%;padding-left:70px;padding-right:25px}.left[_ngcontent-%COMP%]:after, .right[_ngcontent-%COMP%]:after{left:15px}.right[_ngcontent-%COMP%]{left:0}}']
    }), t
})();

function zd(t, e) {
    if (1 & t) {
        const t = Ks();
        Bs(0, "div", 14), Bs(1, "button", 15), Zs("click", function () {
            return we(t), Xs(3).scrollTo("location")
        }), ti(2, "Helysz\xedn"), qs(), Bs(3, "button", 15), Zs("click", function () {
            return we(t), Xs(3).scrollTo("timeline")
        }), ti(4, "Menetrend?"), qs(), Bs(5, "button", 15), Zs("click", function () {
            return we(t), Xs(3).scrollTo("form")
        }), ti(6, "Sz\xe1m\xedtunk r\xe1tok"), qs(), Bs(7, "button", 15), Zs("click", function () {
            return we(t), Xs(3).scrollTo("connections")
        }), ti(8, "El\xe9rhet\u0151s\xe9geink"), qs(), Bs(9, "a", 16), ti(10, "FB esem\xe9ny"), qs(), qs()
    }
}

function Vd(t, e) {
    if (1 & t) {
        const t = Ks();
        Bs(0, "header", 10), Bs(1, "button", 11), Zs("click", function () {
            return we(t), Xs(2).toggleHamburger()
        }), Qs(2, "i", 12), qs(), Hs(3, zd, 11, 0, "div", 13), qs()
    }
    if (2 & t) {
        const t = Xs(2);
        Dr(3), zs("ngIf", t.isHamburgerOpen)
    }
}

function Bd(t, e) {
    if (1 & t) {
        const t = Ks();
        Bs(0, "header", 10), Bs(1, "button", 15), Zs("click", function () {
            return we(t), Xs(2).scrollTo("location")
        }), ti(2, "Helysz\xedn"), qs(), Bs(3, "button", 15), Zs("click", function () {
            return we(t), Xs(2).scrollTo("timeline")
        }), ti(4, "Menetrend?"), qs(), Bs(5, "button", 15), Zs("click", function () {
            return we(t), Xs(2).scrollTo("form")
        }), ti(6, "Sz\xe1m\xedtunk r\xe1tok"), qs(), Bs(7, "button", 15), Zs("click", function () {
            return we(t), Xs(2).scrollTo("connections")
        }), ti(8, "El\xe9rhet\u0151s\xe9geink"), qs(), Bs(9, "a", 17), ti(10, "FB esem\xe9ny"), qs(), qs()
    }
}

function qd(t, e) {
    if (1 & t && (Bs(0, "section", 7), Bs(1, "h1"), ti(2, " Meli & Laci"), qs(), Bs(3, "p"), ti(4, " 2021.09.18 szombat "), qs(), Hs(5, Vd, 4, 1, "header", 8), Hs(6, Bd, 11, 0, "header", 8), Qs(7, "img", 9), qs()), 2 & t) {
        const t = Xs();
        Dr(5), zs("ngIf", t.isMobile), Dr(1), zs("ngIf", !t.isMobile)
    }
}

function Qd(t, e) {
    1 & t && Qs(0, "hr")
}

function Kd(t, e) {
    1 & t && (Bs(0, "section", 18), Bs(1, "h2"), ti(2, " Helysz\xedn "), qs(), Bs(3, "div", 19), Qs(4, "img", 20), Qs(5, "iframe", 21), qs(), qs())
}

function Wd(t, e) {
    1 & t && (Bs(0, "section", 22), Qs(1, "app-timeline"), qs())
}

function Gd(t, e) {
    1 & t && Qs(0, "hr")
}

function Zd(t, e) {
    1 & t && Qs(0, "hr")
}

function Yd(t, e) {
    1 & t && (Bs(0, "section", 23), Bs(1, "h2"), ti(2, "El\xe9rhet\u0151s\xe9geink"), qs(), Bs(3, "span"), ti(4, "B\xe1rmi k\xe9rd\xe9setek van keressetek b\xe1tran benn\xfcnket az al\xe1bbi el\xe9rhet\u0151s\xe9geken"), qs(), Bs(5, "div", 24), Bs(6, "div", 25), Qs(7, "img", 26), Bs(8, "span", 27), ti(9, " Meli "), qs(), Bs(10, "a", 28), ti(11, " Telefonsz\xe1m: +36 30 901 62 52 "), qs(), Bs(12, "a", 29), ti(13, " E-mail c\xedm: melinda.halasz90@gmail.com"), qs(), qs(), Bs(14, "div", 25), Qs(15, "img", 30), Bs(16, "span", 27), ti(17, " Laci "), qs(), Bs(18, "span"), ti(19, " Keresd Melit "), qs(), qs(), qs(), qs())
}

let Jd = (() => {
    class t {
        constructor(t, e) {
            this.router = t, this.breakpointObserver = e, this.isMobile = !0, this.isHamburgerOpen = !1, this.layoutChanges = e.observe(["(max-width: 860px)"])
        }

        ngOnInit() {
            this.layoutChanges.subscribe(t => {
                this.isMobile = t.matches
            })
        }

        scrollTo(t) {
            window.scrollTo({top: document.getElementById(t).offsetTop, behavior: "smooth"})
        }

        toggleHamburger() {
            this.isHamburgerOpen = !this.isHamburgerOpen
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)($s(Yh), $s(Md))
    }, t.\u0275cmp = Lt({
        type: t,
        selectors: [["app-landing"]],
        decls: 11,
        vars: 8,
        consts: [[1, "wedding"], ["class", "hero", 4, "ngIf"], [4, "ngIf"], ["class", "location", "id", "location", 4, "ngIf"], ["class", "timeline", "id", "timeline", 4, "ngIf"], ["id", "form", 1, "form"], ["class", "connections", "id", "connections", 4, "ngIf"], [1, "hero"], ["class", "hero__header", 4, "ngIf"], ["src", "assets/images/mi.svg", "alt", "mi", 1, "main-image"], [1, "hero__header"], [1, "hero__hamburger", 3, "click"], [1, "fa", "fa-bars"], ["class", "hero__hamburger-menu", 4, "ngIf"], [1, "hero__hamburger-menu"], [1, "hero__scroll", 3, "click"], ["target", "_blank", "href", "https://www.facebook.com/events/495807278277466", 1, "hero__scroll"], ["target", "_blank", "href", "https://www.facebook.com/events/495807278277466", 1, "hero__scroll", "link"], ["id", "location", 1, "location"], [1, "location__container"], ["src", "assets/images/helyszin.svg", "alt", "helyszin"], ["title", "Napkor", "frameborder", "0", "src", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.05662169314!2d21.85634129851981!3d47.915941863387026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47389d08abcb9d51%3A0x77cb6d2810d66551!2sKerekerd%C5%91%20Turisztikai%20K%C3%B6zpont!5e0!3m2!1shu!2shu!4v1624742713000!5m2!1shu!2shu", "width", "600", "height", "450", "allowfullscreen", "", "loading", "lazy", 2, "border", "0"], ["id", "timeline", 1, "timeline"], ["id", "connections", 1, "connections"], [1, "connections__cards"], [1, "connections__card-header"], ["src", "assets/images/meli.svg", "alt", "Meli"], [1, "name"], ["href", "tel:+36 30 901 62 52"], ["href", "mailto: melinda.halasz90@gmail.com"], ["src", "assets/images/laci.svg", "alt", "Laci"]],
        template: function (t, e) {
            1 & t && (Bs(0, "section", 0), Hs(1, qd, 8, 2, "section", 1), Hs(2, Qd, 1, 0, "hr", 2), Hs(3, Kd, 6, 0, "section", 3), Qs(4, "hr"), Hs(5, Wd, 2, 0, "section", 4), Hs(6, Gd, 1, 0, "hr", 2), Bs(7, "section", 5), Qs(8, "app-google-form"), qs(), Hs(9, Zd, 1, 0, "hr", 2), Hs(10, Yd, 20, 0, "section", 6), qs()), 2 & t && (zs("@fadeInOut", void 0), Dr(1), zs("ngIf", !e.router.url.includes("thankyou")), Dr(1), zs("ngIf", !e.router.url.includes("thankyou")), Dr(1), zs("ngIf", !e.router.url.includes("thankyou")), Dr(2), zs("ngIf", !e.router.url.includes("thankyou")), Dr(1), zs("ngIf", !e.router.url.includes("thankyou")), Dr(3), zs("ngIf", !e.router.url.includes("thankyou")), Dr(1), zs("ngIf", !e.router.url.includes("thankyou")))
        },
        directives: [Ra, Hd, $d],
        styles: [".wedding[_ngcontent-%COMP%]{width:100%;max-width:1200px;margin:0 auto}.hero[_ngcontent-%COMP%]{padding:0 1rem;display:flex;flex-direction:column;align-items:center}.hero[_ngcontent-%COMP%]   .main-image[_ngcontent-%COMP%]{width:100%;max-width:800px;border-radius:12px;margin-top:.2rem}.hero__button-container[_ngcontent-%COMP%]{margin:12px}.hero__scroll[_ngcontent-%COMP%]{color:#fff;background:#0000;font-size:1.5rem;border:none;border-right:1px solid #fff;text-decoration:none}.hero__scroll[_ngcontent-%COMP%]:last-child{border-right:none}.hero__scroll[_ngcontent-%COMP%]:hover{font-weight:700;text-decoration:underline}.hero__scroll.link[_ngcontent-%COMP%]{color:#9bc2ea}.hero__header[_ngcontent-%COMP%]{max-width:800px;width:100%;display:flex;justify-content:space-between}@media (max-width:860px){.hero__header[_ngcontent-%COMP%]{display:flex;align-items:flex-end;flex-direction:column;position:relative}}.hero__hamburger[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:6px;border:none}.hero__hamburger-menu[_ngcontent-%COMP%]{top:55px;background-color:#f3d8b3;padding:1rem 1.5rem;position:absolute;display:flex;flex-direction:column;align-items:flex-start;border-radius:12px;min-width:200px}.hero__hamburger-menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .hero__hamburger-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:0;color:#000;border:none}.location[_ngcontent-%COMP%]{padding:0 1rem}.location[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%], .location[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;max-width:500px;height:100%;border-radius:12px}.location[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{min-height:280px;line-height:0;padding:0;margin:0}.location__container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;max-width:1200px;margin:4rem auto;justify-content:center;grid-gap:5rem;gap:5rem}@media (max-width:1200px){.location__container[_ngcontent-%COMP%]{grid-gap:1rem;gap:1rem;margin:1rem auto}}.timeline[_ngcontent-%COMP%]{max-width:1200px;margin:0 auto}.connections[_ngcontent-%COMP%], .form[_ngcontent-%COMP%], .timeline[_ngcontent-%COMP%]{padding:0 1rem}.connections[_ngcontent-%COMP%]{text-align:center}.connections__cards[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;max-width:1200px;margin:2rem auto;justify-content:center;grid-gap:5rem;gap:5rem}.connections__card-header[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.connections__card-header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:311px;width:100%;border-radius:25%}.connections__card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;text-align:center}.connections__card-content[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:24px}"],
        data: {animation: [xl]}
    }), t
})(), Xd = (() => {
    class t {
        constructor() {
            this.title = "wedding"
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275cmp = Lt({
        type: t,
        selectors: [["app-root"]],
        decls: 2,
        vars: 0,
        consts: [[1, "background"]],
        template: function (t, e) {
            1 & t && (Qs(0, "div", 0), Qs(1, "app-landing"))
        },
        directives: [Jd],
        styles: [""]
    }), t
})();

function tp() {
    return "undefined" != typeof window && void 0 !== window.document
}

function ep() {
    return "undefined" != typeof process && "[object process]" === {}.toString.call(process)
}

function np(t) {
    switch (t.length) {
        case 0:
            return new Cl;
        case 1:
            return t[0];
        default:
            return new El(t)
    }
}

function rp(t, e, n, r, s = {}, i = {}) {
    const o = [], a = [];
    let l = -1, c = null;
    if (r.forEach(t => {
        const n = t.offset, r = n == l, u = r && c || {};
        Object.keys(t).forEach(n => {
            let r = n, a = t[n];
            if ("offset" !== n) switch (r = e.normalizePropertyName(r, o), a) {
                case"!":
                    a = s[n];
                    break;
                case gl:
                    a = i[n];
                    break;
                default:
                    a = e.normalizeStyleValue(n, r, a, o)
            }
            u[r] = a
        }), r || a.push(u), c = u, l = n
    }), o.length) {
        const t = "\n - ";
        throw new Error(`Unable to animate due to the following errors:${t}${o.join(t)}`)
    }
    return a
}

function sp(t, e, n, r) {
    switch (e) {
        case"start":
            t.onStart(() => r(n && ip(n, "start", t)));
            break;
        case"done":
            t.onDone(() => r(n && ip(n, "done", t)));
            break;
        case"destroy":
            t.onDestroy(() => r(n && ip(n, "destroy", t)))
    }
}

function ip(t, e, n) {
    const r = n.totalTime,
        s = op(t.element, t.triggerName, t.fromState, t.toState, e || t.phaseName, null == r ? t.totalTime : r, !!n.disabled),
        i = t._data;
    return null != i && (s._data = i), s
}

function op(t, e, n, r, s = "", i = 0, o) {
    return {element: t, triggerName: e, fromState: n, toState: r, phaseName: s, totalTime: i, disabled: !!o}
}

function ap(t, e, n) {
    let r;
    return t instanceof Map ? (r = t.get(e), r || t.set(e, r = n)) : (r = t[e], r || (r = t[e] = n)), r
}

function lp(t) {
    const e = t.indexOf(":");
    return [t.substring(1, e), t.substr(e + 1)]
}

let cp = (t, e) => !1, up = (t, e) => !1, hp = (t, e, n) => [];
const dp = ep();
(dp || "undefined" != typeof Element) && (cp = tp() ? (t, e) => {
    for (; e && e !== document.documentElement;) {
        if (e === t) return !0;
        e = e.parentNode || e.host
    }
    return !1
} : (t, e) => t.contains(e), up = (() => {
    if (dp || Element.prototype.matches) return (t, e) => t.matches(e);
    {
        const t = Element.prototype,
            e = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector;
        return e ? (t, n) => e.apply(t, [n]) : up
    }
})(), hp = (t, e, n) => {
    let r = [];
    if (n) {
        const n = t.querySelectorAll(e);
        for (let t = 0; t < n.length; t++) r.push(n[t])
    } else {
        const n = t.querySelector(e);
        n && r.push(n)
    }
    return r
});
let pp = null, fp = !1;

function mp(t) {
    pp || (pp = ("undefined" != typeof document ? document.body : null) || {}, fp = !!pp.style && "WebkitAppearance" in pp.style);
    let e = !0;
    return pp.style && !function (t) {
        return "ebkit" == t.substring(1, 6)
    }(t) && (e = t in pp.style, !e && fp) && (e = "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in pp.style), e
}

const gp = up, yp = cp, _p = hp;

function vp(t) {
    const e = {};
    return Object.keys(t).forEach(n => {
        const r = n.replace(/([a-z])([A-Z])/g, "$1-$2");
        e[r] = t[n]
    }), e
}

let bp = (() => {
    class t {
        validateStyleProperty(t) {
            return mp(t)
        }

        matchesElement(t, e) {
            return gp(t, e)
        }

        containsElement(t, e) {
            return yp(t, e)
        }

        query(t, e, n) {
            return _p(t, e, n)
        }

        computeStyle(t, e, n) {
            return n || ""
        }

        animate(t, e, n, r, s, i = [], o) {
            return new Cl(n, r)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})(), wp = (() => {
    class t {
    }

    return t.NOOP = new bp, t
})();
const Sp = "ng-enter", Cp = "ng-leave", Ep = "ng-trigger", xp = ".ng-trigger", kp = "ng-animating",
    Tp = ".ng-animating";

function Op(t) {
    if ("number" == typeof t) return t;
    const e = t.match(/^(-?[\.\d]+)(m?s)/);
    return !e || e.length < 2 ? 0 : Ap(parseFloat(e[1]), e[2])
}

function Ap(t, e) {
    switch (e) {
        case"s":
            return 1e3 * t;
        default:
            return t
    }
}

function Pp(t, e, n) {
    return t.hasOwnProperty("duration") ? t : function (t, e, n) {
        let r, s = 0, i = "";
        if ("string" == typeof t) {
            const n = t.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
            if (null === n) return e.push(`The provided timing value "${t}" is invalid.`), {
                duration: 0,
                delay: 0,
                easing: ""
            };
            r = Ap(parseFloat(n[1]), n[2]);
            const o = n[3];
            null != o && (s = Ap(parseFloat(o), n[4]));
            const a = n[5];
            a && (i = a)
        } else r = t;
        if (!n) {
            let n = !1, i = e.length;
            r < 0 && (e.push("Duration values below 0 are not allowed for this animation step."), n = !0), s < 0 && (e.push("Delay values below 0 are not allowed for this animation step."), n = !0), n && e.splice(i, 0, `The provided timing value "${t}" is invalid.`)
        }
        return {duration: r, delay: s, easing: i}
    }(t, e, n)
}

function Ip(t, e = {}) {
    return Object.keys(t).forEach(n => {
        e[n] = t[n]
    }), e
}

function Rp(t, e, n = {}) {
    if (e) for (let r in t) n[r] = t[r]; else Ip(t, n);
    return n
}

function Np(t, e, n) {
    return n ? e + ":" + n + ";" : ""
}

function Dp(t) {
    let e = "";
    for (let n = 0; n < t.style.length; n++) {
        const r = t.style.item(n);
        e += Np(0, r, t.style.getPropertyValue(r))
    }
    for (const n in t.style) t.style.hasOwnProperty(n) && !n.startsWith("_") && (e += Np(0, n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), t.style[n]));
    t.setAttribute("style", e)
}

function jp(t, e, n) {
    t.style && (Object.keys(e).forEach(r => {
        const s = Vp(r);
        n && !n.hasOwnProperty(r) && (n[r] = t.style[s]), t.style[s] = e[r]
    }), ep() && Dp(t))
}

function Mp(t, e) {
    t.style && (Object.keys(e).forEach(e => {
        const n = Vp(e);
        t.style[n] = ""
    }), ep() && Dp(t))
}

function Fp(t) {
    return Array.isArray(t) ? 1 == t.length ? t[0] : vl(t) : t
}

const Lp = new RegExp("{{\\s*(.+?)\\s*}}", "g");

function Up(t) {
    let e = [];
    if ("string" == typeof t) {
        let n;
        for (; n = Lp.exec(t);) e.push(n[1]);
        Lp.lastIndex = 0
    }
    return e
}

function Hp(t, e, n) {
    const r = t.toString(), s = r.replace(Lp, (t, r) => {
        let s = e[r];
        return e.hasOwnProperty(r) || (n.push(`Please provide a value for the animation param ${r}`), s = ""), s.toString()
    });
    return s == r ? t : s
}

function $p(t) {
    const e = [];
    let n = t.next();
    for (; !n.done;) e.push(n.value), n = t.next();
    return e
}

const zp = /-+([a-z0-9])/g;

function Vp(t) {
    return t.replace(zp, (...t) => t[1].toUpperCase())
}

function Bp(t, e) {
    return 0 === t || 0 === e
}

function qp(t, e, n) {
    const r = Object.keys(n);
    if (r.length && e.length) {
        let i = e[0], o = [];
        if (r.forEach(t => {
            i.hasOwnProperty(t) || o.push(t), i[t] = n[t]
        }), o.length) for (var s = 1; s < e.length; s++) {
            let n = e[s];
            o.forEach(function (e) {
                n[e] = Kp(t, e)
            })
        }
    }
    return e
}

function Qp(t, e, n) {
    switch (e.type) {
        case 7:
            return t.visitTrigger(e, n);
        case 0:
            return t.visitState(e, n);
        case 1:
            return t.visitTransition(e, n);
        case 2:
            return t.visitSequence(e, n);
        case 3:
            return t.visitGroup(e, n);
        case 4:
            return t.visitAnimate(e, n);
        case 5:
            return t.visitKeyframes(e, n);
        case 6:
            return t.visitStyle(e, n);
        case 8:
            return t.visitReference(e, n);
        case 9:
            return t.visitAnimateChild(e, n);
        case 10:
            return t.visitAnimateRef(e, n);
        case 11:
            return t.visitQuery(e, n);
        case 12:
            return t.visitStagger(e, n);
        default:
            throw new Error(`Unable to resolve animation metadata node #${e.type}`)
    }
}

function Kp(t, e) {
    return window.getComputedStyle(t)[e]
}

const Wp = "*";

function Gp(t, e) {
    const n = [];
    return "string" == typeof t ? t.split(/\s*,\s*/).forEach(t => function (t, e, n) {
        if (":" == t[0]) {
            const r = function (t, e) {
                switch (t) {
                    case":enter":
                        return "void => *";
                    case":leave":
                        return "* => void";
                    case":increment":
                        return (t, e) => parseFloat(e) > parseFloat(t);
                    case":decrement":
                        return (t, e) => parseFloat(e) < parseFloat(t);
                    default:
                        return e.push(`The transition alias value "${t}" is not supported`), "* => *"
                }
            }(t, n);
            if ("function" == typeof r) return void e.push(r);
            t = r
        }
        const r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
        if (null == r || r.length < 4) return n.push(`The provided transition expression "${t}" is not supported`), e;
        const s = r[1], i = r[2], o = r[3];
        e.push(Jp(s, o)), "<" != i[0] || s == Wp && o == Wp || e.push(Jp(o, s))
    }(t, n, e)) : n.push(t), n
}

const Zp = new Set(["true", "1"]), Yp = new Set(["false", "0"]);

function Jp(t, e) {
    const n = Zp.has(t) || Yp.has(t), r = Zp.has(e) || Yp.has(e);
    return (s, i) => {
        let o = t == Wp || t == s, a = e == Wp || e == i;
        return !o && n && "boolean" == typeof s && (o = s ? Zp.has(t) : Yp.has(t)), !a && r && "boolean" == typeof i && (a = i ? Zp.has(e) : Yp.has(e)), o && a
    }
}

const Xp = new RegExp("s*:selfs*,?", "g");

function tf(t, e, n) {
    return new ef(t).build(e, n)
}

class ef {
    constructor(t) {
        this._driver = t
    }

    build(t, e) {
        const n = new nf(e);
        return this._resetContextStyleTimingState(n), Qp(this, Fp(t), n)
    }

    _resetContextStyleTimingState(t) {
        t.currentQuerySelector = "", t.collectedStyles = {}, t.collectedStyles[""] = {}, t.currentTime = 0
    }

    visitTrigger(t, e) {
        let n = e.queryCount = 0, r = e.depCount = 0;
        const s = [], i = [];
        return "@" == t.name.charAt(0) && e.errors.push("animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"), t.definitions.forEach(t => {
            if (this._resetContextStyleTimingState(e), 0 == t.type) {
                const n = t, r = n.name;
                r.toString().split(/\s*,\s*/).forEach(t => {
                    n.name = t, s.push(this.visitState(n, e))
                }), n.name = r
            } else if (1 == t.type) {
                const s = this.visitTransition(t, e);
                n += s.queryCount, r += s.depCount, i.push(s)
            } else e.errors.push("only state() and transition() definitions can sit inside of a trigger()")
        }), {type: 7, name: t.name, states: s, transitions: i, queryCount: n, depCount: r, options: null}
    }

    visitState(t, e) {
        const n = this.visitStyle(t.styles, e), r = t.options && t.options.params || null;
        if (n.containsDynamicStyles) {
            const s = new Set, i = r || {};
            if (n.styles.forEach(t => {
                if (rf(t)) {
                    const e = t;
                    Object.keys(e).forEach(t => {
                        Up(e[t]).forEach(t => {
                            i.hasOwnProperty(t) || s.add(t)
                        })
                    })
                }
            }), s.size) {
                const n = $p(s.values());
                e.errors.push(`state("${t.name}", ...) must define default values for all the following style substitutions: ${n.join(", ")}`)
            }
        }
        return {type: 0, name: t.name, style: n, options: r ? {params: r} : null}
    }

    visitTransition(t, e) {
        e.queryCount = 0, e.depCount = 0;
        const n = Qp(this, Fp(t.animation), e);
        return {
            type: 1,
            matchers: Gp(t.expr, e.errors),
            animation: n,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: sf(t.options)
        }
    }

    visitSequence(t, e) {
        return {type: 2, steps: t.steps.map(t => Qp(this, t, e)), options: sf(t.options)}
    }

    visitGroup(t, e) {
        const n = e.currentTime;
        let r = 0;
        const s = t.steps.map(t => {
            e.currentTime = n;
            const s = Qp(this, t, e);
            return r = Math.max(r, e.currentTime), s
        });
        return e.currentTime = r, {type: 3, steps: s, options: sf(t.options)}
    }

    visitAnimate(t, e) {
        const n = function (t, e) {
            let n = null;
            if (t.hasOwnProperty("duration")) n = t; else if ("number" == typeof t) return of(Pp(t, e).duration, 0, "");
            const r = t;
            if (r.split(/\s+/).some(t => "{" == t.charAt(0) && "{" == t.charAt(1))) {
                const t = of(0, 0, "");
                return t.dynamic = !0, t.strValue = r, t
            }
            return n = n || Pp(r, e), of(n.duration, n.delay, n.easing)
        }(t.timings, e.errors);
        let r;
        e.currentAnimateTimings = n;
        let s = t.styles ? t.styles : bl({});
        if (5 == s.type) r = this.visitKeyframes(s, e); else {
            let s = t.styles, i = !1;
            if (!s) {
                i = !0;
                const t = {};
                n.easing && (t.easing = n.easing), s = bl(t)
            }
            e.currentTime += n.duration + n.delay;
            const o = this.visitStyle(s, e);
            o.isEmptyStep = i, r = o
        }
        return e.currentAnimateTimings = null, {type: 4, timings: n, style: r, options: null}
    }

    visitStyle(t, e) {
        const n = this._makeStyleAst(t, e);
        return this._validateStyleAst(n, e), n
    }

    _makeStyleAst(t, e) {
        const n = [];
        Array.isArray(t.styles) ? t.styles.forEach(t => {
            "string" == typeof t ? t == gl ? n.push(t) : e.errors.push(`The provided style string value ${t} is not allowed.`) : n.push(t)
        }) : n.push(t.styles);
        let r = !1, s = null;
        return n.forEach(t => {
            if (rf(t)) {
                const e = t, n = e.easing;
                if (n && (s = n, delete e.easing), !r) for (let t in e) if (e[t].toString().indexOf("{{") >= 0) {
                    r = !0;
                    break
                }
            }
        }), {type: 6, styles: n, easing: s, offset: t.offset, containsDynamicStyles: r, options: null}
    }

    _validateStyleAst(t, e) {
        const n = e.currentAnimateTimings;
        let r = e.currentTime, s = e.currentTime;
        n && s > 0 && (s -= n.duration + n.delay), t.styles.forEach(t => {
            "string" != typeof t && Object.keys(t).forEach(n => {
                if (!this._driver.validateStyleProperty(n)) return void e.errors.push(`The provided animation property "${n}" is not a supported CSS property for animations`);
                const i = e.collectedStyles[e.currentQuerySelector], o = i[n];
                let a = !0;
                o && (s != r && s >= o.startTime && r <= o.endTime && (e.errors.push(`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${r}ms"`), a = !1), s = o.startTime), a && (i[n] = {
                    startTime: s,
                    endTime: r
                }), e.options && function (t, e, n) {
                    const r = e.params || {}, s = Up(t);
                    s.length && s.forEach(t => {
                        r.hasOwnProperty(t) || n.push(`Unable to resolve the local animation param ${t} in the given list of values`)
                    })
                }(t[n], e.options, e.errors)
            })
        })
    }

    visitKeyframes(t, e) {
        const n = {type: 5, styles: [], options: null};
        if (!e.currentAnimateTimings) return e.errors.push("keyframes() must be placed inside of a call to animate()"), n;
        let r = 0;
        const s = [];
        let i = !1, o = !1, a = 0;
        const l = t.steps.map(t => {
            const n = this._makeStyleAst(t, e);
            let l = null != n.offset ? n.offset : function (t) {
                if ("string" == typeof t) return null;
                let e = null;
                if (Array.isArray(t)) t.forEach(t => {
                    if (rf(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        e = parseFloat(n.offset), delete n.offset
                    }
                }); else if (rf(t) && t.hasOwnProperty("offset")) {
                    const n = t;
                    e = parseFloat(n.offset), delete n.offset
                }
                return e
            }(n.styles), c = 0;
            return null != l && (r++, c = n.offset = l), o = o || c < 0 || c > 1, i = i || c < a, a = c, s.push(c), n
        });
        o && e.errors.push("Please ensure that all keyframe offsets are between 0 and 1"), i && e.errors.push("Please ensure that all keyframe offsets are in order");
        const c = t.steps.length;
        let u = 0;
        r > 0 && r < c ? e.errors.push("Not all style() steps within the declared keyframes() contain offsets") : 0 == r && (u = 1 / (c - 1));
        const h = c - 1, d = e.currentTime, p = e.currentAnimateTimings, f = p.duration;
        return l.forEach((t, r) => {
            const i = u > 0 ? r == h ? 1 : u * r : s[r], o = i * f;
            e.currentTime = d + p.delay + o, p.duration = o, this._validateStyleAst(t, e), t.offset = i, n.styles.push(t)
        }), n
    }

    visitReference(t, e) {
        return {type: 8, animation: Qp(this, Fp(t.animation), e), options: sf(t.options)}
    }

    visitAnimateChild(t, e) {
        return e.depCount++, {type: 9, options: sf(t.options)}
    }

    visitAnimateRef(t, e) {
        return {type: 10, animation: this.visitReference(t.animation, e), options: sf(t.options)}
    }

    visitQuery(t, e) {
        const n = e.currentQuerySelector, r = t.options || {};
        e.queryCount++, e.currentQuery = t;
        const [s, i] = function (t) {
            const e = !!t.split(/\s*,\s*/).find(t => ":self" == t);
            return e && (t = t.replace(Xp, "")), [t = t.replace(/@\*/g, xp).replace(/@\w+/g, t => ".ng-trigger-" + t.substr(1)).replace(/:animating/g, Tp), e]
        }(t.selector);
        e.currentQuerySelector = n.length ? n + " " + s : s, ap(e.collectedStyles, e.currentQuerySelector, {});
        const o = Qp(this, Fp(t.animation), e);
        return e.currentQuery = null, e.currentQuerySelector = n, {
            type: 11,
            selector: s,
            limit: r.limit || 0,
            optional: !!r.optional,
            includeSelf: i,
            animation: o,
            originalSelector: t.selector,
            options: sf(t.options)
        }
    }

    visitStagger(t, e) {
        e.currentQuery || e.errors.push("stagger() can only be used inside of query()");
        const n = "full" === t.timings ? {duration: 0, delay: 0, easing: "full"} : Pp(t.timings, e.errors, !0);
        return {type: 12, animation: Qp(this, Fp(t.animation), e), timings: n, options: null}
    }
}

class nf {
    constructor(t) {
        this.errors = t, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, this.currentTime = 0, this.collectedStyles = {}, this.options = null
    }
}

function rf(t) {
    return !Array.isArray(t) && "object" == typeof t
}

function sf(t) {
    var e;
    return t ? (t = Ip(t)).params && (t.params = (e = t.params) ? Ip(e) : null) : t = {}, t
}

function of(t, e, n) {
    return {duration: t, delay: e, easing: n}
}

function af(t, e, n, r, s, i, o = null, a = !1) {
    return {
        type: 1,
        element: t,
        keyframes: e,
        preStyleProps: n,
        postStyleProps: r,
        duration: s,
        delay: i,
        totalTime: s + i,
        easing: o,
        subTimeline: a
    }
}

class lf {
    constructor() {
        this._map = new Map
    }

    consume(t) {
        let e = this._map.get(t);
        return e ? this._map.delete(t) : e = [], e
    }

    append(t, e) {
        let n = this._map.get(t);
        n || this._map.set(t, n = []), n.push(...e)
    }

    has(t) {
        return this._map.has(t)
    }

    clear() {
        this._map.clear()
    }
}

const cf = new RegExp(":enter", "g"), uf = new RegExp(":leave", "g");

function hf(t, e, n, r, s, i = {}, o = {}, a, l, c = []) {
    return (new df).buildKeyframes(t, e, n, r, s, i, o, a, l, c)
}

class df {
    buildKeyframes(t, e, n, r, s, i, o, a, l, c = []) {
        l = l || new lf;
        const u = new ff(t, e, l, r, s, c, []);
        u.options = a, u.currentTimeline.setStyles([i], null, u.errors, a), Qp(this, n, u);
        const h = u.timelines.filter(t => t.containsAnimation());
        if (h.length && Object.keys(o).length) {
            const t = h[h.length - 1];
            t.allowOnlyTimelineStyles() || t.setStyles([o], null, u.errors, a)
        }
        return h.length ? h.map(t => t.buildKeyframes()) : [af(e, [], [], [], 0, 0, "", !1)]
    }

    visitTrigger(t, e) {
    }

    visitState(t, e) {
    }

    visitTransition(t, e) {
    }

    visitAnimateChild(t, e) {
        const n = e.subInstructions.consume(e.element);
        if (n) {
            const r = e.createSubContext(t.options), s = e.currentTimeline.currentTime,
                i = this._visitSubInstructions(n, r, r.options);
            s != i && e.transformIntoNewTimeline(i)
        }
        e.previousNode = t
    }

    visitAnimateRef(t, e) {
        const n = e.createSubContext(t.options);
        n.transformIntoNewTimeline(), this.visitReference(t.animation, n), e.transformIntoNewTimeline(n.currentTimeline.currentTime), e.previousNode = t
    }

    _visitSubInstructions(t, e, n) {
        let r = e.currentTimeline.currentTime;
        const s = null != n.duration ? Op(n.duration) : null, i = null != n.delay ? Op(n.delay) : null;
        return 0 !== s && t.forEach(t => {
            const n = e.appendInstructionToTimeline(t, s, i);
            r = Math.max(r, n.duration + n.delay)
        }), r
    }

    visitReference(t, e) {
        e.updateOptions(t.options, !0), Qp(this, t.animation, e), e.previousNode = t
    }

    visitSequence(t, e) {
        const n = e.subContextCount;
        let r = e;
        const s = t.options;
        if (s && (s.params || s.delay) && (r = e.createSubContext(s), r.transformIntoNewTimeline(), null != s.delay)) {
            6 == r.previousNode.type && (r.currentTimeline.snapshotCurrentStyles(), r.previousNode = pf);
            const t = Op(s.delay);
            r.delayNextStep(t)
        }
        t.steps.length && (t.steps.forEach(t => Qp(this, t, r)), r.currentTimeline.applyStylesToKeyframe(), r.subContextCount > n && r.transformIntoNewTimeline()), e.previousNode = t
    }

    visitGroup(t, e) {
        const n = [];
        let r = e.currentTimeline.currentTime;
        const s = t.options && t.options.delay ? Op(t.options.delay) : 0;
        t.steps.forEach(i => {
            const o = e.createSubContext(t.options);
            s && o.delayNextStep(s), Qp(this, i, o), r = Math.max(r, o.currentTimeline.currentTime), n.push(o.currentTimeline)
        }), n.forEach(t => e.currentTimeline.mergeTimelineCollectedStyles(t)), e.transformIntoNewTimeline(r), e.previousNode = t
    }

    _visitTiming(t, e) {
        if (t.dynamic) {
            const n = t.strValue;
            return Pp(e.params ? Hp(n, e.params, e.errors) : n, e.errors)
        }
        return {duration: t.duration, delay: t.delay, easing: t.easing}
    }

    visitAnimate(t, e) {
        const n = e.currentAnimateTimings = this._visitTiming(t.timings, e), r = e.currentTimeline;
        n.delay && (e.incrementTime(n.delay), r.snapshotCurrentStyles());
        const s = t.style;
        5 == s.type ? this.visitKeyframes(s, e) : (e.incrementTime(n.duration), this.visitStyle(s, e), r.applyStylesToKeyframe()), e.currentAnimateTimings = null, e.previousNode = t
    }

    visitStyle(t, e) {
        const n = e.currentTimeline, r = e.currentAnimateTimings;
        !r && n.getCurrentStyleProperties().length && n.forwardFrame();
        const s = r && r.easing || t.easing;
        t.isEmptyStep ? n.applyEmptyStep(s) : n.setStyles(t.styles, s, e.errors, e.options), e.previousNode = t
    }

    visitKeyframes(t, e) {
        const n = e.currentAnimateTimings, r = e.currentTimeline.duration, s = n.duration,
            i = e.createSubContext().currentTimeline;
        i.easing = n.easing, t.styles.forEach(t => {
            i.forwardTime((t.offset || 0) * s), i.setStyles(t.styles, t.easing, e.errors, e.options), i.applyStylesToKeyframe()
        }), e.currentTimeline.mergeTimelineCollectedStyles(i), e.transformIntoNewTimeline(r + s), e.previousNode = t
    }

    visitQuery(t, e) {
        const n = e.currentTimeline.currentTime, r = t.options || {}, s = r.delay ? Op(r.delay) : 0;
        s && (6 === e.previousNode.type || 0 == n && e.currentTimeline.getCurrentStyleProperties().length) && (e.currentTimeline.snapshotCurrentStyles(), e.previousNode = pf);
        let i = n;
        const o = e.invokeQuery(t.selector, t.originalSelector, t.limit, t.includeSelf, !!r.optional, e.errors);
        e.currentQueryTotal = o.length;
        let a = null;
        o.forEach((n, r) => {
            e.currentQueryIndex = r;
            const o = e.createSubContext(t.options, n);
            s && o.delayNextStep(s), n === e.element && (a = o.currentTimeline), Qp(this, t.animation, o), o.currentTimeline.applyStylesToKeyframe(), i = Math.max(i, o.currentTimeline.currentTime)
        }), e.currentQueryIndex = 0, e.currentQueryTotal = 0, e.transformIntoNewTimeline(i), a && (e.currentTimeline.mergeTimelineCollectedStyles(a), e.currentTimeline.snapshotCurrentStyles()), e.previousNode = t
    }

    visitStagger(t, e) {
        const n = e.parentContext, r = e.currentTimeline, s = t.timings, i = Math.abs(s.duration),
            o = i * (e.currentQueryTotal - 1);
        let a = i * e.currentQueryIndex;
        switch (s.duration < 0 ? "reverse" : s.easing) {
            case"reverse":
                a = o - a;
                break;
            case"full":
                a = n.currentStaggerTime
        }
        const l = e.currentTimeline;
        a && l.delayNextStep(a);
        const c = l.currentTime;
        Qp(this, t.animation, e), e.previousNode = t, n.currentStaggerTime = r.currentTime - c + (r.startTime - n.currentTimeline.startTime)
    }
}

const pf = {};

class ff {
    constructor(t, e, n, r, s, i, o, a) {
        this._driver = t, this.element = e, this.subInstructions = n, this._enterClassName = r, this._leaveClassName = s, this.errors = i, this.timelines = o, this.parentContext = null, this.currentAnimateTimings = null, this.previousNode = pf, this.subContextCount = 0, this.options = {}, this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, this.currentTimeline = a || new mf(this._driver, e, 0), o.push(this.currentTimeline)
    }

    get params() {
        return this.options.params
    }

    updateOptions(t, e) {
        if (!t) return;
        const n = t;
        let r = this.options;
        null != n.duration && (r.duration = Op(n.duration)), null != n.delay && (r.delay = Op(n.delay));
        const s = n.params;
        if (s) {
            let t = r.params;
            t || (t = this.options.params = {}), Object.keys(s).forEach(n => {
                e && t.hasOwnProperty(n) || (t[n] = Hp(s[n], t, this.errors))
            })
        }
    }

    _copyOptions() {
        const t = {};
        if (this.options) {
            const e = this.options.params;
            if (e) {
                const n = t.params = {};
                Object.keys(e).forEach(t => {
                    n[t] = e[t]
                })
            }
        }
        return t
    }

    createSubContext(t = null, e, n) {
        const r = e || this.element,
            s = new ff(this._driver, r, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(r, n || 0));
        return s.previousNode = this.previousNode, s.currentAnimateTimings = this.currentAnimateTimings, s.options = this._copyOptions(), s.updateOptions(t), s.currentQueryIndex = this.currentQueryIndex, s.currentQueryTotal = this.currentQueryTotal, s.parentContext = this, this.subContextCount++, s
    }

    transformIntoNewTimeline(t) {
        return this.previousNode = pf, this.currentTimeline = this.currentTimeline.fork(this.element, t), this.timelines.push(this.currentTimeline), this.currentTimeline
    }

    appendInstructionToTimeline(t, e, n) {
        const r = {
                duration: null != e ? e : t.duration,
                delay: this.currentTimeline.currentTime + (null != n ? n : 0) + t.delay,
                easing: ""
            },
            s = new gf(this._driver, t.element, t.keyframes, t.preStyleProps, t.postStyleProps, r, t.stretchStartingKeyframe);
        return this.timelines.push(s), r
    }

    incrementTime(t) {
        this.currentTimeline.forwardTime(this.currentTimeline.duration + t)
    }

    delayNextStep(t) {
        t > 0 && this.currentTimeline.delayNextStep(t)
    }

    invokeQuery(t, e, n, r, s, i) {
        let o = [];
        if (r && o.push(this.element), t.length > 0) {
            t = (t = t.replace(cf, "." + this._enterClassName)).replace(uf, "." + this._leaveClassName);
            let e = this._driver.query(this.element, t, 1 != n);
            0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)), o.push(...e)
        }
        return s || 0 != o.length || i.push(`\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`), o
    }
}

class mf {
    constructor(t, e, n, r) {
        this._driver = t, this.element = e, this.startTime = n, this._elementTimelineStylesLookup = r, this.duration = 0, this._previousKeyframe = {}, this._currentKeyframe = {}, this._keyframes = new Map, this._styleSummary = {}, this._pendingStyles = {}, this._backFill = {}, this._currentEmptyStepKeyframe = null, this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map), this._localTimelineStyles = Object.create(this._backFill, {}), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e), this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)), this._loadKeyframe()
    }

    containsAnimation() {
        switch (this._keyframes.size) {
            case 0:
                return !1;
            case 1:
                return this.getCurrentStyleProperties().length > 0;
            default:
                return !0
        }
    }

    getCurrentStyleProperties() {
        return Object.keys(this._currentKeyframe)
    }

    get currentTime() {
        return this.startTime + this.duration
    }

    delayNextStep(t) {
        const e = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
        this.duration || e ? (this.forwardTime(this.currentTime + t), e && this.snapshotCurrentStyles()) : this.startTime += t
    }

    fork(t, e) {
        return this.applyStylesToKeyframe(), new mf(this._driver, t, e || this.currentTime, this._elementTimelineStylesLookup)
    }

    _loadKeyframe() {
        this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}), this._keyframes.set(this.duration, this._currentKeyframe))
    }

    forwardFrame() {
        this.duration += 1, this._loadKeyframe()
    }

    forwardTime(t) {
        this.applyStylesToKeyframe(), this.duration = t, this._loadKeyframe()
    }

    _updateStyle(t, e) {
        this._localTimelineStyles[t] = e, this._globalTimelineStyles[t] = e, this._styleSummary[t] = {
            time: this.currentTime,
            value: e
        }
    }

    allowOnlyTimelineStyles() {
        return this._currentEmptyStepKeyframe !== this._currentKeyframe
    }

    applyEmptyStep(t) {
        t && (this._previousKeyframe.easing = t), Object.keys(this._globalTimelineStyles).forEach(t => {
            this._backFill[t] = this._globalTimelineStyles[t] || gl, this._currentKeyframe[t] = gl
        }), this._currentEmptyStepKeyframe = this._currentKeyframe
    }

    setStyles(t, e, n, r) {
        e && (this._previousKeyframe.easing = e);
        const s = r && r.params || {}, i = function (t, e) {
            const n = {};
            let r;
            return t.forEach(t => {
                "*" === t ? (r = r || Object.keys(e), r.forEach(t => {
                    n[t] = gl
                })) : Rp(t, !1, n)
            }), n
        }(t, this._globalTimelineStyles);
        Object.keys(i).forEach(t => {
            const e = Hp(i[t], s, n);
            this._pendingStyles[t] = e, this._localTimelineStyles.hasOwnProperty(t) || (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(t) ? this._globalTimelineStyles[t] : gl), this._updateStyle(t, e)
        })
    }

    applyStylesToKeyframe() {
        const t = this._pendingStyles, e = Object.keys(t);
        0 != e.length && (this._pendingStyles = {}, e.forEach(e => {
            this._currentKeyframe[e] = t[e]
        }), Object.keys(this._localTimelineStyles).forEach(t => {
            this._currentKeyframe.hasOwnProperty(t) || (this._currentKeyframe[t] = this._localTimelineStyles[t])
        }))
    }

    snapshotCurrentStyles() {
        Object.keys(this._localTimelineStyles).forEach(t => {
            const e = this._localTimelineStyles[t];
            this._pendingStyles[t] = e, this._updateStyle(t, e)
        })
    }

    getFinalKeyframe() {
        return this._keyframes.get(this.duration)
    }

    get properties() {
        const t = [];
        for (let e in this._currentKeyframe) t.push(e);
        return t
    }

    mergeTimelineCollectedStyles(t) {
        Object.keys(t._styleSummary).forEach(e => {
            const n = this._styleSummary[e], r = t._styleSummary[e];
            (!n || r.time > n.time) && this._updateStyle(e, r.value)
        })
    }

    buildKeyframes() {
        this.applyStylesToKeyframe();
        const t = new Set, e = new Set, n = 1 === this._keyframes.size && 0 === this.duration;
        let r = [];
        this._keyframes.forEach((s, i) => {
            const o = Rp(s, !0);
            Object.keys(o).forEach(n => {
                const r = o[n];
                "!" == r ? t.add(n) : r == gl && e.add(n)
            }), n || (o.offset = i / this.duration), r.push(o)
        });
        const s = t.size ? $p(t.values()) : [], i = e.size ? $p(e.values()) : [];
        if (n) {
            const t = r[0], e = Ip(t);
            t.offset = 0, e.offset = 1, r = [t, e]
        }
        return af(this.element, r, s, i, this.duration, this.startTime, this.easing, !1)
    }
}

class gf extends mf {
    constructor(t, e, n, r, s, i, o = !1) {
        super(t, e, i.delay), this.element = e, this.keyframes = n, this.preStyleProps = r, this.postStyleProps = s, this._stretchStartingKeyframe = o, this.timings = {
            duration: i.duration,
            delay: i.delay,
            easing: i.easing
        }
    }

    containsAnimation() {
        return this.keyframes.length > 1
    }

    buildKeyframes() {
        let t = this.keyframes, {delay: e, duration: n, easing: r} = this.timings;
        if (this._stretchStartingKeyframe && e) {
            const s = [], i = n + e, o = e / i, a = Rp(t[0], !1);
            a.offset = 0, s.push(a);
            const l = Rp(t[0], !1);
            l.offset = yf(o), s.push(l);
            const c = t.length - 1;
            for (let r = 1; r <= c; r++) {
                let o = Rp(t[r], !1);
                o.offset = yf((e + o.offset * n) / i), s.push(o)
            }
            n = i, e = 0, r = "", t = s
        }
        return af(this.element, t, this.preStyleProps, this.postStyleProps, n, e, r, !0)
    }
}

function yf(t, e = 3) {
    const n = Math.pow(10, e - 1);
    return Math.round(t * n) / n
}

class _f {
}

class vf extends _f {
    normalizePropertyName(t, e) {
        return Vp(t)
    }

    normalizeStyleValue(t, e, n, r) {
        let s = "";
        const i = n.toString().trim();
        if (bf[e] && 0 !== n && "0" !== n) if ("number" == typeof n) s = "px"; else {
            const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
            e && 0 == e[1].length && r.push(`Please provide a CSS unit value for ${t}:${n}`)
        }
        return i + s
    }
}

const bf = (() => function (t) {
    const e = {};
    return t.forEach(t => e[t] = !0), e
}("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(",")))();

function wf(t, e, n, r, s, i, o, a, l, c, u, h, d) {
    return {
        type: 0,
        element: t,
        triggerName: e,
        isRemovalTransition: s,
        fromState: n,
        fromStyles: i,
        toState: r,
        toStyles: o,
        timelines: a,
        queriedElements: l,
        preStyleProps: c,
        postStyleProps: u,
        totalTime: h,
        errors: d
    }
}

const Sf = {};

class Cf {
    constructor(t, e, n) {
        this._triggerName = t, this.ast = e, this._stateStyles = n
    }

    match(t, e, n, r) {
        return function (t, e, n, r, s) {
            return t.some(t => t(e, n, r, s))
        }(this.ast.matchers, t, e, n, r)
    }

    buildStyles(t, e, n) {
        const r = this._stateStyles["*"], s = this._stateStyles[t], i = r ? r.buildStyles(e, n) : {};
        return s ? s.buildStyles(e, n) : i
    }

    build(t, e, n, r, s, i, o, a, l, c) {
        const u = [], h = this.ast.options && this.ast.options.params || Sf,
            d = this.buildStyles(n, o && o.params || Sf, u), p = a && a.params || Sf, f = this.buildStyles(r, p, u),
            m = new Set, g = new Map, y = new Map, _ = "void" === r,
            v = {params: Object.assign(Object.assign({}, h), p)},
            b = c ? [] : hf(t, e, this.ast.animation, s, i, d, f, v, l, u);
        let w = 0;
        if (b.forEach(t => {
            w = Math.max(t.duration + t.delay, w)
        }), u.length) return wf(e, this._triggerName, n, r, _, d, f, [], [], g, y, w, u);
        b.forEach(t => {
            const n = t.element, r = ap(g, n, {});
            t.preStyleProps.forEach(t => r[t] = !0);
            const s = ap(y, n, {});
            t.postStyleProps.forEach(t => s[t] = !0), n !== e && m.add(n)
        });
        const S = $p(m.values());
        return wf(e, this._triggerName, n, r, _, d, f, b, S, g, y, w)
    }
}

class Ef {
    constructor(t, e) {
        this.styles = t, this.defaultParams = e
    }

    buildStyles(t, e) {
        const n = {}, r = Ip(this.defaultParams);
        return Object.keys(t).forEach(e => {
            const n = t[e];
            null != n && (r[e] = n)
        }), this.styles.styles.forEach(t => {
            if ("string" != typeof t) {
                const s = t;
                Object.keys(s).forEach(t => {
                    let i = s[t];
                    i.length > 1 && (i = Hp(i, r, e)), n[t] = i
                })
            }
        }), n
    }
}

class xf {
    constructor(t, e) {
        this.name = t, this.ast = e, this.transitionFactories = [], this.states = {}, e.states.forEach(t => {
            this.states[t.name] = new Ef(t.style, t.options && t.options.params || {})
        }), kf(this.states, "true", "1"), kf(this.states, "false", "0"), e.transitions.forEach(e => {
            this.transitionFactories.push(new Cf(t, e, this.states))
        }), this.fallbackTransition = new Cf(t, {
            type: 1,
            animation: {type: 2, steps: [], options: null},
            matchers: [(t, e) => !0],
            options: null,
            queryCount: 0,
            depCount: 0
        }, this.states)
    }

    get containsQueries() {
        return this.ast.queryCount > 0
    }

    matchTransition(t, e, n, r) {
        return this.transitionFactories.find(s => s.match(t, e, n, r)) || null
    }

    matchStyles(t, e, n) {
        return this.fallbackTransition.buildStyles(t, e, n)
    }
}

function kf(t, e, n) {
    t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e]) : t.hasOwnProperty(n) && (t[e] = t[n])
}

const Tf = new lf;

class Of {
    constructor(t, e, n) {
        this.bodyNode = t, this._driver = e, this._normalizer = n, this._animations = {}, this._playersById = {}, this.players = []
    }

    register(t, e) {
        const n = [], r = tf(this._driver, e, n);
        if (n.length) throw new Error(`Unable to build the animation due to the following errors: ${n.join("\n")}`);
        this._animations[t] = r
    }

    _buildPlayer(t, e, n) {
        const r = t.element, s = rp(0, this._normalizer, 0, t.keyframes, e, n);
        return this._driver.animate(r, s, t.duration, t.delay, t.easing, [], !0)
    }

    create(t, e, n = {}) {
        const r = [], s = this._animations[t];
        let i;
        const o = new Map;
        if (s ? (i = hf(this._driver, e, s, Sp, Cp, {}, {}, n, Tf, r), i.forEach(t => {
            const e = ap(o, t.element, {});
            t.postStyleProps.forEach(t => e[t] = null)
        })) : (r.push("The requested animation doesn't exist or has already been destroyed"), i = []), r.length) throw new Error(`Unable to create the animation due to the following errors: ${r.join("\n")}`);
        o.forEach((t, e) => {
            Object.keys(t).forEach(n => {
                t[n] = this._driver.computeStyle(e, n, gl)
            })
        });
        const a = np(i.map(t => {
            const e = o.get(t.element);
            return this._buildPlayer(t, {}, e)
        }));
        return this._playersById[t] = a, a.onDestroy(() => this.destroy(t)), this.players.push(a), a
    }

    destroy(t) {
        const e = this._getPlayer(t);
        e.destroy(), delete this._playersById[t];
        const n = this.players.indexOf(e);
        n >= 0 && this.players.splice(n, 1)
    }

    _getPlayer(t) {
        const e = this._playersById[t];
        if (!e) throw new Error(`Unable to find the timeline player referenced by ${t}`);
        return e
    }

    listen(t, e, n, r) {
        const s = op(e, "", "", "");
        return sp(this._getPlayer(t), n, s, r), () => {
        }
    }

    command(t, e, n, r) {
        if ("register" == n) return void this.register(t, r[0]);
        if ("create" == n) return void this.create(t, e, r[0] || {});
        const s = this._getPlayer(t);
        switch (n) {
            case"play":
                s.play();
                break;
            case"pause":
                s.pause();
                break;
            case"reset":
                s.reset();
                break;
            case"restart":
                s.restart();
                break;
            case"finish":
                s.finish();
                break;
            case"init":
                s.init();
                break;
            case"setPosition":
                s.setPosition(parseFloat(r[0]));
                break;
            case"destroy":
                this.destroy(t)
        }
    }
}

const Af = "ng-animate-queued", Pf = "ng-animate-disabled", If = ".ng-animate-disabled", Rf = [],
    Nf = {namespaceId: "", setForRemoval: !1, setForMove: !1, hasAnimation: !1, removedBeforeQueried: !1},
    Df = {namespaceId: "", setForMove: !1, setForRemoval: !1, hasAnimation: !1, removedBeforeQueried: !0};

class jf {
    constructor(t, e = "") {
        this.namespaceId = e;
        const n = t && t.hasOwnProperty("value");
        if (this.value = null != (r = n ? t.value : t) ? r : null, n) {
            const e = Ip(t);
            delete e.value, this.options = e
        } else this.options = {};
        var r;
        this.options.params || (this.options.params = {})
    }

    get params() {
        return this.options.params
    }

    absorbOptions(t) {
        const e = t.params;
        if (e) {
            const t = this.options.params;
            Object.keys(e).forEach(n => {
                null == t[n] && (t[n] = e[n])
            })
        }
    }
}

const Mf = "void", Ff = new jf(Mf);

class Lf {
    constructor(t, e, n) {
        this.id = t, this.hostElement = e, this._engine = n, this.players = [], this._triggers = {}, this._queue = [], this._elementListeners = new Map, this._hostClassName = "ng-tns-" + t, qf(e, this._hostClassName)
    }

    listen(t, e, n, r) {
        if (!this._triggers.hasOwnProperty(e)) throw new Error(`Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`);
        if (null == n || 0 == n.length) throw new Error(`Unable to listen on the animation trigger "${e}" because the provided event is undefined!`);
        if ("start" != (s = n) && "done" != s) throw new Error(`The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`);
        var s;
        const i = ap(this._elementListeners, t, []), o = {name: e, phase: n, callback: r};
        i.push(o);
        const a = ap(this._engine.statesByElement, t, {});
        return a.hasOwnProperty(e) || (qf(t, Ep), qf(t, "ng-trigger-" + e), a[e] = Ff), () => {
            this._engine.afterFlush(() => {
                const t = i.indexOf(o);
                t >= 0 && i.splice(t, 1), this._triggers[e] || delete a[e]
            })
        }
    }

    register(t, e) {
        return !this._triggers[t] && (this._triggers[t] = e, !0)
    }

    _getTrigger(t) {
        const e = this._triggers[t];
        if (!e) throw new Error(`The provided animation trigger "${t}" has not been registered!`);
        return e
    }

    trigger(t, e, n, r = !0) {
        const s = this._getTrigger(e), i = new Hf(this.id, e, t);
        let o = this._engine.statesByElement.get(t);
        o || (qf(t, Ep), qf(t, "ng-trigger-" + e), this._engine.statesByElement.set(t, o = {}));
        let a = o[e];
        const l = new jf(n, this.id);
        if (!(n && n.hasOwnProperty("value")) && a && l.absorbOptions(a.options), o[e] = l, a || (a = Ff), l.value !== Mf && a.value === l.value) {
            if (!function (t, e) {
                const n = Object.keys(t), r = Object.keys(e);
                if (n.length != r.length) return !1;
                for (let s = 0; s < n.length; s++) {
                    const r = n[s];
                    if (!e.hasOwnProperty(r) || t[r] !== e[r]) return !1
                }
                return !0
            }(a.params, l.params)) {
                const e = [], n = s.matchStyles(a.value, a.params, e), r = s.matchStyles(l.value, l.params, e);
                e.length ? this._engine.reportError(e) : this._engine.afterFlush(() => {
                    Mp(t, n), jp(t, r)
                })
            }
            return
        }
        const c = ap(this._engine.playersByElement, t, []);
        c.forEach(t => {
            t.namespaceId == this.id && t.triggerName == e && t.queued && t.destroy()
        });
        let u = s.matchTransition(a.value, l.value, t, l.params), h = !1;
        if (!u) {
            if (!r) return;
            u = s.fallbackTransition, h = !0
        }
        return this._engine.totalQueuedPlayers++, this._queue.push({
            element: t,
            triggerName: e,
            transition: u,
            fromState: a,
            toState: l,
            player: i,
            isFallbackTransition: h
        }), h || (qf(t, Af), i.onStart(() => {
            Qf(t, Af)
        })), i.onDone(() => {
            let e = this.players.indexOf(i);
            e >= 0 && this.players.splice(e, 1);
            const n = this._engine.playersByElement.get(t);
            if (n) {
                let t = n.indexOf(i);
                t >= 0 && n.splice(t, 1)
            }
        }), this.players.push(i), c.push(i), i
    }

    deregister(t) {
        delete this._triggers[t], this._engine.statesByElement.forEach((e, n) => {
            delete e[t]
        }), this._elementListeners.forEach((e, n) => {
            this._elementListeners.set(n, e.filter(e => e.name != t))
        })
    }

    clearElementCache(t) {
        this._engine.statesByElement.delete(t), this._elementListeners.delete(t);
        const e = this._engine.playersByElement.get(t);
        e && (e.forEach(t => t.destroy()), this._engine.playersByElement.delete(t))
    }

    _signalRemovalForInnerTriggers(t, e) {
        const n = this._engine.driver.query(t, xp, !0);
        n.forEach(t => {
            if (t.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(t);
            n.size ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0)) : this.clearElementCache(t)
        }), this._engine.afterFlushAnimationsDone(() => n.forEach(t => this.clearElementCache(t)))
    }

    triggerLeaveAnimation(t, e, n, r) {
        const s = this._engine.statesByElement.get(t);
        if (s) {
            const i = [];
            if (Object.keys(s).forEach(e => {
                if (this._triggers[e]) {
                    const n = this.trigger(t, e, Mf, r);
                    n && i.push(n)
                }
            }), i.length) return this._engine.markElementAsRemoved(this.id, t, !0, e), n && np(i).onDone(() => this._engine.processLeaveNode(t)), !0
        }
        return !1
    }

    prepareLeaveAnimationListeners(t) {
        const e = this._elementListeners.get(t), n = this._engine.statesByElement.get(t);
        if (e && n) {
            const r = new Set;
            e.forEach(e => {
                const s = e.name;
                if (r.has(s)) return;
                r.add(s);
                const i = this._triggers[s].fallbackTransition, o = n[s] || Ff, a = new jf(Mf),
                    l = new Hf(this.id, s, t);
                this._engine.totalQueuedPlayers++, this._queue.push({
                    element: t,
                    triggerName: s,
                    transition: i,
                    fromState: o,
                    toState: a,
                    player: l,
                    isFallbackTransition: !0
                })
            })
        }
    }

    removeNode(t, e) {
        const n = this._engine;
        if (t.childElementCount && this._signalRemovalForInnerTriggers(t, e), this.triggerLeaveAnimation(t, e, !0)) return;
        let r = !1;
        if (n.totalAnimations) {
            const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
            if (e && e.length) r = !0; else {
                let e = t;
                for (; e = e.parentNode;) if (n.statesByElement.get(e)) {
                    r = !0;
                    break
                }
            }
        }
        if (this.prepareLeaveAnimationListeners(t), r) n.markElementAsRemoved(this.id, t, !1, e); else {
            const r = t.__ng_removed;
            r && r !== Nf || (n.afterFlush(() => this.clearElementCache(t)), n.destroyInnerAnimations(t), n._onRemovalComplete(t, e))
        }
    }

    insertNode(t, e) {
        qf(t, this._hostClassName)
    }

    drainQueuedTransitions(t) {
        const e = [];
        return this._queue.forEach(n => {
            const r = n.player;
            if (r.destroyed) return;
            const s = n.element, i = this._elementListeners.get(s);
            i && i.forEach(e => {
                if (e.name == n.triggerName) {
                    const r = op(s, n.triggerName, n.fromState.value, n.toState.value);
                    r._data = t, sp(n.player, e.phase, r, e.callback)
                }
            }), r.markedForDestroy ? this._engine.afterFlush(() => {
                r.destroy()
            }) : e.push(n)
        }), this._queue = [], e.sort((t, e) => {
            const n = t.transition.ast.depCount, r = e.transition.ast.depCount;
            return 0 == n || 0 == r ? n - r : this._engine.driver.containsElement(t.element, e.element) ? 1 : -1
        })
    }

    destroy(t) {
        this.players.forEach(t => t.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, t)
    }

    elementContainsData(t) {
        let e = !1;
        return this._elementListeners.has(t) && (e = !0), e = !!this._queue.find(e => e.element === t) || e, e
    }
}

class Uf {
    constructor(t, e, n) {
        this.bodyNode = t, this.driver = e, this._normalizer = n, this.players = [], this.newHostElements = new Map, this.playersByElement = new Map, this.playersByQueriedElement = new Map, this.statesByElement = new Map, this.disabledNodes = new Set, this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map, this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = (t, e) => {
        }
    }

    _onRemovalComplete(t, e) {
        this.onRemovalComplete(t, e)
    }

    get queuedPlayers() {
        const t = [];
        return this._namespaceList.forEach(e => {
            e.players.forEach(e => {
                e.queued && t.push(e)
            })
        }), t
    }

    createNamespace(t, e) {
        const n = new Lf(t, e, this);
        return this.bodyNode && this.driver.containsElement(this.bodyNode, e) ? this._balanceNamespaceList(n, e) : (this.newHostElements.set(e, n), this.collectEnterElement(e)), this._namespaceLookup[t] = n
    }

    _balanceNamespaceList(t, e) {
        const n = this._namespaceList.length - 1;
        if (n >= 0) {
            let r = !1;
            for (let s = n; s >= 0; s--) if (this.driver.containsElement(this._namespaceList[s].hostElement, e)) {
                this._namespaceList.splice(s + 1, 0, t), r = !0;
                break
            }
            r || this._namespaceList.splice(0, 0, t)
        } else this._namespaceList.push(t);
        return this.namespacesByHostElement.set(e, t), t
    }

    register(t, e) {
        let n = this._namespaceLookup[t];
        return n || (n = this.createNamespace(t, e)), n
    }

    registerTrigger(t, e, n) {
        let r = this._namespaceLookup[t];
        r && r.register(e, n) && this.totalAnimations++
    }

    destroy(t, e) {
        if (!t) return;
        const n = this._fetchNamespace(t);
        this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement), delete this._namespaceLookup[t];
            const e = this._namespaceList.indexOf(n);
            e >= 0 && this._namespaceList.splice(e, 1)
        }), this.afterFlushAnimationsDone(() => n.destroy(e))
    }

    _fetchNamespace(t) {
        return this._namespaceLookup[t]
    }

    fetchNamespacesByElement(t) {
        const e = new Set, n = this.statesByElement.get(t);
        if (n) {
            const t = Object.keys(n);
            for (let r = 0; r < t.length; r++) {
                const s = n[t[r]].namespaceId;
                if (s) {
                    const t = this._fetchNamespace(s);
                    t && e.add(t)
                }
            }
        }
        return e
    }

    trigger(t, e, n, r) {
        if ($f(e)) {
            const s = this._fetchNamespace(t);
            if (s) return s.trigger(e, n, r), !0
        }
        return !1
    }

    insertNode(t, e, n, r) {
        if (!$f(e)) return;
        const s = e.__ng_removed;
        if (s && s.setForRemoval) {
            s.setForRemoval = !1, s.setForMove = !0;
            const t = this.collectedLeaveElements.indexOf(e);
            t >= 0 && this.collectedLeaveElements.splice(t, 1)
        }
        if (t) {
            const r = this._fetchNamespace(t);
            r && r.insertNode(e, n)
        }
        r && this.collectEnterElement(e)
    }

    collectEnterElement(t) {
        this.collectedEnterElements.push(t)
    }

    markElementAsDisabled(t, e) {
        e ? this.disabledNodes.has(t) || (this.disabledNodes.add(t), qf(t, Pf)) : this.disabledNodes.has(t) && (this.disabledNodes.delete(t), Qf(t, Pf))
    }

    removeNode(t, e, n, r) {
        if ($f(e)) {
            const s = t ? this._fetchNamespace(t) : null;
            if (s ? s.removeNode(e, r) : this.markElementAsRemoved(t, e, !1, r), n) {
                const n = this.namespacesByHostElement.get(e);
                n && n.id !== t && n.removeNode(e, r)
            }
        } else this._onRemovalComplete(e, r)
    }

    markElementAsRemoved(t, e, n, r) {
        this.collectedLeaveElements.push(e), e.__ng_removed = {
            namespaceId: t,
            setForRemoval: r,
            hasAnimation: n,
            removedBeforeQueried: !1
        }
    }

    listen(t, e, n, r, s) {
        return $f(e) ? this._fetchNamespace(t).listen(e, n, r, s) : () => {
        }
    }

    _buildInstruction(t, e, n, r, s) {
        return t.transition.build(this.driver, t.element, t.fromState.value, t.toState.value, n, r, t.fromState.options, t.toState.options, e, s)
    }

    destroyInnerAnimations(t) {
        let e = this.driver.query(t, xp, !0);
        e.forEach(t => this.destroyActiveAnimationsForElement(t)), 0 != this.playersByQueriedElement.size && (e = this.driver.query(t, Tp, !0), e.forEach(t => this.finishActiveQueriedAnimationOnElement(t)))
    }

    destroyActiveAnimationsForElement(t) {
        const e = this.playersByElement.get(t);
        e && e.forEach(t => {
            t.queued ? t.markedForDestroy = !0 : t.destroy()
        })
    }

    finishActiveQueriedAnimationOnElement(t) {
        const e = this.playersByQueriedElement.get(t);
        e && e.forEach(t => t.finish())
    }

    whenRenderingDone() {
        return new Promise(t => {
            if (this.players.length) return np(this.players).onDone(() => t());
            t()
        })
    }

    processLeaveNode(t) {
        const e = t.__ng_removed;
        if (e && e.setForRemoval) {
            if (t.__ng_removed = Nf, e.namespaceId) {
                this.destroyInnerAnimations(t);
                const n = this._fetchNamespace(e.namespaceId);
                n && n.clearElementCache(t)
            }
            this._onRemovalComplete(t, e.setForRemoval)
        }
        this.driver.matchesElement(t, If) && this.markElementAsDisabled(t, !1), this.driver.query(t, If, !0).forEach(t => {
            this.markElementAsDisabled(t, !1)
        })
    }

    flush(t = -1) {
        let e = [];
        if (this.newHostElements.size && (this.newHostElements.forEach((t, e) => this._balanceNamespaceList(t, e)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length) for (let n = 0; n < this.collectedEnterElements.length; n++) qf(this.collectedEnterElements[n], "ng-star-inserted");
        if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
            const n = [];
            try {
                e = this._flushAnimations(n, t)
            } finally {
                for (let t = 0; t < n.length; t++) n[t]()
            }
        } else for (let n = 0; n < this.collectedLeaveElements.length; n++) this.processLeaveNode(this.collectedLeaveElements[n]);
        if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach(t => t()), this._flushFns = [], this._whenQuietFns.length) {
            const t = this._whenQuietFns;
            this._whenQuietFns = [], e.length ? np(e).onDone(() => {
                t.forEach(t => t())
            }) : t.forEach(t => t())
        }
    }

    reportError(t) {
        throw new Error(`Unable to process animations due to the following failed trigger transitions\n ${t.join("\n")}`)
    }

    _flushAnimations(t, e) {
        const n = new lf, r = [], s = new Map, i = [], o = new Map, a = new Map, l = new Map, c = new Set;
        this.disabledNodes.forEach(t => {
            c.add(t);
            const e = this.driver.query(t, ".ng-animate-queued", !0);
            for (let n = 0; n < e.length; n++) c.add(e[n])
        });
        const u = this.bodyNode, h = Array.from(this.statesByElement.keys()), d = Bf(h, this.collectedEnterElements),
            p = new Map;
        let f = 0;
        d.forEach((t, e) => {
            const n = Sp + f++;
            p.set(e, n), t.forEach(t => qf(t, n))
        });
        const m = [], g = new Set, y = new Set;
        for (let P = 0; P < this.collectedLeaveElements.length; P++) {
            const t = this.collectedLeaveElements[P], e = t.__ng_removed;
            e && e.setForRemoval && (m.push(t), g.add(t), e.hasAnimation ? this.driver.query(t, ".ng-star-inserted", !0).forEach(t => g.add(t)) : y.add(t))
        }
        const _ = new Map, v = Bf(h, Array.from(g));
        v.forEach((t, e) => {
            const n = Cp + f++;
            _.set(e, n), t.forEach(t => qf(t, n))
        }), t.push(() => {
            d.forEach((t, e) => {
                const n = p.get(e);
                t.forEach(t => Qf(t, n))
            }), v.forEach((t, e) => {
                const n = _.get(e);
                t.forEach(t => Qf(t, n))
            }), m.forEach(t => {
                this.processLeaveNode(t)
            })
        });
        const b = [], w = [];
        for (let P = this._namespaceList.length - 1; P >= 0; P--) this._namespaceList[P].drainQueuedTransitions(e).forEach(t => {
            const e = t.player, s = t.element;
            if (b.push(e), this.collectedEnterElements.length) {
                const t = s.__ng_removed;
                if (t && t.setForMove) return void e.destroy()
            }
            const c = !u || !this.driver.containsElement(u, s), h = _.get(s), d = p.get(s),
                f = this._buildInstruction(t, n, d, h, c);
            if (f.errors && f.errors.length) w.push(f); else {
                if (c) return e.onStart(() => Mp(s, f.fromStyles)), e.onDestroy(() => jp(s, f.toStyles)), void r.push(e);
                if (t.isFallbackTransition) return e.onStart(() => Mp(s, f.fromStyles)), e.onDestroy(() => jp(s, f.toStyles)), void r.push(e);
                f.timelines.forEach(t => t.stretchStartingKeyframe = !0), n.append(s, f.timelines), i.push({
                    instruction: f,
                    player: e,
                    element: s
                }), f.queriedElements.forEach(t => ap(o, t, []).push(e)), f.preStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    if (n.length) {
                        let t = a.get(e);
                        t || a.set(e, t = new Set), n.forEach(e => t.add(e))
                    }
                }), f.postStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    let r = l.get(e);
                    r || l.set(e, r = new Set), n.forEach(t => r.add(t))
                })
            }
        });
        if (w.length) {
            const t = [];
            w.forEach(e => {
                t.push(`@${e.triggerName} has failed due to:\n`), e.errors.forEach(e => t.push(`- ${e}\n`))
            }), b.forEach(t => t.destroy()), this.reportError(t)
        }
        const S = new Map, C = new Map;
        i.forEach(t => {
            const e = t.element;
            n.has(e) && (C.set(e, e), this._beforeAnimationBuild(t.player.namespaceId, t.instruction, S))
        }), r.forEach(t => {
            const e = t.element;
            this._getPreviousPlayers(e, !1, t.namespaceId, t.triggerName, null).forEach(t => {
                ap(S, e, []).push(t), t.destroy()
            })
        });
        const E = m.filter(t => Gf(t, a, l)), x = new Map;
        Vf(x, this.driver, y, l, gl).forEach(t => {
            Gf(t, a, l) && E.push(t)
        });
        const k = new Map;
        d.forEach((t, e) => {
            Vf(k, this.driver, new Set(t), a, "!")
        }), E.forEach(t => {
            const e = x.get(t), n = k.get(t);
            x.set(t, Object.assign(Object.assign({}, e), n))
        });
        const T = [], O = [], A = {};
        i.forEach(t => {
            const {element: e, player: i, instruction: o} = t;
            if (n.has(e)) {
                if (c.has(e)) return i.onDestroy(() => jp(e, o.toStyles)), i.disabled = !0, i.overrideTotalTime(o.totalTime), void r.push(i);
                let t = A;
                if (C.size > 1) {
                    let n = e;
                    const r = [];
                    for (; n = n.parentNode;) {
                        const e = C.get(n);
                        if (e) {
                            t = e;
                            break
                        }
                        r.push(n)
                    }
                    r.forEach(e => C.set(e, t))
                }
                const n = this._buildAnimation(i.namespaceId, o, S, s, k, x);
                if (i.setRealPlayer(n), t === A) T.push(i); else {
                    const e = this.playersByElement.get(t);
                    e && e.length && (i.parentPlayer = np(e)), r.push(i)
                }
            } else Mp(e, o.fromStyles), i.onDestroy(() => jp(e, o.toStyles)), O.push(i), c.has(e) && r.push(i)
        }), O.forEach(t => {
            const e = s.get(t.element);
            if (e && e.length) {
                const n = np(e);
                t.setRealPlayer(n)
            }
        }), r.forEach(t => {
            t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy()
        });
        for (let P = 0; P < m.length; P++) {
            const t = m[P], e = t.__ng_removed;
            if (Qf(t, Cp), e && e.hasAnimation) continue;
            let n = [];
            if (o.size) {
                let e = o.get(t);
                e && e.length && n.push(...e);
                let r = this.driver.query(t, Tp, !0);
                for (let t = 0; t < r.length; t++) {
                    let e = o.get(r[t]);
                    e && e.length && n.push(...e)
                }
            }
            const r = n.filter(t => !t.destroyed);
            r.length ? Kf(this, t, r) : this.processLeaveNode(t)
        }
        return m.length = 0, T.forEach(t => {
            this.players.push(t), t.onDone(() => {
                t.destroy();
                const e = this.players.indexOf(t);
                this.players.splice(e, 1)
            }), t.play()
        }), T
    }

    elementContainsData(t, e) {
        let n = !1;
        const r = e.__ng_removed;
        return r && r.setForRemoval && (n = !0), this.playersByElement.has(e) && (n = !0), this.playersByQueriedElement.has(e) && (n = !0), this.statesByElement.has(e) && (n = !0), this._fetchNamespace(t).elementContainsData(e) || n
    }

    afterFlush(t) {
        this._flushFns.push(t)
    }

    afterFlushAnimationsDone(t) {
        this._whenQuietFns.push(t)
    }

    _getPreviousPlayers(t, e, n, r, s) {
        let i = [];
        if (e) {
            const e = this.playersByQueriedElement.get(t);
            e && (i = e)
        } else {
            const e = this.playersByElement.get(t);
            if (e) {
                const t = !s || s == Mf;
                e.forEach(e => {
                    e.queued || (t || e.triggerName == r) && i.push(e)
                })
            }
        }
        return (n || r) && (i = i.filter(t => !(n && n != t.namespaceId || r && r != t.triggerName))), i
    }

    _beforeAnimationBuild(t, e, n) {
        const r = e.element, s = e.isRemovalTransition ? void 0 : t, i = e.isRemovalTransition ? void 0 : e.triggerName;
        for (const o of e.timelines) {
            const t = o.element, a = t !== r, l = ap(n, t, []);
            this._getPreviousPlayers(t, a, s, i, e.toState).forEach(t => {
                const e = t.getRealPlayer();
                e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t)
            })
        }
        Mp(r, e.fromStyles)
    }

    _buildAnimation(t, e, n, r, s, i) {
        const o = e.triggerName, a = e.element, l = [], c = new Set, u = new Set, h = e.timelines.map(e => {
            const h = e.element;
            c.add(h);
            const d = h.__ng_removed;
            if (d && d.removedBeforeQueried) return new Cl(e.duration, e.delay);
            const p = h !== a, f = function (t) {
                    const e = [];
                    return Wf(t, e), e
                }((n.get(h) || Rf).map(t => t.getRealPlayer())).filter(t => !!t.element && t.element === h), m = s.get(h),
                g = i.get(h), y = rp(0, this._normalizer, 0, e.keyframes, m, g), _ = this._buildPlayer(e, y, f);
            if (e.subTimeline && r && u.add(h), p) {
                const e = new Hf(t, o, h);
                e.setRealPlayer(_), l.push(e)
            }
            return _
        });
        l.forEach(t => {
            ap(this.playersByQueriedElement, t.element, []).push(t), t.onDone(() => function (t, e, n) {
                let r;
                if (t instanceof Map) {
                    if (r = t.get(e), r) {
                        if (r.length) {
                            const t = r.indexOf(n);
                            r.splice(t, 1)
                        }
                        0 == r.length && t.delete(e)
                    }
                } else if (r = t[e], r) {
                    if (r.length) {
                        const t = r.indexOf(n);
                        r.splice(t, 1)
                    }
                    0 == r.length && delete t[e]
                }
                return r
            }(this.playersByQueriedElement, t.element, t))
        }), c.forEach(t => qf(t, kp));
        const d = np(h);
        return d.onDestroy(() => {
            c.forEach(t => Qf(t, kp)), jp(a, e.toStyles)
        }), u.forEach(t => {
            ap(r, t, []).push(d)
        }), d
    }

    _buildPlayer(t, e, n) {
        return e.length > 0 ? this.driver.animate(t.element, e, t.duration, t.delay, t.easing, n) : new Cl(t.duration, t.delay)
    }
}

class Hf {
    constructor(t, e, n) {
        this.namespaceId = t, this.triggerName = e, this.element = n, this._player = new Cl, this._containsRealPlayer = !1, this._queuedCallbacks = {}, this.destroyed = !1, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, this.totalTime = 0
    }

    setRealPlayer(t) {
        this._containsRealPlayer || (this._player = t, Object.keys(this._queuedCallbacks).forEach(e => {
            this._queuedCallbacks[e].forEach(n => sp(t, e, void 0, n))
        }), this._queuedCallbacks = {}, this._containsRealPlayer = !0, this.overrideTotalTime(t.totalTime), this.queued = !1)
    }

    getRealPlayer() {
        return this._player
    }

    overrideTotalTime(t) {
        this.totalTime = t
    }

    syncPlayerEvents(t) {
        const e = this._player;
        e.triggerCallback && t.onStart(() => e.triggerCallback("start")), t.onDone(() => this.finish()), t.onDestroy(() => this.destroy())
    }

    _queueEvent(t, e) {
        ap(this._queuedCallbacks, t, []).push(e)
    }

    onDone(t) {
        this.queued && this._queueEvent("done", t), this._player.onDone(t)
    }

    onStart(t) {
        this.queued && this._queueEvent("start", t), this._player.onStart(t)
    }

    onDestroy(t) {
        this.queued && this._queueEvent("destroy", t), this._player.onDestroy(t)
    }

    init() {
        this._player.init()
    }

    hasStarted() {
        return !this.queued && this._player.hasStarted()
    }

    play() {
        !this.queued && this._player.play()
    }

    pause() {
        !this.queued && this._player.pause()
    }

    restart() {
        !this.queued && this._player.restart()
    }

    finish() {
        this._player.finish()
    }

    destroy() {
        this.destroyed = !0, this._player.destroy()
    }

    reset() {
        !this.queued && this._player.reset()
    }

    setPosition(t) {
        this.queued || this._player.setPosition(t)
    }

    getPosition() {
        return this.queued ? 0 : this._player.getPosition()
    }

    triggerCallback(t) {
        const e = this._player;
        e.triggerCallback && e.triggerCallback(t)
    }
}

function $f(t) {
    return t && 1 === t.nodeType
}

function zf(t, e) {
    const n = t.style.display;
    return t.style.display = null != e ? e : "none", n
}

function Vf(t, e, n, r, s) {
    const i = [];
    n.forEach(t => i.push(zf(t)));
    const o = [];
    r.forEach((n, r) => {
        const i = {};
        n.forEach(t => {
            const n = i[t] = e.computeStyle(r, t, s);
            n && 0 != n.length || (r.__ng_removed = Df, o.push(r))
        }), t.set(r, i)
    });
    let a = 0;
    return n.forEach(t => zf(t, i[a++])), o
}

function Bf(t, e) {
    const n = new Map;
    if (t.forEach(t => n.set(t, [])), 0 == e.length) return n;
    const r = new Set(e), s = new Map;

    function i(t) {
        if (!t) return 1;
        let e = s.get(t);
        if (e) return e;
        const o = t.parentNode;
        return e = n.has(o) ? o : r.has(o) ? 1 : i(o), s.set(t, e), e
    }

    return e.forEach(t => {
        const e = i(t);
        1 !== e && n.get(e).push(t)
    }), n
}

function qf(t, e) {
    if (t.classList) t.classList.add(e); else {
        let n = t.$$classes;
        n || (n = t.$$classes = {}), n[e] = !0
    }
}

function Qf(t, e) {
    if (t.classList) t.classList.remove(e); else {
        let n = t.$$classes;
        n && delete n[e]
    }
}

function Kf(t, e, n) {
    np(n).onDone(() => t.processLeaveNode(e))
}

function Wf(t, e) {
    for (let n = 0; n < t.length; n++) {
        const r = t[n];
        r instanceof El ? Wf(r.players, e) : e.push(r)
    }
}

function Gf(t, e, n) {
    const r = n.get(t);
    if (!r) return !1;
    let s = e.get(t);
    return s ? r.forEach(t => s.add(t)) : e.set(t, r), n.delete(t), !0
}

class Zf {
    constructor(t, e, n) {
        this.bodyNode = t, this._driver = e, this._triggerCache = {}, this.onRemovalComplete = (t, e) => {
        }, this._transitionEngine = new Uf(t, e, n), this._timelineEngine = new Of(t, e, n), this._transitionEngine.onRemovalComplete = (t, e) => this.onRemovalComplete(t, e)
    }

    registerTrigger(t, e, n, r, s) {
        const i = t + "-" + r;
        let o = this._triggerCache[i];
        if (!o) {
            const t = [], e = tf(this._driver, s, t);
            if (t.length) throw new Error(`The animation trigger "${r}" has failed to build due to the following errors:\n - ${t.join("\n - ")}`);
            o = function (t, e) {
                return new xf(t, e)
            }(r, e), this._triggerCache[i] = o
        }
        this._transitionEngine.registerTrigger(e, r, o)
    }

    register(t, e) {
        this._transitionEngine.register(t, e)
    }

    destroy(t, e) {
        this._transitionEngine.destroy(t, e)
    }

    onInsert(t, e, n, r) {
        this._transitionEngine.insertNode(t, e, n, r)
    }

    onRemove(t, e, n, r) {
        this._transitionEngine.removeNode(t, e, r || !1, n)
    }

    disableAnimations(t, e) {
        this._transitionEngine.markElementAsDisabled(t, e)
    }

    process(t, e, n, r) {
        if ("@" == n.charAt(0)) {
            const [t, s] = lp(n);
            this._timelineEngine.command(t, e, s, r)
        } else this._transitionEngine.trigger(t, e, n, r)
    }

    listen(t, e, n, r, s) {
        if ("@" == n.charAt(0)) {
            const [t, r] = lp(n);
            return this._timelineEngine.listen(t, e, r, s)
        }
        return this._transitionEngine.listen(t, e, n, r, s)
    }

    flush(t = -1) {
        this._transitionEngine.flush(t)
    }

    get players() {
        return this._transitionEngine.players.concat(this._timelineEngine.players)
    }

    whenRenderingDone() {
        return this._transitionEngine.whenRenderingDone()
    }
}

function Yf(t, e) {
    let n = null, r = null;
    return Array.isArray(e) && e.length ? (n = Xf(e[0]), e.length > 1 && (r = Xf(e[e.length - 1]))) : e && (n = Xf(e)), n || r ? new Jf(t, n, r) : null
}

let Jf = (() => {
    class t {
        constructor(e, n, r) {
            this._element = e, this._startStyles = n, this._endStyles = r, this._state = 0;
            let s = t.initialStylesByElement.get(e);
            s || t.initialStylesByElement.set(e, s = {}), this._initialStyles = s
        }

        start() {
            this._state < 1 && (this._startStyles && jp(this._element, this._startStyles, this._initialStyles), this._state = 1)
        }

        finish() {
            this.start(), this._state < 2 && (jp(this._element, this._initialStyles), this._endStyles && (jp(this._element, this._endStyles), this._endStyles = null), this._state = 1)
        }

        destroy() {
            this.finish(), this._state < 3 && (t.initialStylesByElement.delete(this._element), this._startStyles && (Mp(this._element, this._startStyles), this._endStyles = null), this._endStyles && (Mp(this._element, this._endStyles), this._endStyles = null), jp(this._element, this._initialStyles), this._state = 3)
        }
    }

    return t.initialStylesByElement = new WeakMap, t
})();

function Xf(t) {
    let e = null;
    const n = Object.keys(t);
    for (let r = 0; r < n.length; r++) {
        const s = n[r];
        tm(s) && (e = e || {}, e[s] = t[s])
    }
    return e
}

function tm(t) {
    return "display" === t || "position" === t
}

const em = "animation", nm = "animationend";

class rm {
    constructor(t, e, n, r, s, i, o) {
        this._element = t, this._name = e, this._duration = n, this._delay = r, this._easing = s, this._fillMode = i, this._onDoneFn = o, this._finished = !1, this._destroyed = !1, this._startTime = 0, this._position = 0, this._eventFn = t => this._handleCallback(t)
    }

    apply() {
        !function (t, e) {
            const n = cm(t, "").trim();
            n.length && (function (t, e) {
                let n = 0;
                for (let r = 0; r < t.length; r++) "," === t.charAt(r) && n++
            }(n), e = `${n}, ${e}`), lm(t, "", e)
        }(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`), am(this._element, this._eventFn, !1), this._startTime = Date.now()
    }

    pause() {
        sm(this._element, this._name, "paused")
    }

    resume() {
        sm(this._element, this._name, "running")
    }

    setPosition(t) {
        const e = im(this._element, this._name);
        this._position = t * this._duration, lm(this._element, "Delay", `-${this._position}ms`, e)
    }

    getPosition() {
        return this._position
    }

    _handleCallback(t) {
        const e = t._ngTestManualTimestamp || Date.now(), n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
        t.animationName == this._name && Math.max(e - this._startTime, 0) >= this._delay && n >= this._duration && this.finish()
    }

    finish() {
        this._finished || (this._finished = !0, this._onDoneFn(), am(this._element, this._eventFn, !0))
    }

    destroy() {
        this._destroyed || (this._destroyed = !0, this.finish(), function (t, e) {
            const n = cm(t, "").split(","), r = om(n, e);
            r >= 0 && (n.splice(r, 1), lm(t, "", n.join(",")))
        }(this._element, this._name))
    }
}

function sm(t, e, n) {
    lm(t, "PlayState", n, im(t, e))
}

function im(t, e) {
    const n = cm(t, "");
    return n.indexOf(",") > 0 ? om(n.split(","), e) : om([n], e)
}

function om(t, e) {
    for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
    return -1
}

function am(t, e, n) {
    n ? t.removeEventListener(nm, e) : t.addEventListener(nm, e)
}

function lm(t, e, n, r) {
    const s = em + e;
    if (null != r) {
        const e = t.style[s];
        if (e.length) {
            const t = e.split(",");
            t[r] = n, n = t.join(",")
        }
    }
    t.style[s] = n
}

function cm(t, e) {
    return t.style[em + e] || ""
}

class um {
    constructor(t, e, n, r, s, i, o, a) {
        this.element = t, this.keyframes = e, this.animationName = n, this._duration = r, this._delay = s, this._finalStyles = o, this._specialStyles = a, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this.currentSnapshot = {}, this._state = 0, this.easing = i || "linear", this.totalTime = r + s, this._buildStyler()
    }

    onStart(t) {
        this._onStartFns.push(t)
    }

    onDone(t) {
        this._onDoneFns.push(t)
    }

    onDestroy(t) {
        this._onDestroyFns.push(t)
    }

    destroy() {
        this.init(), this._state >= 4 || (this._state = 4, this._styler.destroy(), this._flushStartFns(), this._flushDoneFns(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
    }

    _flushDoneFns() {
        this._onDoneFns.forEach(t => t()), this._onDoneFns = []
    }

    _flushStartFns() {
        this._onStartFns.forEach(t => t()), this._onStartFns = []
    }

    finish() {
        this.init(), this._state >= 3 || (this._state = 3, this._styler.finish(), this._flushStartFns(), this._specialStyles && this._specialStyles.finish(), this._flushDoneFns())
    }

    setPosition(t) {
        this._styler.setPosition(t)
    }

    getPosition() {
        return this._styler.getPosition()
    }

    hasStarted() {
        return this._state >= 2
    }

    init() {
        this._state >= 1 || (this._state = 1, this._styler.apply(), this._delay && this._styler.pause())
    }

    play() {
        this.init(), this.hasStarted() || (this._flushStartFns(), this._state = 2, this._specialStyles && this._specialStyles.start()), this._styler.resume()
    }

    pause() {
        this.init(), this._styler.pause()
    }

    restart() {
        this.reset(), this.play()
    }

    reset() {
        this._state = 0, this._styler.destroy(), this._buildStyler(), this._styler.apply()
    }

    _buildStyler() {
        this._styler = new rm(this.element, this.animationName, this._duration, this._delay, this.easing, "forwards", () => this.finish())
    }

    triggerCallback(t) {
        const e = "start" == t ? this._onStartFns : this._onDoneFns;
        e.forEach(t => t()), e.length = 0
    }

    beforeDestroy() {
        this.init();
        const t = {};
        if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach(n => {
                "offset" != n && (t[n] = e ? this._finalStyles[n] : Kp(this.element, n))
            })
        }
        this.currentSnapshot = t
    }
}

class hm extends Cl {
    constructor(t, e) {
        super(), this.element = t, this._startingStyles = {}, this.__initialized = !1, this._styles = vp(e)
    }

    init() {
        !this.__initialized && this._startingStyles && (this.__initialized = !0, Object.keys(this._styles).forEach(t => {
            this._startingStyles[t] = this.element.style[t]
        }), super.init())
    }

    play() {
        this._startingStyles && (this.init(), Object.keys(this._styles).forEach(t => this.element.style.setProperty(t, this._styles[t])), super.play())
    }

    destroy() {
        this._startingStyles && (Object.keys(this._startingStyles).forEach(t => {
            const e = this._startingStyles[t];
            e ? this.element.style.setProperty(t, e) : this.element.style.removeProperty(t)
        }), this._startingStyles = null, super.destroy())
    }
}

class dm {
    constructor() {
        this._count = 0
    }

    validateStyleProperty(t) {
        return mp(t)
    }

    matchesElement(t, e) {
        return gp(t, e)
    }

    containsElement(t, e) {
        return yp(t, e)
    }

    query(t, e, n) {
        return _p(t, e, n)
    }

    computeStyle(t, e, n) {
        return window.getComputedStyle(t)[e]
    }

    buildKeyframeElement(t, e, n) {
        n = n.map(t => vp(t));
        let r = `@keyframes ${e} {\n`, s = "";
        n.forEach(t => {
            s = " ";
            const e = parseFloat(t.offset);
            r += `${s}${100 * e}% {\n`, s += " ", Object.keys(t).forEach(e => {
                const n = t[e];
                switch (e) {
                    case"offset":
                        return;
                    case"easing":
                        return void (n && (r += `${s}animation-timing-function: ${n};\n`));
                    default:
                        return void (r += `${s}${e}: ${n};\n`)
                }
            }), r += `${s}}\n`
        }), r += "}\n";
        const i = document.createElement("style");
        return i.textContent = r, i
    }

    animate(t, e, n, r, s, i = [], o) {
        const a = i.filter(t => t instanceof um), l = {};
        Bp(n, r) && a.forEach(t => {
            let e = t.currentSnapshot;
            Object.keys(e).forEach(t => l[t] = e[t])
        });
        const c = function (t) {
            let e = {};
            return t && (Array.isArray(t) ? t : [t]).forEach(t => {
                Object.keys(t).forEach(n => {
                    "offset" != n && "easing" != n && (e[n] = t[n])
                })
            }), e
        }(e = qp(t, e, l));
        if (0 == n) return new hm(t, c);
        const u = "gen_css_kf_" + this._count++, h = this.buildKeyframeElement(t, u, e);
        (function (t) {
            var e;
            const n = null === (e = t.getRootNode) || void 0 === e ? void 0 : e.call(t);
            return "undefined" != typeof ShadowRoot && n instanceof ShadowRoot ? n : document.head
        })(t).appendChild(h);
        const d = Yf(t, e), p = new um(t, e, u, n, r, s, c, d);
        return p.onDestroy(() => {
            var t;
            (t = h).parentNode.removeChild(t)
        }), p
    }
}

class pm {
    constructor(t, e, n, r) {
        this.element = t, this.keyframes = e, this.options = n, this._specialStyles = r, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, this._finished = !1, this._started = !1, this._destroyed = !1, this.time = 0, this.parentPlayer = null, this.currentSnapshot = {}, this._duration = n.duration, this._delay = n.delay || 0, this.time = this._duration + this._delay
    }

    _onFinish() {
        this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
    }

    init() {
        this._buildPlayer(), this._preparePlayerBeforeStart()
    }

    _buildPlayer() {
        if (this._initialized) return;
        this._initialized = !0;
        const t = this.keyframes;
        this.domPlayer = this._triggerWebAnimation(this.element, t, this.options), this._finalKeyframe = t.length ? t[t.length - 1] : {}, this.domPlayer.addEventListener("finish", () => this._onFinish())
    }

    _preparePlayerBeforeStart() {
        this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
    }

    _triggerWebAnimation(t, e, n) {
        return t.animate(e, n)
    }

    onStart(t) {
        this._onStartFns.push(t)
    }

    onDone(t) {
        this._onDoneFns.push(t)
    }

    onDestroy(t) {
        this._onDestroyFns.push(t)
    }

    play() {
        this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach(t => t()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), this.domPlayer.play()
    }

    pause() {
        this.init(), this.domPlayer.pause()
    }

    finish() {
        this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish()
    }

    reset() {
        this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1
    }

    _resetDomPlayerState() {
        this.domPlayer && this.domPlayer.cancel()
    }

    restart() {
        this.reset(), this.play()
    }

    hasStarted() {
        return this._started
    }

    destroy() {
        this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
    }

    setPosition(t) {
        void 0 === this.domPlayer && this.init(), this.domPlayer.currentTime = t * this.time
    }

    getPosition() {
        return this.domPlayer.currentTime / this.time
    }

    get totalTime() {
        return this._delay + this._duration
    }

    beforeDestroy() {
        const t = {};
        this.hasStarted() && Object.keys(this._finalKeyframe).forEach(e => {
            "offset" != e && (t[e] = this._finished ? this._finalKeyframe[e] : Kp(this.element, e))
        }), this.currentSnapshot = t
    }

    triggerCallback(t) {
        const e = "start" == t ? this._onStartFns : this._onDoneFns;
        e.forEach(t => t()), e.length = 0
    }
}

class fm {
    constructor() {
        this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(mm().toString()), this._cssKeyframesDriver = new dm
    }

    validateStyleProperty(t) {
        return mp(t)
    }

    matchesElement(t, e) {
        return gp(t, e)
    }

    containsElement(t, e) {
        return yp(t, e)
    }

    query(t, e, n) {
        return _p(t, e, n)
    }

    computeStyle(t, e, n) {
        return window.getComputedStyle(t)[e]
    }

    overrideWebAnimationsSupport(t) {
        this._isNativeImpl = t
    }

    animate(t, e, n, r, s, i = [], o) {
        if (!o && !this._isNativeImpl) return this._cssKeyframesDriver.animate(t, e, n, r, s, i);
        const a = {duration: n, delay: r, fill: 0 == r ? "both" : "forwards"};
        s && (a.easing = s);
        const l = {}, c = i.filter(t => t instanceof pm);
        Bp(n, r) && c.forEach(t => {
            let e = t.currentSnapshot;
            Object.keys(e).forEach(t => l[t] = e[t])
        });
        const u = Yf(t, e = qp(t, e = e.map(t => Rp(t, !1)), l));
        return new pm(t, e, a, u)
    }
}

function mm() {
    return tp() && Element.prototype.animate || {}
}

let gm = (() => {
    class t extends ml {
        constructor(t, e) {
            super(), this._nextAnimationId = 0, this._renderer = t.createRenderer(e.body, {
                id: "0",
                encapsulation: St.None,
                styles: [],
                data: {animation: []}
            })
        }

        build(t) {
            const e = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(t) ? vl(t) : t;
            return vm(this._renderer, null, e, "register", [n]), new ym(e, this._renderer)
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(gi), Fn(ha))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

class ym extends class {
} {
    constructor(t, e) {
        super(), this._id = t, this._renderer = e
    }

    create(t, e) {
        return new _m(this._id, t, e || {}, this._renderer)
    }
}

class _m {
    constructor(t, e, n, r) {
        this.id = t, this.element = e, this._renderer = r, this.parentPlayer = null, this._started = !1, this.totalTime = 0, this._command("create", n)
    }

    _listen(t, e) {
        return this._renderer.listen(this.element, `@@${this.id}:${t}`, e)
    }

    _command(t, ...e) {
        return vm(this._renderer, this.element, this.id, t, e)
    }

    onDone(t) {
        this._listen("done", t)
    }

    onStart(t) {
        this._listen("start", t)
    }

    onDestroy(t) {
        this._listen("destroy", t)
    }

    init() {
        this._command("init")
    }

    hasStarted() {
        return this._started
    }

    play() {
        this._command("play"), this._started = !0
    }

    pause() {
        this._command("pause")
    }

    restart() {
        this._command("restart")
    }

    finish() {
        this._command("finish")
    }

    destroy() {
        this._command("destroy")
    }

    reset() {
        this._command("reset"), this._started = !1
    }

    setPosition(t) {
        this._command("setPosition", t)
    }

    getPosition() {
        var t, e;
        return null !== (e = null === (t = this._renderer.engine.players[+this.id]) || void 0 === t ? void 0 : t.getPosition()) && void 0 !== e ? e : 0
    }
}

function vm(t, e, n, r, s) {
    return t.setProperty(e, `@@${n}:${r}`, s)
}

const bm = "@", wm = "@.disabled";
let Sm = (() => {
    class t {
        constructor(t, e, n) {
            this.delegate = t, this.engine = e, this._zone = n, this._currentId = 0, this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map, this._cdRecurDepth = 0, this.promise = Promise.resolve(0), e.onRemovalComplete = (t, e) => {
                e && e.parentNode(t) && e.removeChild(t.parentNode, t)
            }
        }

        createRenderer(t, e) {
            const n = this.delegate.createRenderer(t, e);
            if (!(t && e && e.data && e.data.animation)) {
                let t = this._rendererCache.get(n);
                return t || (t = new Cm("", n, this.engine), this._rendererCache.set(n, t)), t
            }
            const r = e.id, s = e.id + "-" + this._currentId;
            this._currentId++, this.engine.register(s, t);
            const i = e => {
                Array.isArray(e) ? e.forEach(i) : this.engine.registerTrigger(r, s, t, e.name, e)
            };
            return e.data.animation.forEach(i), new Em(this, s, n, this.engine)
        }

        begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin()
        }

        _scheduleCountTask() {
            this.promise.then(() => {
                this._microtaskId++
            })
        }

        scheduleListenerCallback(t, e, n) {
            t >= 0 && t < this._microtaskId ? this._zone.run(() => e(n)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(() => {
                this._zone.run(() => {
                    this._animationCallbacksBuffer.forEach(t => {
                        const [e, n] = t;
                        e(n)
                    }), this._animationCallbacksBuffer = []
                })
            }), this._animationCallbacksBuffer.push([e, n]))
        }

        end() {
            this._cdRecurDepth--, 0 == this._cdRecurDepth && this._zone.runOutsideAngular(() => {
                this._scheduleCountTask(), this.engine.flush(this._microtaskId)
            }), this.delegate.end && this.delegate.end()
        }

        whenRenderingDone() {
            return this.engine.whenRenderingDone()
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(gi), Fn(Zf), Fn(No))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();

class Cm {
    constructor(t, e, n) {
        this.namespaceId = t, this.delegate = e, this.engine = n, this.destroyNode = this.delegate.destroyNode ? t => e.destroyNode(t) : null
    }

    get data() {
        return this.delegate.data
    }

    destroy() {
        this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy()
    }

    createElement(t, e) {
        return this.delegate.createElement(t, e)
    }

    createComment(t) {
        return this.delegate.createComment(t)
    }

    createText(t) {
        return this.delegate.createText(t)
    }

    appendChild(t, e) {
        this.delegate.appendChild(t, e), this.engine.onInsert(this.namespaceId, e, t, !1)
    }

    insertBefore(t, e, n, r = !0) {
        this.delegate.insertBefore(t, e, n), this.engine.onInsert(this.namespaceId, e, t, r)
    }

    removeChild(t, e, n) {
        this.engine.onRemove(this.namespaceId, e, this.delegate, n)
    }

    selectRootElement(t, e) {
        return this.delegate.selectRootElement(t, e)
    }

    parentNode(t) {
        return this.delegate.parentNode(t)
    }

    nextSibling(t) {
        return this.delegate.nextSibling(t)
    }

    setAttribute(t, e, n, r) {
        this.delegate.setAttribute(t, e, n, r)
    }

    removeAttribute(t, e, n) {
        this.delegate.removeAttribute(t, e, n)
    }

    addClass(t, e) {
        this.delegate.addClass(t, e)
    }

    removeClass(t, e) {
        this.delegate.removeClass(t, e)
    }

    setStyle(t, e, n, r) {
        this.delegate.setStyle(t, e, n, r)
    }

    removeStyle(t, e, n) {
        this.delegate.removeStyle(t, e, n)
    }

    setProperty(t, e, n) {
        e.charAt(0) == bm && e == wm ? this.disableAnimations(t, !!n) : this.delegate.setProperty(t, e, n)
    }

    setValue(t, e) {
        this.delegate.setValue(t, e)
    }

    listen(t, e, n) {
        return this.delegate.listen(t, e, n)
    }

    disableAnimations(t, e) {
        this.engine.disableAnimations(t, e)
    }
}

class Em extends Cm {
    constructor(t, e, n, r) {
        super(e, n, r), this.factory = t, this.namespaceId = e
    }

    setProperty(t, e, n) {
        e.charAt(0) == bm ? "." == e.charAt(1) && e == wm ? this.disableAnimations(t, n = void 0 === n || !!n) : this.engine.process(this.namespaceId, t, e.substr(1), n) : this.delegate.setProperty(t, e, n)
    }

    listen(t, e, n) {
        if (e.charAt(0) == bm) {
            const r = function (t) {
                switch (t) {
                    case"body":
                        return document.body;
                    case"document":
                        return document;
                    case"window":
                        return window;
                    default:
                        return t
                }
            }(t);
            let s = e.substr(1), i = "";
            return s.charAt(0) != bm && ([s, i] = function (t) {
                const e = t.indexOf(".");
                return [t.substring(0, e), t.substr(e + 1)]
            }(s)), this.engine.listen(this.namespaceId, r, s, i, t => {
                this.factory.scheduleListenerCallback(t._data || -1, n, t)
            })
        }
        return this.delegate.listen(t, e, n)
    }
}

let xm = (() => {
    class t extends Zf {
        constructor(t, e, n) {
            super(t.body, e, n)
        }

        ngOnDestroy() {
            this.flush()
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)(Fn(ha), Fn(wp), Fn(_f))
    }, t.\u0275prov = at({token: t, factory: t.\u0275fac}), t
})();
const km = new En("AnimationModuleType"), Tm = [{provide: ml, useClass: gm}, {
        provide: _f, useFactory: function () {
            return new vf
        }
    }, {provide: Zf, useClass: xm}, {
        provide: gi, useFactory: function (t, e, n) {
            return new Sm(t, e, n)
        }, deps: [nl, Zf, No]
    }], Om = [{
        provide: wp, useFactory: function () {
            return "function" == typeof mm() ? new fm : new dm
        }
    }, {provide: km, useValue: "BrowserAnimations"}, ...Tm],
    Am = [{provide: wp, useClass: bp}, {provide: km, useValue: "NoopAnimations"}, ...Tm];
let Pm = (() => {
    class t {
        static withConfig(e) {
            return {ngModule: t, providers: e.disableAnimations ? Am : Om}
        }
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275mod = zt({type: t}), t.\u0275inj = lt({providers: Om, imports: [fl]}), t
})();
const Im = [{path: "", component: Jd}];
let Rm = (() => {
    class t {
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275mod = zt({type: t}), t.\u0275inj = lt({imports: [[ld.forRoot(Im)], ld]}), t
})(), Nm = (() => {
    class t {
    }

    return t.\u0275fac = function (e) {
        return new (e || t)
    }, t.\u0275mod = zt({type: t, bootstrap: [Xd]}), t.\u0275inj = lt({providers: [], imports: [[fl, Pm, ld, Rm]]}), t
})();
(function () {
    if (Qo) throw new Error("Cannot enable prod mode after platform setup.");
    qo = !1
})(), dl().bootstrapModule(Nm).catch(t => console.error(t))
}
},
t => {
    "use strict";
    t(t.s = 101)
}
])
;
