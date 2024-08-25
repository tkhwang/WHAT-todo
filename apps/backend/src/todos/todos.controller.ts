import { AddTaskRequest, DeleteTaskRequest } from '@whatTodo/models';
import { TodosService } from './todos.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserId } from 'src/users/userId.decorators';
import { Auth } from 'src/auth/auth.decorator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('addTask')
  @Auth()
  async addTask(@UserId() userId: string, @Body() addTaskDto: AddTaskRequest) {
    return this.todosService.addTask(userId, addTaskDto);
  }

  @Post('deleteTask')
  @Auth()
  async deleteTask(
    @UserId() userId: string,
    @Body() requestDto: DeleteTaskRequest,
  ) {
    const { taskId } = requestDto;
    return this.todosService.deleteTask(userId, taskId);
  }
}
