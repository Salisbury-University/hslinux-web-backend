import { test } from "@japa/runner";
import { doesNotMatch } from "assert";
import request from "supertest";
import { app } from "../app";

const supertest = request(app);
test.group("Docuemnt Service", () => {
  /**
   * Need this here because for some reason, the first GET request to '/api/v1/docs' returns empty docs object
   * If I get rid of this, the other requests below return no documents in the response
   */
  test("Test", async () => {
    const test = await supertest.get("/api/v1/docs");
  });

  /** Makes sure a docs object is sent to JSON body */
  test("Document List is sent as response to '/api/v1/docs'", async ({
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
  test("Documents Page 9999999999999999 returns no documents", async ({
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
  test("Documents Page 1 returns some documents", async ({
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

  test("Page 0 should throw error", ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/0")
      .expect(422)
      .then((message) => {
        const test = message.text.split(",");
        console.log(test[1]);

        done();
      });
  }).waitForDone();
});
