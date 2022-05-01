const { marked } = require('marked');
const  fs  = require('fs');
const  { PrismaClient }  = require('@prisma/client');

const prisma = new PrismaClient();

/** Holds frontmatter and markdown from the .md files */
const docs = new Object();

/**
 * Parses Frontmatter and stores in dictionary
 * @returns dictionary object
 */
export function parseFrontmatter() {
    /** reads all filenames in directory /docs */
    const filenames = fs.readdirSync("docs");

    //Each document is tokenized and variables in the frontmatter are read and stored in database
    filenames.forEach(file => {
        if(file.endsWith(".md")){
            
            //reads content of file and grabs the data from frontmatter
            fs.readFile('docs/'+file, 'utf8' ,(err, data) => {
                if(err){
                    console.error(err)
                    return;
                }

                /** Tokenized markdown code */
                const token = marked.lexer(data);

                /** Holds the block of frontmatter */ 
                const values = token[1].raw.split('\n'); 
    
                /** id from frontmatter in md file (file name without '.md') */
                const id = file.substring(0,file.length-3); 
    
                /** Title of the markdown file */
                const title = values[0].substring(8,values[0].length-1); 

                /** Description of the markdown file */
                const description = values[1].substring(14,values[1].length-1); 
                
                /** Author of the markdown file */
                const author = values[2].substring(9,values[2].length-1); 
            
                /** Group of the markdown file */
                const group = values[3].substring(8,values[3].length-1); 
    
                
                const created = values[4].substring(9,values[4].length); 
                /** Date the markdown file was created */
                const createdDate = new Date(created);
    
                const updated = values[5].substring(9, values[5].length)
                /** Date the markdown file was last updated */
                const updatedDate = new Date(updated);
                
                docs[id] = {
                    'title': title,
                    'description': description,
                    'author': author,
                    'group': group,
                    'createdDate': createdDate,
                    'updatedDate': updatedDate,
                    'content': data,
                }
            });
        }
    });
    return docs;
}

