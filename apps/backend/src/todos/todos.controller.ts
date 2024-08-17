import { AddTodoRequest } from '@whatTodo/models';
import { TodosService } from './todos.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('addTodo')
  @UseGuards(AuthGuard('bearer'))
  async addTodo(@Body() newTodoDto: AddTodoRequest) {
    return this.todosService.addTodo(newTodoDto);
  }
}
