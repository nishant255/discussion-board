console.log("Loading routes.js");
var path              = require('path'),
    commentController = require('./../controllers/commentController.js');
    postController    = require('./../controllers/postController.js');
    topicController   = require('./../controllers/topicController.js');
    userController    = require('./../controllers/userController.js');

module.exports = function (app) {

  app.post('/user', userController.createUser);
  app.get('/user/:id', userController.getUser);

  app.get('/topics', topicController.getTopics);
  app.post('/topics', topicController.createTopic);
  app.get('/topic/:id', topicController.getTopic);

  app.get('/posts', postController.getPosts);
  app.post('/posts', postController.createPost);
};
