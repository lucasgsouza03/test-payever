import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.models';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/payever'),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MailerModule.forRoot({
      transport: 'smtps://lucastest762@gmail.com:pass@smtp.domain.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
