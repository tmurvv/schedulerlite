export default {
    preset: "ts-jest",
    testEnvironment: "node",

    // Include .test.ts files anywhere
    testMatch: ["**/*.test.ts"],

    // Transpile TS
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
};
