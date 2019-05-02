"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = require("axios");
var request = function (endpoint, params) {
    var BASE_URL = 'https://api.themoviedb.org/3/';
    var query = '?' +
        Object.keys(params)
            .map(function (key) { return key + '=' + params[key]; })
            .join('&');
    axios_1.default.get(BASE_URL + endpoint + query);
};
var get_daily_file_exports = function (type) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, year, month, day, url, data;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = new Date()
                    .toISOString()
                    .split('T')[0]
                    .split('-'), year = _a[0], month = _a[1], day = _a[2];
                url = "http://files.tmdb.org/p/exports/" + type + "_ids_" + month + "_" + day + "_" + year + ".json.gz";
                return [4, axios_1.default.get(url)];
            case 1:
                data = (_b.sent()).data;
                console.log(data);
                return [2];
        }
    });
}); };
exports.default = { request: request, get_daily_file_exports: get_daily_file_exports };
