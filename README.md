# test_task_node

## Описание

REST API на Node.js + TypeScript + Express + Sequelize + PostgreSQL для управления пользователями с поддержкой ролей, JWT-авторизации, регистрации, блокировки и разграничения доступа.

## Быстрый старт через Docker Compose

1. Соберите и запустите проект:
   ```sh
   docker-compose up --build
   ```
2. Приложение будет доступно на http://localhost:3000
3. База данных PostgreSQL будет доступна на порту 5432

**Переменные окружения** можно задать в docker-compose.yml или .env

**Остановка:**
```sh
docker-compose down
```
