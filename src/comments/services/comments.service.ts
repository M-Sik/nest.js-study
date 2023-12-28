import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {}
  async createComment(id: string, comments: CommentsCreateDto) {
    console.log(id, comments);
    return 'hello world';
  }
  async plusLike(id: string) {
    return id;
  }
}
