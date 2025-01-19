// Importing required modules
import express from "express";
import userRouter from "./routes/user";
import contextRouter from "./routes/context";
import messageRouter from "./routes/message";
import { Database } from "./types";

// In-memory database
export const db: Database = {
  users: {},
  chats: {},
  messages: {},
  contexts : {},
  identities : {}
};


const app = express();
const PORT = 4000;

app.use(express.json());

// Use routers
app.use("/users", userRouter);
app.use("/contexts", contextRouter);

app.use("/messages", messageRouter);

// Default endpoint
app.get("/", (_req, res) => {
  res.send("Welcome to the Chat App API!");
});

// Static file service
app.use(express.static("dist"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
