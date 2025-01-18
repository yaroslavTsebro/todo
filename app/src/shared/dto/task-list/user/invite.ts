import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

export enum InviteUserRole {
  WORKER = 'WORKER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

export class InviteUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ADMIN', enum: InviteUserRole, description: 'Role to assign to the invited user' })
  @IsEnum(InviteUserRole)
  role: InviteUserRole;
}