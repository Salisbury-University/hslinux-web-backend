import { PrismaClient, Prisma } from "@prisma/client";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import auth from "../../config/auth";

const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');


/**
 * An example of an authorization service to validate authorization tokens, or attempt sign ins.
 */
export const AuthService = {
  /**
   * Validates an authorization token for authentication.
   *
   * @param token Authorization token attached to the HTTP header.
   * @return {boolean} True if their token is valid, false if it isn't.
   */
  
  validate(token: String): boolean {
    if (token.length != 0) {
      return true;
    }
    return false;
  },

  /**
   * Handles sign in attempts from users
   *  
   * @param req {Request} Express request object 
   * @param res {Response} Express response object
   * @return token that is signed upon successful login
   */
  async login(req, res) {
    //Check if all user credentials are there
    if (!(req.body.email && req.body.password)) {
      return res.status(400).send("All input is required");
    }

    //Check for user in database
    const user = await prisma.user.findUnique({
      where:{ 
        email: req.body.email
      }
    })

    //Check if user was found in database
    if(!user) return new UnauthorizedException();

    //Check user login credentials against database records
    if(user.email == req.body.email && user.password == req.body.password){
      //Generate token after user credentials have been autheticated
      const token = jwt.sign(user, auth.SECRET, { expiresIn: '2h'});
      user.token = token;
      res.status(201).json(user);
    }
    else{
      return new UnauthorizedException();
    }
  }
};
