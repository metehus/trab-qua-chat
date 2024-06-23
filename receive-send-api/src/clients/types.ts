export interface TokenResponse {
  auth: boolean;
}

export interface MessageItem {
  id: string;
  userIdSend: string;
  userIdReceive: string;
  message: string;
}

export interface MessageResponse {
  messages: MessageItem[];
}
