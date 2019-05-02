"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment = process.env.NODE_ENV || 'development';
var config = require('./knexfile')[environment];
var knex = require('knex')(config);
exports.default = knex;
