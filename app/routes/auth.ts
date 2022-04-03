import express from "express";
import { IndexController } from "../http/controllers/IndexController";
import { AuthController } from "../http/controllers/AuthController";

const router = express.Router();

import AuthMiddleware from "../http/middleware/AuthMiddleware";
// Everywhere below here will require authentication.
//router.use(AuthMiddleware);

//router.get("/", IndexController.index);

router.post('/api/v1/auth/login', AuthController.login);

router.post('/api/v1/auth/logout', AuthController.logout)
export default router;
