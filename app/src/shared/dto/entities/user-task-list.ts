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

@Entity()
@Unique(['user', 'taskList'])
export class UserTaskList implements IUserTaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.userTaskLists, { nullable: false, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => TaskList, (taskList: TaskList) => taskList.userTaskLists, { nullable: false, onDelete: 'CASCADE' })
  taskList: TaskList;

  @Column({
    type: 'enum',
    enum: UserTaskListRole,
    default: UserTaskListRole.WORKER,
  })
  role: UserTaskListRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
