"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../users");
exports.seed = function (knex) {
    return knex('users')
        .del()
        .then(function () {
        return users_1.create({ name: 'Travis', username: 'foobar' });
    });
};
