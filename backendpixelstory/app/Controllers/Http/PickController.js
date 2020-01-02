'use strict';

const File = use('App/Models/File');

class PickController {
  async show() {
    const ids = await File.ids();

    const file = await File.find(ids[Math.floor(Math.random() * ids.length)]);
    return file;
  }
}

module.exports = PickController;
