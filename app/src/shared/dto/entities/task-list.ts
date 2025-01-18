import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserTaskList } from './user-task-list';
import { ITaskList } from 'src/shared/contracts/entities/task-list';
import { Task } from './task';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TaskList implements ITaskList {
  @ApiProperty({ description: 'TaskList ID', example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'TaskList name', example: 'Work Tasks' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ description: 'TaskList description', example: 'Tasks related to work', nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ description: 'List of tasks in the task list', type: () => [Task] })
  @OneToMany(() => Task, (task: Task) => task.taskList, { cascade: true })
  tasks: Task[];

  @OneToMany(() => UserTaskList, (userTaskList: UserTaskList) => userTaskList.taskList, { cascade: true })
  userTaskLists: UserTaskList[];

  @ApiProperty({ description: 'Creation date', example: '2023-01-01T12:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date', example: '2023-01-02T12:00:00Z', nullable: true })
  @UpdateDateColumn()
  updatedAt?: Date;
}
