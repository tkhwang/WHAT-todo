import { Inject } from '@nestjs/common';
import { COLLECTIONS } from '@whatTodo/models';
import { app } from 'firebase-admin';

export class FirestoreStepRepository {
  #db: FirebaseFirestore.Firestore;
  #stepCollection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#stepCollection = this.#db.collection(COLLECTIONS.STEPS);
  }
}
