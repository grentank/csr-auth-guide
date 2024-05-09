import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

export default function AddPostPage() {
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const res = await axiosInstance.post('/posts', formData);
    if (res.status === 201) {
      navigate('/');
    }
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="addTitle" className="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="addTitle"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="addBody" className="form-label">
            Body
          </label>
          <input
            name="body"
            type="text"
            className="form-control"
            id="addBody"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
