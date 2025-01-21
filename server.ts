// Importing required modules
import express from "express";
import { Application } from "express";

import contextRouter from "./backend/src/routes/context";
import messageRouter from "./backend/src/routes/message";
import userRouter from "./backend/src/routes/user";

export default class Routes {
  constructor(app: Application) {
    app.use(express.json());

    // Use routers
    app.use("/users", userRouter);
    app.use("/contexts", contextRouter);
    app.use("/messages", messageRouter);

    // Default endpoint
    app.get("/", (_req: any, res: any) => {
      res.send({ message: "Welcome to the Chat App API!" });
    });
  }
}
