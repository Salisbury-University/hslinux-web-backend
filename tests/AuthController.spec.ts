import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

test.group("AuthController", (group) => {
  group.setup(async () => {});

  group.teardown(async () => {});

  //Testing user login
  test("AuthController Good Login", async ({ expect }, done: Function) => {
    const username = "Bob";
    const password = "passsome";

    request(app)
      .post("/api/v1/auth/login")
      .send({ uid: username, password: password })
      .set("Accept", "application/json")
      .expect(200)
      .then(({ body }) => {
        //expecting the response body to have a token
        expect(body).toHaveProperty("token");
        //Extract token and verify its a real jwt
        const { token } = body;

        expect(token).toBeTruthy();

        done();
        //FOR THE FUTURE
        //Bring in the signature using env var and verify
      });
  }).waitForDone();

  //Testing user login with bad credentials
  test("AuthController Bad Login", async ({ expect }, done: Function) => {
    const badUsername = "BadUsername";
    const badPassword = "BadPwd";

    request(app)
      .post("/api/v1/auth/login")
      .send({ uid: badUsername, password: badPassword })
      .set("Accept", "application/json")
      .expect(401)
      .then(({ body }) => {
        //expecting response body to have UnauthorizedException message
        expect(body).toHaveProperty("message");
        //Extract message to verify its the correct message
        const { message } = body;

        expect(message).toBe("Unauthorized Access");
        done();
      });
  }).waitForDone();
});
