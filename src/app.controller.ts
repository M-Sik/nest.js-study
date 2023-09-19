import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:id/:name')
  getHello(@Req() req, @Body() body, @Param() param: { id: string; name: string }): string {
    console.log(req);
    console.log(param);
    console.log(body);
    return this.appService.getHello();
  }
}
