import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MessagePayload } from 'src/messages/messages.types';
import { MessageResponse } from './types';

@Injectable()
export class RecordApiClient {
  private client = axios.create({
    baseURL: 'http://localhost:3003',
  });

  async createMessage(payload: MessagePayload) {
    return this.client.post('message', payload).then((r) => r.data);
  }

  async getMessages(senderUserId: string) {
    return this.client
      .get<MessageResponse>('message', {
        params: {
          userId: senderUserId,
        },
      })
      .then((r) => r.data);
  }
}
