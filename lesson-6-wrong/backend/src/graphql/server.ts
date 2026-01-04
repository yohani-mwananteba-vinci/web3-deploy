import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import schema from "./schema";
import type { GraphQLContext } from "@/types/GraphQLContext";
import { verifyToken } from "@/api/auth/authService";
import { formatError } from "./errorFormatter";

const server = new ApolloServer({
  schema,
  formatError: (formattedError, _error) => formatError(formattedError as any), //C: it's a touchy cast (generate by AI)
});
await server.start();

const graphqlMiddleware = expressMiddleware(server, {
  context: async ({ req }): Promise<GraphQLContext> => {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : "";

    // Verify token and add user to context
    if (token) {
      try {
        const user = verifyToken(token);
        return { user };
      } catch (error) {
        // Invalid token - continue with empty context
        return {};
      }
    }

    return {};
  },
});

export default graphqlMiddleware;
