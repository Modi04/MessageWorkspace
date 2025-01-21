export interface Chat {
  id: string;
  context: string;
  name: string;
}

export interface Message {
  id: string;
  chatId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface JsonWebToken {
  context_id: string;
  token_type: string;
  exp: number;
  sub: string;
  executor_public_key: string;
}
