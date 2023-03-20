import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
