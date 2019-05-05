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

export { getList, Movie as MovieType }
