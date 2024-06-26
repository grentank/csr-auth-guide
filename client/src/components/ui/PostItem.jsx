import React from 'react';
import { Link } from 'react-router-dom';

export default function PostItem({ post, user, deleteHandler }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{post.User?.name}</h6>
        <p className="card-text">{post.body}</p>
        {user?.id === post.userId && (
          <>
            <Link to={`/posts/${post.id}`} className="card-link">
              Edit
            </Link>
            <button className="btn btn-danger" type="button" onClick={() => deleteHandler(post.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
