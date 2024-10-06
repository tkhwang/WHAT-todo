import { Body, Controller, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Auth } from 'src/auth/auth.decorator';
import { UserId } from 'src/users/userId.decorators';
import { SendTodoRequest } from '@whatTodo/models';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('sendTodo')
  @Auth()
  async sendTodo(@UserId() userId: string, @Body() sendTodo: SendTodoRequest) {
    return this.todosService.sendTodo(userId, sendTodo);
  }
}
