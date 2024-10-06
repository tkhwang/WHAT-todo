import { BadRequestException, Injectable } from '@nestjs/common';
import { SendTodoRequest } from '@whatTodo/models';
import { FirestoreListRepository } from 'src/firebase/firestore-list.repository';
import { FirestoreTaskRepository } from 'src/firebase/firestore-task.repository';
import { FirestoreUserRepository } from 'src/firebase/firestore-user.repository';

@Injectable()
export class TodosService {
  constructor(
    private readonly firebaseUserRepository: FirestoreUserRepository,
    private readonly firestoreListRepository: FirestoreListRepository,
    private readonly firestoreTaskRepository: FirestoreTaskRepository,
  ) {}

  async sendTodo(userId: string, sendTodoDto: SendTodoRequest) {
    const { title, todoTasks, expertId, supervisorIds, userIds } = sendTodoDto;

    if (supervisorIds.includes(userId)) {
      throw new BadRequestException(
        'Expert cannot be assigned as a supervisor',
      );
    }
    if (userIds.includes(userId)) {
      throw new BadRequestException('Expert cannot be assigned as a user');
    }

    // [*] top list
    const list = await this.firestoreListRepository.addList({
      title,
      expertId: userId,
      supervisorIds,
      userIds,
    });

    // [*] userLists as {expert, supervisor, user}
    // userList as expert: expertId = userId
    await this.firebaseUserRepository.addUserList({
      title,
      listId: list.id,
      expertId: userId,
    });

    // userList as supervisor
    const supervisorListPromises = supervisorIds.map(async (supervisorId) => {
      await this.firebaseUserRepository.addUserList({
        title,
        listId: list.id,
        supervisorId,
      });
    });
    await Promise.all(supervisorListPromises);

    // userList as user
    const userListPromises = userIds.map(async (userId) => {
      await this.firebaseUserRepository.addUserList({
        title,
        listId: list.id,
        userId,
      });
    });
    await Promise.all(userListPromises);

    // await Promise.all([
    //   expertPromise,
    //   supervisorListPromises,
    //   userListPromises,
    // ]);

    // [*] Tasks

    for (const todoTask of todoTasks) {
      // add top task
      // const task = await this.firestoreTaskRepository.addTask({
      //   listId: list.id,
      //   task:
      // });
      // add userTask
    }
  }
}
