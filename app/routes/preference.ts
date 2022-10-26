import express from "express";
import { PreferenceController } from "../http/controllers/PreferenceController";


//Import validation middleware and preference schema
import validate from "../http/middleware/ValidationMiddleware";
import PreferencePost from "../schema/PreferencePost";

const PreferenceRouter = express.Router();

PreferenceRouter.get("/", PreferenceController.getPreferences);

PreferenceRouter.post("/", validate(PreferencePost), PreferenceController.postPreferences);

export default PreferenceRouter;