import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger-meddleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
// 미들웨어를 사용하기위해 미들웨어를 등록
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Logger 미들웨어 등록
    // '*'의 경우 모든 라우터에 미들웨어를 적용하겠다는 듯
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
