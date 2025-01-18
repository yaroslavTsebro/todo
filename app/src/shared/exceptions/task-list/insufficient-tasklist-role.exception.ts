import { ForbiddenException } from '@nestjs/common';

export class InsufficientTaskListRoleException extends ForbiddenException {
  constructor() {
    super('You do not have the required role to access this resource');
  }
}
