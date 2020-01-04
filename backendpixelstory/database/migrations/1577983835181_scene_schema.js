'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SceneSchema extends Schema {
  up() {
    this.create('scenes', (table) => {
      table.increments();
      table
        .integer('story_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('stories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.text('description');
      table
        .integer('count_refresh')
        .defaultTo(3)
        .unsigned()
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('scenes');
  }
}

module.exports = SceneSchema;
