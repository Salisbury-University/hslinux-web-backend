import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

/** Making sure Controller sends info to body */
test.group("Document Controller", () => {
  test("multiDoc is returned content", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/")
      .send({"uid": "Alice"})
      .then(( {body} ) => {
        expect(body.docs.length).toBeGreaterThan(0)
        done();
      });
  }).waitForDone();

  test("multiDocPaged is returned content", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/1")
      .send({"uid": "Alice"})
      .then(( {body} ) => {
        expect(body.docs.length).toBeGreaterThan(0);
        done();
      });
  }).waitForDone();

  test("singleDoc is returned content", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/doc/facultyTest")
      .send({"uid": "Alice"})
      .then(( {body} ) => {
        expect(body.id).toBe("facultyTest")
        done();
      });
  }).waitForDone();
});