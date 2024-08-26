import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UserId } from 'src/users/userId.decorators';
import { Auth } from 'src/auth/auth.decorator';
import { AddTaskRequest, DeleteTaskRequest } from '@whatTodo/models';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('addTask')
  @Auth()
  async addTask(@UserId() userId: string, @Body() addTaskDto: AddTaskRequest) {
    return this.tasksService.addTask(userId, addTaskDto);
  }

  @Post('deleteTask')
  @Auth()
  async deleteTask(
    @UserId() userId: string,
    @Body() requestDto: DeleteTaskRequest,
  ) {
    const { taskId } = requestDto;
    return this.tasksService.deleteTask(userId, taskId);
  }
}
