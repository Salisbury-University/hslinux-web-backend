import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

/** Making sure Controller sends info to body */
test.group("Document Controller", () => {
  test("Documents is defined", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/")
      .then(( {body} ) => {
        expect(body.docs).toBeDefined();
        done();
      });
  }).waitForDone();

  test("Paged docs", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/1")
      .then(( {body} ) => {
        expect(body.docs).toBeDefined();
        done();
      });
  }).waitForDone();

  test("Paged docs", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/doc/test")
      .then(( {body} ) => {
        expect(body).toBeTruthy();
        done();
      });
  }).waitForDone();
});
