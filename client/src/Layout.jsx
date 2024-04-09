import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/ui/NavBar';

export default function Layout() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <NavBar />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
