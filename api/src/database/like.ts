import * as uuid from 'uuidv4'

import knex from './knex'

const create = async ({ user_id, movie_id, liked }: any) => {
    const dbResponse = await knex('user_likes').insert({ id: uuid(), user_id, movie_id, liked })
    return dbResponse
}

export { create }
