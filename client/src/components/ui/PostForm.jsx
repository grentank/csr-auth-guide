import React from 'react';

export default function PostForm() {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="title1" className="form-label">
          Title
        </label>
        <input name="title" type="text" className="form-control" id="title1" />
      </div>
      <div className="mb-3">
        <label htmlFor="body1" className="form-label">
          Body
        </label>
        <textarea name="body" type="text" className="form-control" id="body1" />
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
}
