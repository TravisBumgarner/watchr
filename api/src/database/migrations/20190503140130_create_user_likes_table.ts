import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('user_likes', table => {
        table.uuid('id').primary()
        table.uuid('user_id')
        table.integer('movie_id')
        table.boolean('liked')
        table.boolean('watched')
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('user_likes')
}
