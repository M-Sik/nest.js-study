import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class validation을 사용하기위해 등록
  app.useGlobalPipes(new ValidationPipe());
  // 전역적으로 예외처리 필터를 사용하기 위해 사용
  app.useGlobalFilters(new HttpExceptionFilter());
  // 포트 열기
  await app.listen(process.env.PORT);
}
bootstrap();
