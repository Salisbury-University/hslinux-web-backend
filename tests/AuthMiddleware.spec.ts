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
  
  const username = "cxarausa"
  const password = "testing"
  const invalid_token = "BadToken"
  const valid_token = AuthService.login(username, password);
  
  group.setup(async () => {

  });

  group.teardown(async () => {
    //Invalidate JWT that was used for testing??
    //TODO - group.teardown????
  });

  //Test for missing auth header
  test("AuthMiddlware Invalid JWT", async ({ expect }, done: Function) => {
    
    request(app)
      .get("/api/v1/auth/test")
      .set("Accept", "application/json")
        .set("Authorization", "Bearer " + invalid_token)
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
    const username = "cxarausa"
    const password = "testing"

    
    request(app)
    .get("/api/v1/auth/test")
    .set("Accept", "application/json")
      .set("Authorization", "Bearer " + valid_token)
    .expect(400)
    .then(({ body }) => {
      expect(body).toHaveProperty("message");

      const { message } = body;

      expect(message).toBe("JWT Malformed");

      done();
    });
  }).waitForDone();

});

//TODO - Possibly test for none "bearer token" 
