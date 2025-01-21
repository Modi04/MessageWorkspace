"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredContextIdentities = exports.viewContext = exports.createContextForUser = void 0;
const server_1 = require("../server");
// Create a new context and link it to a user
const createContextForUser = (userId, context) => {
    const user = server_1.db.users[userId];
    if (!user) {
        return null; // User not found
    }
    const contextId = `context-${Date.now()}`;
    server_1.db.contexts[contextId] = Object.assign(Object.assign({}, context), { id: contextId });
    user.contexts.push(contextId);
    return Object.assign({ contextId }, context);
};
exports.createContextForUser = createContextForUser;
// View a specific context by ID
const viewContext = (contextId) => {
    return server_1.db.contexts[contextId] || null;
};
exports.viewContext = viewContext;
// Get identities in a context matching user address and context members
const getFilteredContextIdentities = (contextId, userAddress) => {
    // Step 1: Retrieve the context by ID
    const context = server_1.db.contexts[contextId];
    if (!context) {
        return null; // Context not found
    }
    // Step 2: Filter identities by address directly from the identities database
    const matchingIdentities = Object.values(server_1.db.identities).filter((identity) => identity.profileImageUrl === userAddress);
    // Step 3: Match identities with context members
    const filteredIdentities = matchingIdentities.filter((identity) => context.members.includes(identity.id));
    return filteredIdentities;
};
exports.getFilteredContextIdentities = getFilteredContextIdentities;
