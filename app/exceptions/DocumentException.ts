import BaseException from "./BaseException";

/**
 * When a Document is not found on route '/api/v1/doc/:id' throw DocumentNotFoundException
 * 
 * Sets message to "Resource Not Found" and HTTP Status to 404
 */
export default class DocumentNotFoundException extends BaseException {
  status: number;
  
  constructor(message: string = "Resource Not Found") {
    super(message, 404);
  }
}
