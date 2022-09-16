import express from "express";
import { DocumentController } from "../http/controllers/DocumentController";

const router = express.Router();

/** 'api/v1/docs' route */
router.get("/", DocumentController.multiDoc);

/** 'api/v1/docs/:page route */
router.get("/:page", DocumentController.multiDocPaged);

export default router;
