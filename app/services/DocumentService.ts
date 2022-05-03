import { PrismaClient } from "@prisma/client";
import { getFrontmatter } from "../../mark";
const prisma = new PrismaClient();

/**
 * Service for Document that has functions to fetch the documents
 * from the database
 */
export const DocumentService = {
  /**
   * Grabs all of the documents and sends the document
   * IDs to the JSON Body
   * @param req Express Request
   * @param res Express Response
   */
  async multiDoc(req, res) {
    const documents = getFrontmatter();

    /**
     * Body to add the document IDs to
     */
    const documentList = {
      docs: [],
    };

    /**
     * Loops through retrieved documents and pushes Document IDs
     * into docs property of documentList
     *
     * Later on, we'll need to check if we have access to this document
     */
    for (const id of Object.keys(documents)) {
      documentList.docs.push(id);
    }

    //Send the list of Document IDs to Body
    res.send(documentList);
  },

  /**
   * Takes the page number from the request and puts the 10 documents into JSON Body
   * Page 1 takes documents 1-10,
   * Page 2 takes documents 11-20,
   * etc.
   * @param req
   * @param res
   */
  async multiDocPaged(page, res) {
    const documents = getFrontmatter();

    const skip = (page - 1) * 10;
    console.log("page: " + page);

    /**
     * Body to add the document IDs to
     */
    const documentList = {
      docs: [],
    };

    /**
     * Loops through retrieved documents and pushes Document IDs
     * into docs property of documentList
     *
     * Later on, we'll need to check if we have access to this document
     */
    var index = 0,
      docCount = 0;
    for (const id of Object.keys(documents)) {
      if (index >= skip && docCount <= 10) {
        documentList.docs.push(id);
        docCount++;
      }
      index++;
    }

    //Sends list of Document IDs to JSON Body
    res.send(documentList);
  },

  /**
   * Takes the id from the request and looks for it in the
   * dictionary object
   * If the document is not there, sends a '404 Not Found' status.
   * If the document is found, sends id, content, and metadata to Body
   * @param req Express Request
   * @param res Express Response
   */
  async singleDoc(id, res) {
    const docsObj = getFrontmatter();

    /** Finds document in database using ID
     *  Move this to controller once mark.ts
     * is set up right
     */
    const document = docsObj[id];
    if (!document) {
      //document not found,
      res.sendStatus(404);
    } else {
      //document found

      res.send({
        id: id,
        content: document.content,
        metadata: {
          dateCreated: document.createdDate,
          dateUpdated: document.updatedDate,
          privilege: document.group,
          author: document.author,
        },
      });
    }
  },
};
