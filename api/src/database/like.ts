import * as uuid from 'uuidv4'

import knex from './knex'

type Like = {
    user_id: string
    movie_id: string
    liked: boolean
    watched: boolean
}

const create = async ({ user_id, movie_id, liked, watched }: Like): Promise<number> => {
    const dbResponse = await knex('user_likes').insert({
        id: uuid(),
        user_id,
        movie_id,
        liked,
        watched
    })
    return dbResponse[0]
}

const findByUserId = async (id: string) => {
    console.log(id)
    const dbResponse = await knex('user_likes')
        .select('*')
        .where('user_id', id)
        
    return dbResponse
}

export { create, findByUserId, Like as LikeType }
