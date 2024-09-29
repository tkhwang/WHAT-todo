import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  @Auth()
  async findUserByText(@Query() { searchText }: { searchText: string }) {
    return this.usersService.findUserByText(searchText);
  }
}
