import { useEffect, useState } from 'react';
import axiosInstance from '../instance';

export default function useAxiosInterceptor() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Перехватчик запроса
    axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    // Перехватчик ответа
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { status } = error.response;
        const { config } = error;
        if (status === 403 && !config.sent) {
          const { data } = await axiosInstance('/api/refresh');
          setAccessToken(data);
          config.sent = true;
          config.headers.Authorization = `Bearer ${data}`;
          return axiosInstance(config);
        }
        return Promise.reject(error);
      },
    );

    // Отключение старых перехватчиков перед подключением новых
    return () => {
      axiosInstance.interceptors.request.eject(accessToken);
      axiosInstance.interceptors.response.eject(accessToken);
    };
  }, [accessToken]);
}
