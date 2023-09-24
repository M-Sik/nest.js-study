import { Body, Controller, Get, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuceessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';

@UseFilters(HttpExceptionFilter) // 클래스에 데코레이터를 사용하면 해당 컨트롤러에 전체 api 대한 요청에 대해서 HttpExceptionFilter에 전달됨
@UseInterceptors(SuceessInterceptor) // 인터셉터 프로바이터 주입
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logOut';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
