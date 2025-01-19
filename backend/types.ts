export interface User {
  address: string;
  contexts: string[];
}

export interface Context {
  id : string;
  name : string;
  members: string[];
  chatRooms: string[];
  messages: string[];
}

export interface Member {
  identity: Identity;
  access: string;
}

export interface Identity {
  id: string;
  address : string;
  profileImageUrl: string;
  description: string;
}

export interface ChatRoom {
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
  contexts: { [id: string]: Context };
  users: { [id: string]: User };
  chats: { [id: string]: ChatRoom };
  messages: { [id: string]: Message };
  identities:  { [id: string] : Identity };
}