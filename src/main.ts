import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validaciones con class-validator
  app.useGlobalPipes(new ValidationPipe());

  // Habilita CORS si necesitás acceder desde otro dominio
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
