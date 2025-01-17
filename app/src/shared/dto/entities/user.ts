import { IUser } from 'src/shared/contracts/entities/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AuthProvider } from './auth-provider';
import { UserTaskList } from './user-task-list';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User implements IUser {
  @ApiProperty({ description: 'User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User name', example: 'John Doe', nullable: true })
  @Column({ nullable: true })
  name?: string;

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user, { cascade: true })
  @JoinColumn()
  authProvider: AuthProvider;

  @OneToMany(() => UserTaskList, (userTaskList) => userTaskList.user, { cascade: true })
  userTaskLists: UserTaskList[];
}

