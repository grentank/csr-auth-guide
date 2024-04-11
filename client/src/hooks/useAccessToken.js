import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../service/instance';

export default function useAccessToken() {
  const [accessToken, setAccessToken] = useState('');

  // useEffect(() => {
  //   axiosInstance.get('/tokens/refresh').then(({ data }) => setAccessToken(data.accessToken));
  // }, []);

  useEffect(() => {
    // Перехватчик запроса
    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Перехватчик ответа
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 403 && !prevRequest.sent) {
          const response = await axios('/api/tokens/refresh');
          const newToken = response.data.accessToken;
          setAccessToken(newToken);
          prevRequest.sent = true;
          prevRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    // Отключение старых перехватчиков перед подключением новых
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return { accessToken, setAccessToken };
}
