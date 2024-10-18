import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove chaves que não estão no dto
      forbidNonWhitelisted: true, //levanta erro quando a chave não existir
      transform: false, //tenta tranformar os tipos de dados de param e dtos
    }),
    new ParseIntIdPipe()
  );

  await app.listen(3000);
}
bootstrap();
