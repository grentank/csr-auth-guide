import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function OnePostPage() {
  const onePost = useLoaderData();
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>Edit post: {onePost.title}</h2>
        </div>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="title1" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title1" />
        </div>
        <div className="mb-3">
          <label htmlFor="body1" className="form-label">
            Body
          </label>
          <textarea className="form-control" id="body1" rows="3" />
        </div>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </form>
    </div>
  );
}
