import NotFoundException from "../exceptions/NotFoundException";
import { marked } from "marked";
import fs from "fs";
import UnprocessableEntityException from "../exceptions/UnprocessableEntityException";

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
    let index = 0,
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
   * If the document is found, returns id, content, and metadata
   * @param req Express Request
   * @param res Express Response
   * @throws 'NotFoundException' when the document id given does not exist
   * @returns ID, Content, and metadata of markdown file of given ID
   */
  async singleDoc(id) {
    const docsObj = getFrontmatter();

    /** Finds document in database using ID */
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
          dateCreated: document.created,
          dateUpdated: document.updated,
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
 * @throws UnprocessableEntity exception is title is not the first value in the frontmatter
 */
export function parseFrontmatter() {
  /** All filenames in directory /docs */
  const filenames = fs.readdirSync("docs");

  /** Each document is tokenized and variables in the frontmatter are read and stored in database */
  filenames.forEach((file) => {
    if (file.endsWith(".md")) {
      //reads content of file and grabs the data from frontmatter
      fs.readFile("docs/" + file, "utf8", (err, data) => {
        if (err) throw new UnprocessableEntityException();

        //Pull file name and store in id
        const id = file.substring(0, file.length - 3);


        /** Tokenized markdown code */
        const token = marked.lexer(data);

        const frontMatter = token[1].text.split("\n");

        //Assume title is first value in front matter and pull it
        const titleKeyValue = frontMatter[0].split(": ");
        const docTitleKey = titleKeyValue[0];
        const docTitleValue = titleKeyValue[1];

        //Check if assumption that title is first data member is true if not throw Unprocessable Error
        if(docTitleKey != "title"){
          throw new UnprocessableEntityException();
        }

        //Append title to docs object
        docs[id] = appendFrontMatter(docs[id] || {}, docTitleKey, docTitleValue);


        for(let i=1; i<frontMatter.length; i++) {
          const keyValue = frontMatter[i].split(": ");
          const key = keyValue[0];
          const value = keyValue[1];
          
          //Append new key value pair to the return object
          docs[id] = appendFrontMatter(docs[id] || {}, key, value);       
        }

        var dataWithoutFrontmatter = "";
        const dataToken = marked.lexer(data);
        for (let i = 3; i < dataToken.length; i++) {
          dataWithoutFrontmatter = dataWithoutFrontmatter + dataToken[i].raw;
        }

        docs[id] = appendFrontMatter(docs[id] || {}, "content", dataWithoutFrontmatter);
      });
    }
  });
}

/**
 * Function used in parsefrontMatter function
 * to append new data being parsed to the 
 * docs[id] object
 * 
 * @param doc The document being worked on currently
 * @param key the key for the appending value
 * @param value the value associated with the key
 */
function appendFrontMatter(doc, key, value) {
  //If statement to detect if frontmatter data is a date
  //If so a new Date object must be initialized
  if(key == "created") {
    const createDate = new Date(value);
    doc[key] = createDate;
  } else if(key == "updated") {
    const updateDate = new Date(value);
    doc[key] = updateDate;
  } else {
    //Remove quotation marks from the value to display correctly
    if(value.substring(0,1) == "\"" && value.substring(value.length-1, value.length) == "\""){
      const valueNoQuote = value.substring(1, value.length-1);
      doc[key] = valueNoQuote;
    }
    else {
      doc[key] = value;
    }

  }
  return doc;
}

/** returns docs object to be used in DocService */
function getFrontmatter() {
  return docs;
}