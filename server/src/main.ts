import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const whiteList = [
  'https://google.com',
  'https://www.facebook.com/',
  'http://localhost:3000',
];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: whiteList,
  });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
