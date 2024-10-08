import { BadRequestException, Injectable } from '@nestjs/common';
import { AddTaskRequest } from '@whatTodo/models';
import { FirestoreTaskRepository } from 'src/firebase/firestore-task.repository';
import { FirestoreUserRepository } from 'src/firebase/firestore-user.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly firestoreTaskRepository: FirestoreTaskRepository,
    private readonly firestoreUserRepository: FirestoreUserRepository,
  ) {}

  async addTask(userId: string, addTaskDto: AddTaskRequest) {
    const { listId, task, taskType, expertId, supervisorIds, userIds } =
      addTaskDto;

    try {
      const addTask = await this.firestoreTaskRepository.addTask(addTaskDto);
      return await this.firestoreUserRepository.addUserTask({
        userId,
        todoId: addTask.id,
        listId,
        task,
        taskType,
        userType: 'user',
        expertId,
        supervisorIds,
        userIds,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTask(userId: string, taskId: string) {
    const task = await this.firestoreTaskRepository.findTaskById(
      userId,
      taskId,
    );
    if (!task) throw new BadRequestException(`Task (${taskId}) not found`);

    const userTask = await this.firestoreUserRepository.findUserTaskById(
      userId,
      taskId,
    );
    if (!userTask)
      throw new BadRequestException(
        `User (${userId}) Task (${taskId}) not found`,
      );

    await this.firestoreTaskRepository.deleteTaskById(userId, taskId);
    await this.firestoreUserRepository.deleteUserTaskById(userId, taskId);
  }
}
