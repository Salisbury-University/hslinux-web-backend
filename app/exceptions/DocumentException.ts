import BaseException from "./BaseException";
export default class DocumentNotFoundException extends BaseException {
  status: number;
  
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}
