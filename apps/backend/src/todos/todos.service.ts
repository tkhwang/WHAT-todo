import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SendTodoRequest } from '@whatTodo/models';
import { FirestoreListRepository } from 'src/firebase/firestore-list.repository';
import { FirestoreTaskRepository } from 'src/firebase/firestore-task.repository';
import { FirestoreUserRepository } from 'src/firebase/firestore-user.repository';

@Injectable()
export class TodosService {
  constructor(
    private readonly firebaseUserRepository: FirestoreUserRepository,
    private readonly firestoreListRepository: FirestoreListRepository,
    private readonly firestoreTaskRepository: FirestoreTaskRepository,
  ) {}

  async sendTodo(requestingUserId: string, sendTodoDto: SendTodoRequest) {
    const { title, todoTasks, expertId, supervisorIds, userIds } = sendTodoDto;

    if (requestingUserId !== expertId)
      throw new UnauthorizedException(
        `ExpertId is not matched with requesting userId.`,
      );

    if (supervisorIds.includes(requestingUserId)) {
      throw new BadRequestException(
        'Expert cannot be assigned as a supervisor',
      );
    }
    if (userIds.includes(requestingUserId)) {
      throw new BadRequestException('Expert cannot be assigned as a user');
    }

    // [*] top list
    const listRef = await this.firestoreListRepository.addList({
      title,
      expertId,
      supervisorIds,
      userIds,
    });

    // [*] userLists as {expert, supervisor, user}
    // userList as expert: expertId = userId
    await this.firebaseUserRepository.addUserList({
      userId: expertId,
      title,
      listId: listRef.id,
      userType: 'expert',
      roleExpertId: expertId,
    });

    // userList as supervisor
    const supervisorListPromises = supervisorIds.map(async (supervisorId) => {
      await this.firebaseUserRepository.addUserList({
        userId: supervisorId,
        title,
        listId: listRef.id,
        userType: 'supervisor',
        roleSupervisorId: supervisorId,
      });
    });
    await Promise.all(supervisorListPromises);

    // userList as user
    const userListPromises = userIds.map(async (userId) => {
      await this.firebaseUserRepository.addUserList({
        userId,
        title,
        listId: listRef.id,
        userType: 'user',
        roleUserId: userId,
      });
    });
    await Promise.all(userListPromises);

    // [*] Tasks
    for (const todoTask of todoTasks) {
      // add top task
      const taskRef = await this.firestoreTaskRepository.addTask({
        listId: listRef.id,
        task: todoTask.task,
        taskType: todoTask.taskType,
        expertId: requestingUserId,
        supervisorIds,
        userIds,
      });

      const taskSnapshot = await taskRef.get();
      const taskDoc = taskSnapshot.data();

      const commonTask = {
        todoId: taskRef.id,
        listId: listRef.id,
        task: taskDoc.task,
        taskType: taskDoc.taskType,
      };

      // add userTask as expert
      const userTaskPromiseAsExpert = this.firebaseUserRepository.addUserTask({
        userId: expertId,
        ...commonTask,
        userType: 'expert',
        expertId,
        supervisorIds,
        userIds,
      });
      // add userTask as supervisor
      const userTaskPromiseBySupervisor = supervisorIds.map(
        async (supervisorId) => {
          return this.firebaseUserRepository.addUserTask({
            userId: supervisorId,
            ...commonTask,
            userType: 'supervisor',
            expertId,
            supervisorIds,
            userIds,
          });
        },
      );
      // add userTask as user
      const userTaskPromiseByUser = userIds.map(async (userId) => {
        return this.firebaseUserRepository.addUserTask({
          userId,
          ...commonTask,
          userType: 'user',
          expertId,
          supervisorIds,
          userIds,
        });
      });

      await Promise.all([
        userTaskPromiseAsExpert,
        userTaskPromiseBySupervisor,
        userTaskPromiseByUser,
      ]);
    }
  }
}
