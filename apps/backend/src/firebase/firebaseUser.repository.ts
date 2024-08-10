import { Inject, Injectable } from '@nestjs/common';
import { APP_ERRORS } from '@whatTodo/models';
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
      const userDocRef = await this.#collection.doc(uid).get();
      if (userDocRef.exists) {
        throw new Error(APP_ERRORS.AUTH.USER_ALREADY_EXITS);
      }
    } catch (error) {
      console.log('🚀 ~ FirebaseUserRepository ~ createUser ~ error:', error);
    }
  }

  async findUserById(id: string) {
    const userDocRef = await this.#collection.where('id', '==', id).get();
    if (userDocRef.size > 0) {
      throw new Error(APP_ERRORS.AUTH.USER_ALREADY_EXITS);
    }
  }
}
