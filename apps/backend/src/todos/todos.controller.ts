import { AddTodoRequest } from '@whatTodo/models';
import { TodosService } from './todos.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('addTodo')
  async addTodo(@Body() newTodoDto: AddTodoRequest) {
    return this.todosService.addTodo(newTodoDto);
  }
}
