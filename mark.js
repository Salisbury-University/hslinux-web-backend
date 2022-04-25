const { marked } = require('marked');
const  fs  = require('fs');
const  { PrismaClient }  = require('@prisma/client');

const prisma = new PrismaClient();

//reads all filenames in directory /docs
const filenames = fs.readdirSync("docs");

//Each document is tokenized and variables in the frontmatter are read and stored in database
filenames.forEach((file) => {
    
    //reads content of file and grabs the data from frontmatter
    fs.readFile('docs/'+file, 'utf8' ,(err, data) => {
        if(err){
            console.err(err);
            return;
        }
        const token = marked.lexer(data);

        /** takes the block of frontmatter and splits the lines into seperate values */ 
        const values = token[1].raw.split('\n'); 

        /** id from frontmatter in md file (file name without '.md') */
        const id = file.substring(0,file.length-3); 

        const title = values[0].substring(8,values[0].length-1); 

        const description = values[1].substring(14,values[1].length-1); 

        
        const author = values[2].substring(9,values[2].length-1); 


        const group = values[3].substring(8,values[3].length-1); 

        const created = values[4].substring(9,values[4].length); 
        const createdDate = new Date(created);

        const updated = values[5].substring(9, values[5].length) 
        const updatedDate = new Date(updated);



        push(id, title, description, author, group, createdDate, updatedDate)
    });
    
});

/**
 * This function checks database if the file is already stored.
 * If not, insert into database
 * @param  id ID of markdown file (File Name without .md)
 * @param  title Title from frontmatter of md file
 * @param  description Description of the file
 * @param  author Author of md file
 * @param  group Group that file is associated with
 * @param  created Time the document was created 
 * @param  updated Last time the md file was updated
 */
async function push(id, title, description, author, group, created, updated){

    //Checks database to see if document is stored already
    const dbCheck = await prisma.document.findUnique({
        where: {
            id: id,
        }
    });

    //if document hasn't been stored, insert it
    if(!dbCheck){
        const insert = await prisma.document.create({
            data: {
                id: id,
                title: title,
                description: description,
                author: author,
                group: group,
                created: created,
                updatedAt: updated,
            },
        });
    }
}
        


