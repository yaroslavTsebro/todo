import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/shared/contracts/entities/user';
import { TaskListRepository } from '../system/db/repositories/task-list.repository';
import { UserTaskListRepository } from '../system/db/repositories/user-task-list.repository';
import { UserTaskListRole } from 'src/shared/contracts/entities/user-task-list';
import { CreateTaskListDto } from 'src/shared/dto/task-list/create';
import { UpdateProjectDto } from 'src/shared/dto/task-list/update';
import { InviteUserDto } from 'src/shared/dto/task-list/user/invite';
import { TaskList } from 'src/shared/dto/entities/task-list';
import { UserTaskList } from 'src/shared/dto/entities/user-task-list';
import { PaginationQueryDto } from 'src/shared/dto/pagination';
import { UserTaskListPaginationResult } from 'src/shared/dto/pagination/task-list';
import { UserRepository } from '../system/db/repositories/user.repository';


@Injectable()
export class TaskListService {
  constructor(
    private readonly taskListRepo: TaskListRepository,
    private readonly userTaskListRepo: UserTaskListRepository,
    private readonly userRepo: UserRepository,
  ) { }

  async create(
    dto: CreateTaskListDto,
    user: IUser,
  ) {
    const taskList = await this.taskListRepo.create(
      { ...dto } as TaskList
    );

    await this.userTaskListRepo.create(
      {
        user: { id: user.id },
        taskList: { id: taskList.id },
        role: UserTaskListRole.OWNER
      } as UserTaskList
    );

    return taskList;
  }

  async update(
    taskListId: string,
    dto: UpdateProjectDto,
  ) {

    const updatedProject = await this.taskListRepo.update(
      taskListId,
      dto,
    );

    if (!updatedProject) { throw new NotFoundException('Project not found'); }

    return updatedProject;
  }

  async getAll(user: IUser, pagination: PaginationQueryDto): Promise<UserTaskListPaginationResult> {
    const userTaskLists = await this.userTaskListRepo.findAllByUserId(user.id, pagination);

    const projectIds = userTaskLists.data.map((up) => up.taskList.id);

    const taskLists = await this.taskListRepo.findByIds(projectIds);
    userTaskLists.data.forEach((el) => el.taskList = taskLists.find((tl) => tl.id === el.taskList.id))

    return userTaskLists;
  }

  async getAllParticipants(taskListId: string, pagination: PaginationQueryDto): Promise<UserTaskListPaginationResult> {
    const userTaskLists = await this.userTaskListRepo.findAllByProjectId(taskListId, pagination);

    return userTaskLists;
  }

  async getMyUserTaskList(taskListId: string, userId: number): Promise<UserTaskList> {
    const userTaskLists = await this.userTaskListRepo.findByUserAndTaskList(userId, taskListId);

    if(!userTaskLists) throw new NotFoundException('User doesn\'t belong to this project')

    return userTaskLists;
  }

  async getById(id: string): Promise<TaskList> {
    const taskList = await this.taskListRepo.findById(id);

    if (!taskList) throw new NotFoundException('Task list not found');

    return taskList;
  }

  async inviteUserToTaskList(
    taskListId: string,
    dto: InviteUserDto,
  ): Promise<UserTaskList> {
    const user = await this.userRepo.findByEmail(dto.email);

    if (!user) { throw new NotFoundException(`User with email ${dto.email} not found.`); }

    return this.userTaskListRepo.create(
      {
        user: user,
        role: dto.role as unknown as UserTaskListRole,
        taskList: { id: taskListId }
      } as UserTaskList
    );
  }

  async removeUserFromTaskList(
    taskListId: string,
    userId: number,
  ): Promise<UserTaskList> {
    const userTaskList = await this.userTaskListRepo.findByUserAndTaskList(userId, taskListId);

    if (!userTaskList) throw new NotFoundException('User doesn\'t belong to this task list');

    return this.userTaskListRepo.delete(userTaskList.id);
  }
}

