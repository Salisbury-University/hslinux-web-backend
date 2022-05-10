import axios from "axios";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import JWTMalformedException from "../exceptions/JWTMalformedException";
import { config } from "../../config";
import jwt from "jsonwebtoken";


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
    const authToken = authHeader && authHeader.split(" ")[1];

    //Verify user credentials from decoded jwt by attempting to login
    const decodeBody = jwt.decode(authToken);
    //MAKE SURE DECODEBODY IS NOT NULL
    if(!decodeBody) {
      throw new JWTMalformedException();
    }
    //Attempt to make login request to see if user is valid
    AuthService.login(decodeBody.uid, decodeBody.password);
    
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
   
    const authType = authHeader && authHeader.split(" ")[0];

    if (authType != "Bearer") {
      throw new JWTMalformedException();
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
        throw new UnauthorizedException();
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
