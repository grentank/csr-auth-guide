import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import PostItem from '../ui/PostItem';
import appService from '../../service/instance';

export default function PostsPage({ user }) {
  const loadedPosts = useLoaderData();
  const [posts, setPosts] = useState(loadedPosts);
  const deleteHandler = async (postId) => {
    await appService.deletePost(postId);
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>Posts page</h2>
        </div>
      </div>
      <div className="row">
        {posts.map((post) => (
          <div className="col-4" key={post.id}>
            <PostItem deleteHandler={deleteHandler} post={post} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
