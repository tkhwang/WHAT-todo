import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { COLLECTIONS, AddTaskRequest } from '@whatTodo/models';
import { app, firestore } from 'firebase-admin';

@Injectable()
export class FirebaseTaskRepository {
  #db: FirebaseFirestore.Firestore;
  #taskCollection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#taskCollection = this.#db.collection(COLLECTIONS.TASKS);
  }

  async addTask(userId: string, addTaskDto: AddTaskRequest) {
    const newTask = {
      ...addTaskDto,
      userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    return await this.#taskCollection.add(newTask);
  }

  async findTaskById(userId: string, taskId: string) {
    const taskDoc = await this.#taskCollection.doc(taskId).get();

    if (!taskDoc.exists) throw new NotFoundException('Task not found');
    if (taskDoc.data().userId !== userId) throw new UnauthorizedException();

    return {
      id: taskDoc.id,
      ...taskDoc.data(),
    };
  }

  async deleteTaskById(userId: string, taskId: string) {
    const task = await this.findTaskById(userId, taskId);
    if (task) {
      await this.#taskCollection.doc(taskId).delete();
    }
  }
}
