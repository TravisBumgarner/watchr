"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function up(knex) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, knex.schema.createTable('users', function (table) {
                    table.text('id').primary();
                    table.text('username');
                    table.text('name');
                })];
        });
    });
}
exports.up = up;
function down(knex) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, knex.schema.dropTable('users')];
        });
    });
}
exports.down = down;
