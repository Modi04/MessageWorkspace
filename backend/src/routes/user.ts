import express, { Router } from "express";

import { viewUserProfile } from "../controller/user";

class UserRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", viewUserProfile);
  }
}

export default new UserRoutes().router;
