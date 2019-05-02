"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuidv4");
var knex_1 = require("../knex");
var create = function (_a) {
    var username = _a.username, name = _a.name;
    return knex_1.default('users').insert({ id: uuid(), username: username, name: name });
};
exports.default = create;
