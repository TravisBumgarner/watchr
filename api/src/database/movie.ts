import knex from './knex'

const getList = async () => {
    const dbResponse = await knex('movies').select('*')
    return dbResponse
}

export { getList }
