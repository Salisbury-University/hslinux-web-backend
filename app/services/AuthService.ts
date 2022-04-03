import { PrismaClient, Prisma } from "@prisma/client";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import auth from "../../config/auth";
import jwt_decode from "jwt-decode";

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
   * @return token that is signed upon successful login and the route
   */
  async login(req, res) {
    //Check if all user credentials are there
    if (!(req.body.email && req.body.password)) {
      return res.status(400).send("All input is required");
    }

    try{
      //Check for user in database
      const user = await prisma.user.findUnique({
        where:{ email: req.body.email }
      })

       //Check user login credentials against database records
      if(user.email == req.body.email && user.password == req.body.password){
        //Generate token after user credentials have been autheticated
        const token = jwt.sign(user, auth.SECRET, { expiresIn: '2h'});
        //Store token in user body and update in database
        const updateUser = await prisma.user.update({
          where:{
            email: req.body.email
          },
          data: {
            token: token,
          }
        })

        //Variable containing JSON body being returned to user
        var userRes = {
          token: token,
          route: req.body.route
        }
        const userJson = JSON.stringify(userRes)
        
        res.status(201).json(userJson);
      }
    } catch(error) {
      if(error) return error.message;
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
    //pull out jwt from authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return;

    //Decode the token so user can be identified
    //and their jwt can be removed from the database
    var decoded = jwt_decode(token);

    //Check for user in database
    const user = await prisma.user.findUnique({
      where:{ email: decoded['email'] }
    })  
    console.log(user);

    //Remove jwt from database
    const updateUser = await prisma.user.update({
      where:{
        email: decoded['email'],
      },
      data: {
        token: null,
      }
    })

    return res.sendStatus(200);
  }
};
