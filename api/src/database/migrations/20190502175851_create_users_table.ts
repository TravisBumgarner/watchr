import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', table => {
        table.uuid('id').primary()
        table.text('username')
        table.text('email')
        table.text('name')
        table.text('hash')
        table.text('salt')
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users')
}
