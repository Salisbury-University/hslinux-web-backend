import BaseException from "./BaseException";
export default class PageNotFoundException extends BaseException {
  message: string;
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}
