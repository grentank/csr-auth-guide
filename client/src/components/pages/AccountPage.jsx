import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function AccountPage() {
  const data = useLoaderData();
  console.log('data', data);
  return (
    <div className="row">
      {data.map((item) => (
        <div key={item.id} className="col">
          {JSON.stringify(item)}
        </div>
      ))}
    </div>
  );
}
