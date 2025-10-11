# Guardin AI — Auth Demo (NestJS + React + Docker)

## ⚡️ Quick Start

Создать .env в папке guardin-ai-front

```env
VITE_API_URL=http://localhost:8001
```

Создать .env в папке guardin-ai-backend

```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# The following `prisma+postgres` URL is similar to the URL produced by running a local Prisma Postgres 
# server with the `prisma dev` CLI command, when not choosing any non-default ports or settings. The API key, unlike the 
# one found in a remote Prisma Postgres URL, does not contain any sensitive information.

NODE_ENV=local

APP_HOST='localhost'
APP_PORT=8001

ALLOWED_ORIGIN='http://localhost:5173'

FRONTEND_HOST=http://localhost:5173'

COOKIE_SECRET=secret
SESSION_SECRET=secret
SESSION_NAME=guardin_session
SESSION_DOMAIN=localhost
# 12 часов
SESSION_MAX_AGE=43200000
SESSION_HTTP_ONLY=false
SESSION_SECURE=false
SESSION_FOLDER=sessions:
SESSION_SAME_SITE=lax

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=guardin_db
POSTGRES_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}

REDIS_PASSWORD=redis123
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://default:redis123@redis:6379
```

```bash
# Запустить backend + PostgreSQL + Redis
cd guardin-ai-backend

yarn docker:prod

docker compose exec backend npx prisma migrate deploy

```

```bash
# Запустить frontend локально
cd guardin-ai-front
npm install
npm run dev
```

* Backend: [http://localhost:8001](http://localhost:8001)
* Frontend: [http://localhost:5173](http://localhost:5173)

---

## Описание проекта

Полноценное демо-веб-приложение с аутентификацией на **NestJS + React (Vite)**.
Реализованы сессии через **express-session + Redis**, регистрация, логин, логаут и защищенные маршруты.

---

## Архитектура проекта

### **Backend (NestJS + Prisma + PostgreSQL)**

* **NestJS (TypeScript)** — модульная структура: `AuthModule`, `UserModule`, `DatabaseModule`, `CoreConfigModule`
* **Prisma ORM** — для работы с PostgreSQL
* **Session-based auth** — через `express-session` + `connect-redis`
* **Redis** — хранилище сессий (docker-compose)
* **bcrypt** — хэширование паролей

#### Структура модулей

```
src/
 ├── app.module.ts
 ├── libs/
 │    ├── infrastructure/
 │    │    ├── config/
 │    │    │    └── config.module.ts
 │    │    └── database/
 │    │         ├── database.module.ts
 │    │         └── database.service.ts
 │    └── common/
 │         └── utils/
 └── modules/
      ├── auth/
      │    ├── controllers/
      │    ├── services/
      │    ├── dtos/
      │    ├── guards/
      │    └── decorators/
      └── user/
           ├── controllers/
           ├── services/
           └── dtos/
```

---

## **Frontend (React + Vite + Tailwind + Shadcn/UI)**

* **TypeScript + React Router**
* **TanStack Query** — управление сессией и сетевыми запросами
* **ProtectedRoute / GuestRoute**
* **Tailwind + Shadcn** — современный UI
* Страницы: **Login / Register / Home**

#### Основные страницы

| URL              | Описание                                      |
| ---------------- | --------------------------------------------- |
| `/auth/login`    | Форма входа                                   |
| `/auth/register` | Форма регистрации                             |
| `/`              | Домашняя страница (только для авторизованных) |

---

## **API**

| Метод    | Эндпоинт            | Описание                                      | Защищён | Тело запроса                                                                     | Пример ответа                                                     |
| -------- |---------------------| --------------------------------------------- | ------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **POST** | `/v1/auth/register` | Регистрация нового пользователя               | ❌       | `{ "first_name": "...", "last_name": "...", "email": "...", "password": "..." }` | `{ "success": true, "message": "Вы успешно зарегистрировались" }` |
| **POST** | `/v1/auth/login`    | Авторизация и установка cookie-сессии         | ❌       | `{ "email": "...", "password": "..." }`                                          | `{ "success": true }`                                             |
| **POST** | `/v1/auth/logout`   | Удаление cookie / завершение сессии           | ❌       | —                                                                                | `{ "success": true, "message": "Вы успешно вышли из аккаунта" }`  |
| **GET**  | `/v1/user/profile`  | Получение данных авторизованного пользователя | ✅       | —                                                                                | `{ "id": "...", "email": "...", "roles": ["USER"] }`              |

---

## **Как работает аутентификация**

1. При **`POST /v1/auth/login`**:

    * Проверяются учетные данные (`bcrypt.compare`)
    * В `req.session.user` сохраняется объект пользователя
    * `express-session` записывает сессию в Redis

2. Redis хранит:

   ```
   session:<session-id> -> JSON с cookie и user
   ```

3. Клиент получает cookie:

   ```
   Set-Cookie: SESSION_NAME=<id>
   ```

   и отправляет его при всех запросах.

4. При **`GET /v1/user/profile`** проверяется наличие `req.session.user` через `AuthGuard`.

5. При **`POST /v1/auth/logout`** сессия уничтожается (`req.session.destroy` + `res.clearCookie`).

---

## **Docker и запуск**

### ⚙Backend (NestJS + PostgreSQL + Redis)

#### Локальная сборка и запуск

```bash
yarn docker:prod
```

Эта команда поднимет:

* 🟢 **backend (NestJS)**
* 🟣 **postgres (база данных)**
* 🔴 **redis (сессии)**

После сборки сервер доступен по адресу:

```
http://localhost:8001/v1/auth/login
```

---

### **Dockerfile (мультистейдж)**

* **Stage 1** — сборка (TypeScript → JS)
* **Stage 2** — запуск через `yarn start:prod`
* Устанавливаются только **production-зависимости**

---

### **Frontend (React + Vite)**

#### Локальный запуск

```bash
cd guardin-ai-front
npm install
npm run dev
```

Откроется по адресу:

```
http://localhost:5173
```

Frontend ожидает backend на:

```
http://localhost:8001
```

---

## **Архитектурные решения**

| Компонент          | Решение                              | Почему                                                  |
| ------------------ |--------------------------------------| ------------------------------------------------------- |
| **Sessions**       | `express-session` + `connect-redis`  | Redis — быстрая, устойчивая и безопасная среда хранения |
| **ORM**            | Prisma ORM                           | Декларативная модель данных, миграции, типизация        |
| **AuthGuard**      | Проверка `req.session.user`          | Простая и надёжная защита маршрутов                     |
| **Frontend**       | React + React Query                  | Удобное управление состоянием и запросами               |
| **ProtectedRoute** | Проверка `GET /v1/user/profile`      | Аналог middleware на клиенте                            |
| **CORS**           | `credentials: true`, `sameSite: lax` | Корректная работа cookie между frontend и backend       |
| **UI**             | Tailwind + Shadcn                    | Адаптивный и современный интерфейс                      |


---

## **Известные ограничения**

*  Frontend пока запускается только локально без докер
