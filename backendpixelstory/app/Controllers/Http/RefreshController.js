'use strict';

const Scene = use('App/Models/Scene');

class RefreshController {
  async update({ params, response }) {
    const scene = await Scene.findOrFail(params.id);
    if (scene.count_refresh <= 0) {
      return response.status('412').send({
        error: { message: 'This scene do not have refreshes remaning' },
      });
    }

    scene.merge({ count_refresh: scene.count_refresh - 1 });

    await scene.save();
    return scene;
  }
}

module.exports = RefreshController;
