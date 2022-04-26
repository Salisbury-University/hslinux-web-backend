import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";
import { config } from "../config";
import axios from "axios";


test.group("AuthMiddleware", (group) => {
  group.setup(async () => {
    //Make login request to get token??
    const username = "cxarausa"
    const password = "testing"

    const token = await axios({
      method: "post",
      url: config.auth.AUTH_URL,
      data: {
        uid: username,
        password: password,
      },
    })
  });

  group.teardown(async () => {
    //Invalidate JWT that was used for testing??
    //TODO - group.teardown????
  });

  //Test for missing auth header
  test("AuthMiddlware Missing Header", async ({ expect }, done: Function) => {
    const username = "cxarausa"
    const password = "testing"

    request(app)
      .post("/api/v1/auth/login")
      .send({ uid: username, password: password })
      .set("Accept", "application/json")
      .expect(200)
      .then(({ body }) => {

      })
  })
  //Test for invalid token
  test("AuthMiddlware Invalid Token", async ({ expect }, done: Function) => { })
  
  //Test for modified JWT
  test("AuthMiddlware Modified JWT", async ({ expect }, done: Function) => { })


  //Test for expired JWT
  test("AuthMiddlware Expired JWT", async ({ expect }, done: Function) => { })

  //Test for null body after decode
  test("AuthMiddlware Bad JWT Decode", async ({ expect }, done: Function) => { })

  //Test valid JWT
  test("AuthMiddlware Valid JWT", async ({ expect }, done: Function) => { })

});

//TODO - Possibly test for none "bearer token" 
