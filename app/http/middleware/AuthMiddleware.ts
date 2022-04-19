import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";
import UnauthorizedException from "../../exceptions/UnauthorizedException";

/**
 * An example of authentication middleware to create authorized views / routes.
 *
 * @param req {Request} Express request object
 * @param res {Response} Express response object
 * @param next {NextFunction} Express next function
 */
export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {

      //Assign auth header to const and give default value if its not in the request
      const authHeader = req.headers.authorization ? req.headers.authorization : "";

      //Check if auth header is correct length
      if(authHeader.split(" ").length > 2){
        return next(new UnauthorizedException());
      }

      //Check if token is bearer
      if(!AuthService.checkBearer(authHeader)) {
        return next(new UnauthorizedException());
      }
    
      //Pull token from authHeader for testing in other functions
      const token = AuthService.getAuthToken(authHeader);
      
      //Call validate function to make sure there is an existing jwt
      if (!AuthService.validate(token)) {
        return next(new UnauthorizedException());
      }

      

      //Check if token if malformed

      //Check if token has been modified after allocation

  


  return next();
}
