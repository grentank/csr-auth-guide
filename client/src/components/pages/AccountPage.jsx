import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import PostItem from '../ui/PostItem';
import axiosInstance from '../../service/instance';

export default function AccountPage({ user }) {
  const data = useLoaderData();
  const [posts, setPosts] = useState(data);
  const deleteHandler = async (postId) => {
    const res = await axiosInstance.delete(`/posts/${postId}`);
    if (res.status === 200) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };
  const submitHandler = async (formData) => {
    const res = await axiosInstance.post('/posts', formData);
    if (res.status === 201) {
      setPosts((prev) => [...prev, res.data]);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>Account page</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <p>Total posts: {posts.length}</p>
        </div>
        <div className="col-6">
          <button
            type="button"
            onClick={() => {
              const randomPost = { title: `title${Math.random()}`, body: `body${Math.random()}` };
              submitHandler(randomPost);
            }}
          >
            Add random post
          </button>
        </div>
      </div>
      <div className="row">
        {data.map((post) => (
          <div className="col-4" key={post.id}>
            <PostItem deleteHandler={deleteHandler} post={post} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
