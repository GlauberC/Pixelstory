'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Scene extends Model {
  story() {
    return this.belongsTo('App/Models/Story');
  }

  file() {
    return this.belongsTo('App/Models/File');
  }
}

module.exports = Scene;
