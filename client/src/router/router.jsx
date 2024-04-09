import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import SignupPage from '../components/pages/SignupPage';
import AccountPage from '../components/pages/AccountPage';
import Layout from '../Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/account', element: <AccountPage /> },
    ],
  },
]);

export default router;
