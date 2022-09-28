import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

const supertest = request(app);
test.group("Docuemnt Service", () => {

  /** Makes sure a docs object is sent to JSON body */
  test("All documents return", async ({
    expect,
  }, done: Function) => {
    request(app)
      .get("/api/v1/docs")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Object);

        done();
      });
  }).waitForDone();

  /** Makes sure an astronomical page parameter returns no documents */
  test("Bad Page", async ({
    expect,
  }, done: Function) => {
    request(app)
      .get("/api/v1/docs/9999999999999999")
      .expect(200)
      .then(({ body }) => {
        expect(body.docs).toHaveLength(0);

        done();
      });
  }).waitForDone();

  /** Makes sure first page has some documents */
  test("Good Page", async ({
    expect,
  }, done: Function) => {
    request(app)
      .get("/api/v1/docs/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.docs.length).toBeGreaterThan(0);

        done();
      });
  }).waitForDone();

  test("0 for Page", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/0")
      .expect(422)
      .then(({ body }) => {
        expect(body.message[0].message).toEqual("Page can only be numbers and must be greater than 0")

        done();
      });
  }).waitForDone();

  test("String as Page", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/hello")
      .expect(422)
      .then(({ body }) => {
        expect(body.message[0].message).toEqual("Page can only be numbers and must be greater than 0")

        done();
      });
  }).waitForDone();
});
