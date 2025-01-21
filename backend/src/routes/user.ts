import express, { Router } from "express";

import { welcome } from "../controller/context";

class UserRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
  }
}

// const router = express.Router();

// // View all users
// router.get("/", (req, res) => {
//   const users = getAllUsers();
//   res.json(users);
// });

// // View a specific user by ID
// router.get("/:userId", (req, res) => {
//   const { userId } = req.params;
//   const user = getUserById(userId);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ error: "User not found" });
//   }
// });

// router.get("/:userId/contexts", (req, res) => {
//   const { userId } = req.params;
//   const user = getUserById(userId);
//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   const contexts = user.contexts
//     .map((contextId) => viewContext(contextId))
//     .filter((context) => context !== null);
//   res.json(contexts);
// });

// // Create a new user
// router.post("/", (req, res) => {
//   const newUser = req.body;
//   const createdUser = createUser(newUser);
//   if (createdUser) {
//     res.status(201).json(createdUser);
//   } else {
//     res.status(400).json({ error: "Failed to create user" });
//   }
// });

export default new UserRoutes().router;
