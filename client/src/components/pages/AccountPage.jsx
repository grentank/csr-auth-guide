import React, { useEffect, useState } from 'react';
import axiosInstance from '../../service/instance';

export default function AccountPage() {
  // const data = useLoaderData();
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosInstance('/posts?second=2', { headers: { second: 'second' } }).then((res) =>
      setData(res.data.data),
    );
  }, []);
  return (
    <div className="row">
      <div className="col">
        <ol>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
