import { Message, Chat } from '../types/types';
import { ApiResponse } from './response';

export interface ViewChats {
  user_id: string;
  context_id: string;
}

export interface CreateChat {
  id: string;
  context: string;
  name: string;
}

export interface ViewChatMessages {
  chat_id: string;
}

export interface CreateChatMessages {
  chat_id: string;
  user_id: string;
  content: string;
}

export enum ClientMethod {
  VIEW_USER_CHAT = 'view_user_chats',
  VIEW_CHAT = 'view_chat',
  CREATE_CHAT = 'create_user_chat',
  VIEW_MESSAGES = 'view_chat_message',
  CREATE_MESSAGES = 'create_chat_message',
}

export interface ClientApi {
  fetchChat(params: { chat_id: string }): ApiResponse<Chat>;
  fetchChats(params: ViewChats): ApiResponse<Chat[]>;
  createChats(params: CreateChat): ApiResponse<any>;
  fetchMessages(params: ViewChatMessages): ApiResponse<Message[]>;
  createMessages(params: CreateChatMessages): ApiResponse<any>;
}
