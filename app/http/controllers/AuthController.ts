import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";

/**
 * Authentication controller to handle requests on /auth routes
 */
export const AuthController = {
  /**
   * Handles the default request on /
   *
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @param next {NextFunction} Express NextFunction (used for middleware)
   */
  index(req: Request, res: Response, next: NextFunction) {
    res.send("Welcome to Rathma's express.js / typescript template.");

    return next();
  },


  /**
   * Handles login requests on /auth routes
   * 
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @param next {NextFunction} Express NextFunction (used for middleware)
   */
  login(req: Request, res: Response, next: NextFunction) {
    AuthService.login(req, res);
    return next();
  }

};
