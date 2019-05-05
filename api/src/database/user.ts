import * as uuid from 'uuidv4'

import knex from './knex'

type NewUser = {
    first_name: string
    last_name: string
    password: string
    email: string
}

const create = async ({ first_name, last_name, password, email }: NewUser) => {
    const dbResponse = await knex('users').insert({
        id: uuid(),
        first_name,
        last_name,
        password,
        email
    })
    return dbResponse
}

// TODO: How to handle this being almost the same as new user?
type CurrentUser = {
    first_name: string
    last_name: string
    password: string
    email: string
    id: string
}

const findByEmail = async (email: string): Promise<CurrentUser | null> => {
    console.log('email'), email
    const dbResponse = await knex('users')
        .select('*')
        .where('email', email)
    if ((await dbResponse.length) === 1) {
        return await dbResponse[0]
    } else {
        return null
    }
}

export { create, findByEmail, CurrentUser as CurrentUserType }
