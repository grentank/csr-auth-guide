# Инициализация проекта:

1. `npm create vite@latest`
    1. `client`
    2. `React+SWC`
2. `mkdir server`
3. `npx degit grentank/create-prettierrc --force`
4. В папках client и server
    1. `npm init @eslint/config` (для prettier `npm i -D eslint-config-prettier` и добавляем в кофиг)
    2. `touch .env .env.example`
5. В папке client
    1. `npm i -D react-router-dom axios`
    2. 
6. В папке server
    1. `npm i express morgan sequelize sequelize-cli pg pg-hstore dotenv`
    2. `npx gitignore node`
    3. `mkdir src && touch src/server.js .sequelizerc`