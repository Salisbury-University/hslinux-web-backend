import { NextFunction, Request, Response } from "express";
import { DocumentService } from "../../services/DocumentService";

/**
 * Controller for Routes for Fetching Documents
 */
export const DocumentController = {
  /**
   * Sends Request and Response to multiDoc() Service
   *
   * @param req Express Request object
   * @param res Express Response object
   * @param next Next Controller
   * @returns
   */
  async multiDoc(req: Request, res: Response, next: NextFunction) {
    const documents = await DocumentService.multiDoc();
    res.send(documents);
    return next;
  },

  /**
   * Sends Request and Response to multiDocPaged() Service
   * @param req Express Request object
   * @param res Express Response object
   * @param next Next Controller
   */
  async multiDocPaged(req: Request, res: Response, next: NextFunction) {
      try {
        const documentsPaged = await DocumentService.multiDocPaged(req.params.page);
        res.send(documentsPaged);
      } catch (error) {
        next(error);
      }
    
  },

  /**
   * Sends Request and Response to singleDoc service
   * @param req Express Request object
   * @param res Express Response object
   * @param next Next Controller
   */
  async singleDoc(req: Request, res: Response, next: NextFunction) {
    try{
      const singleDocument = await DocumentService.singleDoc(req.params.id);
      res.send(singleDocument);
    }catch(error){
      next(error);
    }
  },
};
