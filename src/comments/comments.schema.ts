import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// 타임 스탬프를 찍기위해 사용
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    // 스웨거에 예시를 넣기 위함
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({
    // Prop에 옵션을 전달할수 있으며, required의 경우 기본값이 false임
    type: Types.ObjectId,
    required: true,
    ref: 'cats', // 몽고디비의 어느 도큐먼트를 참조할지
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({ default: 0, required: true })
  @IsPositive() // 음수가 될 수 없음
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    // 스웨거에 예시를 넣기 위함
    description: '작성 대상(게시물, 정보글)',
    required: true,
  })
  @Prop({
    // Prop에 옵션을 전달할수 있으며, required의 경우 기본값이 false임
    type: Types.ObjectId,
    required: true,
    ref: 'cats', // 몽고디비의 어느 도큐먼트를 참조할지
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
