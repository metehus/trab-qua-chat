import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageCreateDto } from './message-create.dto';

@Controller('message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async postMessage(@Body() messageBody: MessageCreateDto) {
    return this.messagesService.createMessage(messageBody);
  }

  @Get()
  async getMessages(@Query('userId') userId: string) {
    return this.messagesService.getMessages(userId);
  }
}
