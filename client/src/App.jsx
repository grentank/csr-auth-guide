import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAccessToken from './hooks/useAccessToken';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import AccountPage from './components/pages/AccountPage';
import axiosInstance from './service/instance';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/signup', element: <SignupPage /> },
      {
        path: '/account',
        element: <AccountPage />,
        errorElement: <h2>Error!</h2>,
        loader: () => axiosInstance('/posts?first=1').then((res) => res.data),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
