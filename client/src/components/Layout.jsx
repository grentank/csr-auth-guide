import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import useAccessToken from '../hooks/useAccessToken';
import axiosInstance from '../service/instance';

export default function Layout() {
  const { setAccessToken } = useAccessToken();
  const [user, setUser] = useState();

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleSignup = async (data) => {
    const res = await axiosInstance.post('/auth/signup', data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  };

  const handleLogout = async () => {
    await axiosInstance('/auth/logout');
    setUser(null);
    setAccessToken(null);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <NavBar user={user} handleLogout={handleLogout} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Outlet context={{ user, handleSignup }} />
        </div>
      </div>
    </div>
  );
}
