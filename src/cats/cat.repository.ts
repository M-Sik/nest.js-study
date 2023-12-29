import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { CommentsSchema } from 'src/comments/comments.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    const CommentsModel = mongoose.model('commnts', CommentsSchema);
    const result = await this.catModel.find().populate('comments', CommentsModel);
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id); // 현재 로그인된 고양이의 정보를 받음
    cat.imgUrl = `http://localhost:8000/media/${fileName}`; // 고양이정보에 디폴트 이미지 값을 넣어줌
    const newCat = await cat.save(); // 변경된 고양이 사항을 save메서드로 db에 저장시킴
    console.log(newCat);
    return newCat.readOnlyData;
  }
  // catId를 인자로 받으며, id에 해당하는 고양이의 정보를 가져온다.
  // select를 통해 정보에서 password를 제외
  async findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    // 이메일이 존재 하는지
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      if (result) return true;
      else return false;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
