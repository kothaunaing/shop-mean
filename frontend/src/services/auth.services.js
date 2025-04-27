"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let AuthServices = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthServices = _classThis = class {
        constructor(router) {
            this.router = router;
            this.checkingAuth = (0, core_1.signal)(true);
            this.currentUser = null;
            this.http = (0, core_1.inject)(http_1.HttpClient);
            this.apiUrl = 'http://localhost:5000/api/auth';
        }
        register(data) {
            return this.http.post(this.apiUrl + '/register', data, {
                withCredentials: true,
            });
        }
        login(data) {
            return this.http.post(this.apiUrl + '/login', data, {
                withCredentials: true,
            });
        }
        logout() {
            this.http
                .get(this.apiUrl + '/logout', { withCredentials: true })
                .subscribe((res) => {
                console.log('Logged out successfully');
            });
            this.router.navigate(['/login']);
            this.currentUser = null;
        }
        checkAuth() {
            this.checkingAuth.set(true);
            this.http
                .get(this.apiUrl + '/check-auth', { withCredentials: true })
                .pipe((0, rxjs_1.catchError)((error) => {
                this.checkingAuth.set(false);
                this.router.navigate(['/login']);
                return (0, rxjs_1.throwError)(() => new Error('Something went wrong'));
            }))
                .subscribe((res) => {
                this.checkingAuth.set(false);
                this.currentUser = res.user;
            });
        }
    };
    __setFunctionName(_classThis, "AuthServices");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthServices = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthServices = _classThis;
})();
exports.AuthServices = AuthServices;
