import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

export default function OnePostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axiosInstance(`/posts/${postId}`).then((res) => setPost(res.data));
  }, []);

  if (!post) return <h2>Loading...</h2>;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>{post.title}</h1>
        </div>
        <div className="col-3">
          <h5>{new Date(post.createdAt).toLocaleDateString('ru-RU')}</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  );
}
