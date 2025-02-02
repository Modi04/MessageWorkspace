import express, { Request, Response, Router } from "express";

import {
  addIdentityToContext,
  viewContextMembers,
  viewUserContexts,
  viewUserIdentities,
  welcome,
} from "../controller/context";

class ContextRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
    this.router.get("/user", viewUserContexts);
    this.router.get("/identities", viewUserIdentities);
    this.router.get("/members", viewContextMembers);
    this.router.get("/identity", addIdentityToContext);
  }
}

// Create a new context

// router.post("/", (req: Request<any, any, { userId: string; context: Context }>, res: Response) => {
//   const { userId, context } = req.body;
//   const result = createContextForUser(userId, context);

//   if (result) {
//     res.status(201).json(result);
//   } else {
//     res.status(404).json({ error: "Failed to create context or user not found" });
//   }
// });

// // Retrieve a specific context by ID
// router.get("/:contextId", (req: Request<{ contextId: string }>, res: Response) => {
//   const { contextId } = req.params;
//   const context = viewContext(contextId);

//   if (context) {
//     res.json(context);
//   } else {
//     res.status(404).json({ error: "Context not found" });
//   }
// });

// // Retrieve all contexts
// router.get("/", (_req: Request, res: Response) => {
//   res.json(db.contexts);
// });

// // Delete a specific context by ID
// router.delete("/:contextId", (req: Request<{ contextId: string }>, res: Response) => {
//   const { contextId } = req.params;

//   if (db.contexts[contextId]) {
//     delete db.contexts[contextId];
//     res.status(200).json({ message: "Context deleted successfully" });
//   } else {
//     res.status(404).json({ error: "Context not found" });
//   }
// });

export default new ContextRoutes().router;
