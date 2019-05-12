import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', table => {
        table
            .uuid('id')
            .primary()
            .notNullable()
        table
            .text('email')
            .unique()
            .notNullable()
        table
            .text('username')
            .unique()
            .notNullable()
        table.text('first_name').notNullable()
        table.text('last_name').notNullable()
        table.text('password').notNullable()
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users')
}
