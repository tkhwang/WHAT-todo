import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignupRequest, AuthVerifyIdRequest } from '@whatTodo/models';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() signupRequest: AuthSignupRequest) {
    const { uid, email, name } = signupRequest;
    return this.usersService.createUser(uid, email, name);
  }

  @Post('verifyId')
  async verifyId(@Body() verifyIdRequest: AuthVerifyIdRequest) {
    const { id } = verifyIdRequest;
    return this.usersService.findById(id);
  }
}
