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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { ProjectRoles } from 'src/shared/decorators/project-roles.decorator';
import { CreateTaskDto } from 'src/shared/dto/task/create';
import { UpdateTaskDto } from 'src/shared/dto/task/update';
import { AuthorizationGuard } from '../auth/guards/authorization.guard';
import { GetTasksDto } from 'src/shared/dto/task/get';
import { TaskListGuard } from '../auth/guards/task-list.guard';
import { UserTaskListRole } from 'src/shared/contracts/entities/user-task-list';

@ApiTags('tasks')
@Controller()
@UseGuards(AuthorizationGuard, TaskListGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/projects/:taskListId/tasks')
  @ApiOperation({ summary: 'Create a new task' })
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  async create(
    @Param('taskListId', ParseIntPipe) taskListId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(taskListId, createTaskDto);
  }

  @Patch('/projects/:taskListId/tasks/:id')
  @ApiOperation({ summary: 'Update a task' })
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(taskId, updateTaskDto);
  }

  @Delete('/projects/:taskListId/tasks/:id')
  @ApiOperation({ summary: 'Update a task' })
  @ProjectRoles(UserTaskListRole.OWNER, UserTaskListRole.ADMIN)
  async delete(
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.delete(taskId);
  }

  @Get('/projects/:taskListId/tasks')
  @ApiOperation({ summary: 'Get all tasks' })
  @ProjectRoles()
  async getAll(
    @Param('taskListId', ParseIntPipe) taskListId: number,
    @Query() getTasksDto: GetTasksDto,
  ) {
    return this.taskService.getAll(taskListId, getTasksDto);
  }

  @Get('/projects/:taskListId/tasks/:id')
  @ApiOperation({ summary: 'Get all tasks' })
  @ProjectRoles()
  async getById(
    @Param('id', ParseIntPipe) taskId: number,
    @Param('taskListId', ParseIntPipe) taskListId: number,
  ) {
    return this.taskService.getById(taskId, taskListId);
  }
}
