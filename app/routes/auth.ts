import express from "express";
import { AuthController } from "../http/controllers/AuthController";

//Import validation middleware and login schema 
import validate from "../http/middleware/ValidationMiddleware"
import login from "../schema/login";

const router = express.Router();

import AuthMiddleware from "../http/middleware/AuthMiddleware";
// Everywhere below here will require authentication.

router.post('/api/v1/auth/login', validate(login), AuthController.login);

router.post('/api/v1/auth/logout', AuthController.logout)
export default router;
