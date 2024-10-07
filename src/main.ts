import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port: number = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;
const host: string = process.env.APP_HOST ?? 'localhost';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, host);
  console.info(`server is started on ${host}:${port}` )
}
bootstrap();
