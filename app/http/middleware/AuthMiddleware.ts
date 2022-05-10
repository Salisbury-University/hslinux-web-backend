import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";
import { nextTick } from "process";


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

  try {
    
    //Assign auth header to const and give default value if its not in the request
    const authHeader = req.headers.authorization ? req.headers.authorization : "";

    //Check if token is bearer
    AuthService.checkBearer(authHeader);  

    //Call validate function to make sure there is an existing jwt
    AuthService.validate(authHeader)

    //Attach username to request object by decoding token
    req.user = AuthService.decodeToken(authHeader.split(" ")[1]);

  } catch(err) {

    return next(err);
  
  }

  //TODO - 1. GET RID OF JWT TOKEN 2. ADD IN JWT MALFORMED EXCEPTION 

  
  return next();
}
