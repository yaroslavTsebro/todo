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
import { PaginationQueryDto } from 'src/shared/dto/pagination';
import { TaskListService } from './task-list.service';
import { TaskList } from 'src/shared/dto/entities/task-list';
import { UserTaskList } from 'src/shared/dto/entities/user-task-list';
import { UserTaskListPaginationResult } from 'src/shared/dto/pagination/task-list';
import { RemoveUserDto } from 'src/shared/dto/task-list/user/remove';

@ApiTags('task-list')
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

  @Patch(':taskListId')
  @ApiOperation({ summary: 'Update project details' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiResponse({ status: 200, description: 'Project successfully updated.', type: TaskList })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  @ApiBody({ type: UpdateProjectDto })
  async update(
    @Param('taskListId') taskListId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<TaskList> {
    return this.taskListService.update(taskListId, updateProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects for the current user' })
  @ApiResponse({ status: 200, description: 'List of projects retrieved successfully.', type: UserTaskListPaginationResult })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async getAll(
    @CurrentUser() user: IUser,
    @Query() pagination: PaginationQueryDto,
  ): Promise<UserTaskListPaginationResult> {
    return this.taskListService.getAll(user, pagination);
  }

  @Get(':taskListId/participants')
  @ApiOperation({ summary: 'Get all projects for the current user' })
  @ApiResponse({ status: 200, description: 'List of projects retrieved successfully.', type: UserTaskListPaginationResult })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async getAllParticipants(
    @Query() pagination: PaginationQueryDto,
    @Param('taskListId') taskListId: string,
  ): Promise<UserTaskListPaginationResult> {
    return this.taskListService.getAllParticipants(taskListId, pagination);
  }

  @Get(':taskListId/me')
  @ApiOperation({ summary: 'Get current users taskList connection' })
  @ApiResponse({ status: 200, description: 'Current users taskList connection.', type: UserTaskList })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  async getMyUserTaskList(
    @Param('taskListId') taskListId: string,
    @CurrentUser() user: IUser,
  ): Promise<UserTaskList> {
    return this.taskListService.getMyUserTaskList(taskListId, user.id);
  }

  @Get(':taskListId')
  @ApiOperation({ summary: 'Get a project by its ID' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully.', type: TaskList })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @UseGuards(TaskListGuard)
  async getById(
    @Param('taskListId') taskListId: string,
  ): Promise<TaskList> {
    return this.taskListService.getById(taskListId);
  }

  @Post(':taskListId/users/invite')
  @ApiOperation({ summary: 'Invite a user to the project' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiResponse({ status: 200, description: 'User successfully invited.', type: UserTaskList })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  @ApiBody({ type: InviteUserDto })
  async inviteUser(
    @Param('taskListId') taskListId: string,
    @Body() inviteUserDto: InviteUserDto,
  ): Promise<UserTaskList> {
    return this.taskListService.inviteUserToTaskList(taskListId, inviteUserDto);
  }

  @Delete(':taskListId/users/remove')
  @ApiOperation({ summary: 'Remove a user from the project' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiResponse({ status: 200, description: 'User successfully removed.', type: UserTaskList })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(TaskListGuard)
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  @ApiBody({ type: RemoveUserDto })
  async removeUser(
    @Param('taskListId') taskListId: string,
    @Body() dto: RemoveUserDto,
  ): Promise<UserTaskList> {
    return this.taskListService.removeUserFromTaskList(taskListId, dto.userId);
  }

  @Delete(':taskListId/leave')
  @ApiOperation({ summary: 'Remove a user from the project' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiResponse({ status: 200, description: 'User successfully removed.', type: UserTaskList })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(TaskListGuard)
  @ProjectRoles()
  async leave(
    @Param('taskListId') taskListId: string,
    @CurrentUser() user: IUser,
  ): Promise<UserTaskList> {
    return this.taskListService.removeUserFromTaskList(taskListId, user.id);
  }
}
