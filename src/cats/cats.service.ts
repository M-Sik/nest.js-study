import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  // cat 스키마를 이용하기 위해 의존성 주입
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      // 403을 리턴해주는 메서드 사용 => UnathorizedException
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }
  }
}
