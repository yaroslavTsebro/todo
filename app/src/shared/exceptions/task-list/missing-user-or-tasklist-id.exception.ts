import { BadRequestException } from '@nestjs/common';

export class MissingUserOrTaskListIdException extends BadRequestException {
  constructor() {
    super('Missing user or taskListId');
  }
}
