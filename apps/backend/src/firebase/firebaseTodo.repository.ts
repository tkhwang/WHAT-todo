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

  async addNewTodo(requestDto: AddTodoRequest) {
    const newTodo = {
      ...requestDto,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };
    try {
      const todoDoc = await this.#todoCollection.add(newTodo);
      console.log('🚀 ~ FirebaseTodoRepository ~ todoDoc:', todoDoc);
    } catch (error: unknown) {
      if (error instanceof Error) {
      }
    }
  }
}
