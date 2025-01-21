import express, { Router } from "express";

import { viewUserChats } from "../controller/chat";
import { welcome } from "../controller/context";

class ChatRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", viewUserChats);
  }
}

export default new ChatRoutes().router;
