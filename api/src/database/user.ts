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

type RegisteredUser = {
    first_name?: string
    last_name?: string
    password?: string
    email?: string
    id: string
    username: string
}

const getAllNotCurrentUser = async (id: string): Promise<RegisteredUser[]> => {
    const dbResponse = await knex('users')
        .select('id', 'username')
        .whereNot('id', id)
    console.log(dbResponse)
    return await dbResponse
}

const findByUsername = async (username: string): Promise<RegisteredUser | null> => {
    const dbResponse = await knex('users')
        .select('*')
        .where('username', username)
    return await dbResponse[0]
}

const findByEmail = async (email: string): Promise<RegisteredUser | null> => {
    const dbResponse = await knex('users')
        .select('*')
        .where('email', email)
    return await dbResponse[0]
}

export { register, findByUsername, findByEmail, RegisteredUser as RegisteredUserType, NewUser as NewUserType, getAllNotCurrentUser }
