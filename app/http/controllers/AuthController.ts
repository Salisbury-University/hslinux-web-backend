import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";

/**
 * Authentication controller to handle requests on /auth routes
 */
export const AuthController = {
  /**
   * Handles login requests on /auth routes
   * 
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @param next {NextFunction} Express NextFunction (used for middleware)
   */
  async login(req: Request, res: Response, next: NextFunction){
    //Pull uid and password from request body
    const { uid, password } = req.body;

    //Try login function and catch any errors
    try{
      const token = await AuthService.login(uid, password);

      res.send({token});
      //return next(token);
    }
    catch(err) {
      return next(err);
    }

    return next();
  },

   /**
   * Handles logout requests on /auth routes
   * 
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @param next {NextFunction} Express NextFunction (used for middleware)
   */
    async logout(req: Request, res: Response, next: NextFunction){
      try{
        await AuthService.logout(req, res);  
      }
      catch(err) {
        return next(err);
      }
      
      return next();
    }
  
};
