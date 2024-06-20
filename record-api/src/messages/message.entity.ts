import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  user_id_send: string;

  @Column()
  user_id_receive: string;

  constructor(data: Omit<Message, 'id'>) {
    return Object.assign(this, data);
  }
}
