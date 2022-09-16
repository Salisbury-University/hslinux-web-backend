import NotFoundException from "../exceptions/NotFoundException";
import BadRequestException from "../exceptions/BadRequestException";
import { marked } from "marked";
import fs from "fs";
import BaseException from "../exceptions/BaseException";

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
   * Takes the page number from the request and puts the 10 documents into JSON Body
   * Page 1 takes documents 1-10,
   * Page 2 takes documents 11-20,
   * etc.
   * @param req Express Request
   * @param res Express Response
   * @throws 'BadRequestException' when the page is less than 1 or contains letters
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
    var index = 0,
      docCount = 0;
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
   * If the document is found, sends id, content, and metadata to Body
   * @param req Express Request
   * @param res Express Response
   * @throws 'NotFoundException' when the document id given does not exist
   */
  async singleDoc(id) {
    const docsObj = getFrontmatter();

    /** Finds document in database using ID
     *  Move this to controller once mark.ts
     * is set up right
     */
    const document = docsObj[id];

    //document not found
    if (!document) throw new NotFoundException();
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

        /** Holds the block of frontmatter */
        const values = token[1].raw.split("\n");

        /** id from frontmatter in md file (file name without '.md') */
        const id = file.substring(0, file.length - 3);

        /** Title of the markdown file */
        const title = values[0].substring(8, values[0].length - 1);

        /** Description of the markdown file */
        const description = values[1].substring(14, values[1].length - 1);

        /** Author of the markdown file */
        const author = values[2].substring(9, values[2].length - 1);

        /** Group of the markdown file */
        const group = values[3].substring(8, values[3].length - 1);

        /** Date the markdown file was created */
        const created = values[4].substring(9, values[4].length);
        const createdDate = new Date(created);

        /** Date the markdown file was last updated */
        const updated = values[5].substring(9, values[5].length);
        const updatedDate = new Date(updated);

        /** Goes through the markdown file and stores everything except frontmatter in memory */
        var dataWithoutFrontmatter = "";
        const dataToken = marked.lexer(data);
        for (var i = 3; i < dataToken.length; i++) {
          dataWithoutFrontmatter = dataWithoutFrontmatter + dataToken[i].raw;
        }

        docs[id] = {
          title: title,
          description: description,
          author: author,
          group: group,
          createdDate: createdDate,
          updatedDate: updatedDate,
          content: dataWithoutFrontmatter,
        };
      });
    }
  });
}

/** returns docs object to be used in DocService */
function getFrontmatter() {
  return docs;
}
