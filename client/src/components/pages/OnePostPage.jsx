import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axiosInstance from '../../service/instance';

export default function OnePostPage() {
  const onePost = useLoaderData();
  const navigate = useNavigate();
  const editPostHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const resp = await axiosInstance.patch(`/posts/${onePost.id}`, formData);
    if (resp.status === 200) {
      navigate('/posts');
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>Edit post: {onePost.title}</h2>
        </div>
      </div>
      <form onSubmit={editPostHandler}>
        <div className="mb-3">
          <label htmlFor="title1" className="form-label">
            Title
          </label>
          <input
            name="title"
            defaultValue={onePost.title}
            type="text"
            className="form-control"
            id="title1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body1" className="form-label">
            Body
          </label>
          <textarea
            name="body"
            defaultValue={onePost.body}
            className="form-control"
            id="body1"
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </form>
    </div>
  );
}
