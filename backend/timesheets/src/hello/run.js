const { handler } = require("../../dist/hello/handler.js");

handler().then((result) => {
    console.log("Lambda result:", result);
});
