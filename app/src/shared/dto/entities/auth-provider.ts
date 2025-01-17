import { IAuthProvider, AuthProviderType } from 'src/shared/contracts/entities/auth-provider';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class AuthProvider implements IAuthProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AuthProviderType })
  type: AuthProviderType;

  @Column()
  payload: string;

  @OneToOne(() => User, (user) => user.authProvider)
  user: User;
}