import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { ProjectRoles } from 'src/shared/decorators/project-roles.decorator';
import { CreateTaskDto } from 'src/shared/dto/task/create';
import { UpdateTaskDto } from 'src/shared/dto/task/update';
import { AuthorizationGuard } from '../auth/guards/authorization.guard';
import { GetTasksDto } from 'src/shared/dto/task/get';
import { TaskListGuard } from '../auth/guards/task-list.guard';
import { UserTaskListRole } from 'src/shared/contracts/entities/user-task-list';
import { TaskStatus } from 'src/shared/contracts/entities/task';
import { Task } from 'src/shared/dto/entities/task';
import { TaskPaginationResult } from 'src/shared/dto/pagination/task';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthorizationGuard, TaskListGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/projects/:taskListId/tasks')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiResponse({ status: 201, description: 'Task successfully created.', type: Task })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  @ApiBody({ type: CreateTaskDto })
  async create(
    @Param('taskListId') taskListId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.create(taskListId, createTaskDto);
  }

  @Patch('/projects/:taskListId/tasks/:id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number })
  @ApiResponse({ status: 200, description: 'Task successfully updated.', type: Task })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  @ApiBody({ type: UpdateTaskDto })
  async update(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(taskId, updateTaskDto);
  }

  @Delete('/projects/:taskListId/tasks/:id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number })
  @ApiResponse({ status: 200, description: 'Task successfully deleted.', type: Task })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  async delete(
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.taskService.delete(taskId);
  }

  @Get('/projects/:taskListId/tasks')
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @ApiQuery({ name: 'status', required: false, enum: TaskStatus, description: 'Filter tasks by status' })
  @ApiResponse({ status: 200, description: 'List of projects retrieved successfully.', type: TaskPaginationResult })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @ProjectRoles()
  async getAll(
    @Param('taskListId') taskListId: string,
    @Query() getTasksDto: GetTasksDto,
  ): Promise<TaskPaginationResult> {
    return this.taskService.getAll(taskListId, getTasksDto);
  }

  @Get('/projects/:taskListId/tasks/:id')
  @ApiOperation({ summary: 'Get a task by its ID' })
  @ApiParam({ name: 'taskListId', description: 'Project ID', type: String })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully.', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ProjectRoles()
  async getById(
    @Param('id', ParseIntPipe) taskId: number,
    @Param('taskListId') taskListId: string,
  ): Promise<Task> {
    return this.taskService.getById(taskId, taskListId);
  }
}