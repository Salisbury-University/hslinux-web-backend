import axios from "axios";
import jwt from "jsonwebtoken";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { config } from "../../config";
import { nextTick } from "process";
import { NextFunction } from "express";


//TODO - Consider throwing errors instead of returning true/false

/**
 * An example of an authorization service to validate authorization tokens, or attempt sign ins.
 */
export const AuthService = {
  /**
   * Decodes jwt returning jwt payload and header
   *
   * @param token
   * @returns jwt payload containing username and password if token is valid
   * @returns null if jwt is invalid
   */
  decodeJWT(token: String) {
    const decoded = jwt.decode(token);
    return decoded;
  },

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
   * Checks Authorization Header to make sure its a bearer token
   *
   * @param authHeader  authorization header
   * @returns true if auth header is bearer token
   */
  checkBearer(authHeader: String) {
    const authType = authHeader && authHeader.split(" ")[0];

    if (authType == "Bearer") {
      return true;
    }
    return false;
  },

  /**
   * Pull JWT from authorization header
   *
   * @param req {Request} express request object
   * @returns auth token
   */
  getAuthToken(authHeader: String) {
    const authToken = authHeader && authHeader.split(" ")[1];
    return authToken;
  },

  /**
   * Handles sign in attempts from users
   *
   * @param uid {String} User id string
   * @param res {String} password string
   * @return token if successful
   */
  async login(uid: string, password: string) {
    //Make post request to api using axios
    return await axios({
      method: "post",
      url: config.auth.AUTH_URL,
      data: {
        uid: uid,
        password: password,
      },
    })
      .then((response) => {
        return response.data.token;
      })
      .catch((err) => {
        throw new UnauthorizedException("LDAP Authentication Failed");
      });
  },

  /**
   * Handles logout requests from users
   *
   * @param req {Request} Express request object
   * @param res {Response} Express response object
   * @return http code 200 for success
   */
  async logout(req, res) {
    //IN FUTURE: Make API call to invalidate the token
  },
};
