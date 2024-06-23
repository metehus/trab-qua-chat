import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { AuthApiClient } from 'src/clients/auth-api-client';
import { MessagePayload, SyncPayload } from './messages.types';
import { MessagesService } from './messages.service';

@Controller('message')
export class MessagesController {
  constructor(
    private authApiClient: AuthApiClient,
    private messagesService: MessagesService,
  ) {}

  @Post()
  async createMessage(
    @Headers('Authorization') authorization: string,
    @Body() payload: MessagePayload,
  ) {
    await this.authApiClient.validateToken(authorization, payload.userIdSend);

    return this.messagesService.createMessage(payload);
  }

  @Post('/worker')
  async syncMessages(
    @Headers('Authorization') authorization: string,
    @Body() payload: SyncPayload,
  ) {
    await this.authApiClient.validateToken(authorization, payload.userIdSend);

    return this.messagesService.syncMessages(payload);
  }

  @Get()
  async getMessages(
    @Headers('Authorization') authorization: string,
    @Query('userId') userId: string,
  ) {
    await this.authApiClient.validateToken(authorization, userId);

    return this.messagesService.getMessages(userId);
  }
}
