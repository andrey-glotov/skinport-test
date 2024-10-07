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

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
