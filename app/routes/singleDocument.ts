import express from "express";
import { DocumentController } from "../http/controllers/DocumentController";
import AuthMiddleware from "../http/middleware/AuthMiddleware";
import validate from "../http/middleware/ValidationMiddleware";
import DocumentID from "../schema/DocumentID";

const router = express.Router();
router.use(AuthMiddleware)
/** 'api/v1/doc/:id route */
router.get("/:id", validate(DocumentID), DocumentController.singleDoc);



export default router;
