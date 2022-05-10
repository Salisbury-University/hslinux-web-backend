import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";


test.group("AuthMiddleware", (group) => {
  
  //Sign fake token for middleware testing
  const valid_token = jwt.sign("username", "SuperSecretSecret");
  const invalid_token = "BadToken"
  
  group.setup(async () => {

  });

  group.teardown(async () => {
    //Invalidate JWT that was used for testing??
    //TODO - group.teardown????
  });

  //Test for missing auth header
  test("AuthMiddlware Invalid JWT", async ({ expect }, done: Function) => {
    
    request(app)
      .post("/api/v1/auth/logout")
      .set("Accept", "application/json")
        .set("Authorization", "Bearer ".concat(invalid_token))
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty("message");

        const { message } = body;

        expect(message).toBe("JWT Malformed");

        done();
      });
  }).waitForDone();

  //Test valid JWT
  test("AuthMiddlware Valid JWT", async ({ expect }, done: Function) => { 
   
    request(app)
    .post("/api/v1/auth/logout")
    .set("Accept", "application/json")
      .set("Authorization", "Bearer ".concat(valid_token))
    .expect(200)
    .then(({ body }) => {
      //expecting response body to have UnauthorizedException message
      expect(body)
      
      done();
    });
  }).waitForDone();

});

