import { Response } from "express";
import BaseException from "./BaseException";
export default class PageException extends BaseException {
  message: string;
  constructor(message: string, status:number, res: Response) {
    super(message, status);
    this.message = message;

    res.status(status).send(message)
  }
}
