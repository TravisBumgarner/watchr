import * as uuid from 'uuidv4'

import knex from './knex'

type NewUserType = {
    first_name: string
    last_name: string
    password: string
    email: string
}

const create = async ({ first_name, last_name, password, email }: NewUserType) => {
    const dbResponse = await knex('users').insert({
        id: uuid(),
        first_name,
        last_name,
        password,
        email
    })
    return dbResponse
}

const findByEmail = async (email: string): Promise<boolean> => {
    const dbResponse = await knex('users')
        .select('*')
        .where('email', email)
    return dbResponse
}

export { create, findByEmail }
