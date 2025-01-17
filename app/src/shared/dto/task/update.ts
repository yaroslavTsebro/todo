import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from 'src/shared/contracts/entities/task';

export class UpdateTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: TaskStatus.DONE, enum: TaskStatus})
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}