import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigninOrSignupDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('signinOrSignup')
  signinOrSignup(@Body() signinOrSignupDto: SigninOrSignupDto) {
    return this.usersService.signinOrSignup(signinOrSignupDto);
  }
}
