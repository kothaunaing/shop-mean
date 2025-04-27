"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const redirect_if_authenticated_guard_1 = require("./redirect-if-authenticated.guard");
describe('redirectIfAuthenticatedGuard', () => {
    const executeGuard = (...guardParameters) => testing_1.TestBed.runInInjectionContext(() => (0, redirect_if_authenticated_guard_1.redirectIfAuthenticatedGuard)(...guardParameters));
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
    });
    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
