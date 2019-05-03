import * as uuid from 'uuidv4'

import knex from './knex'

const create = ({ username, name }: { username: string; name: string }) => {
    return knex('users').insert({ id: uuid(), username, name })
}

export { create }
