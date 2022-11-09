import BaseException from "./BaseException";

/**
 * Exception class tailored to 403 Forbidden exceptions.
 *
 * Contains a default error message and sets the HTTP response status.
 */
export default class UnauthorizedException extends BaseException {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}