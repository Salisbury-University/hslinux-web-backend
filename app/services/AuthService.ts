import UnauthorizedException from "../exceptions/UnauthorizedException";
import JWTMalformedException from "../exceptions/JWTMalformedException";
import { config } from "../../config";
import jwt from "jsonwebtoken";
import {PrismaClient } from "@prisma/client";
import e from "express";

const prisma = new PrismaClient();


//TODO - Consider throwing errors instead of returning true/false

/**
 * An example of an authorization service to validate authorization tokens, or attempt sign ins.
 */
export const AuthService = {

  /**
   * Validates an authorization token for authentication by decoding jwt
   * and attempting a login request with decoded body
   *
   * @param token Authorization token attached to the HTTP header.
   * @throws JWTMalformedException if token has length of zero
   */

  validate(authHeader: String) {
    //Grab token from header
    const authToken = authHeader.split(" ")[1];

    //Verify user credentials from decoded jwt by attempting to login
    const decodeBody = jwt.decode(authToken);
    //MAKE SURE DECODEBODY IS NOT NULL
    if(!decodeBody) {
      throw new JWTMalformedException();
    }    
  },

  /**
   * Checks Authorization Header to make sure its a bearer token and the token is there
   *
   * @param authHeader  authorization header
   * @throws Unauthorized Exception if authHader is not bearer
   */
  checkBearer(authHeader: String) {
   
    //Check if auth header is correct length
    if (authHeader.split(" ").length > 2) {
      throw new UnauthorizedException();
    }
   
    const authType = authHeader.split(" ")[0];

    if (authType != "Bearer") {
      throw new UnauthorizedException();
    }

    const authToken = authHeader && authHeader.split(" ")[1];

    if(!authToken) {
      throw new UnauthorizedException();
    }

  },

  /**
   * Decodes JWT to return username so it can be attached to user request object
   * @param token
   * @returns decoded username
   * @throws JWTMalformed exception of decode is invalid
   */

  decodeToken(authToken: String) {
    const uid : JSON = jwt.decode(authToken);

    if(!uid) {
      throw new JWTMalformedException();
    }

    return uid;
  },


  /**
   * Handles sign in attempts from users
   *
   * @param uid {String} User id string
   * @param res {String} password string
   * @return token if successful login is made
   * @throws UnauthorizedException if LDAP Authentication fails
   */
  async login(uid: string, password: string) {
    /**
     * Mocking API using the prisma testing account database
     * 
     * First the user information will be found from the database and stored in user
     * The database password will be used to verify the password passed in
     * 
     * Then a fake token will be signed and returned
     */
    try {
        const user = await prisma.user.findUnique({
          where: {
            username: uid
          }
        })

        if(!user) {
          throw new UnauthorizedException();
        }

        if(password == user.password) {
          return jwt.sign(uid, "SuperSecretSecret");
        }
        else {
          throw new UnauthorizedException();
        }

    } catch (err) {
      throw new UnauthorizedException();
    }
  },

  /**
   * Handles logout requests from users
   *
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @return http code 200 for success
   */
  async logout(req, res) {
    //TODO Make API call to invalidate the token from logout function
  },
};
