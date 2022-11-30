/** Search Route */

import express from "express";
import { SearchController } from "../http/controllers/SearchController";

const SearchRouter = express.Router();

SearchRouter.get("", SearchController.getSearch);

export default SearchRouter;
