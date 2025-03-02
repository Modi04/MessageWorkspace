export interface Chat {
  id: string;
  context: string;
  name: string;
}

export interface Message {
  id: number;
  chatId: string;
  user_id: string;
  content: string;
  createdAt: number;
}

export interface JsonWebToken {
  context_id: string;
  token_type: string;
  exp: number;
  sub: string;
  executor_public_key: string;
}
