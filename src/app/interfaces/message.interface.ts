export interface Message {
  name: any;
  message?: string;
  timestamp?: number;
}

export interface Room {
  name: any;
  messages: Message;
  timestamp?: number;
}

export interface User {
  name?: string;
  photo?: string;
  uid?: string;
}
