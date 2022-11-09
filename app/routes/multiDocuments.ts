import express from "express";
import { DocumentController } from "../http/controllers/DocumentController";
import AuthMiddleware from "../http/middleware/AuthMiddleware";
import validate from "../http/middleware/ValidationMiddleware";
import DocumentPageNumber from "../schema/DocumentPageNumber";

const router = express.Router();

router.use(AuthMiddleware);

/** 'api/v1/docs' route */

router.get("/", DocumentController.multiDoc);


/** 'api/v1/docs/:page route */
router.get(
  "/:page",
  validate(DocumentPageNumber),
  DocumentController.multiDocPaged
);

export default router;
