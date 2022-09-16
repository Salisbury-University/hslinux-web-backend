import express from "express";
import { DocumentController } from "../http/controllers/DocumentController";

const router = express.Router();

/** 'api/v1/doc/:id route */
router.get("/:id", DocumentController.singleDoc);

export default router;
