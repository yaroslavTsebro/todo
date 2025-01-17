import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { IUser } from 'src/shared/contracts/entities/user';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ProjectRoles } from 'src/shared/decorators/project-roles.decorator';
import { UserTaskListRole } from 'src/shared/contracts/entities/user-task-list';
import { CreateTaskListDto } from 'src/shared/dto/task-list/create';
import { UpdateProjectDto } from 'src/shared/dto/task-list/update';
import { InviteUserDto } from 'src/shared/dto/task-list/user/invite';
import { AuthorizationGuard } from '../auth/guards/authorization.guard';
import { TaskListGuard } from '../auth/guards/task-list.guard';
import { PaginationQueryDto } from 'src/shared/dto/pagination';
import { TaskListService } from './task-list.service';

@ApiTags('projects')
@Controller('projects')
@UseGuards(AuthorizationGuard)
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  async create(
    @Body() createProjectDto: CreateTaskListDto,
    @CurrentUser() user: IUser,
  ) {
    return this.taskListService.create(createProjectDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project details' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) taskListId: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.taskListService.update(taskListId, updateProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects for the current user' })
  async getAll(
    @CurrentUser() user: IUser,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.taskListService.getAll(user, pagination);
  }

  @Get(':id')
  @UseGuards(TaskListGuard)
  async getById(
    @Param('id', ParseIntPipe) taskListId: number,
  ) {
    return this.taskListService.getById(taskListId);
  }

  @Post(':id/users/invite')
  @ApiOperation({ summary: 'Invite a user to the project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  async inviteUser(
    @Param('id', ParseIntPipe) taskListId: number,
    @Body() inviteUserDto: InviteUserDto,
  ) {
    return this.taskListService.inviteUserToTaskList(taskListId, inviteUserDto);
  }

  @Delete(':id/users/remove')
  @ApiOperation({ summary: 'Remove a user from the project' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  async removeUser(
    @Param('id', ParseIntPipe) taskListId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.taskListService.removeUserFromTaskList(taskListId, userId);
  }
}
