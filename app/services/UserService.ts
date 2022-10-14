import { PrismaClient } from '@prisma/client'
import axios from "axios";
import NotFoundException from "../exceptions/NotFoundException";
import UnauthorizedException from "../exceptions/UnauthorizedException";
const prisma = new PrismaClient();


export const UserService = {

    /**
     * Takes username and returns JSON Body of user and attributes
     * 
     * @param uid User ID that was contained in the request object
     * @throws not found exception if user is not found or null
     */

    async getInfo(uid) {
        console.log("In user service " + uid);
        //Throw exception if uid is null
        if(!uid) {
            throw new UnauthorizedException();
        } 

        /* TODO once LDAP is running, make axios request to have data returned
           Mock data will be returned as of right now 
         */
        const user = await prisma.user.findUnique({
            where: {
                username: uid
            }
        })
        console.log("In user service " + uid);

        console.log(user);

        //Mock call to LDAP with prisma
       
    
    },
};