import { NextFunction, Request, Response } from "express";
import { DocumentService } from "../../services/DocumentService";
import UnauthorizedException from "../../exceptions/UnauthorizedException";
import { AuthService } from "../../services/AuthService";
import jwt from "jsonwebtoken"
import JWTMalformedException from "../../exceptions/JWTMalformedException";

/**
 * Controller for Routes for Fetching Documents
 */
export const DocumentController = {
  /**
   * Sends Request and Response to multiDoc() Service.
   * Sends all documents grabbed from DocumentService to body
   * Uses route '/api/v1/docs/'
   * @param req Express Request object
   * @param res Express Response object
   * @param next Next Controller
   * @returns
   */
  async multiDoc(req: Request, res: Response, next: NextFunction) {

    try {
      //console.log(req.user);
      const uid = JSON.stringify(req.user);
      
      console.log(JSON.parse(uid).uid)
      const documents = await DocumentService.multiDoc(req.body.uid);
      res.send(documents);
      return next;
    }catch(err){
      return next(err)
    }
  },

  /**
   * Sends Request and Response to multiDocPaged() Service.
   * Sends documents grabbed from DocumentService to body
   * Uses route '/api/v1/docs/:page'.
   * ":page" is the page number
   * @param req Express Request object
   * @param res Express Response object
   * @param next Next Controller
   */
  async multiDocPaged(req: Request, res: Response, next: NextFunction) {
    try {
      AuthService.validate(req.headers.authorization)
      const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1])
      /** Holds paged documents */
      const documentsPaged = await DocumentService.multiDocPaged(req.params.page,decodedToken.uid);
      res.send(documentsPaged);
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Checks if user has access to the document with auth token
   * Sends Request and Response to singleDoc service.
   * Uses route '/api/v1/doc/:id'.
   * ":id" is the id of the markdown file
   * @param req Express Request object
   * @param res Express Response object
   * @param next Next Controller
   */
  async singleDoc(req: Request, res: Response, next: NextFunction) {
    try {
      if(req.headers.authorization == null)
        throw new JWTMalformedException();
      AuthService.checkBearer(req.headers.authorization)
      AuthService.validate(req.headers.authorization)

      
      const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1])
      console.log(decodedToken);
      const singleDocument = await DocumentService.singleDoc(req.params.id,decodedToken.uid);
      
      res.send(singleDocument);
      
    } catch (err) {
      return next(err);
    }
  },
};
