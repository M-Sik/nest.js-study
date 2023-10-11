import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cat.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // catsRepository 의존성 주입을 constructor를 통해 진행
  constructor(private readonly catsRepository: CatsRepository) {
    // jwt에 대한 설정
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰을 추출한다.
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false, // 만료기간 설정
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(payload.sub);

    if (cat) {
      return cat; // request.user
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
