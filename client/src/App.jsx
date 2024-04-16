import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import AccountPage from './components/pages/AccountPage';
import axiosInstance, { setAccessToken } from './service/instance';
import LoginPage from './components/pages/LoginPage';
import { loadAccountPosts, loadPosts } from './service/loaders';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => setUser(null));
  }, []);

  const handleSignup = async (data) => {
    const res = await axiosInstance.post('/auth/signup', data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const res = await axiosInstance.post('/auth/login', data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  };

  const handleLogout = async () => {
    await axiosInstance('/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  const router = createBrowserRouter([
    {
      element: <Layout handleLogout={handleLogout} user={user} />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/signup', element: <SignupPage handleSignup={handleSignup} /> },
        { path: '/login', element: <LoginPage handleLogin={handleLogin} /> },
        {
          path: '/account',
          element: <AccountPage user={user} />,
          errorElement: <h2>Error!</h2>,
          loader: loadAccountPosts,
        },
        {
          path: '/posts',
          element: <AccountPage user={user} />,
          errorElement: <h2>Error!</h2>,
          loader: loadAccountPosts,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
