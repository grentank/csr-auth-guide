# Стейты в Layout, Outlet контекст

## Плюсы

- На страничке Account без access
  - если есть loader -- ошибка react router dom (errorElement)
  - если нет loader, вместо него useEffect+useState -- без ошибки, нет данных
- На страничке Account с access ОК получены данные
- Работает AJAX авторазиция

## Минусы

- Использование Outlet context -- доп API
- Если авторизован и обновляешь страницу
  - Если нет loader -- данные не появляются (конкуренция useEffect, не навешиваются перехватчики). Потенциальное решение: access вне компонентов, например localStorage
  - Если есть loader -- данные не появляются (loader срабатывает до useEffect с перехватчиками)
