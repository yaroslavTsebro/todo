import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { TaskList } from './task-list';
import { IUserTaskList, UserTaskListRole } from 'src/shared/contracts/entities/user-task-list';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['user', 'taskList'])
export class UserTaskList implements IUserTaskList {
  @ApiProperty({ description: 'UserTaskList ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Associated user', type: () => User })
  @ManyToOne(() => User, (user: User) => user.userTaskLists, { nullable: false, onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({ description: 'Associated task list', type: () => TaskList })
  @ManyToOne(() => TaskList, (taskList: TaskList) => taskList.userTaskLists, { nullable: false, onDelete: 'CASCADE' })
  taskList: TaskList;

  @ApiProperty({ description: 'Role of the user in the task list', enum: UserTaskListRole })
  @Column({
    type: 'enum',
    enum: UserTaskListRole,
    default: UserTaskListRole.WORKER,
  })
  role: UserTaskListRole;

  @ApiProperty({ description: 'Creation date', example: '2023-01-01T12:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date', example: '2023-01-02T12:00:00Z', nullable: true })
  @UpdateDateColumn()
  updatedAt?: Date;
}