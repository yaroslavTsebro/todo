import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsNumberString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from 'src/shared/contracts/entities/task';
import { PaginationQueryDto } from '../pagination';

class SortOption {
  @ApiProperty({
    description: 'Field to sort by',
    example: 'title',
    enum: ['id', 'title', 'status', 'createdAt', 'updatedAt'],
  })
  @IsString()
  field: string;

  @ApiProperty({
    description: 'Order of sorting',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsEnum(['asc', 'desc'] as const)
  order: 'asc' | 'desc';
}

export class GetTasksDto extends PaginationQueryDto {
  @ApiProperty({
    description: 'Filter tasks by status',
    enum: TaskStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    description: 'Array of sorting options',
    type: [SortOption],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SortOption)
  @ArrayMinSize(1)
  sort?: SortOption[];
}
