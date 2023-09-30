import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger-meddleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// 미들웨어를 사용하기위해 미들웨어를 등록
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    // Logger 미들웨어 등록
    // '*'의 경우 모든 라우터에 미들웨어를 적용하겠다는 듯
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // 몽구스 쿼리가 로그로 찍히게 하기 위해
    mongoose.set('debug', this.isDev);
  }
}
