"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const login_component_1 = require("./login/login.component");
const register_component_1 = require("./register/register.component");
const home_component_1 = require("./home/home.component");
exports.routes = [
    { path: '', component: home_component_1.HomeComponent },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        // canActivate: [redirectIfAuthenticatedGuard],
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent,
        // canActivate: [redirectIfAuthenticatedGuard],
    },
];
