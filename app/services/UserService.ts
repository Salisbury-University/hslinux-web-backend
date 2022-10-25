import { PrismaClient } from '@prisma/client'
import axios from "axios";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import UnprocessableEntityException from '../exceptions/UnprocessableEntityException';
const prisma = new PrismaClient();


export const UserService = {

    /**
     * Takes username and returns JSON Body of user and attributes
     * 
     * @param uid User ID that was contained in the request object
     * @throws not found exception if user is not found or null
     */

    async getInfo(uid) {
        //Throw exception if uid is null
        if(!uid) {
            throw new UnauthorizedException();
        } 

        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: uid
                }
            })

            if(!user) {
                throw new UnauthorizedException();
            }

            //Throw exception if user is not found

            //Create an object with the username and group to return to controller
            const returnObj = {id: user.username, groups: user.group}
            return returnObj;
        } catch(err) {
            return new UnprocessableEntityException();
        }
    
    },
};