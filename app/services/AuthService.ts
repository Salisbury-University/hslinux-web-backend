import ldap from 'ldapjs';
import axios from 'axios';
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { config } from '../../config';
import jsonwebtoken from "jsonwebtoken";

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
   * @param uid {String} User id string
   * @param res {String} password string
   * @return token if successful
   */
  async login(uid: string, password: string) {   
  
    //Make post request to api using axios
      await axios({
        method: 'post',
        url: 'http://hslinux:38383/api/v1/auth',
        data: {
          uid: uid,
          password: password
        }
      }).then((response) => {
        console.log(response.data.token)
        return response.data.token
      }).catch((err) => {
        throw new UnauthorizedException("LDAP Authentication Failed");
      })

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
  }
};
