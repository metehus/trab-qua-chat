import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { AuthApiClient } from 'src/clients/auth-api-client';
import { MessagesService } from './messages.service';
import { AmqpModule } from 'nestjs-amqp';
import { RecordApiClient } from 'src/clients/record-api-client';

@Module({
  imports: [
    AmqpModule.forRoot({
      name: 'rabbitmq',
      hostname: 'localhost',
      port: 5672,
      // username: 'guest',
      // password: 'test',
    }),
  ],
  controllers: [MessagesController],
  providers: [AuthApiClient, RecordApiClient, MessagesService],
})
export class MessagesModule {}
