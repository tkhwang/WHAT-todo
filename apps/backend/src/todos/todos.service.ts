import { AddTaskRequest } from '@whatTodo/models';
import { FirebaseTodoRepository } from './../firebase/firebaseTodo.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  async deleteTask(userId: string, taskId: string) {
    const task = await this.firebaseTodoRepository.findTaskById(userId, taskId);
    if (!task) throw new BadRequestException(`Task (${taskId}) not found`);

    const userTask = await this.firebaseUserRepository.findUserTaskById(
      userId,
      taskId,
    );
    if (!userTask)
      throw new BadRequestException(
        `User (${userId}) Task (${taskId}) not found`,
      );

    await this.firebaseTodoRepository.deleteTaskById(userId, taskId);
    await this.firebaseUserRepository.deleteUserTaskById(userId, taskId);
  }
}
