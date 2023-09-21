import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';

@UseFilters(HttpExceptionFilter) // 클래스에 데코레이터를 사용하면 해당 컨트롤러에 전체 api 대한 요청에 대해서 HttpExceptionFilter에 전달됨
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  // @UseFilters(HttpExceptionFilter) // api위에 데코레이터를 사용하면 해당 api에 대한 요청에 대해서만 HttpExceptionFilter에 전달됨
  getAllCat() {
    throw new HttpException('api is broken', 401);
    // return 'all cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    // console.log(typeof param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  udpateCat() {
    return 'udpate cat';
  }

  @Patch(':id')
  updateParticalCat() {
    return 'update parical cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
