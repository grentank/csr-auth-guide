import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import useAxiosInterceptor from './hooks/useAxiosInterceptor';

function App() {
  useAxiosInterceptor();
  return <RouterProvider router={router} />;
}

export default App;
