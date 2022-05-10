import express from "express";
import { AuthController } from "../http/controllers/AuthController";

//Import validation middleware and login schema
import validate from "../http/middleware/ValidationMiddleware";
import AuthLoginSchema from "../schema/AuthLoginPost";

const AuthRouter = express.Router();

import AuthMiddleware from "../http/middleware/AuthMiddleware";
// Everywhere below here will require authentication.

AuthRouter.post("/login", validate(AuthLoginSchema), AuthController.login);

AuthRouter.use(AuthMiddleware);

AuthRouter.post("/logout", AuthController.logout);
export default AuthRouter;
