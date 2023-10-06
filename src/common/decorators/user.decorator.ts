import { ExecutionContext, createParamDecorator } from '@nestjs/common';
// 커스텀 데코레이터
export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
