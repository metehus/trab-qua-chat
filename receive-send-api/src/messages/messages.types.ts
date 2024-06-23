export interface MessagePayload {
  userIdSend: string;
  userIdReceive: string;
  message: string;
}

export interface SyncPayload {
  userIdSend: string;
  userIdReceive: string;
}
