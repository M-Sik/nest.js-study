import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// 의존성 주입이 가능, AuthGuard는 jwt strategy => validtae 함수를 자동적으로 실행시켜주는 기능이 있음
export class JwtAuthGuard extends AuthGuard('jwt') {}
