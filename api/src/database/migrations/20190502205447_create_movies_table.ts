import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('movies', table => {
        table.text('id').primary()
        table.text('original_title')
        table.boolean('adult')
        table.boolean('video')
        table.float('popularity')
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('movies')
}
