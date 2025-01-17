import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export enum InviteUserRole {
  WORKER='WORKER',
  ADMIN='ADMIN',
  VIEWER='VIEWER',
}

export class InviteUserDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty({ example: 'ADMIN', enum: InviteUserRole, description: 'Role to assign to the invited user' })
  @IsEnum(InviteUserRole)
  role: InviteUserRole;
}