import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagePayload, SyncPayload } from './messages.types';
import { Connection } from 'amqplib';
import { InjectAmqpConnection } from 'nestjs-amqp';
import { RecordApiClient } from 'src/clients/record-api-client';

@Injectable()
export class MessagesService {
  constructor(
    @InjectAmqpConnection('rabbitmq')
    private amqp: Connection,
    private recordApiClient: RecordApiClient,
  ) {}

  private createQueueName(senderId: string, receiverId: string) {
    return senderId + receiverId;
  }

  async createMessage(payload: MessagePayload) {
    const channel = await this.amqp.createChannel();

    const queue = this.createQueueName(
      payload.userIdSend,
      payload.userIdReceive,
    );

    channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));

    return {
      msg: 'Message sent!',
    };
  }

  async syncMessages(payload: SyncPayload) {
    const channel = await this.amqp.createChannel();

    const queue = this.createQueueName(
      payload.userIdSend,
      payload.userIdReceive,
    );

    channel.assertQueue(queue);
    const queueDetails = await channel.checkQueue(queue);
    if (queueDetails.messageCount === 0) {
      throw new NotFoundException('no messages to sync');
    }

    const message = await new Promise<MessagePayload>((resolve) => {
      channel.consume(queue, async (msg) => {
        resolve(JSON.parse(msg.content.toString()));
        channel.ack(msg);
        channel.close();
      });
    });

    return this.recordApiClient.createMessage(message);
  }

  async getMessages(userId: string) {
    return this.recordApiClient.getMessages(userId);
  }
}
