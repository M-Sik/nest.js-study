import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class validation을 사용하기위해 등록
  app.useGlobalPipes(new ValidationPipe());
  // 전역적으로 예외처리 필터를 사용하기 위해 사용
  app.useGlobalFilters(new HttpExceptionFilter());
  // 스웨거 사용하기위한 설정
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true, // 모든 접근경로 허용 일부만 허용하고 싶을시 ['https://www.example.shop', 'http://localhost:3330']
    credentials: true,
  });

  // 포트 열기
  await app.listen(process.env.PORT);
}
bootstrap();
