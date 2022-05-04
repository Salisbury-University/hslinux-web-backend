import axios from "axios";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import JWTMalformedException from "../exceptions/JWTMalformedException";
import { config } from "../../config";
import { string } from "zod";
import e from "express";


//TODO - Consider throwing errors instead of returning true/false

/**
 * An example of an authorization service to validate authorization tokens, or attempt sign ins.
 */
export const AuthService = {

  /**
   * Validates an authorization token for authentication.
   *
   * @param token Authorization token attached to the HTTP header.
   * @throws JWTMalformedException if token has length of zero
   */

  validate(token: String) {
    if (token.length == 0) {
      throw new JWTMalformedException;
    }
  },

  /**
   * Checks Authorization Header to make sure its a bearer token
   *
   * @param authHeader  authorization header
   * @throws Unauthorized Exception if authHader is not bearer
   */
  checkBearer(authHeader: String) {
    const authType = authHeader && authHeader.split(" ")[0];

    if (authType != "Bearer") {
      throw new JWTMalformedException();
    } else {
      return authType;
    }
  },

  /**
   * Pull JWT from authorization header
   *
   * @param req {Request} express request object
   * @returns auth token
   * @throws UnauthorizedException if token is null after authHeader split
   */
  getAuthToken(authHeader: String) {
    const authToken = authHeader && authHeader.split(" ")[1];
    if(!authToken) {
      throw new UnauthorizedException();
    }
    else {
      return authToken;
    }
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
        throw new JWTMalformedException();
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
    //TODO Make API call to invalidate the token from logout function
  },

  /**
   * Current route used for unit testing of the AuthMiddleware
   * @param req 
   * @param res 
   */
  async test() {

  },
};
