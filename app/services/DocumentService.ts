import { PrismaClient } from "@prisma/client";
const { marked } = require("marked");
const prisma = new PrismaClient();

/**
 * Service for Document that has functions to fetch the documents
 * from the database
 */
export const DocumentService = {
  /**
   * Grabs all of the documents from the database and sends the document
   * IDs to the JSON Body
   * @param req
   * @param res
   */
  async multiDoc(req, res) {
    /**
     * Gets all the documents from database and sorts them by ascending
     */
    const prismaDocs = await prisma.document.findMany({
      orderBy: {
        id: "asc",
      },
    });

    /**
     * Body to add the document IDs to
     */
    const documentList = {
      docs: [],
    };

    /**
     * Loops through retrieved documents and pushes Document IDs
     * into docs property of documentList
     */
    for (let i = 0; i < prismaDocs.length; i++) {
      documentList.docs.push(prismaDocs[i].id);
    }

    //Send the list of Document IDs to Body
    console.log();
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
  async multiDocPaged(req, res) {
    //Page number from request
    var page = req.params.page;

    /**
     * Gets documents from database from a certain page and orders them by ascending
     * Page 1 takes documents 1-10,
     * Page 2 takes documents 11-20,
     * etc.
     */
    const prismaDocs = await prisma.document.findMany({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        id: "asc",
      },
    });

    /**
     * Body to add the document IDs to
     */
    const documents = {
      docs: [],
    };

    /**
     * Loops through retrieved documents and pushes Document IDs
     * into docs property of documentList
     */
    for (let i = 0; i < prismaDocs.length; i++) {
      documents.docs.push(prismaDocs[i].id);
    }

    //Sends list of Document IDs to JSON Body
    res.send(documents);
  },

  async singleDoc(req, res) {
    var id = req.params.id;
    const doc = await prisma.document.findUnique({
      where: {
        id: id,
      },
    });
    if (!doc) {
      res.sendStatus(404);
    } else {
      res.send({
        id: id,
        content: "",
        metadata: {
          dateCreated: doc.created,
          dateUpdated: doc.updatedAt,
          privilege: doc.group,
          author: doc.author,
        },
      });
    }
  },
};
