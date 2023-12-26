import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cat.repository';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  // cat 스키마를 이용하기 위해 의존성 주입
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(cat.id, fileName);
    console.log(newCat);
    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      // 401을 리턴해주는 메서드 사용 => UnathorizedException
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }
    // 입력받은 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    // 회원가입 후 비밀번호는 클라이언트에 노출시키지 않기 위해 cat 스키마에 있는 readonlydata를 이용하여 virtual 필드 사용
    return cat.readOnlyData;
  }
}
