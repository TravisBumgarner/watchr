"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./src");
var port = process.env.PORT || 8000;
src_1.default.listen(port, function () {
    console.log("Running on port " + port);
});
