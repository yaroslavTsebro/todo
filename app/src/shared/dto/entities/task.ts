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
import { ApiProperty } from '@nestjs/swagger';



@Entity()
export class Task implements ITask{
  @ApiProperty({ description: 'Task ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Task title', example: 'Finish the project' })
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ description: 'Task description', example: 'This task is about finishing the project.', nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ description: 'Associated task list', type: () => TaskList })
  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, { nullable: false, onDelete: 'CASCADE' })
  taskList: TaskList;

  @ApiProperty({ description: 'Task status', enum: TaskStatus })
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.NOT_DONE,
  })
  status: TaskStatus;

  @ApiProperty({ description: 'Creation date', example: '2023-01-01T12:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date', example: '2023-01-02T12:00:00Z', nullable: true })
  @UpdateDateColumn()
  updatedAt?: Date;
}