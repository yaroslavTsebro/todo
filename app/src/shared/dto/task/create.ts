import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from 'src/shared/contracts/entities/task';

export class CreateTaskDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty({ enum: TaskStatus })
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  endDate?: Date;
}