import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0'); // <- clave para que responda fuera del contenedor
}
bootstrap();

