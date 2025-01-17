import { ITask, TaskStatus } from 'src/shared/contracts/entities/task';
import { TaskList } from './task-list';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';



@Entity()
export class Task implements ITask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, { nullable: false, onDelete: 'CASCADE' })
  taskList: TaskList;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.NOT_DONE,
  })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
