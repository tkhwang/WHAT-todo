import { AddTodoRequest } from '@whatTodo/models';
import { FirebaseTodoRepository } from './../firebase/firebaseTodo.repository';
import { Injectable } from '@nestjs/common';
import { FirebaseUserRepository } from 'src/firebase/firebaseUser.repository';

@Injectable()
export class TodosService {
  constructor(
    private readonly firebaseTodoRepository: FirebaseTodoRepository,
    private readonly firebaseUserRepository: FirebaseUserRepository,
  ) {}

  async addTodo(userId: string, addTodoDto: AddTodoRequest) {
    try {
      const addTodo = await this.firebaseTodoRepository.addTodo(
        userId,
        addTodoDto,
      );
      await this.firebaseUserRepository.addUserTodo(
        userId,
        addTodo.id,
        addTodoDto,
      );
    } catch (error) {}
  }
}
