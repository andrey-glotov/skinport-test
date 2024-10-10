## Description
Тестовое задание

Необходимо разработать небольшой production-ready web server. Пожалуйста, разместите проект в публичном репозитории GitHub. Развертывать ничего не нужно. Используйте следующий стек: PostgreSQL, Redis, TypeScript.

Технические требования:

1. Endpoint 1:
• Подключитесь к списку предметов Skinport (ссылка на API: https://docs.skinport.com/#items).
• Верните массив объектов, в котором для каждого предмета указаны две минимальные цены: одна для предмета с параметром tradable, другая — без.
• Параметры app_id и currency задайте по умолчанию.
• Postgres здесь использовать не нужно.
2. Endpoint 2:
• Реализуйте процесс покупки предмета пользователем. У пользователя должен быть баланс, который можно использовать для покупки.

Важно: Задание предполагает наличие производственного качества кода.

Это тестовое задание позволит нам понять, как вы подходите к реальным задачам, и оценить ваш технический стиль. По завершении задания, просто отправьте ссылку на репозиторий, и мы согласуем удобное для вас время для следующего этапа собеседования.

Если у вас есть вопросы, пожалуйста, не стесняйтесь задать их!

С уважением,
Шестернина Полина
Команда DataLouna

## Project setup

```shell
pnpm install
```

## Prepare env
```shell
cp .env.example .env
```

## Compile and run the project

```shell
# prepare database
pnpm run typeorm:sync-schemas

# run migrations
pnpm run migrate:up

# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Run tests

```shell
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```