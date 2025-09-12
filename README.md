## CourseDashboard

Веб-приложение для отслеживания курса валют на микросервисной архитектуре с использованием JWT-аутентификации. В настоящее время находится в разработке.

## 🔥Технологический стек:
* Backend: ASP.NET Core 9, REST API
* Frontend: React, JavaScript, HTML, CSS
* Базы данных и ORM: PostgreSQL, Entity Framework Core

## Архитектура:
Проект состоит из 2 основных сервисов которые запускаются в отдельных Docker-контейнерах:
* AuthService - микросервис, который отвечает за аутентификацию пользователей (JWT access\refresh). Подключается к базе данных в контейнере PostgreSQL для работы с данными.
* CourseService - микросервис, который отвечает за получение и обработки информации из внешних API.
Также проект содержит клиентскую часть Client на React.

## ⭐Установка:
Для начала необходимо получить 3 API ключа для работы с внешними API: [ExchangeRate-API](https://www.exchangerate-api.com/), [CurrencyFreaks](https://currencyfreaks.com/), [Open Exchange Rates](https://openexchangerates.org/). Все эти API бесплатные. Также для удобного старта микросервисов нужен Docker

Теперь клонируем репозиторий:
```bash
git clone https://github.com/KormichKristina/CourseDashboard.git
cd repo
```

Теперь необходимо изменить переменные окружения в docker-compose. Для этого можно создать отдельный файл .env в корне проекта с переменными и подставить свои значения:
```ini
# Database
DB_HOST=database
DB_PORT=5432
DB_NAME=your_database_name_here
DB_USER=your_database_user_here
DB_PASSWORD=your_database_password_here

# Auth Service
SECRET_KEY=your_super_secret_jwt_key_here

# External APIs (заполните своими ключами)
EXCHANGE_RATE=your_exchange_rate_api_key_here
CURRENCY_FREAKS=your_currency_freaks_api_key_here
OPEN_EXCHANGE_RATE=your_open_exchange_rate_api_key_here
```
Также можно просто подставить свои значения напрямую в docker-compose

Теперь нужно запустить микросервисы и базу данных с помощью docker. Для этого нужно зайти в корневую папку проекта с docker-compose и в консоли запустить:
```bash
docker-compose up
```
Советуню проверить работоспособность микросервисов:
```bash
docker-compose ps
```

Осталось запустить клиента! Для этого переходим в папку Client, утсанавливаем зависимости и запускаем его:
```bash
npm install
npm run dev
```
