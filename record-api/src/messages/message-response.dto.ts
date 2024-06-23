export class MessageReesponseDto {
  id: string;
  message: string;
  userIdSend: string;
  userIdReceive: string;

  constructor(data: MessageReesponseDto) {
    return Object.assign(this, data);
  }
}
