import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: () => void) {
    // 응답 전달이 완료됫을때 실행될 이벤트
    res.on('finish', () => {
      this.logger.log(`${req.originalUrl} ${req.ip} ${req.method} ${res.statusCode}`);
    });
    next();
  }
}
