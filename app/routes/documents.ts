import express from "express";
import { DocumentController } from "../http/controllers/DocumentController";

const router = express.Router();

//Router to fetch full list of document ids that the user has access to
router.get("/docs", DocumentController.multiDoc);

//Router to fetch a list of document ids that the user has access to, but in a specific range
router.get("/docs/:page", DocumentController.multiDocPaged);

//Router for fetching a single document
router.get("/doc/:id", DocumentController.singleDoc);
export default router;
