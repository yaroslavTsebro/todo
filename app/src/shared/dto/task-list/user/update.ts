import { IsEnum, IsNumber } from 'class-validator';
import { InviteUserRole } from './invite';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProjectDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'WORKER', enum: InviteUserRole, description: 'User role in the project' })
  @IsEnum(InviteUserRole)
  role: InviteUserRole;
}