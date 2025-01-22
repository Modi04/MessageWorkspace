import { Request, Response } from "express";

import { db } from "../../server";

export function viewUserProfile(req: Request, res: Response): Response {
  const userId = req.query.userId as string;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "Missing userId in query parameters" });
  }

  // Retrieve user from the database
  const user = db.identities[userId];

  // Check if user exists
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Return user profile as JSON
  return res.status(200).json(user);
}
