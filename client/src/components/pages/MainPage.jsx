import React, { useEffect, useState } from 'react';
import PostCard from '../ui/PostCard';
import axiosInstance from '../../axiosInstance';

export default function MainPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axiosInstance('/posts').then((res) => setPosts(res.data));
  }, []);
  const deleteHandler = async (postId) => {
    const res = await axiosInstance.delete(`/posts/${postId}`);
    if (res.status === 204) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };
  return (
    <div className="row">
      {posts.map((post) => (
        <div key={post.id} className="col-4">
          <PostCard post={post} deleteHandler={deleteHandler} />
        </div>
      ))}
    </div>
  );
}
