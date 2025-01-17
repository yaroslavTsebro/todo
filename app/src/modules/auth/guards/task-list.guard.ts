import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TASK_LIST_ROLES_KEY } from '../../../shared/decorators/project-roles.decorator';
import { UserTaskListRole } from 'src/shared/contracts/entities/user-task-list';
import { UserTaskListRepository } from 'src/modules/system/db/repositories/user-task-list.repository';

@Injectable()
export class TaskListGuard implements CanActivate {
  constructor(
    private readonly userTaskListRepo: UserTaskListRepository,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taskListId = request.params.taskListId;

    if (!user || !taskListId) { throw new ForbiddenException('Missing user or projectId'); }

    const requiredRoles = this.reflector.get<UserTaskListRole[]>(TASK_LIST_ROLES_KEY, context.getHandler()) || [];

    const userProject = await this.userTaskListRepo.findByUserAndTaskList(user.id, taskListId);

    if (!userProject) { throw new ForbiddenException('You are not a member of this project'); }
    if (requiredRoles.length === 0) { return true; }
    if (!requiredRoles.includes(userProject.role)) { throw new ForbiddenException('You do not have the required role to access this resource'); }

    return true;
  }
}