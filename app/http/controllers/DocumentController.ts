import { NextFunction, Request, Response } from "express";
import PageException from "../../exceptions/PageException";
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
    await DocumentService.multiDoc(res);
    return next;
  },

  /**
   * Sends Request and Response to multiDocPaged() Service
   * @param req Express Request object
   * @param res Express Response object
   * @param next Next Controller
   * @returns
   */
  async multiDocPaged(req: Request, res: Response, next: NextFunction) {
      try {
        await DocumentService.multiDocPaged(req.params.page, res);
      } catch (e) {
        
      }
    
  },

  /**
   * Sends Request and Response to singleDoc service
   * @param req Express Request object
   * @param res Express Response object
   * @param next Next Controller
   * @returns
   * only pass needed req body
   */
  async singleDoc(req: Request, res: Response, next: NextFunction) {
    var id = req.params.id; //Check if document exists here before sent to service
    await DocumentService.singleDoc(id, res);
    return next;
  },
};
