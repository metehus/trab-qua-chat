import { Injectable } from '@nestjs/common';
import { MessageCreateDto } from './message-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  createMessage(message: MessageCreateDto) {
    const entity = new Message(message);
    return this.messageRepository.save(entity);
  }
}
