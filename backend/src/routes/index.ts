// Importing required modules
import express from "express";
import { Application } from "express";

import { db } from "../../server";
import chatRoutes from "./chat";
import contextRoutes from "./context";
import messageRoutes from "./message";
import userRoutes from "./user";

export default class Routes {
  constructor(app: Application) {
    app.use(express.json());

    // Use routers
    app.use("/users", userRoutes);
    app.use("/chats", chatRoutes);
    app.use("/contexts", contextRoutes);
    app.use("/messages", messageRoutes);

    // Default endpoint
    app.get("/", (_req: any, res: any) => {
      res.send({ message: "Welcome to the Chat App API!" });
    });
    app.get("/db", (_req, res) => {
      res.json(db);
    });
  }
}
