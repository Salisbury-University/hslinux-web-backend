import { Response } from "express";
import BaseException from "./BaseException";
export default class PageException extends BaseException {
  message: string;
  constructor(message: string = "Page cannot be < 1") {
    super(message, 400);
  }
}
