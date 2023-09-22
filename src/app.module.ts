import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger-meddleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CatsModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI)],
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
