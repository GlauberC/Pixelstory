'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Story extends Model {
  scenes() {
    return this.hasMany('App/Models/Scene');
  }
}

module.exports = Story;
