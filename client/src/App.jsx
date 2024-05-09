import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import OnePostPage from './components/pages/OnePostPage';
import AddPostPage from './components/pages/AddPostPage';
import SignUpPage from './components/pages/SignUpPage';
import axiosInstance, { setAccessToken } from './axiosInstance';
import LoginPage from './components/pages/LoginPage';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
        setAccessToken('');
      });
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const res = await axiosInstance.post('/auth/signup', data);
    if (res.status === 200) {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const res = await axiosInstance.post('/auth/login', data);
    if (res.status === 200) {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    }
  };
  const handleLogout = async () => {
    const res = await axiosInstance.post('/auth/logout');
    if (res.status === 200) {
      setUser(null);
      setAccessToken('');
    }
  };

  const routes = [
    {
      element: <Layout user={user} handleLogout={handleLogout} />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/posts/:postId',
          element: <OnePostPage />,
        },
        {
          path: '/posts/add',
          element: <AddPostPage />,
        },
        {
          path: '/signup',
          element: <SignUpPage handleSignUp={handleSignUp} />,
        },
        {
          path: '/login',
          element: <LoginPage handleLogin={handleLogin} />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
