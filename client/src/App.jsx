import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import AccountPage from './components/pages/AccountPage';
import LoginPage from './components/pages/LoginPage';
import PostsPage from './components/pages/PostsPage';
import OnePostPage from './components/pages/OnePostPage';
import appService from './service/instance';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import Loader from './components/hoc/Loader';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    appService
      .refresh()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleSignup = async (data) => {
    const newUser = await appService.signup(data);
    setUser(newUser);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newUser = await appService.login(data);
    setUser(newUser);
  };

  const handleLogout = async () => {
    await appService.logout();
    setUser(null);
  };

  const router = createBrowserRouter([
    {
      element: <Layout handleLogout={handleLogout} user={user} />,
      children: [
        { path: '/', element: <HomePage user={user} /> },
        {
          element: <ProtectedRoute isAllowed={!user} />,
          children: [
            { path: '/signup', element: <SignupPage handleSignup={handleSignup} /> },
            { path: '/login', element: <LoginPage handleLogin={handleLogin} /> },
          ],
        },
        {
          element: <ProtectedRoute isAllowed={!!user} redirectPath="/login" />,
          children: [
            {
              path: '/account',
              element: <AccountPage user={user} />,
              errorElement: <h2>Error!</h2>,
              loader: appService.loadAccountPosts,
            },
            {
              path: '/posts',
              element: <PostsPage user={user} />,
              errorElement: <h2>Error!</h2>,
              loader: appService.loadPosts,
            },
            {
              path: '/posts/:postId',
              element: <OnePostPage />,
              errorElement: <h2>Error!</h2>,
              loader: appService.loadOnePost,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <Loader loading={user === undefined}>
      <RouterProvider router={router} />
    </Loader>
  );
}

export default App;
