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

@Entity()
export class TaskList implements ITaskList {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Task, (task: Task) => task.taskList, { cascade: true })
  tasks: Task[];

  @OneToMany(() => UserTaskList, (userTaskList: UserTaskList) => userTaskList.taskList, { cascade: true })
  userTaskLists: UserTaskList[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
