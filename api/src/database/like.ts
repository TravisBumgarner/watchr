import * as uuid from "uuidv4";

import knex from "./knex";

const create = async ({ user_id, movie_id, liked }: any) => {
  const dbResponse = await knex("user_likes").insert({
    id: uuid(),
    user_id,
    movie_id,
    liked
  });
  return dbResponse;
};

const findByUserId = async (id: any) => {
  const dbResponse = await knex("user_likes")
    .select("*")
    .where("user_id", id);
  return dbResponse;
};

const findById = async (user_id: any) => {
  const dbResponse = await knex("user_likes")
    .select("*")
    .where("user_id", user_id);
  return dbResponse;
};

export { create, findByUserId, findById };
