import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.models';
import { UserAvatarDto } from './userAvatar.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post('/api/users')
  @EventPattern('user')
  async createUser(@Body() userDto: User) {
    return this.appService.createUser(userDto);
  }

  @Get('/api/user/:id')
  readUser(@Param('id') id: string) {
    return this.appService.readUser(id);
  }

  @Get('/api/user/:id/avatar')
  async userAvatar(
    @Param('id') id: string,
    @Body() image: UserAvatarDto,
  ): Promise<User> {
    return this.appService.userAvatar(id, image);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }
}
