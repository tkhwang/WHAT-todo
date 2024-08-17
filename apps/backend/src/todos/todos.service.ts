import { AddTodoRequest } from '@whatTodo/models';
import { FirebaseTodoRepository } from './../firebase/firebaseTodo.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  constructor(
    private readonly firebaseTodoRepository: FirebaseTodoRepository,
  ) {}

  async addTodo(newTodo: AddTodoRequest) {
    return this.firebaseTodoRepository.addNewTodo(newTodo);
  }
}
