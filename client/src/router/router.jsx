import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from '../App';

axios.create();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
]);

export default router;
