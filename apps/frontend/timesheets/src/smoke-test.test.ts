/// <reference types="jest" />

import {onePlusOne} from "./smoke-test";

test("smoke test", () => {
    expect(onePlusOne()).toBe(2);
});
