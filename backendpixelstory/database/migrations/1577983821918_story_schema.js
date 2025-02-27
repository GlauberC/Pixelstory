'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StorySchema extends Schema {
  up() {
    this.create('stories', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('stories');
  }
}

module.exports = StorySchema;
