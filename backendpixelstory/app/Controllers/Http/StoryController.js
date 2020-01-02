'use strict';

const Story = use('App/Models/Story');

class StoryController {
  async index() {
    const stories = await Story.all();
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
