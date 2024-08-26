import { BadRequestException, Injectable } from '@nestjs/common';
import { AddTaskRequest } from '@whatTodo/models';
import { FirebaseTaskRepository } from 'src/firebase/firebase-task.repository';
import { FirebaseUserRepository } from 'src/firebase/firebase-user.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly firebaseTodoRepository: FirebaseTaskRepository,
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
