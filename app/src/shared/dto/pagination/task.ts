import { ApiProperty } from '@nestjs/swagger';
import { PagedData } from '.';
import { Task } from '../entities/task';

export class TaskPaginationResult extends PagedData<Task> {
  @ApiProperty({ isArray: true, type: Task })
  data: Task[];
}