import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 환경변수를 사용하기위해 등록
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // 로그인할때 쓸 모듈
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1y' } }),
    // cats module에 export 되어있는것을 사용할 수 있음 catsrepo를 사용하기 위해 import
    // 순환 모듈 참조를 막기위해 forwardRef 사용
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
