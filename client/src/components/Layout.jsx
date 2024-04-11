import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import axiosInstance, { setAccessToken } from '../service/instance';

export default function Layout({ user, handleLogout }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <NavBar user={user} handleLogout={handleLogout} />
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
