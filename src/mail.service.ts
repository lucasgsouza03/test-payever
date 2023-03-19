import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public send(username): void {
    this.mailerService
      .sendMail({
        to: 'tapego6270@necktai.com',
        from: 'lucastest762@gmail.com',
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
