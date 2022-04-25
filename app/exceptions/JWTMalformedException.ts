import BaseException from "./BaseException";

/**
 * Exception class tailored to 400 malformed JWT exceptions
 *
 * Contains a default error message and sets the HTTP response status.
 */
export default class NotFoundException extends BaseException {
  constructor(message: string = "JWT Malformed") {
    super(message, 400);
  }
}

//TODO - Find appropriate status code
