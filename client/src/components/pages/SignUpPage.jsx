import React from 'react';

export default function SignUpPage({ handleSignUp }) {
  return (
    <form onSubmit={handleSignUp}>
      <div className="mb-3">
        <label htmlFor="em1" className="form-label">
          Email
        </label>
        <input name="email" type="email" className="form-control" id="em1" />
      </div>
      <div className="mb-3">
        <label htmlFor="name1" className="form-label">
          Name
        </label>
        <input name="name" type="text" className="form-control" id="name1" />
      </div>
      <div className="mb-3">
        <label htmlFor="pass1" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="pass1"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign up!
      </button>
    </form>
  );
}
