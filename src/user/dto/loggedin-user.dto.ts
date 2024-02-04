import { ApiProperty } from '@nestjs/swagger';

export class LoggedinUserDto {
  @ApiProperty({ example: 'sangwonlee2@gmail.com' })
  email: string;
  @ApiProperty({ example: '123123123' })
  password: string;
}
