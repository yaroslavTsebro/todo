import { ForbiddenException } from '@nestjs/common';

export class NotAMemberOfTaskListException extends ForbiddenException {
  constructor() {
    super('You are not a member of this task list');
  }
}
