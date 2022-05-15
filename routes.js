"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_controller_1 = require("./controller/example.controller");
function routes(app) {
    app.get('/users', example_controller_1.exampleResponse);
}
exports.default = routes;
