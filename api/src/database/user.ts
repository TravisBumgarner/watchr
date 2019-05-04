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

// TODO: what is this return type and also await wtf
const findByEmail = async (email: string) => {
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

export { create, findByEmail }
