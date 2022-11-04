import express from "express";
import { DocumentController } from "../http/controllers/DocumentController";
import AuthMiddleware from "../http/middleware/AuthMiddleware";

const router = express.Router();
router.use(AuthMiddleware)
/** 'api/v1/doc/:id route */
router.get("/:id", DocumentController.singleDoc);



export default router;
