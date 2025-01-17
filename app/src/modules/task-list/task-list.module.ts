import { Module } from '@nestjs/common';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';
import { DbModule } from '../system/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TaskListController],
  providers: [TaskListService]
})
export class TaskListModule {}
