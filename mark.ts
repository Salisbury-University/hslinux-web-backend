const { marked } = require("marked");
const fs = require("fs");

/** Holds frontmatter and markdown from the .md files */
const docs = new Object();

/**
 * Parses Frontmatter and stores in dictionary
 * @returns dictionary object
 */
export function parseFrontmatter() {
  /** All filenames in directory /docs */
  const filenames = fs.readdirSync("docs");

  /** Each document is tokenized and variables in the frontmatter are read and stored in database */
  filenames.forEach((file) => {
    if (file.endsWith(".md")) {
      //reads content of file and grabs the data from frontmatter
      fs.readFile("docs/" + file, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

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
export function getFrontmatter() {
  return docs;
}
