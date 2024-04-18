import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage({ user }) {
  return (
    <div>
      {user ? (
        <p>
          <Link to="/posts">Все посты</Link> или <Link to="/account">личные посты</Link>
        </p>
      ) : (
        <p>
          <Link to="/login">Войди</Link> или <Link to="/signup">зарегистрируйся</Link>
        </p>
      )}
    </div>
  );
}
