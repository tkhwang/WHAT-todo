import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { COLLECTIONS, AddTaskRequest, ITask } from '@whatTodo/models';
import { app, firestore } from 'firebase-admin';

@Injectable()
export class FirestoreTaskRepository {
  #db: FirebaseFirestore.Firestore;
  #taskCollection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#taskCollection = this.#db.collection(COLLECTIONS.TASKS);
  }

  async addTask(userId: string, addTaskDto: AddTaskRequest) {
    const newTask = {
      ...addTaskDto,
      isDone: false,
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
    } as ITask;
  }

  async deleteTaskById(userId: string, taskId: string) {
    const task = await this.findTaskById(userId, taskId);
    if (task) {
      await this.#taskCollection.doc(taskId).delete();
    }
  }

  async toggleTaskIsDone(userId: string, taskId: string) {
    const taskDoc = await this.findTaskById(userId, taskId);

    if (!taskDoc) throw new NotFoundException(`[-] Task (${taskId}) not found`);
    if (taskDoc.userId !== userId) throw new UnauthorizedException();

    await this.#taskCollection.doc(taskId).update({
      isDone: !taskDoc.isDone,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  }
}
