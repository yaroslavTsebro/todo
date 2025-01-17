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

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name?: string;

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user, { cascade: true })
  @JoinColumn()
  authProvider: AuthProvider;

  @OneToMany(() => UserTaskList, (userTaskList) => userTaskList.user, { cascade: true })
  userTaskLists: UserTaskList[];
}
