import * as Knex from 'knex'

import { create } from '../users'

exports.seed = (knex: Knex) => {
    return knex('users')
        .del()
        .then(() => {
            return create({ name: 'Travis', username: 'foobar' })
        })
}
