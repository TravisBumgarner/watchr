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

const create = async ({ id, original_title, adult, video, popularity }: Movie) => {
    console.log(id)
    const dbResponse = await knex('movies').insert({
        id,
        original_title,
        adult,
        video,
        popularity
    })
    console.log('db', dbResponse)
    return dbResponse
}

export { getList, Movie as MovieType, create }
