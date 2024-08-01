import { FirebaseAdmin } from '../config/firebase.setup';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly admin: FirebaseAdmin,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.admin.setup();
    const idToken = context.getArgs()[0]?.headers?.authorization?.split(' ')[1];

    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    try {
      const claims = await app.auth().verifyIdToken(idToken);
      console.log('TCL: AuthGuard -> claims', claims);

      if (claims.role === permissions[0]) return true;
      throw new UnauthorizedException();
    } catch (error) {
      console.log('[-][AuthGuard] canActivate failed.', error);
      throw new UnauthorizedException();
    }
  }
}
