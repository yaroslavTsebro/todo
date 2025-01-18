import { ApiProperty } from '@nestjs/swagger';
import { PagedData } from '.';
import { UserTaskList } from '../entities/user-task-list';

export class UserTaskListPaginationResult extends PagedData<UserTaskList> {
  @ApiProperty({ isArray: true, type: UserTaskList })
  data: UserTaskList[];
}