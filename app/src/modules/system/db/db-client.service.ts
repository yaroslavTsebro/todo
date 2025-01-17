import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvVariables } from 'src/shared/contracts/modules/config';
import { AuthProvider } from 'src/shared/dto/entities/auth-provider';
import { Task } from 'src/shared/dto/entities/task';
import { TaskList } from 'src/shared/dto/entities/task-list';
import { User } from 'src/shared/dto/entities/user';
import { UserTaskList } from 'src/shared/dto/entities/user-task-list';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DbClient extends DataSource {
  constructor(
    private readonly configService: ConfigService<IEnvVariables>
  ) {
    const options = {
      database: configService.get<string>('DB_NAME'),
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      port: configService.get<number>('DB_PORT'),
      entities: [
        User,
        AuthProvider,
        Task,
        TaskList,
        UserTaskList,
      ],
      synchronize: true,
    } satisfies DataSourceOptions;

    super(options);

    this.initialize()
  }
}