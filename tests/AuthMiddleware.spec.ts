import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";

test.group("AuthMiddleware", (group) => {
  group.setup(async () => {
    //Make login request to get token??
  });

  group.teardown(async () => {
    //Invalidate JWT that was used for testing??
  });

  //Test for missing auth header

  //Test for incorrect auth header

  //Test for invalid token

  //Test for modified JWT

  //Test for expired JWT

  //Test for null body after decode

  //Test valid JWT
});
