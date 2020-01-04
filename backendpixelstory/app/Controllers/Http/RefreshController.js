'use strict';

const Scene = use('App/Models/Scene');
const File = use('App/Models/File');

class RefreshController {
  async update({ params, response }) {
    const scene = await Scene.findOrFail(params.id);
    if (scene.count_refresh <= 0) {
      return response.status('412').send({
        error: { message: 'This scene do not have refreshes remaning' },
      });
    }

    const ids = await File.ids();
    const fileId = await ids[Math.floor(Math.random() * ids.length)];
    scene.merge({ count_refresh: scene.count_refresh - 1, file_id: fileId });

    await scene.save();
    await scene.load('file');
    return scene;
  }
}

module.exports = RefreshController;
