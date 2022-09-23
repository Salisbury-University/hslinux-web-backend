/** Basic router example */

// Import express
import express from "express";

// Import route controller(s)
import { IndexController } from "../http/controllers/IndexController";

// Create a router instance for our nested routes.
const router = express.Router();

// Assign routes to our router
router.get("/", IndexController.index);

// Example route for input validation that expects a JSON with a message string
router.post("/", IndexController.index);

// Import auth router
import AuthRouter from "./auth";

router.use("/api/v1/auth", AuthRouter);

import MultiDocumentRouter from "./multiDocuments";
import SingleDocumentRouter from "./singleDocument";

//Router to fetch a list of document ids that the user has access to, either all or using pagination
router.use("/api/v1/docs", MultiDocumentRouter);

//Router to fetch one document
router.use("/api/v1/doc", SingleDocumentRouter);

import { parseFrontmatter } from "../services/DocumentService";
/** Parse through frontmatter to be stored on server start and then every 1 minute */
parseFrontmatter();

/** This causes Unit Tests to hang */
//setInterval(parseFrontmatter, 60000);

// Export the router
export default router;
