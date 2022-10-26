import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

test.group("PreferenceController", (group) => {
  group.setup(async () => {});

  group.teardown(async () => {});

  //Testing GET request
  test("PreferenceController Good GET Request", async ({
    expect,
  }, done: Function) => {
    // //Random token for test
    // //Set token and auth header values
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjeGFyYXVzYSIsImlhdCI6MTY1MjIwMzIxM30.uod0RxPPdDdluWDjzycVjv4QC_pHxDNeMY76Nbg2Q6k";
    // const auth = {
    //     Authorization: "Bearer ".concat(token),
    //     Accept: "application/json",
    // };
    const goodUser = { uid: "cxarausa", iat: "166802692" };

    request(app)
      .get("api/v1/preferences")
      .set(goodUser)
      .expect(200)
      .then(({ body }) => {
        //Expecting body to have preferences
        expect(body).toHaveProperty("preferences");

        done();
      });
  }).waitForDone();

  //Testing GET request with no token
  test("PreferenceController GET Request Bad Auth", async ({
    expect,
  }, done: Function) => {
    // //Set token and auth header values
    // const token = "";
    // const auth = {
    //     Authorization: "Bearer ".concat(token),
    //     Accept: "application/json",
    // };

    const badUser = { uid: "fakeuser", iat: "166802692" };

    //Send GET request expect 401 Unauthorized Access
    request(app)
      .get("api/v1/preferences")
      .set(badUser)
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

  //Test Good Post Request
  test("PreferenceController Good POST request", async ({
    expect,
  }, done: Function) => {
    // //Set token and auth header values
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjeGFyYXVzYSIsImlhdCI6MTY1MjIwMzIxM30.uod0RxPPdDdluWDjzycVjv4QC_pHxDNeMY76Nbg2Q6k";
    // const auth = {
    //     Authorization: "Bearer ".concat(token),
    //     Accept: "application/json",
    // };
    const goodUser = { uid: "cxarausa", iat: "166802692" };

    request(app)
      .post("api/v1/preferences")
      .send({ preferences: { darkmode: true } })
      .set(goodUser)
      .expect(200)
      .then(({ body }) => {
        //Expect preferences in response body
        expect(body).toHaveProperty("preferences");

        expect(body.preferences).toHaveProperty("darkmode");

        done();
      });
  }).waitForDone();

  //Test Bad Post Request Unprocessable
  test("PreferenceController POST request Bad Input", async ({
    expect,
  }, done: Function) => {
    // //Set token and auth header values
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjeGFyYXVzYSIsImlhdCI6MTY1MjIwMzIxM30.uod0RxPPdDdluWDjzycVjv4QC_pHxDNeMY76Nbg2Q6k";
    // const auth = {
    //     Authorization: "Bearer ".concat(token),
    //     Accept: "application/json",
    // };

    const goodUser = { uid: "cxarausa", iat: "166802692" };

    request(app)
      .post("api/v1/preferences")
      .send({ preferences: { darkmode: "Bad Input" } })
      .set(goodUser)
      .expect(422)
      .then(({ body }) => {
        //Expect unprocessable request
        expect(body).toHaveProperty("message");

        const { message } = body;

        expect(message).toBe("Unprocessable Entity");
        done();
      });
  }).waitForDone();

  //Test Bad Post Request Unauthorized
  test("PreferenceController POST request Bad Auth", async ({
    expect,
  }, done: Function) => {
    // //Set token and auth header values
    // const token = "";
    // const auth = {
    //     Authorization: "Bearer ".concat(token),
    //     Accept: "application/json",
    // };

    const badUser = { uid: "fakeuser", iat: "166802692" };

    request(app)
      .post("api/v1/preferences")
      .send({ preferences: { darkmode: true } })
      .set(badUser)
      .expect(401)
      .then(({ body }) => {
        //Expect unprocessable request
        expect(body).toHaveProperty("message");

        const { message } = body;

        expect(message).toBe("Unauthorized Access");
        done();
      });
  }).waitForDone();
});
