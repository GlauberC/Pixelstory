'use strict';

const Scene = use('App/Models/Scene');
class SceneController {
  async index({ params }) {
    const scenes = await Scene.query()
      .where('story_id', params.story_id)
      .with('file')
      .fetch();
    return scenes;
  }

  async store({ request, params }) {
    const data = request.only(['file_id', 'description']);
    const scene = await Scene.create({ ...data, story_id: params.story_id });
    return scene;
  }

  async update({ params, request }) {
    const scene = await Scene.findOrFail(params.id);
    const data = request.only(['description', 'file_id']);
    scene.merge(data);

    await scene.save();
    return scene;
  }

  async destroy({ params }) {
    const scene = await Scene.findOrFail(params.id);
    await scene.delete();
  }
}

module.exports = SceneController;
