import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import PostItem from '../ui/PostItem';

export default function PostsPage() {
  const loadedPosts = useLoaderData();
  const [posts, setPosts] = useState(loadedPosts);
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
            <PostItem post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
