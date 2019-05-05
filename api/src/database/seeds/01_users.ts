import * as Knex from "knex";

import { create } from "../user";

exports.seed = (knex: Knex) => {
  return knex("users")
    .del()
    .then(() => {
      return create({
        first_name: "bob",
        last_name: "smith",
        password: "hello123",
        email: "foo@foo.com"
      });
    });
};
