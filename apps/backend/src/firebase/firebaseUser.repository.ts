import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { APP_ERRORS, AuthProviders } from '@whatTodo/models';
import { app, firestore } from 'firebase-admin';

@Injectable()
export class FirebaseUserRepository {
  #db: FirebaseFirestore.Firestore;
  #userCollection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#userCollection = this.#db.collection('users');
  }

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
      }
    } catch (error) {
      throw new Error(APP_ERRORS.AUTH.REGISTRATION_FAILURE);
    }
  }

  async findUserById(id: string) {
    const userDocRef = await this.#userCollection.where('id', '==', id).get();

    if (userDocRef.size > 0) {
      throw new BadRequestException(APP_ERRORS.AUTH.USER_ALREADY_EXITS);
    }
  }
}
