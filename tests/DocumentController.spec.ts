import { test } from "@japa/runner";
import request from "supertest"
import { app } from "../app"
import DocumentNotFoundException from "../app/exceptions/DocumentException";
import PageException from "../app/exceptions/PageException";

test.group('Document Controller', () => {

  test('Page 0 should throw error', ({ expect }) => {
    request(app)
      .get('/api/v1/docs/0')
      .expect(400)
      .then(() => {
        
      })
  })


})