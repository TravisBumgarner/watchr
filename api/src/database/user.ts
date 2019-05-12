import * as uuid from 'uuidv4'

import knex from './knex'

type NewUser = {
    first_name: string
    last_name: string
    password: string
    email: string
    username: string
}

const register = async ({ first_name, last_name, password, email, username }: NewUser) => {
    const dbResponse = await knex('users').insert({
        id: uuid(),
        first_name,
        last_name,
        password,
        email,
        username
    })
    return dbResponse
}

type CurrentUser = {
    first_name: string
    last_name: string
    password: string
    email: string
    id: string
    username: string
}

const findByUsername = async (username: string): Promise<CurrentUser | null> => {
    const dbResponse = await knex('users')
        .select('*')
        .where('username', username)
    if ((await dbResponse.length) === 1) {
        return await dbResponse[0]
    } else {
        return null
    }
}

const findByEmail = async (email: string): Promise<CurrentUser | null> => {
    const dbResponse = await knex('users')
        .select('*')
        .where('email', email)
    if ((await dbResponse.length) === 1) {
        return await dbResponse[0]
    } else {
        return null
    }
}

export { register, findByUsername, findByEmail, CurrentUser as CurrentUserType, NewUser as NewUserType }
