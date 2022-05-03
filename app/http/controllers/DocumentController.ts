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
    var id = req.params.id; //Check if document exists here before sent to service
    await DocumentService.multiDoc(id, res);
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
    var page = req.params.page; //Check if document exists here before sent to service
    await DocumentService.multiDocPaged(page, res);
    return next;
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
