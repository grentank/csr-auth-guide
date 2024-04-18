import React from 'react';

export default function Loader({ children, loading }) {
  if (loading) return <div>Loading...</div>;
  return children;
}
