'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('files/', 'FileController.store');
Route.get('files/', 'FileController.index');
Route.get('files/:id', 'FileController.show');

Route.get('pick/', 'PickController.show');

Route.post('story/', 'StoryController.store');
Route.get('story/', 'StoryController.index');
Route.get('story/:id', 'StoryController.show');
Route.put('story/:id', 'StoryController.update');
Route.delete('story/:id', 'StoryController.destroy');

Route.post('story/:story_id/scene', 'SceneController.store');
Route.get('story/:story_id/scene', 'SceneController.index');
Route.put('scene/:id', 'SceneController.update');
Route.delete('scene/:id', 'SceneController.destroy');
