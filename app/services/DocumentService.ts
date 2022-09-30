import NotFoundException from "../exceptions/NotFoundException";
import BadRequestException from "../exceptions/BadRequestException";
import { marked } from "marked";
import fs from "fs";
import { json } from "stream/consumers";

/**
 * Service for Document that has functions to fetch the documents
 * from the database
 */
export const DocumentService = {
  /**
   * Grabs all of the documents and returns the document IDs in a list
   * @param req Express Request
   * @param res Express Response
   */
  async multiDoc() {
    const documents = getFrontmatter();

    /** Body to add the document IDs to */
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
    return documentList;
  },

  /**
   * Takes the page number from the request and returns 10 document IDs.
   * Page 1 takes documents 1-10,
   * Page 2 takes documents 11-20,
   * etc.
   * @param req Express Request
   * @param res Express Response
   * @throws 'BadRequestException' when the page is less than 1 or contains letters
   * @returns List of Document IDs
   */
  async multiDocPaged(page) {
    const pageAsInt = parseInt(page, 10);

    /** If page is a string or if the page numbers is less than 0, throw error */
    if (!pageAsInt || pageAsInt < 1) {
      throw new BadRequestException();
    }
    const documents = getFrontmatter();

    /** Skips this number of documents */
    const skip = (page - 1) * 10;

    /** Body to add the document IDs to */
    const documentList = {
      docs: [],
    };

    /**
     * Loops through retrieved documents and pushes Document IDs
     * into docs property of documentList
     *
     * Later on, we'll need to check if we have access to this document
     * with group attribute
     */
    let index = 0, docCount = 0;
    for (const id of Object.keys(documents)) {
      if (index >= skip && docCount <= 10) {
        documentList.docs.push(id);
        docCount++;
      }
      index++;
    }

    /** Sends list of Document IDs to JSON Body */
    return documentList;
  },

  /**
   * Takes the id from the request and looks for it in the
   * dictionary object
   * If the document is not there, sends a '404 Not Found' status.
   * If the document is found, returns id, content, and metadata
   * @param req Express Request
   * @param res Express Response
   * @throws 'NotFoundException' when the document id given does not exist
   * @returns ID, Content, and metadata of markdown file of given ID
   */
  async singleDoc(id) {
    const docsObj = getFrontmatter();

    /** Finds document in database using ID
     *  Move this to controller once mark.ts
     * is set up right
     */
    const document = docsObj[id];

    //document not found
    if (!document) 
      throw new NotFoundException();
    else {
      //document found
      return {
        id: id,
        content: document.content,
        metadata: {
          title: document.title,
          description: document.description,
          author: document.author,
          group: document.group,
          dateCreated: document.createdDate,
          dateUpdated: document.updatedDate,
        },
      };
    }
  },
};

/** MARKDOWN FRONTMATTER PARSING */

/** Holds frontmatter and markdown from the .md files */
const docs = new Object();

/**
 * Parses Frontmatter and stores in dictionary
 * @returns dictionary object
 * @throws 'Document Read Error' when there is an error reading the documents
 */
export function parseFrontmatter() {
  /** All filenames in directory /docs */
  const filenames = fs.readdirSync("docs");

  /** Each document is tokenized and variables in the frontmatter are read and stored in database */
  filenames.forEach((file) => {
    if (file.endsWith(".md")) {
      //reads content of file and grabs the data from frontmatter
      fs.readFile("docs/" + file, "utf8", (err, data) => {
        if (err) throw "Document Read Error";

        /** Tokenized markdown code */
        const token = marked.lexer(data);

        const frontMatter = token[1].text.split("\n");

        console.log(typeof(frontMatter));
        console.log(frontMatter);
        

        /** TODO
         * Remove console.log
         * Access data without frontmatter
         */
       
        /*
        docs[id] = {
          title: frontMatter.title,
          description: frontMatter.description,
          author: frontMatter.author,
          group: frontMatter.group,
          createdDate: frontMatter.created,
          updatedDate: frontMatter.updated,
          content: dataWithoutFrontmatter,
        };*/
      });
    }
  });
}

/** returns docs object to be used in DocService */
function getFrontmatter() {
  return docs;
}