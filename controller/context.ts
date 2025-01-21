import { db } from "../../../server";
import { Context, Identity } from "../types";

// Create a new context and link it to a user
export const createContextForUser = (userId: string, context: Context) => {
  const user = db.users[userId];
  if (!user) {
    return null; // User not found
  }

  const contextId = `context-${Date.now()}`;
  db.contexts[contextId] = { ...context, id: contextId };
  user.contexts.push(contextId);

  return { contextId, ...context };
};

// View a specific context by ID
export const viewContext = (contextId: string) => {
  return db.contexts[contextId] || null;
};

// Get identities in a context matching user address and context members
export const getFilteredContextIdentities = (contextId: string, userAddress: string) => {
  // Step 1: Retrieve the context by ID
  const context = db.contexts[contextId];
  if (!context) {
    return null; // Context not found
  }

  // Step 2: Filter identities by address directly from the identities database
  const matchingIdentities = Object.values(db.identities).filter(
    (identity) => identity.profileImageUrl === userAddress
  );

  // Step 3: Match identities with context members
  const filteredIdentities = matchingIdentities.filter((identity) => context.members.includes(identity.id));

  return filteredIdentities;
};
