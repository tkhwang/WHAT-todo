import { AddTodoRequest } from '@whatTodo/models';
import { FirebaseTodoRepository } from './../firebase/firebaseTodo.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  constructor(
    private readonly firebaseTodoRepository: FirebaseTodoRepository,
  ) {}

  async addTodo(userId: string, addTodoDto: AddTodoRequest) {
    return this.firebaseTodoRepository.addNewTodo(userId, addTodoDto);
  }
}
