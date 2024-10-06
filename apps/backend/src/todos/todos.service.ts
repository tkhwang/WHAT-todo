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

  async sendTodo(userId: string, sendTodo: SendTodoRequest) {}
}
