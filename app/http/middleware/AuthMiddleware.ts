import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";
import UnauthorizedException from "../../exceptions/UnauthorizedException";
import JWTMalformedException from "../../exceptions/JWTMalformedException";
import jwt from "jsonwebtoken";
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

    const token = AuthService.getAuthToken(authHeader);
  
    //Call validate function to make sure there is an existing jwt
    AuthService.validate(token)
    
    //Check if auth header is correct length
    if (authHeader.split(" ").length > 2) {
      return next(new UnauthorizedException());
    }

    //Check if token is bearer
    AuthService.checkBearer(authHeader);  

    /*
        Decode jwt to check for
        1. Modification after allocation
        2. Expired jwt 
        decodedJWT function returns null if either condition is true
      */
    if (!jwt.decode(token)) {
      return next(new JWTMalformedException());
    }

    //Verify user credentials from decoded jwt by attempting to login
    const decodeBody = jwt.decode(token);
    //MAKE SURE DECODEBODY IS NOT NULL
    if(!decodeBody) {
      return next(new JWTMalformedException());
    }
    //Attempt to make login request to see if user is valid
    AuthService.login(decodeBody.uid, decodeBody.password);

  } catch(err) {
    return next(err);
  }

  //TODO - 1. GET RID OF JWT TOKEN 2. ADD IN JWT MALFORMED EXCEPTION 

  
  return next();
}
