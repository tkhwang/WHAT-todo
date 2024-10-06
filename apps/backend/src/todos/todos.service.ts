import { Injectable } from '@nestjs/common';
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
    const { expertId, userIds, supervisorIds, todoListTitle, todoTasks } =
      sendTodoDto;

    // create top list
    const listId = await this.firestoreListRepository.addList({
      title: todoListTitle,
      expertId: userId,
      supervisorIds,
      userIds,
    });

    // create user list of expert
    // create user list of supervisor
    // create user list of user
  }
}
