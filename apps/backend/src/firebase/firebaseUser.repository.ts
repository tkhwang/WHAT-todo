import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseUserRepository {
  #db: FirebaseFirestore.Firestore;
  #collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#collection = this.#db.collection('users');
  }

  async createUser(uid: string, email: string, name: string) {
    try {
      const userDoc = await this.#collection.doc(uid).get();
      console.log(
        '🚀 ~ FirebaseUserRepository ~ createUser ~ userDoc:',
        userDoc,
      );
    } catch (error) {
      console.log('🚀 ~ FirebaseUserRepository ~ createUser ~ error:', error);
    }
  }
}
