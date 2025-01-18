import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TASK_LIST_ROLES_KEY } from '../../../shared/decorators/project-roles.decorator';
import { UserTaskListRole } from 'src/shared/contracts/entities/user-task-list';
import { UserTaskListRepository } from 'src/modules/system/db/repositories/user-task-list.repository';
import { InsufficientTaskListRoleException } from 'src/shared/exceptions/task-list/insufficient-tasklist-role.exception';
import { MissingUserOrTaskListIdException } from 'src/shared/exceptions/task-list/missing-user-or-tasklist-id.exception';
import { NotAMemberOfTaskListException } from 'src/shared/exceptions/task-list/not-a-member-of-tasklist.exception';

@Injectable()
export class TaskListGuard implements CanActivate {
  constructor(
    private readonly userTaskListRepo: UserTaskListRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taskListId = request.params.taskListId;

    if (!user || !taskListId) {
      throw new MissingUserOrTaskListIdException();
    }

    const requiredRoles =
      this.reflector.get<UserTaskListRole[]>(
        TASK_LIST_ROLES_KEY,
        context.getHandler(),
      ) || [];

    const userTaskList = await this.userTaskListRepo.findByUserAndTaskList(
      user.id,
      taskListId,
    );

    if (!userTaskList) {
      throw new NotAMemberOfTaskListException();
    }

    if (requiredRoles.length === 0) {
      return true;
    }

    if (!requiredRoles.includes(userTaskList.role)) {
      throw new InsufficientTaskListRoleException();
    }

    return true;
  }
}