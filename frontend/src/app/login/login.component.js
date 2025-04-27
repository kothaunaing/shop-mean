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
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
let LoginComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-login',
            imports: [router_1.RouterLink],
            templateUrl: './login.component.html',
            styleUrl: './login.component.css',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LoginComponent = _classThis = class {
        constructor(authService, router) {
            this.authService = authService;
            this.router = router;
            this.loading = (0, core_1.signal)(false);
            this.errorMessage = (0, core_1.signal)('');
        }
        login(event, data) {
            event.preventDefault();
            clearTimeout(this.errorMessageTimeoutId);
            this.errorMessageTimeoutId = setTimeout(() => {
                this.errorMessage.set('');
            }, 5000);
            if (!data.email.trim()) {
                this.errorMessage.set('Email is a required field');
                return;
            }
            if (!data.password.trim()) {
                this.errorMessage.set('Password is a required field');
                return;
            }
            this.loading.set(true);
            this.authService
                .login(data)
                .pipe((0, rxjs_1.catchError)((error) => {
                var _a;
                this.loading.set(false);
                this.errorMessage.set((_a = error.error) === null || _a === void 0 ? void 0 : _a.msg);
                console.log(error);
                return (0, rxjs_1.throwError)(() => new Error('Something went wrong'));
            }))
                .subscribe((res) => {
                this.authService.currentUser = res.user;
                this.loading.set(false);
                this.router.navigate(['/']);
            });
        }
    };
    __setFunctionName(_classThis, "LoginComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginComponent = _classThis;
})();
exports.LoginComponent = LoginComponent;
