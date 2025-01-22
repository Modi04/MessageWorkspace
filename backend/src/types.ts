export interface User {
  context: string[];
}

export interface Context {
  id: string;
  name: string;
  members: Identity[];
}

export interface Identity {
  id: string;
  address: string;
  name: string;
  profile: string;
  description: string;
}

export interface ChatRoom {
  context: string;
  chatRoomId: string;
  name: string;
}

export interface Message {
  messageId: string;
  chatRoomId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Database {
  users: { [id: string]: User };
  contexts: { [id: string]: Context };
  chats: { [id: string]: ChatRoom };
  messages: { [id: string]: Message };
  identities: { [id: string]: Identity };
}
