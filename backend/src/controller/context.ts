import { Request, Response } from "express";

import { db } from "../../server";

export function welcome(req: Request, res: Response): Response {
  return res.json({ message: "Welcome to bezkoder application." });
}

// View user's contexts
export function viewUserContexts(req: Request, res: Response): Response {
  const userId = req.query.userAddress as string;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "Missing userId in query parameters" });
  }

  // Check if user exists
  const user = db.users[userId];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Retrieve context details for the user
  const userContexts = user.context.map((contextId) => db.contexts[contextId]);

  return res.json({ contexts: userContexts });
}

// View user's identities
export function viewUserIdentities(req: Request, res: Response): Response {
  const userId = req.query.userAddress as string; // 사용자 ID
  const contextId = req.query.contextId as string; // 컨텍스트 ID

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "Missing userId in query parameters" });
  }

  // Check if user exists
  const user = db.users[userId];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if contextId is provided
  if (!contextId) {
    return res.status(400).json({ error: "Missing contextId in query parameters" });
  }

  // Check if user is part of the context
  if (!user.context.includes(contextId)) {
    return res.status(403).json({ error: "User does not belong to the specified context" });
  }

  // Retrieve all identities from the specified context
  const context = db.contexts[contextId];
  if (!context) {
    return res.status(404).json({ error: "Context not found" });
  }

  const userIdentities = context.members.filter((identity) => identity.address === userId);

  return res.json({ identities: userIdentities });
}

export function viewContextMembers(req: Request, res: Response): Response {
  const contextId = req.query.contextId as string;

  // Check if userId is provided
  if (!contextId) {
    return res.status(400).json({ error: "Missing contextId in query parameters" });
  }

  // Check if user exists
  const context = db.contexts[contextId];
  if (!context) {
    return res.status(404).json({ error: "Context not found" });
  }

  return res.json({ members: context.members });
}

export function addIdentity(req: Request, res: Response): Response {
  const contextId = req.query.contextId as string;

  // Check if userId is provided
  if (!contextId) {
    return res.status(400).json({ error: "Missing contextId in query parameters" });
  }

  // Check if user exists
  const context = db.contexts[contextId];
  if (!context) {
    return res.status(404).json({ error: "Context not found" });
  }

  return res.json({ members: context.members });
}

export function addIdentityToContext() {
  const identity = {
    id: "newIdentity1",
    address: "0xabcdefabcdefabcdef",
    name: "John, Smart Contract Developer",
    profile: "J",
    description: "Specializes in developing secure smart contracts.",
  };
  // 컨텍스트의 멤버 목록에 새로운 Identity 추가
  db.contexts["Afg66vswxKBQvxmmXgrEA1Y9zxA2NuNWkxFEKpJAFLsL"].members.push(identity);
}

// Create a new context and link it to a user
// export const createContextForUser = (userId: string, context: Context) => {
//   const user = db.users[userId];
//   if (!user) {
//     return null; // User not found
//   }

//   const contextId = `context-${Date.now()}`;
//   db.contexts[contextId] = { ...context, id: contextId };
//   user.contexts.push(contextId);

//   return { contextId, ...context };
// };

// // View a specific context by ID
// export const viewContext = (contextId: string) => {
//   return db.contexts[contextId] || null;
// };

// // Get identities in a context matching user address and context members
// export const getFilteredContextIdentities = (contextId: string, userAddress: string) => {
//   // Step 1: Retrieve the context by ID
//   const context = db.contexts[contextId];
//   if (!context) {
//     return null; // Context not found
//   }

//   // Step 2: Filter identities by address directly from the identities database
//   const matchingIdentities = Object.values(db.identities).filter(
//     (identity) => identity.profileImageUrl === userAddress
//   );

//   // Step 3: Match identities with context members
//   const filteredIdentities = matchingIdentities.filter((identity) => context.members.includes(identity.id));

//   return filteredIdentities;
// };
