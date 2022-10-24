import UnauthorizedException from "../exceptions/UnauthorizedException";
import UnprocessableEntityException from "../exceptions/UnprocessableEntityException";
import { config } from "../../config";
import jwt from "jsonwebtoken";
import { response } from "express";

export const PreferenceService = {

    /**
     * Gets user preferences after checking to make sure user is logged in
     * 
     * @param req Express request object
     * @throws UnauthorizedException if user is not logged in
     * TODO Fetch Preferences from DB
     */

    getPreferences(auth) {
        //Grab bearer token from header and decode
        const authHeader = auth ? auth : "";
        const authToken = authHeader.split(" ")[1];
        const decodeBody = jwt.decode(authToken);
        
        //Throw UnauthorizedException if decode is null
        if(!decodeBody) {
            throw new UnauthorizedException();
        }

        //TODO FETCH PREFERENCES FROM DB

        //return preferences;
    },

    /**
     * Changes user preferences after checking if user is logged in
     * 
     * @param req Express request object
     * @throws UnauthorizedException ifu ser is not logged in
     * @throws UnprocessableEntityException if preference input is invalid
     */

    postPreferences(preferences, auth) {
        //Grab bearer token from header and decode
        const authHeader = auth ? auth : "";
        const authToken = authHeader.split(" ")[1];
        const decodeBody = jwt.decode(authToken);
        
        //Throw UnauthorizedException if decode is null
        if(!decodeBody) {
            throw new UnauthorizedException();
        }

        //Throw if preference body is null
        if(!preferences) {
            throw new UnprocessableEntityException();
        }
        
        return preferences;
    },


}