import { AddTaskRequest } from '@whatTodo/models';
import { FirebaseTodoRepository } from './../firebase/firebaseTodo.repository';
import { Injectable } from '@nestjs/common';
import { FirebaseUserRepository } from 'src/firebase/firebaseUser.repository';

@Injectable()
export class TodosService {
  constructor(
    private readonly firebaseTodoRepository: FirebaseTodoRepository,
    private readonly firebaseUserRepository: FirebaseUserRepository,
  ) {}

  async addTask(userId: string, addTaskDto: AddTaskRequest) {
    try {
      const addTask = await this.firebaseTodoRepository.addTask(
        userId,
        addTaskDto,
      );
      await this.firebaseUserRepository.addUserTodo(
        userId,
        addTask.id,
        addTaskDto,
      );
    } catch (error) {}
  }
}
