import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 전역적으로 예외처리 필터를 사용하기 위해 사용
  app.useGlobalFilters(new HttpExceptionFilter());
  // 포트 열기
  await app.listen(8000);
}
bootstrap();
