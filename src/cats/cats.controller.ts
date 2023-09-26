import { Body, Controller, Get, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuceessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadonlyCatDto } from './dto/cat.dto';

@UseFilters(HttpExceptionFilter) // 클래스에 데코레이터를 사용하면 해당 컨트롤러에 전체 api 대한 요청에 대해서 HttpExceptionFilter에 전달됨
@UseInterceptors(SuceessInterceptor) // 인터셉터 프로바이터 주입
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    // 스웨거에서 api response 작성할때 사용
    status: 500,
    description: '서버 에러',
  })
  @ApiResponse({
    status: 201,
    description: '성공',
    type: ReadonlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' }) //스웨거 api 옆에 설명이 들어감
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logOut';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
