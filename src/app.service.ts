import { Injectable } from '@nestjs/common';
import { UserDocument, User } from './user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { MailService } from './mail.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('user') private readonly UserModel: Model<UserDocument>,
    private mailService: MailService,
  ) {}

  //create user
  async createUser(user: User): Promise<User> {
    const newUser = new this.UserModel(user);
    this.mailService.send(newUser.username);
    return newUser.save();
  }

  //get user
  async readUser(id) {
    return axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((resp) => resp.data)
      .catch((err) => console.log(err));
  }

  //update user
  async userAvatar(id, data): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  //delete user
  async deleteUser(id) {
    return this.UserModel.findByIdAndRemove(id);
  }
}
