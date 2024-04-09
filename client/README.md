# Auth guide

## Введение

Данный гайд описывает процесс имплементации модуля **auth**. Везде далее при использовании термина **auth** подразумевается обобщение аутентификации, авторизации и других понятий, связанных с ними.

## Пошаговая имплементация

### Подготовка базы данных

Опиши модель пользователя, задай необходимые поля. Пропиши связь между пользователем и другими сущностями своего приложения. Например, создай модель `User` с полями `email, password, name`, а для модели `Post` пропиши внешний ключ `userId`.

### Создание страницы регистрации

Создай компонент страницы, в котором будут поля ввода, кнопки и логика по созданию нового аккаунта. Например, создай компонент `SignupPage` с формочкой

```js
import React from 'react';

export default function SignupPage() {
  return (
    <form>
      <input name="email" type="email" placeholder="Введи email" />
      <input name="password" type="password" placeholder="Введи пароль" />
      <input name="name" type="text" placeholer="Введи имя пользователя" />
      <button type="submit">Sign up</button>
    </form>
  );
}
```

Подключи слушатель события отправки формы `onSubmit`, не забудь предотвратить перезагрузку страницы через `event.preventDefault()`. Например:

```js
const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    const jsonData = Object.fromEntries(formData);
    // здесь будет сетевой запрос
}

return (
    <form onSubmit={submitHandler}>
    ...
)
```

### Создание axios instance

Создай файл с описанием конфигурации сетевых запросов через `axios`. Создай экземпляр через `axios.create` и выполни его экспорт. Например:

```js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default axiosInstance;
```

В будущем для совершения запросов используй `axiosInstance`.

### Отправка данных по регистрации

Соверши сетевой запрос и отправь данные

### Кастомный хук useAxiosInterceptor

Создай файл для кастомного хука для перехватчиков. Создай состояние, которое будет хранить access token, а также подключи перехватчики запроса и ответа. Например:

```js
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
```

Зачем это нужно:

- в приложении есть состояние, которое хранит `accessToken`
- перехватчик запроса автоматически в каждый запрос добавляет заголовок `Authorization: Bearer yourJwtAccessToken`
- перехватчик ответа проверяет: если пришедший статус от сервера 403, то
  - проверить, не был ли этот запрос уже до этого отправлен (`config.sent`)
  - попробовать обновить access token через запрос на сервер (`'/api/refresh'`)
  - новый токен записать в состояние, а также проставить поле `config.sent`, что запрос уже был до этого отправлен
  - добавить новый токен в прошлый неудавшийся запрос (`config.headers.Authorization = ...`)
  - повторить ещё раз прошлый запрос с новым токеном `return axiosInstance(config);`
  - если же проверка на 403 не прошла, или запрос был уже отправлен, то просто вернуть ошибку ответа
- при обновлении `accessToken` отключить старые перехватчики и подключить новые (иначе перехватчики останутся замкнутыми на прошлое значение переменной `accessToken`)
