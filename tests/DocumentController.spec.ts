import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

/** Making sure Controller sends info to body */
test.group("Document Controller", () => {
  test("multiDoc is returned content", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/")
      .then(( {body} ) => {
        expect(body.docs).toBeDefined();
        done();
      });
  }).waitForDone();

  test("multiDocPaged is returned content", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/1")
      .then(( {body} ) => {
        expect(body.docs).toBeDefined();
        done();
      });
  }).waitForDone();

  test("singleDoc is returned content", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/doc/test")
      .then(( {body} ) => {
        console.log(body)
        expect(body).toBeDefined();
        done();
      });
  }).waitForDone();
});
