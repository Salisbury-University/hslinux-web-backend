import axios from "axios";
import NotFoundException from "../exceptions/NotFoundException";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import UnprocessableEntityException from "../exceptions/UnprocessableEntityException";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { DocumentService } from "./DocumentService";
import { decode } from "punycode";
import { isRegExp } from "util/types";

export const SearchService = {
  /**
   * Takes search query and auth header and returns documents user has access to
   *
   * @param auth authorization header
   * @param query search query
   *
   * @throws UnauthorizedException if user does not exist
   */

  async getSearch(auth, query) {
    //Validate auth header
    const authHeader = auth ? auth : "";
    const authToken = authHeader.split(" ")[1];
    const decodeBody = jwt.decode(authToken);

    //Pull search string out from JSON object
    const search = query.search ? query.search : "";

    const searchString = search.replaceAll("-", " ");

    if (!decodeBody) {
      throw new UnauthorizedException();
    }

    if (!searchString) {
      throw new UnprocessableEntityException();
    }

    //Grab Document IDs Use has access to using DocService functions
    const docs = await DocumentService.multiDoc(decodeBody.uid);

    if (!docs) {
      throw new UnprocessableEntityException();
    }

    //Body to add the document IDs to that match search
    const documentList = {
      searchString: searchString,
      docs: [],
    };

    for (const docId of docs.docs) {
      //Get frontmatter for each document and looks for matches
      const frontMatter = await DocumentService.singleDoc(
        docId,
        decodeBody.uid
      );

      //Look through metadata for a match
      const metadata = JSON.stringify(frontMatter.metadata);

      //Look for full query in frontmatter
      if (metadata.toLowerCase().includes(searchString.toLowerCase())) {
        console.log("Document found\n");
        documentList.docs.push(metadata);
      }

      //Look for words within query
      for (const word of searchString.split(" ")) {
        if (metadata.toLowerCase().includes(searchString.toLowerCase())) {
          if (!documentList.docs.includes(metadata)) {
            documentList.docs.push(metadata);
          }
        }
      }
    }
    return documentList;
  },
};
