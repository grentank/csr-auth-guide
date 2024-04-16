import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import axiosInstance from '../../service/instance';
import PostItem from '../ui/PostItem';

export default function AccountPage() {
  const data = useLoaderData();
  const [posts, setPosts] = useState(data);
  // useEffect(() => {
  //   axiosInstance('/posts?second=2', { headers: { second: 'second' } })
  //     .then((res) => setData(res.data))
  //     .catch(console.log);
  // }, []);
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
      </div>
      <div className="row">
        {data.map((post) => (
          <div className="col-4" key={post.id}>
            <PostItem post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
