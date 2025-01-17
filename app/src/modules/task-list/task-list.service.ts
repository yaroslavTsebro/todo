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
import { PaginationQueryDto, PaginationResult } from 'src/shared/dto/pagination';


@Injectable()
export class TaskListService {
  constructor(
    private readonly taskListRepo: TaskListRepository,
    private readonly userTaskListRepo: UserTaskListRepository,
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
    taskListId: number,
    dto: UpdateProjectDto,
  ) {

    const updatedProject = await this.taskListRepo.update(
      taskListId,
      dto,
    );

    if (!updatedProject) { throw new NotFoundException('Project not found'); }

    return updatedProject;
  }

  async getAll(user: IUser, pagination: PaginationQueryDto): Promise<PaginationResult<UserTaskList>> {
    const userTaskLists = await this.userTaskListRepo.findAllByUserId(user.id, pagination);
    const projectIds = userTaskLists.data.map((up) => up.taskList.id);

    const taskLists = await this.taskListRepo.findByIds(projectIds);

    userTaskLists.data.forEach((el) => el.taskList = taskLists.find((tl) => tl.id === el.taskList.id))

    return userTaskLists;
  }

  async getById(id: number): Promise<TaskList> {
    const taskList = await this.taskListRepo.findById(id);

    if(!taskList) throw new NotFoundException('Task list not found');

    return taskList;
  }

  async inviteUserToTaskList(
    taskListId: number,
    dto: InviteUserDto,
  ): Promise<UserTaskList> {
    return this.userTaskListRepo.create(
      {
        user: { id: dto.userId },
        role: dto.role as unknown as UserTaskListRole,
        taskList: { id: taskListId }
      } as UserTaskList
    );
  }

  async removeUserFromTaskList(
    projectId: number,
    userId: number,
  ): Promise<UserTaskList> {
    const userTaskList = await this.userTaskListRepo.findByUserAndTaskList(userId, projectId);

    if (!userTaskList) throw new NotFoundException('User doesn\'t belong to this task list');

    return this.userTaskListRepo.delete(userTaskList.id);
  }
}

