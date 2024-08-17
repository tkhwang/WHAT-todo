import { AddTodoRequest } from '@whatTodo/models';
import { TodosService } from './todos.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserId } from 'src/users/userId.decorators';
import { Auth } from 'src/auth/auth.decorator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('addTodo')
  @Auth()
  async addTodo(@UserId() userId: string, @Body() newTodoDto: AddTodoRequest) {
    return this.todosService.addTodo(newTodoDto);
  }
}
