import BaseException from "./BaseException";

/**
 * On route '/api/v1/docs/:page'
 * When a page is less than 1 or if the page contains letters, throws PageException
 * 
 * Sets message to 'Bad Request' and set HTTP Status to 400
 */
export default class PageException extends BaseException {
  message: string;
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}
