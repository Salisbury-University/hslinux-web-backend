import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";
import { config } from "../config";
import axios from "axios";
import { AuthService } from "../app/services/AuthService";
import UnauthorizedException from "../app/exceptions/UnauthorizedException";
import JWTMalformedException from "../app/exceptions/JWTMalformedException";
import { string } from "zod";
import { doesNotMatch } from "assert";



test.group("AuthMiddleware", (group) => {
  group.setup(async () => {
   
  });

  group.teardown(async () => {
    //Invalidate JWT that was used for testing??
    //TODO - group.teardown????
  });

  //Test for missing auth header
  test("AuthMiddlware Missing Header", async ({ expect }, done: Function) => {
    const username = "cxarausa"
    const password = "testing"

    const token = AuthService.login(username, password)

    const authHeader = <string>token;
    //Modify the Bearer header to no simulate a non bearer token case
    const authType = authHeader && authHeader.split(" ")[0];

    //Concat a string onto the end of the header to simulate a non bearer token
    authType.concat(".")

    //Make post request to login route to run middleware
    try {
      AuthService.test();

    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }

  })
  //Test for modified or invalid token
  test("AuthMiddlware Modified/Invalid Token", async ({ expect }, done: Function) => { 
    const username = "cxarausa"
    const password = "testing"

    const token = AuthService.login(username, password)

    const authHeader = <string>token;
    //Modify the JWT
    const authToken = authHeader && authHeader.split(" ")[1];

    //Concat a string onto the end of the header to simulate a modified JWT
    authToken.concat(".")

    //Make post request to login route to run middleware
    try {
      AuthService.test();

    } catch (err) {
      expect(err).toBeInstanceOf(JWTMalformedException);
      done();
    }
  }).waitForDone();

  //Test for expired JWT
  test("AuthMiddlware Expired JWT", async ({ expect }, done: Function) => {  })

  //Test for null body after decode
  test("AuthMiddlware Bad JWT Decode", async ({ expect }, done: Function) => { 
    const username = "cxarausa"
    const password = "testing"

    const token = AuthService.login(username, password)

    const authHeader = <string>token;
    //Modify the JWT
    const authToken = authHeader && authHeader.split(" ")[1];

    //Concat a string onto the end of the header to simulate a modified JWT
    authToken.concat(".")

    //Make post request to login route to run middleware
    try {
      AuthService.test();

    } catch (err) {
      expect(err).toBeInstanceOf(JWTMalformedException);
      done();
    }
  }).waitForDone();

  //Test valid JWT
  test("AuthMiddlware Valid JWT", async ({ expect }, done: Function) => { 
    const username = "cxarausa"
    const password = "testing"

    const token = AuthService.login(username, password)

    AuthService.test();
    done();
  }).waitForDone();
  

});

//TODO - Possibly test for none "bearer token" 
