import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './cat.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // cat 스키마를 cats라우터에서 사용하기위해 import => mongodb 사용할 경우
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    // 순환참조 모듈을 막기위해 forwardRef사용
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
