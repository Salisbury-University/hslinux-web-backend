/** User Route */

import express from "express";
import { UserController } from "../http/controllers/UserController";

const UserRouter = express.Router();

UserRouter.get("/:id", UserController.getInfo);

export default UserRouter;
