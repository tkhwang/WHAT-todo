import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  APP_ERRORS,
  AuthProviders,
  COLLECTIONS,
  TaskType,
  UserType,
} from '@whatTodo/models';
import { app, firestore } from 'firebase-admin';

@Injectable()
export class FirestoreUserRepository {
  #db: FirebaseFirestore.Firestore;
  #userCollection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#userCollection = this.#db.collection(COLLECTIONS.USERS);
  }

  /*
   *  User
   */
  async createUser({
    id,
    email,
    whatTodoId,
    name,
    provider,
  }: {
    id: string;
    email: string;
    whatTodoId: string;
    name: string;
    provider: AuthProviders;
  }) {
    try {
      const userDocRef = await this.#userCollection.doc(id).get();
      if (userDocRef.exists) {
        throw new Error(APP_ERRORS.AUTH.USER_ALREADY_EXITS);
      } else {
        await this.#userCollection.doc(id).set({
          email,
          whatTodoId,
          name,
          provider,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

        return {
          id,
          email,
          whatTodoId,
          name,
          provider,
        };
      }
    } catch (error) {
      throw new Error(APP_ERRORS.AUTH.REGISTRATION_FAILURE);
    }
  }

  async findUserById(id: string) {
    const userDocRef = await this.#userCollection
      .where('whatTodoId', '==', id)
      .get();

    if (userDocRef.size > 0) {
      throw new BadRequestException(APP_ERRORS.AUTH.USER_ALREADY_EXITS);
    }
  }

  async findUserByText(searchText: string) {
    const query = this.#userCollection.where(
      firestore.FieldPath.documentId(),
      '!=',
      'dummy',
    );

    const nameQuery = query
      .where('name', '>=', searchText)
      .where('name', '<=', searchText + '\uf8ff');

    const emailQuery = query
      .where('email', '>=', searchText)
      .where('email', '<=', searchText + '\uf8ff');

    const whatTodoIdQuery = query
      .where('whatTodoId', '>=', searchText)
      .where('whatTodoId', '<=', searchText + '\uf8ff');

    const [nameResults, emailResults, whatTodoIdResults] = await Promise.all([
      nameQuery.get(),
      emailQuery.get(),
      whatTodoIdQuery.get(),
    ]);

    const results = [
      ...nameResults.docs,
      ...emailResults.docs,
      ...whatTodoIdResults.docs,
    ];

    const uniqueResults = {};
    results.forEach((doc) => {
      if (uniqueResults[doc.id] === undefined) {
        uniqueResults[doc.id] = {
          id: doc.id,
          ...doc.data(),
        };
      }
    });

    return Object.values(uniqueResults);
  }

  /*
   *   list
   */
  async addUserList({
    userId,
    title,
    listId,
    userType,
    roleExpertId,
    roleSupervisorId,
    roleUserId,
  }: {
    userId: string;
    title: string;
    listId: string;
    userType: UserType;
    roleExpertId?: string;
    roleSupervisorId?: string;
    roleUserId?: string;
  }) {
    const newList = {
      title,
      listId,
      userType,
      ...(roleExpertId && { expertId: roleExpertId }),
      ...(roleSupervisorId && { supervisorId: roleSupervisorId }),
      ...(roleUserId && { userId: roleUserId }),
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    const list = await this.#userCollection
      .doc(userId)
      .collection(COLLECTIONS.LISTS)
      .doc(listId)
      .set(newList);

    return list;
  }

  /*
   *  Task
   */
  async addUserTask({
    userId,
    todoId,
    listId,
    task,
    taskType,
    userType,
    expertId,
    supervisorIds,
    userIds,
  }: {
    userId: string;
    todoId: string;
    listId: string;
    task: string;
    taskType: TaskType;
    userType: UserType;
    expertId?: string;
    supervisorIds: string[];
    userIds: string[];
  }) {
    const newTodo = {
      todoId,
      listId,
      task,
      taskType,
      userType,
      isDone: false,
      ...(expertId ? { expertId } : {}),
      supervisorIds,
      userIds,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    const userTodoRef = this.#userCollection
      .doc(userId)
      .collection(COLLECTIONS.TASKS)
      .doc(todoId);
    await userTodoRef.set(newTodo);
    const userTodoId = userTodoRef.id;

    return {
      ...newTodo,
      id: userTodoId,
    };
  }

  async findUserTaskById(userId: string, taskId: string) {
    return await this.#userCollection
      .doc(userId)
      .collection(COLLECTIONS.TASKS)
      .doc(taskId)
      .get();
  }

  async deleteUserTaskById(userId: string, taskId: string) {
    return await this.#userCollection
      .doc(userId)
      .collection(COLLECTIONS.TASKS)
      .doc(taskId)
      .delete();
  }
}
