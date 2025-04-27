"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectIfAuthenticatedGuard = void 0;
const router_1 = require("@angular/router");
const js_cookie_1 = __importDefault(require("js-cookie"));
const redirectIfAuthenticatedGuard = (route, state) => {
    const router = new router_1.Router();
    const token = js_cookie_1.default.get('token');
    if (token) {
        router.navigate(['/']);
        return true;
    }
    return false;
};
exports.redirectIfAuthenticatedGuard = redirectIfAuthenticatedGuard;
