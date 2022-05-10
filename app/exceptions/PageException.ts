import { Response } from "express";
export default class PageException extends Error {
  message: string;
  constructor(message: string, res: Response) {
    super(message);
    this.message = message;

    res.send();
  }
}
