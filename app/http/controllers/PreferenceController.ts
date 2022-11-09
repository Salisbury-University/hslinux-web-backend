import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { json } from "stream/consumers";
import { PreferenceService } from "../../services/PreferenceService";

/**
 * Prefence controller to handle requests on preference routes
 */
export const PreferenceController = {
  /**
   * Handles get requests to preference route
   *
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @param next {NextFunction} Express NextFunction (used for middleware)
   */
  async getPreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const preferences = await PreferenceService.getPreferences(req.user);
      res.send(preferences);
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Handles post requests to preference routes
   *
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @param next {NextFunction} Express NextFunction (used for middleware)
   */
  async postPreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const preferences = await PreferenceService.postPreferences(
        req.body.preferences,
        req.user
      );
      res.send(preferences);
    } catch (err) {
      return next(err);
    }
  },
};
