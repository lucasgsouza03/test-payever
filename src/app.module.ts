import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/user.models';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { RmqEventService } from './amq/amq.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/payever'),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MailerModule.forRoot({
      transport: 'smtps://api:80a3ba4ee817f34825ba3011f017a544@live.smtp.mailtrap.io',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, RmqEventService, {
    provide: 'USER_SERVICE',
    useFactory: () => {
      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'users_queue',
          queueOptions: { durable: false }
        }
      })
    }
  }],
})
export class AppModule { }
