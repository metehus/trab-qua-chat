import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { TokenResponse } from './types';

@Injectable()
export class AuthApiClient {
  private client = axios.create({
    baseURL: 'http://localhost:8080',
  });

  async validateToken(token: string, userId: string) {
    try {
      const response = await this.client.get<TokenResponse>('token', {
        params: {
          userId,
        },
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.auth);

      if (!response.data.auth) {
        throw new Error('no auth');
      }
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Not auth');
    }
  }
}
