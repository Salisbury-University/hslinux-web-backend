import BaseException from "./BaseException";
export default class PageException extends BaseException {
  message: string;
  constructor(message: string = "Page cannot be less than 1") {
    super(message, 400);
  }
}
