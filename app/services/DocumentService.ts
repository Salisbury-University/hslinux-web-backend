import NotFoundException from "../exceptions/NotFoundException";
import BadRequestException from "../exceptions/BadRequestException";
import { marked } from "marked";
import fs from "fs";
import jwt from "jsonwebtoken";
import ForbiddenException from '../exceptions/ForbiddenException'
import { PrismaClient } from "@prisma/client";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { nextTick } from "process";
const prisma = new PrismaClient();
/**
 * Service for Document that has functions to fetch the documents
 * from the database
 */
export const DocumentService = {
    /**
     * Grabs all of the documents and returns the document IDs in a list
     * @param auth Authorization header
     */
    async multiDoc(auth, userID) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            username: userID, //Testing for now, retrieve user info then check in db
          },
        });

        if(!user)
          throw new UnauthorizedException();
      }
      catch (err) {
        return next(err);
      }
    /** 
     * &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
     * TODO:
     * use user functions to check if valid user
     * &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    

    */
    /** CHECK DECODE BODY FOR USER, THEN CHECK IF USER HAS ACCESS TO THAT DOCUMENT WITH THE GROUP  */


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
      if(user.group == documents[0].group)
        console.log("if statement works")
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
    /** CHECK DECODE BODY FOR USER, THEN CHECK IF USER HAS ACCESS TO THAT DOCUMENT WITH THE GROUP  */

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
    for (let i = skip; i < Object.keys(documents).length; i++)
      documentList.docs.push(Object.keys(documents)[i]);

    return documentList;
  },

  /**
   * Takes the id from the request and looks for it in the
   * dictionary object
   * If the document is not there, sends a '404 Not Found' status.
   * If the document is found, returns id, content, and metadata
   * @param auth Authorization token
   * @param id Document ID
   * @throws 'NotFoundException' when the document id given does not exist
   * @returns ID, Content, and metadata of markdown file of given ID
   */
  async singleDoc(id) {
    /** CHECK DECODE BODY FOR USER, THEN CHECK IF USER HAS ACCESS TO THAT DOCUMENT WITH THE GROUP  */

    const user = await prisma.user.findUnique({
      where: {
        username: "Bob", //Testing for now, retrieve user info then check in db
      },
    });

    

    /** Documents Dictionary Object */
    const docsObj = getFrontmatter();

    /**
     * Finds document in database using ID
     */
    const document = docsObj[id]

    /**
     * TO-DO
     * CHECK THIS USERS GROUP AGAINST DOCS DICTIONARY OBJ TO MAKE SURE THEY MATCH
     * RETURN 403 IF THEY DONT MATCH
     */
    if (!document) 
      throw new NotFoundException()
    else if(user.group == document.group){
      return {
        id: id,
        content: document.content,
        metadata: {
          title: document.title,
          description: document.description,
          author: document.author,
          group: document.group,
          dateCreated: document.createdDate,
          dateUpdated: document.updatedDate
        }
      }
    }else{
      throw new ForbiddenException();
    }
  }
}
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
