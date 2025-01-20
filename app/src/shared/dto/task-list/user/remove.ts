import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RemoveUserDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}