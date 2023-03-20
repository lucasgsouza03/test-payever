import { Inject, Injectable } from '@nestjs/common';
import { UserDocument, User } from './user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { MailerService } from '@nestjs-modules/mailer';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly UserModel: Model<UserDocument>,
    @Inject('USER_SERVICE') private rabbitClient: ClientProxy,
    private readonly mailerService: MailerService,
  ) {}

  //create user
  async createUser(user: User): Promise<User> {
    try {
      const newUser = new this.UserModel(user);
      this.send(newUser.username);
      this.rabbitClient.send({
        cmd: `created-user-${newUser.username}`,
      },
      newUser);
      return newUser.save();
      
    } catch (error) {
      console.log(error)
    }
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

  public send(username): void {
    this.mailerService
      .sendMail({
        to: 'bojol51830@galcake.com',
        from: 'no-reply@test.payever',
        subject: 'Send dummy mail',
        text: `Dummy e-mail for ${username}`,
        html: `<b>welcome ${username}</b>`,
      })
      .then((mail) => {
        console.log(mail);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
