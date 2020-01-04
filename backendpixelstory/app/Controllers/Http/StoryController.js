'use strict';

const Story = use('App/Models/Story');

class StoryController {
  async index({ request }) {
    const { page } = request.get();
    const stories = await Story.query()
      .orderBy('updated_at', 'desc')
      .with('scenes')
      .paginate(page);
    return stories;
  }

  async store({ request }) {
    const data = request.only(['title', 'description']);

    const story = await Story.create(data);

    return story;
  }

  async show({ params }) {
    const story = await Story.findOrFail(params.id);
    await story.load('scenes');

    return story;
  }

  async update({ params, request }) {
    const story = await Story.findOrFail(params.id);
    const data = request.only(['title', 'description']);
    story.merge(data);
    await story.save();
    return story;
  }

  async destroy({ params }) {
    const story = await Story.findOrFail(params.id);
    await story.delete();
  }
}

module.exports = StoryController;
