import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar({ user, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {user ? `Hi, ${user.name}` : 'Guest'}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-link">
              Main
            </NavLink>
            <NavLink to="/posts/add" className="nav-link">
              Add
            </NavLink>
            <NavLink to="/signup" className="nav-link">
              Sign up
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <button onClick={handleLogout} type="button" className="nav-link">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
