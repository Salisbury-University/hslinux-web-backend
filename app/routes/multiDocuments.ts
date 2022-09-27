import express from "express";
import { DocumentController } from "../http/controllers/DocumentController";
import validate from "../http/middleware/ValidationMiddleware";
import DocumentPageNumber from "../schema/DocumentPageNumber";
import { z } from "zod";

const router = express.Router();

/** 'api/v1/docs' route */
router.get("/", DocumentController.multiDoc);

/** 'api/v1/docs/:page route */
router.get(
  "/:page",
  validate(DocumentPageNumber),
  DocumentController.multiDocPaged
);

export default router;
