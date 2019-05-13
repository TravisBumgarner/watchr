import knex from './knex'

type Movie = {
    id: number
    original_title: string
    adult: boolean
    video: boolean
    popularity: number
}

const getList = async (): Promise<Movie[]> => {
    const dbResponse = await knex('movies').select('*')
    return dbResponse
}

const getById = async (id: string): Promise<Movie[]> => {
    //TODO: This could be optimized to get list of IDs
    const dbResponse = await knex('movies')
        .select('*')
        .where('id', id)
    return dbResponse
}

const create = async ({ id, original_title, adult, video, popularity }: Movie) => {
    console.log(id)
    const dbResponse = await knex('movies').insert({
        id,
        original_title,
        adult,
        video,
        popularity
    })
    return await dbResponse
}

export { getList, Movie as MovieType, create, getById }
