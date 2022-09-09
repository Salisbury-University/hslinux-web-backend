/** Basic router example */

// Import express
import express from "express";

// Import route controller(s)
import { IndexController } from "../http/controllers/IndexController";

// import validation middleware
import validate from "../http/middleware/ValidationMiddleware";
import schema from "../schema/example";

// Create a router instance for our nested routes.
const router = express.Router();

// Assign routes to our router
router.get("/", IndexController.index);

// Example route for input validation that expects a JSON with a message string
router.post("/", validate(schema), IndexController.index);


// Nested router for authentication examples
import authRouter from "./auth";
router.use("/auth", authRouter);

import documentRouter from "./documents"
router.use(documentRouter);

import { parseFrontmatter } from "../../mark";

/** Parse through frontmatter to be stored on server start and then every 1 minute */
parseFrontmatter();

/** This causes Unit Tests to hang */
//setInterval(parseFrontmatter, 60000);

// Export the router
export default router;
