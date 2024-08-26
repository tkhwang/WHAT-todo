import { FirestoreUserRepository } from './firestore-user.repository';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import * as admin from 'firebase-admin';
import firebaseConfig from 'src/config/firebase.config';
import { FirestoreTaskRepository } from './firestore-task.repository';
import { FirestoreListRepository } from './firestore-list.repository';
import { FirestoreStepRepository } from './firestore-step.repository';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService, firebaseConfig.KEY],
  useFactory: (
    configService: ConfigService,
    firebaseConfiguration: ConfigType<typeof firebaseConfig>,
  ) => {
    const firebaseConfig = {
      type: firebaseConfiguration.type,
      project_id: firebaseConfiguration.project_id,
      private_key_id: firebaseConfiguration.private_key_id,
      private_key: firebaseConfiguration.private_key?.replace(/\\n/g, '\n'),
      client_email: firebaseConfiguration.client_email,
      client_id: firebaseConfiguration.client_id,
      auth_uri: firebaseConfiguration.auth_uri,
      token_uri: firebaseConfiguration.token_uri,
      auth_provider_x509_cert_url:
        firebaseConfiguration.auth_provider_x509_cert_url,
      client_x509_cert_url: firebaseConfiguration.client_x509_cert_url,
      universe_domain: firebaseConfiguration.universe_domain,
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule.forFeature(firebaseConfig)],
  providers: [
    firebaseProvider,
    FirestoreListRepository,
    FirestoreStepRepository,
    FirestoreTaskRepository,
    FirestoreUserRepository,
  ],
  exports: [
    FirestoreListRepository,
    FirestoreStepRepository,
    FirestoreTaskRepository,
    FirestoreUserRepository,
  ],
})
export class FirebaseModule {}
