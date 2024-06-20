import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageCreateDto } from './message-create.dto';

@Controller('message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async getHello(@Body() messageBody: MessageCreateDto) {
    return this.messagesService.createMessage(messageBody);
  }
}
