# Mongolia Cashmere Store

Основа интернет-магазина монгольской одежды и кашемира.

## Стек

- Laravel 12 API, PHP 8.3+
- React 19 + Vite
- PostgreSQL 16
- Redis 7
- Docker Compose для локальной разработки

## Структура

- `backend/` — каталог, остатки и оформление заказов
- `frontend/` — публичная витрина
- `compose.yaml` — PostgreSQL и Redis

## Быстрый запуск

```bash
cp .env.example .env
# Укажите POSTGRES_PASSWORD в корневом .env
docker compose up -d
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

В другом терминале:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Витрина откроется на `http://localhost:5173`, API — на `http://localhost:8000`.

## Первый MVP

- каталог и фильтрация;
- варианты товара по цвету и размеру;
- остатки по SKU;
- корзина;
- создание заказа без онлайн-оплаты;
- API, подготовленный для будущей синхронизации с МойСклад.

Не входят в первый этап: личный кабинет, онлайн-оплата, доставка, CMS, интеграция с МойСклад и обработка Data Matrix. Они добавляются после уточнения бизнес-процессов.
