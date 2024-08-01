import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const port = parseInt(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`[+][bootstrap] Server is running on port ${port}`);
}
bootstrap();
