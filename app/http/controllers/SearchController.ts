import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { SearchService } from "../../services/SearchService";
import { config } from "../../../config";

export const SearchController = {
  /**
   * Handles get request for search queries on /search?query
   *
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @param next {NextFunction} Express NextFunction (used for middleware)
   */

  async getSearch(req: Request, res: Response, next: NextFunction) {
    //Grab search query from request object
    try {
      const ids = await SearchService.getSearch(
        req.headers.authorization,
        req.query
      );
      res.send(ids);
    } catch (err) {
      return next(err);
    }

    return next();
  },
};
