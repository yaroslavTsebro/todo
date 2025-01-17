import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Design Homepage',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the task',
    example: 'Create a responsive design for the homepage.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}