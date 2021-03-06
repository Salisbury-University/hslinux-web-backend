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


// Export the router
export default router;
