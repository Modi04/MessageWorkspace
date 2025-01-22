import express, { Application } from "express";

import Server from "./src/index";
import { Database } from "./src/types";

const app: Application = express();
const server: Server = new Server(app);

// In-memory database
export const db: Database = {
  users: {},
  chats: {},
  messages: {},
  contexts: {},
  identities: {},
};

// Database 초기화 함수
export function initializeDatabase(): void {
  db.users = {
    "0x123456789abcdef": {
      context: ["7pKhBjjqHTf5w1GsgShrXipFpxhfCbVBpwmPyA747rr", "0xabcdef987654321"],
    },
    identity3: {
      context: ["0x987654321abcdef"],
    },
  };

  db.contexts = {
    Afg66vswxKBQvxmmXgrEA1Y9zxA2NuNWkxFEKpJAFLsL: {
      id: "Afg66vswxKBQvxmmXgrEA1Y9zxA2NuNWkxFEKpJAFLsL",
      name: "Blockchain Enthusiasts",
      members: [
        {
          id: "FK44Dtq1pjoJQ5gUNN7WutDAND1DPMwwJTtMob8QQtjz",
          address: "0x123456789abcdef",
          name: "Alice",
          profileImageUrl: "https://example.com/profile1.jpg",
          description: "Blockchain developer and enthusiast.",
        },
        {
          id: "identity3",
          address: "0xabcdef123456789",
          name: "aasdas",
          profileImageUrl: "https://example.com/profile2.jpg",
          description: "AI researcher focused on NLP.",
        },
      ],
    },
    "0xabcdef987654321": {
      id: "0xabcdef987654321",
      name: "AI Researchers",
      members: [
        {
          id: "identity1",
          address: "0x123456789abcdef",
          name: "Bob",
          profileImageUrl: "https://example.com/profile2.jpg",
          description: "AI researcher focused on NLP.",
        },
      ],
    },
  };

  db.chats = {
    chatRoom1: {
      context: "0x987654321abcdef",
      chatRoomId: "identity1andidentity2",
      name: "Alice",
    },
    chatRoom2: {
      context: "0x987654321abcdef",
      chatRoomId: "identity1andidentity3",
      name: "BOB",
    },
  };

  db.messages = {
    message1: {
      messageId: "message1",
      chatRoomId: "identity1andidentity2",
      userId: "0x123456789abcdef",
      content: "Hello, everyone! Excited to discuss blockchain here.",
      createdAt: new Date().toISOString(),
    },
    message2: {
      messageId: "message2",
      chatRoomId: "identity1andidentity3",
      userId: "0xabcdef123456789",
      content: "AI is evolving rapidly. Let's discuss recent advances.",
      createdAt: new Date().toISOString(),
    },
  };

  db.identities = {
    "9py27fWqXuccXpzudDUhZTg6ohzAAZEceCpVLz97b1a3": {
      id: "9py27fWqXuccXpzudDUhZTg6ohzAAZEceCpVLz 97b1a3",
      address: "0x123456789abcdef",
      name: "Alice",
      profileImageUrl: "https://example.com/profile1.jpg",
      description: "Blockchain developer and enthusiast.",
    },
    FK44Dtq1pjoJQ5gUNN7WutDAND1DPMwwJTtMob8QQtjz: {
      id: "FK44Dtq1pjoJQ5gUNN7WutDAND1DPMwwJTtMob8QQtjz",
      address: "0x123456789abcdef",
      name: "Bob",
      profileImageUrl: "https://example.com/profile2.jpg",
      description: "AI researcher focused on NLP.",
    },
    identity3: {
      id: "identity3",
      address: "0x123456789abcdef",
      name: "Carol",
      profileImageUrl: "https://example.com/profile2.jpg",
      description: "AI researcher focused on NLP.",
    },
  };
}

initializeDatabase();

app.listen(8080).on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.log("Error: address already in use");
  } else {
    console.log(err);
  }
});
