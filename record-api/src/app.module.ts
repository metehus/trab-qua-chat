import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/message.entity';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: 'root',
      password: 'db-pass123',
      database: 'record-db',
      entities: [Message],
      synchronize: true,
    }),
    MessagesModule,
  ],
})
export class AppModule {}
