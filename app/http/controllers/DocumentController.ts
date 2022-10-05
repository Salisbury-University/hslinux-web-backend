import { NextFunction, Request, Response } from "express";
import { DocumentService } from "../../services/DocumentService";
import jwt from "jsonwebtoken";
import UnauthorizedException from "../../exceptions/UnauthorizedException";
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
    const documents = await DocumentService.multiDoc(req.headers.authorization);
    res.send(documents);
    return next;
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
      /** SEND AUTH TOKEN IN HEADERS */
      //Grab token
    /*
      const authHeader = req.headers.authorization
        ? req.headers.authorization
        : "";
      const authToken = authHeader.split(" ")[1];
      const decodeBody = jwt.decode(authToken);

      if (!decodeBody) throw new UnauthorizedException();
    */
      const documentsPaged = await DocumentService.multiDocPaged(req.params.page);
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
      //Grab token
      const authHeader = req.headers.authorization ? req.headers.authorization : "";
      const authToken = authHeader.split(" ")[1];
      const decodeBody = jwt.decode(authToken);
      
      if (!decodeBody) {
        res.redirect(401, "/api/v1/auth/login");
      }
      // else if(){
      //   /** CHECK USER PERMISSIONS HERE, THROW 403 IF  */
      // }
      else {
        const singleDocument = await DocumentService.singleDoc(req.params.id);
        res.send(singleDocument);
      }
    } catch (err) {
      return next(err);
    }
  },
};
