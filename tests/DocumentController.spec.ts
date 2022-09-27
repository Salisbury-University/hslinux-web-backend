import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

test.group("Document Controller", () => {
  test("Documents in body", async ({ expect }) => {
    request(app)
      .get("/api/v1/docs/")
      .expect(200)
      .then(({ body }) => {
        expect(body.docs.length).toBeGreaterThan(0);
      });
  });
});
