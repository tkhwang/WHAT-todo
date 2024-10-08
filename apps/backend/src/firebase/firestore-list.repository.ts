import { Inject, Injectable } from '@nestjs/common';
import { COLLECTIONS } from '@whatTodo/models';
import { app, firestore } from 'firebase-admin';

@Injectable()
export class FirestoreListRepository {
  #db: FirebaseFirestore.Firestore;
  #listCollection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#listCollection = this.#db.collection(COLLECTIONS.LISTS);
  }

  async addList({
    title,
    expertId,
    supervisorIds,
    userIds,
  }: {
    title: string;
    expertId?: string;
    supervisorIds: string[];
    userIds: string[];
  }) {
    const newList = {
      title,
      ...(expertId && { expertId }),
      userIds,
      supervisorIds,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    return await this.#listCollection.add(newList);
  }
}
