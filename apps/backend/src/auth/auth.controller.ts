import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignupRequest, AuthVerifyIdRequest } from '@whatTodo/models';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('verifyId')
  async verifyId(@Body() verifyIdRequest: AuthVerifyIdRequest) {
    const { id } = verifyIdRequest;
    return this.usersService.findById(id);
  }

  @Post('signup')
  async signup(@Body() signupRequest: AuthSignupRequest) {
    const { id, email, whatTodoId, name, provider } = signupRequest;
    return this.authService.createUser({
      id,
      email,
      whatTodoId,
      name,
      provider,
    });
  }
}
