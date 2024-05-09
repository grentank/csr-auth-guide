const express = require('express');
const { Post } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const postRouter = express.Router();

postRouter
  .route('/')
  .get(async (req, res) => {
    const posts = await Post.findAll({ order: [['id', 'DESC']] });
    res.json(posts);
  })
  .post(verifyAccessToken, async (req, res) => {
    const post = await Post.create({ ...req.body, userId: res.locals.user.id });
    res.status(201).json(post);
  });

postRouter
  .route('/:postId')
  .delete(verifyAccessToken, async (req, res) => {
    const post = await Post.findByPk(req.params.postId);
    await post.destroy();
    res.sendStatus(204);
  })
  .get(async (req, res) => {
    const post = await Post.findByPk(req.params.postId);
    res.json(post);
  });

module.exports = postRouter;
