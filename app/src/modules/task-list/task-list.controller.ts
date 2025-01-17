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
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { IUser } from 'src/shared/contracts/entities/user';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ProjectRoles } from 'src/shared/decorators/project-roles.decorator';
import { UserTaskListRole } from 'src/shared/contracts/entities/user-task-list';
import { CreateTaskListDto } from 'src/shared/dto/task-list/create';
import { UpdateProjectDto } from 'src/shared/dto/task-list/update';
import { InviteUserDto } from 'src/shared/dto/task-list/user/invite';
import { AuthorizationGuard } from '../auth/guards/authorization.guard';
import { TaskListGuard } from '../auth/guards/task-list.guard';
import { PaginationQueryDto, PaginationResult } from 'src/shared/dto/pagination';
import { TaskListService } from './task-list.service';
import { TaskList } from 'src/shared/dto/entities/task-list';
import { UserTaskList } from 'src/shared/dto/entities/user-task-list';

@ApiTags('projects')
@ApiBearerAuth()
@Controller('projects')
@UseGuards(AuthorizationGuard)
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project successfully created.', type: TaskList })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiBody({ type: CreateTaskListDto })
  async create(
    @Body() createProjectDto: CreateTaskListDto,
    @CurrentUser() user: IUser,
  ): Promise<TaskList> {
    return this.taskListService.create(createProjectDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project details' })
  @ApiParam({ name: 'id', description: 'Project ID', type: Number })
  @ApiResponse({ status: 200, description: 'Project successfully updated.', type: TaskList })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  @ApiBody({ type: UpdateProjectDto })
  async update(
    @Param('id', ParseIntPipe) taskListId: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<TaskList> {
    return this.taskListService.update(taskListId, updateProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects for the current user' })
  @ApiResponse({ status: 200, description: 'List of projects retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async getAll(
    @CurrentUser() user: IUser,
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginationResult<UserTaskList>> {
    return this.taskListService.getAll(user, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by its ID' })
  @ApiParam({ name: 'id', description: 'Project ID', type: Number })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully.', type: TaskList })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @UseGuards(TaskListGuard)
  async getById(
    @Param('id', ParseIntPipe) taskListId: number,
  ): Promise<TaskList> {
    return this.taskListService.getById(taskListId);
  }

  @Post(':id/users/invite')
  @ApiOperation({ summary: 'Invite a user to the project' })
  @ApiParam({ name: 'id', description: 'Project ID', type: Number })
  @ApiResponse({ status: 200, description: 'User successfully invited.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  @ApiBody({ type: InviteUserDto })
  async inviteUser(
    @Param('id', ParseIntPipe) taskListId: number,
    @Body() inviteUserDto: InviteUserDto,
  ): Promise<UserTaskList> {
    return this.taskListService.inviteUserToTaskList(taskListId, inviteUserDto);
  }

  @Delete(':id/users/remove')
  @ApiOperation({ summary: 'Remove a user from the project' })
  @ApiParam({ name: 'id', description: 'Project ID', type: Number })
  @ApiResponse({ status: 200, description: 'User successfully removed.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 2, description: 'ID of the user to remove' },
      },
      required: ['userId'],
    }
  })
  async removeUser(
    @Param('id', ParseIntPipe) taskListId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ): Promise<UserTaskList> {
    return this.taskListService.removeUserFromTaskList(taskListId, userId);
  }
}
