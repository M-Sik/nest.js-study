import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// 타임 스탬프를 찍기위해 사용
const options: SchemaOptions = {
  collection: 'cats',
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    // 스웨거에 예시를 넣기 위함
    example: 'rlaaudtlr233@gmail.com',
    description: '이메일',
    required: true,
  })
  @Prop({
    // Prop에 옵션을 전달할수 있으며, required의 경우 기본값이 false임
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '콩이',
    description: '고양이 이름',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'a1a1a1a1',
    description: '비밀번호',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default: 'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string; imgUrl: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// virtual 필드란 실제로 디비에 저장되는 필드는 아니지만 서비스 내부 비지니스 로직에서 사용할 수 있도록 지원해주는 필드임
// 회원가입 후 패스워드를 클라이언트에 노출시키지 않기 위해 사용
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
