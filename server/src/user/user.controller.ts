import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('login')
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    console.log(data);
    return this.userService.register(data);
  }
}
