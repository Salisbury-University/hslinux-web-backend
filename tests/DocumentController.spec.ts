import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

/** Making sure Controller sends info to body */
test.group("Document Controller", () => {
  const user = { uid: "Alice" };
  const token = jwt.sign(user, "unittest");
  const auth = {
    Authorization: "Bearer " + token,
    Accept: "application/json",
  };
  test("multiDoc is returned content", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/")
      .set(auth)
      .send(user)
      .then(({ body }) => {
        expect(body.docs.length).toBeGreaterThan(0);
        done();
      });
  }).waitForDone();

  test("multiDocPaged is returned content", async ({
    expect,
  }, done: Function) => {
    request(app)
      .get("/api/v1/docs/1")
      .set(auth)
      .send(user)
      .then(({ body }) => {
        expect(body.docs.length).toBeGreaterThan(0);
        done();
      });
  }).waitForDone();

  test("singleDoc is returned content", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/doc/facultyTest")
      .set(auth)
      .send(user)
      .then(({ body }) => {
        expect(body.id).toBe("facultyTest");
        done();
      });
  }).waitForDone();
});
