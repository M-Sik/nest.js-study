import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadonlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    // 스웨거에 예시를 넣기 위함
    example: '21324',
    description: 'id',
    required: true,
  })
  id: string;
}
