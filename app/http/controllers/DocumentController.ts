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
    console.log("IN DOC CONTROLLER: multiDoc()");
    await DocumentService.multiDoc(req, res);
    return next;
  },

  /**
   * Sends Request and Response to multiDocPaged() Service
   * @param req Request Request object
   * @param res Response Response object
   * @param next Next Controller
   * @returns
   */
  async multiDocPaged(req: Request, res: Response, next: NextFunction) {
    console.log("IN DOC CONTROLLER: multiDocPaged()");
    await DocumentService.multiDocPaged(req, res);
    return next;
  },

  async singleDocPaged(req: Request, res: Response, next: NextFunction) {
    console.log("In DocController: Single Page");
    await DocumentService.singleDoc(req, res);
    return next;
  },
};
