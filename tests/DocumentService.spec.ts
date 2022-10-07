import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

const supertest = request(app);
test.group("Docuemnt Service", () => {

  /** Makes sure a docs object is sent to JSON body */
  test("Multi Doc Good Request", async ({expect}, done: Function) => {
    request(app)
      .get("/api/v1/docs")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Object);
        done();
      });
  }).waitForDone();

  test("Multi Doc Paged Bad Request", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/0")
      .expect(422)
      .then(({ body }) => {
        expect(body.message[0].message).toEqual("Page can only be numbers and must be greater than 0")

        done();
      });
  }).waitForDone();

  test("Multi Doc Paged Bad Request", async ({ expect }, done: Function) => {
    request(app)
      .get("/api/v1/docs/hello")
      .expect(422)
      .then(({ body }) => {
        expect(body.message[0].message).toEqual("Page can only be numbers and must be greater than 0")

        done();
      });
  }).waitForDone();

  /** Makes sure first page has some documents */
  test("Multi Doc Paged Good Request", async ({expect}, done: Function) => {
    request(app)
      .get("/api/v1/docs/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.docs.length).toBeGreaterThan(0);

        done();
      });
  }).waitForDone();

  test("Single Doc Bad Request", async ({expect}, done:Function) => {
    request(app)
      .get('/api/v1/doc/ngofndgodgjrnhdlkeogjlgh')
      .expect(404)
      .then(({body}) => {
        expect(body.message).toEqual("Resource Not Found")
      })
  })

  test("Single Doc Good Request", async ({expect}, done:Function) => {
    request(app)
      .get('/api/v1/doc/test')
      .expect(404)
      .then(({body}) => {
        expect(body.message).toEqual("Resource Not Found")
      })
  })


});
