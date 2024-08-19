import { Inject, Injectable } from '@nestjs/common';
import { COLLECTIONS, AddTodoRequest } from '@whatTodo/models';
import { app, firestore } from 'firebase-admin';

@Injectable()
export class FirebaseTodoRepository {
  #db: FirebaseFirestore.Firestore;
  #todoCollection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#todoCollection = this.#db.collection(COLLECTIONS.TODOS);
  }

  async addTodo(userId: string, addTodoDto: AddTodoRequest) {
    const newTodo = {
      ...addTodoDto,
      userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    return await this.#todoCollection.add(newTodo);
  }
}
