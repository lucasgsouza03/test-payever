import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.models';
import { UserAvatarDto } from './userAvatar.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api/users')
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
