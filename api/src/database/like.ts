import * as uuid from 'uuidv4'

import knex from './knex'

type NewLike = {
    user_id: string
    movie_id: string
    liked: boolean
}

const create = async ({ user_id, movie_id, liked }: NewLike): Promise<number> => {
    const dbResponse = await knex('user_likes').insert({
        id: uuid(),
        user_id,
        movie_id,
        liked
    })
    return dbResponse[0]
}

const findById = async (user_id: string) => {
    const dbResponse = await knex('user_likes')
        .select('*')
        .where('user_id', user_id)
    return dbResponse
}

export { create, findById }
