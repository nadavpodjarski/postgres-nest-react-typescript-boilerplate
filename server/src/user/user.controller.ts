import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('login')
  login(@Body() data: UserDTO) {
    console.log(data);
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }

  @Get('profile')
  @UseGuards(new AuthGuard())
  getProfile(@Req() req) {
    const userEmail = req.user.email;
    return this.userService.getProfile(userEmail);
  }
}
