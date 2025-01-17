import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class EmailAuthPayload {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}