import UnauthorizedException from "../exceptions/UnauthorizedException";
import UnprocessableEntityException from "../exceptions/UnprocessableEntityException";
import { PrismaClient } from "@prisma/client";
import { config } from "../../config";
import jwt from "jsonwebtoken";
import { response } from "express";
import { decode } from "punycode";

const prisma = new PrismaClient();

export const PreferenceService = {
  /**
   * Gets user preferences after checking to make sure user is logged in
   *
   * @param req Express request object
   * @throws UnauthorizedException if user is not logged in
   * TODO Fetch Preferences from DB
   */

  async getPreferences(auth) {
    // //Grab bearer token from header and decode
    // const authHeader = auth ? auth : "";
    // const authToken = authHeader.split(" ")[1];
    // const decodeBody = jwt.decode(authToken);

    // //Throw UnauthorizedException if decode is null
    // if(!decodeBody) {
    //     throw new UnauthorizedException();
    // }

    // //Pull uid from the decoded body
    // const uid = decodeBody.uid;
    const uid = auth.uid;

    if (!uid) {
      throw new UnauthorizedException();
    }

    try {
      //Fetch user from databse to grab preferences
      const preferences = await prisma.preferences.findUnique({
        where: {
          uid: uid,
        },
      });

      //Create object to hold the preferences
      const preferenceObj = { darkmode: preferences.darkmode };

      return preferenceObj;
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  },

  /**
   * Changes user preferences after checking if user is logged in
   *
   * @param req Express request object
   * @throws UnauthorizedException ifu ser is not logged inS
   * @throws UnprocessableEntityException if preference input is invalid
   */

  async postPreferences(preferences, auth) {
    //Grab bearer token from header and decode
    // const authHeader = auth ? auth : "";
    // const authToken = authHeader.split(" ")[1];
    // const decodeBody = jwt.decode(authToken);

    // //Throw UnauthorizedException if decode is null
    // if(!decodeBody) {
    //     throw new UnauthorizedException();
    // }

    // //Throw if preference body is null
    // if(!preferences) {
    //     throw new UnprocessableEntityException();
    // }

    // //Pull username from decoded body
    // const uid = decodeBody.uid;

    const uid = auth.uid;

    console.log(preferences.darkmode);

    try {
      //update preferences in database
      const updatedPreferences = await prisma.preferences.update({
        where: {
          uid: uid,
        },
        data: {
          darkmode: preferences.darkmode,
        },
      });
      console.log(updatedPreferences);

      //Create return object holding new preferences
      const returnObj = {
        preferences: {
          darkmode: updatedPreferences.darkmode,
        },
      };

      //Return new preferences object
      return returnObj;
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  },
};
