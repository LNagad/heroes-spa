import { types } from "../../../src/auth";

describe('testing "types.js"', () => {

    test("should return these types", () => {
        expect(types).toEqual({
            login: "[Auth] Login",
            logout: "[Auth] Logout",
        });
    });
    
});
