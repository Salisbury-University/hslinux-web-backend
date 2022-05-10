import BaseException from "./BaseException";
import { Response } from "express";
export default class DocumentNotFoundException extends BaseException {
  status: number;

  constructor(message: string, status: number, res: Response) {
    super(message, status);
    res.sendStatus(404);
  }
}
