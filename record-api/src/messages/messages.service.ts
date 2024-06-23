import { Injectable } from '@nestjs/common';
import { MessageCreateDto } from './message-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { MessageReesponseDto } from './message-response.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createMessage(message: MessageCreateDto) {
    const entity = new Message({
      message: message.message,
      user_id_receive: message.userIdReceive,
      user_id_send: message.userIdSend,
    });
    const saved = await this.messageRepository.save(entity);

    return new MessageReesponseDto({
      id: saved.id,
      message: saved.message,
      userIdReceive: saved.user_id_receive,
      userIdSend: saved.user_id_send,
    });
  }

  async getMessages(senderUserId: string) {
    const messages = await this.messageRepository.find({
      where: {
        user_id_send: senderUserId,
      },
    });

    return {
      messages: messages.map(
        (msg) =>
          new MessageReesponseDto({
            id: msg.id,
            message: msg.message,
            userIdReceive: msg.user_id_receive,
            userIdSend: msg.user_id_send,
          }),
      ),
    };
  }
}
