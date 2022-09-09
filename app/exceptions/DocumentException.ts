import BaseException from "./BaseException";
export default class DocumentNotFoundException extends BaseException {
  status: number;
  
  constructor(message: string = "Document Not Found") {
    super(message, 404);
  }
}
