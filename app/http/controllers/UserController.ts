import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/UserService";
import { config } from "../../../config";

export const UserController = {

    /**
     * Handles get requests for user info on /user/:id routes
     * 
     * @param req {Request} Express request object
     * @param res {Response} Express response object
     * @param next {NextFunction} Express NextFunction (used for middleware)
     */

    async getInfo(req: Request, res: Response, next: NextFunction) {
        
        //Grab info user service function and catch possible 401
        try {
            console.log(req.params)
            await UserService.getInfo(req.params.id);
            res.sendStatus(200);
        } catch (err) {
            return next(err);
        }

        return next();
    }, 

};