const express = require('express');
const { Post, User } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const apiPostsRouter = express.Router();

apiPostsRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    const posts = await Post.findAll({
      order: [['id', 'DESC']],
      include: User,
    });
    res.json(posts);
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const newPost = await Post.create({ ...req.body, userId: res.locals.user.id });
      const newPostWithUser = await Post.findOne({ where: { id: newPost.id }, include: User });
      res.status(201).json(newPostWithUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error while creating' });
    }
  });

apiPostsRouter.get('/personal', verifyAccessToken, async (req, res) => {
  const posts = await Post.findAll({
    where: { userId: res.locals.user.id },
    include: User,
  });
  res.json(posts);
});

apiPostsRouter
  .route('/:id')
  .delete(verifyAccessToken, async (req, res) => {
    await Post.destroy({
      where: { id: req.params.id },
    });
    res.sendStatus(200);
  })
  .patch(verifyAccessToken, async (req, res) => {
    try {
      const { title, body } = req.body;
      const targetPost = await Post.findOne({ where: { id: req.params.id }, include: User });
      if (title) targetPost.title = title;
      if (body) targetPost.body = body;
      await targetPost.save();
      res.json(targetPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'ERROR EDITING POST' });
    }
  })
  .get(verifyAccessToken, async (req, res) => {
    const post = await Post.findOne({ where: { id: req.params.id }, include: User });
    res.json(post);
  });

module.exports = apiPostsRouter;
