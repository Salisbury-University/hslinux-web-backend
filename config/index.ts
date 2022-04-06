// Import dotenv as early as possible in the runtime.
import "dotenv/config";
// Import configuration objects
import app from "./app";
// Import auth configuration
import auth from "./auth";
// Import LDAP configuration
import ldap from "./ldap";

/** Configuration loaded from ``config/`` & environmental variables */
export const config = {
  app, auth, ldap
};
